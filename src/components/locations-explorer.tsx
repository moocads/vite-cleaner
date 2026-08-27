"use client";

import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { locations } from "@/lib/site-data";
import { cn } from "@/lib/utils";

declare global {
  interface Window {
    __viteGoogleMapsInit?: () => void;
  }
}

type MapStatus = "loading" | "ready" | "error";
type LocationSlug = (typeof locations)[number]["slug"];

let googleMapsPromise: Promise<void> | null = null;

function loadGoogleMaps(apiKey: string) {
  if (typeof google !== "undefined") {
    return Promise.resolve();
  }

  if (googleMapsPromise) {
    return googleMapsPromise;
  }

  googleMapsPromise = new Promise<void>((resolve, reject) => {
    window.__viteGoogleMapsInit = () => resolve();

    const script = document.createElement("script");
    const params = new URLSearchParams({
      key: apiKey,
      v: "weekly",
      loading: "async",
      libraries: "marker",
      callback: "__viteGoogleMapsInit",
    });

    script.id = "vite-google-maps";
    script.src = `https://maps.googleapis.com/maps/api/js?${params.toString()}`;
    script.async = true;
    script.onerror = () => reject(new Error("Google Maps could not be loaded."));
    document.head.append(script);
  });

  return googleMapsPromise;
}

export function LocationsExplorer({ compact = false, apiKey }: { compact?: boolean; apiKey?: string }) {
  const mapElementRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<google.maps.Map | null>(null);
  const positionsRef = useRef(new Map<LocationSlug, google.maps.LatLng>());
  const markersRef = useRef<google.maps.marker.AdvancedMarkerElement[]>([]);
  const [activeSlug, setActiveSlug] = useState<LocationSlug>(locations[0].slug);
  const [status, setStatus] = useState<MapStatus>("loading");
  const activeLocation = locations.find((location) => location.slug === activeSlug) ?? locations[0];

  useEffect(() => {
    const mapsApiKey = apiKey || process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
    const mapElement = mapElementRef.current;

    if (!mapsApiKey || !mapElement) {
      setStatus("error");
      return;
    }

    let cancelled = false;
    const resolvedApiKey = mapsApiKey;
    const positions = positionsRef.current;

    async function initializeMap() {
      try {
        await loadGoogleMaps(resolvedApiKey);
        const [{ Map: GoogleMap }, { AdvancedMarkerElement }] = await Promise.all([
          google.maps.importLibrary("maps") as Promise<google.maps.MapsLibrary>,
          google.maps.importLibrary("marker") as Promise<google.maps.MarkerLibrary>,
        ]);

        if (cancelled || !mapElementRef.current) return;

        const map = new GoogleMap(mapElementRef.current, {
          center: { lat: 43.665, lng: -79.38 },
          zoom: 11,
          mapId: "DEMO_MAP_ID",
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: true,
          gestureHandling: "cooperative",
        });
        const geocoder = new google.maps.Geocoder();
        const bounds = new google.maps.LatLngBounds();
        mapRef.current = map;

        const geocodedLocations = await Promise.all(
          locations.map(async (location) => {
            const response = await geocoder.geocode({ address: location.address });
            const position = response.results[0]?.geometry.location;
            return position ? { location, position } : null;
          }),
        );

        if (cancelled) return;

        geocodedLocations.forEach((result) => {
          if (!result) return;
          const { location, position } = result;
          positions.set(location.slug, position);
          bounds.extend(position);

          const pin = document.createElement("img");
          pin.src = "/brand/vite-pin.svg";
          pin.alt = "";
          pin.width = 44;
          pin.height = 48;
          pin.style.width = "44px";
          pin.style.height = "48px";

          const marker = new AdvancedMarkerElement({
            map,
            position,
            title: location.name,
            gmpClickable: true,
          });
          marker.append(pin);
          marker.addListener("click", () => {
            setActiveSlug(location.slug);
            map.panTo(position);
            map.setZoom(14);
          });
          markersRef.current.push(marker);
        });

        if (!bounds.isEmpty()) {
          map.fitBounds(bounds, compact ? 54 : 72);
          const listener = map.addListener("idle", () => {
            if ((map.getZoom() ?? 11) > 13) map.setZoom(13);
            listener.remove();
          });
        }

        setStatus("ready");
      } catch {
        if (!cancelled) setStatus("error");
      }
    }

    void initializeMap();

    return () => {
      cancelled = true;
      markersRef.current.forEach((marker) => {
        marker.map = null;
      });
      markersRef.current = [];
      positions.clear();
    };
  }, [apiKey, compact]);

  function focusLocation(slug: LocationSlug) {
    setActiveSlug(slug);
    const position = positionsRef.current.get(slug);
    if (position && mapRef.current) {
      mapRef.current.panTo(position);
      mapRef.current.setZoom(14);
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[420px_minmax(0,1fr)]">
      <div className="grid gap-3">
        {locations.map((location) => {
          const active = location.slug === activeSlug;
          return (
            <button
              key={location.slug}
              type="button"
              onClick={() => focusLocation(location.slug)}
              aria-pressed={active}
              className={cn(
                "group grid grid-cols-[44px_1fr_auto] items-center gap-4 rounded-[18px] border p-4 text-left transition-all duration-300",
                active
                  ? "border-vite-blue-mid bg-vite-blue-soft"
                  : "border-vite-line bg-vite-paper hover:border-vite-blue-mid hover:bg-white",
              )}
            >
              <span className="flex size-11 items-center justify-center">
                <Image src="/brand/vite-pin.svg" alt="" width={36} height={40} className="h-10 w-auto" />
              </span>
              <span>
                <span className="block font-display text-lg text-vite-navy">{location.name}</span>
                <span className="mt-1 block text-xs leading-5 text-vite-muted">{location.address}</span>
                <span className="mt-1 block text-[11px] text-vite-cobalt">{location.kind}</span>
              </span>
              <span className="size-2 rounded-full bg-vite-cobalt opacity-0 transition-opacity group-aria-pressed:opacity-100" />
            </button>
          );
        })}
      </div>

      <div className={cn("relative overflow-hidden rounded-[28px] border border-vite-line bg-vite-surface", compact ? "min-h-[480px]" : "min-h-[560px]")}>
        <div ref={mapElementRef} className={cn("absolute inset-0", status !== "ready" && "opacity-0")} aria-label="Interactive map of Vite locations" />
        {status === "loading" ? <div className="absolute inset-0 animate-pulse bg-vite-blue-soft" aria-label="Loading map" /> : null}
        {status === "error" ? (
          <div className="absolute inset-0 flex items-center justify-center p-8 text-center">
            <div><p className="font-display text-2xl text-vite-navy">Map unavailable</p><p className="mt-3 max-w-sm text-sm leading-6 text-vite-muted">Check that the Maps JavaScript API is enabled and the website is allowed by the API key restrictions.</p></div>
          </div>
        ) : null}
        {status === "ready" ? (
          <div className="absolute inset-x-4 bottom-4 rounded-[18px] border border-vite-line bg-vite-paper/95 p-4 shadow-[0_16px_40px_-24px_rgba(15,48,100,0.45)] backdrop-blur-md sm:inset-x-auto sm:left-4 sm:max-w-[360px]">
            <p className="font-display text-lg text-vite-navy">{activeLocation.name}</p>
            <p className="mt-1 text-xs leading-5 text-vite-muted">{activeLocation.address}</p>
            <a href={activeLocation.mapUrl} target="_blank" rel="noreferrer" className="mt-3 inline-flex items-center gap-2 text-xs font-medium text-vite-cobalt hover:text-vite-navy">
              Open in Google Maps <ExternalLink aria-hidden="true" className="size-3.5" strokeWidth={1.7} />
            </a>
          </div>
        ) : null}
      </div>
    </div>
  );
}
