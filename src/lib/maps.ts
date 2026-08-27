export function getGoogleMapsApiKey() {
  return (
    process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ||
    process.env.google_map_api_key ||
    process.env.GOOGLE_MAPS_API_KEY ||
    ""
  );
}
