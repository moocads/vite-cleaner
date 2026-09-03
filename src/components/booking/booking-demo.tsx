"use client";

import Link from "next/link";
import { FormEvent, useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronRight,
  CircleDollarSign,
  CreditCard,
  Home,
  Info,
  LockKeyhole,
  MapPin,
  Minus,
  PackageCheck,
  Plus,
  Shirt,
  Smartphone,
  Sparkles,
  Store,
  Truck,
  X,
} from "lucide-react";
import { SiteFooter } from "@/components/site-footer";

type Fulfillment = "pickup" | "dropoff";
type Price = number | { pickup: number; dropoff: number };
type BookingItem = {
  id: string;
  category: string;
  name: string;
  price: Price;
  unit: "item" | "lb";
  from?: boolean;
};

const categories = [
  { id: "dry-cleaning", label: "Dry Cleaning", note: "Tailored pieces, delicate fabrics and everyday favourites." },
  { id: "wash-fold", label: "Wash & Fold", note: "Everyday laundry, washed, dried and neatly folded." },
  { id: "shirt-laundry", label: "Shirt Laundry", note: "Clean, pressed shirts with a crisp finish." },
  { id: "alterations", label: "Alterations", note: "Repairs and fit adjustments, estimated before assessment." },
  { id: "specialty-care", label: "Specialty Care", note: "Assessment-led care for specialty materials and outerwear." },
  { id: "wedding-dress-cleaning", label: "Wedding Dress Care", note: "Careful cleaning and finishing for meaningful garments." },
] as const;

type CategoryId = (typeof categories)[number]["id"];

const bookingItems: BookingItem[] = [
  { id: "suits-jackets", category: "dry-cleaning", name: "Suits and jackets", price: 38.5, unit: "item", from: true },
  { id: "dresses-formalwear", category: "dry-cleaning", name: "Dresses and formalwear", price: 32.95, unit: "item", from: true },
  { id: "coats", category: "dry-cleaning", name: "Coats", price: 48.35, unit: "item", from: true },
  { id: "sweaters", category: "dry-cleaning", name: "Sweaters", price: 16.75, unit: "item", from: true },
  { id: "delicate-fabrics", category: "dry-cleaning", name: "Delicate fabrics", price: 15.25, unit: "item", from: true },
  { id: "everyday-clothing", category: "wash-fold", name: "Everyday clothing", price: { pickup: 2.59, dropoff: 2.19 }, unit: "lb" },
  { id: "towels", category: "wash-fold", name: "Towels", price: { pickup: 2.59, dropoff: 2.19 }, unit: "lb" },
  { id: "bed-sheets", category: "wash-fold", name: "Bed sheets", price: { pickup: 2.59, dropoff: 2.19 }, unit: "lb" },
  { id: "casual-wear", category: "wash-fold", name: "Casual wear", price: { pickup: 2.59, dropoff: 2.19 }, unit: "lb" },
  { id: "household-laundry", category: "wash-fold", name: "Household laundry", price: { pickup: 2.59, dropoff: 2.19 }, unit: "lb" },
  { id: "business-shirts", category: "shirt-laundry", name: "Business shirts", price: 5.95, unit: "item" },
  { id: "casual-shirts", category: "shirt-laundry", name: "Casual shirts", price: 5.95, unit: "item" },
  { id: "blouses", category: "shirt-laundry", name: "Blouses", price: 12.95, unit: "item", from: true },
  { id: "folded-shirts", category: "shirt-laundry", name: "Folded shirts", price: 7.45, unit: "item" },
  { id: "pressed-shirts", category: "shirt-laundry", name: "Pressed shirts", price: 5.95, unit: "item" },
  { id: "hemming", category: "alterations", name: "Hemming", price: 18, unit: "item", from: true },
  { id: "sleeve-adjustments", category: "alterations", name: "Sleeve adjustments", price: 25, unit: "item", from: true },
  { id: "waist-adjustments", category: "alterations", name: "Waist adjustments", price: 30, unit: "item", from: true },
  { id: "zipper-repair", category: "alterations", name: "Zipper repair", price: 35, unit: "item", from: true },
  { id: "general-mending", category: "alterations", name: "General mending", price: 15, unit: "item", from: true },
  { id: "shoes", category: "specialty-care", name: "Shoes", price: 45, unit: "item", from: true },
  { id: "leather", category: "specialty-care", name: "Leather", price: 85, unit: "item", from: true },
  { id: "suede", category: "specialty-care", name: "Suede", price: 75, unit: "item", from: true },
  { id: "down-garments", category: "specialty-care", name: "Down garments", price: 55, unit: "item", from: true },
  { id: "specialty-outerwear", category: "specialty-care", name: "Specialty outerwear", price: 48, unit: "item", from: true },
  { id: "wedding-dresses", category: "wedding-dress-cleaning", name: "Wedding dresses", price: 299, unit: "item", from: true },
  { id: "formal-gowns", category: "wedding-dress-cleaning", name: "Formal gowns", price: 65, unit: "item", from: true },
  { id: "detailed-fabrics", category: "wedding-dress-cleaning", name: "Detailed fabrics", price: 85, unit: "item", from: true },
  { id: "veils", category: "wedding-dress-cleaning", name: "Veils", price: 45, unit: "item", from: true },
  { id: "special-occasion", category: "wedding-dress-cleaning", name: "Special occasion pieces", price: 50, unit: "item", from: true },
];

const stores = [
  { id: "sherbourne", name: "Sherbourne Street", address: "59B Sherbourne St, Toronto, ON" },
  { id: "toronto-street", name: "Toronto Street", address: "1 Toronto St #106, Toronto, ON" },
  { id: "bay-street", name: "Bay Street", address: "1100 Bay St, Toronto, ON M5S 2Y1" },
];

const dates = ["Thursday, Sep 3", "Friday, Sep 4", "Saturday, Sep 5"];
const pickupWindows = ["8:00 AM – 10:00 AM", "10:00 AM – 12:00 PM", "2:00 PM – 4:00 PM", "6:00 PM – 8:00 PM"];
const dropoffWindows = ["9:00 AM – 11:00 AM", "12:00 PM – 2:00 PM", "3:00 PM – 5:00 PM"];
const readyWindows = ["Monday, Sep 7 · 2:00 PM – 5:00 PM", "Tuesday, Sep 8 · 10:00 AM – 1:00 PM"];

const stepLabels = ["Area", "Services", "Schedule", "Review", "Verify", "Payment"];

function money(value: number) {
  return new Intl.NumberFormat("en-CA", { style: "currency", currency: "CAD" }).format(value);
}

function normalizePostalCode(value: string) {
  const cleaned = value.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 6);
  return cleaned.length > 3 ? `${cleaned.slice(0, 3)} ${cleaned.slice(3)}` : cleaned;
}

function FieldLabel({ children }: { children: React.ReactNode }) {
  return <span className="mb-2 block text-xs font-medium uppercase tracking-[0.08em] text-vite-muted">{children}</span>;
}

function Input({ className = "", ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={`h-12 w-full rounded-[14px] border border-vite-line bg-vite-paper px-4 text-sm text-vite-ink outline-none transition focus:border-vite-cobalt focus:ring-2 focus:ring-vite-blue-soft ${className}`} />;
}

function Select({ className = "", ...props }: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return <select {...props} className={`h-12 w-full rounded-[14px] border border-vite-line bg-vite-paper px-4 text-sm text-vite-ink outline-none transition focus:border-vite-cobalt focus:ring-2 focus:ring-vite-blue-soft ${className}`} />;
}

function PrimaryButton({ children, disabled, onClick, type = "button" }: { children: React.ReactNode; disabled?: boolean; onClick?: () => void; type?: "button" | "submit" }) {
  return <button type={type} disabled={disabled} onClick={onClick} className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-vite-cobalt px-6 text-sm font-medium text-vite-paper transition-colors hover:bg-vite-navy focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-vite-cobalt disabled:cursor-not-allowed disabled:opacity-45">{children}</button>;
}

function BackButton({ onClick }: { onClick: () => void }) {
  return <button type="button" onClick={onClick} className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-vite-cobalt px-5 text-sm font-medium text-vite-cobalt transition-colors hover:bg-vite-blue-soft"><ArrowLeft aria-hidden="true" className="size-4" />Back</button>;
}

export function BookingDemo({ initialPostal, initialMethod }: { initialPostal: string; initialMethod: Fulfillment }) {
  const normalizedInitialPostal = normalizePostalCode(initialPostal);
  const initialHasPostal = /^[A-Z]\d[A-Z] \d[A-Z]\d$/.test(normalizedInitialPostal);
  const [step, setStep] = useState(initialHasPostal ? 1 : 0);
  const [fulfillment, setFulfillment] = useState<Fulfillment>(initialMethod);
  const [postalCode, setPostalCode] = useState(normalizedInitialPostal);
  const [postalError, setPostalError] = useState("");
  const [showNotice, setShowNotice] = useState(false);
  const [activeCategory, setActiveCategory] = useState<CategoryId>(categories[0].id);
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [schedule, setSchedule] = useState({
    street: "", unit: "", city: "Toronto", instructions: "", store: stores[0]!.id,
    date: dates[0]!, handoffTime: pickupWindows[0]!, readyTime: readyWindows[0]!,
  });
  const [phone, setPhone] = useState("");
  const [codeSent, setCodeSent] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [verifyError, setVerifyError] = useState("");
  const [payment, setPayment] = useState({ name: "Demo Customer", card: "4242 4242 4242 4242", expiry: "12/30", cvc: "123" });
  const [isPaying, setIsPaying] = useState(false);

  const selectedRows = useMemo(() => bookingItems.filter((item) => (quantities[item.id] ?? 0) > 0), [quantities]);
  const itemPrice = (item: BookingItem) => typeof item.price === "number" ? item.price : item.price[fulfillment];
  const subtotal = selectedRows.reduce((sum, item) => sum + itemPrice(item) * (quantities[item.id] ?? 0), 0);
  const serviceFee = fulfillment === "pickup" && subtotal < 50 ? 8.99 : 0;
  const tax = (subtotal + serviceFee) * 0.13;
  const total = subtotal + serviceFee + tax;
  const chosenStore = stores.find((store) => store.id === schedule.store) ?? stores[0]!;
  const displayAddress = fulfillment === "pickup"
    ? `${schedule.street}${schedule.unit ? `, Unit ${schedule.unit}` : ""}, ${schedule.city}, ON ${postalCode}`
    : chosenStore.address;

  function setQuantity(item: BookingItem, direction: 1 | -1) {
    setQuantities((current) => {
      const existing = current[item.id] ?? 0;
      const increment = item.unit === "lb" ? 5 : 1;
      const minimum = item.unit === "lb" ? (fulfillment === "pickup" ? 15 : 10) : 1;
      const next = direction === 1 ? (existing === 0 ? minimum : existing + increment) : Math.max(0, existing - increment);
      return { ...current, [item.id]: next < minimum ? 0 : next };
    });
  }

  function checkArea(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const normalized = normalizePostalCode(postalCode);
    if (!/^[A-Z]\d[A-Z] \d[A-Z]\d$/.test(normalized)) {
      setPostalError("Enter a valid Canadian postal code.");
      return;
    }
    setPostalCode(normalized);
    setPostalError("");
    if (fulfillment === "pickup" && !normalized.startsWith("M")) {
      setShowNotice(true);
      return;
    }
    setStep(1);
  }

  function submitSchedule(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStep(3);
  }

  function sendCode() {
    if (phone.replace(/\D/g, "").length < 10) {
      setVerifyError("Enter a valid phone number.");
      return;
    }
    setVerifyError("");
    setCodeSent(true);
  }

  function verifyCode() {
    if (verificationCode !== "000000") {
      setVerifyError("That code is incorrect. For this demo, use 000000.");
      return;
    }
    setVerifyError("");
    setStep(5);
  }

  function completePayment(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsPaying(true);
    window.setTimeout(() => {
      setIsPaying(false);
      setStep(6);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 650);
  }

  function next(stepNumber: number) {
    setStep(stepNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <>
      <section className="border-b border-vite-line bg-vite-paper px-5 py-8 sm:px-8 lg:px-[72px]">
        <div className="mx-auto max-w-[1180px]">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-xs font-medium text-vite-cobalt">ONLINE BOOKING DEMO</p>
              <h1 className="mt-3 font-display text-4xl leading-tight text-vite-navy sm:text-5xl">Book garment care around your week.</h1>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-vite-muted">See estimated prices and times before confirming your phone number and demo payment.</p>
            </div>
            <div className="inline-flex w-fit items-center gap-2 rounded-full bg-vite-blue-soft px-4 py-2 text-xs font-medium text-vite-navy"><Info aria-hidden="true" className="size-4" />Demo only · No card will be charged</div>
          </div>
          {step < 6 ? (
            <ol className="mt-8 grid grid-cols-3 gap-2 sm:grid-cols-6" aria-label="Booking progress">
              {stepLabels.map((label, index) => (
                <li key={label} className={`border-t-2 pt-2 text-[11px] font-medium sm:text-xs ${index <= step ? "border-vite-cobalt text-vite-cobalt" : "border-vite-line text-vite-muted"}`} aria-current={index === step ? "step" : undefined}>{index + 1}. {label}</li>
              ))}
            </ol>
          ) : null}
        </div>
      </section>

      <section className="px-5 py-10 sm:px-8 lg:px-[72px] lg:py-14">
        <div className="mx-auto max-w-[1180px]">
          {step === 0 ? (
            <div className="mx-auto max-w-2xl rounded-[28px] border border-vite-line bg-vite-paper p-6 sm:p-9">
              <MapPin aria-hidden="true" className="size-7 text-vite-cobalt" strokeWidth={1.7} />
              <h2 className="mt-5 font-display text-3xl text-vite-navy">How would you like to use Vite?</h2>
              <p className="mt-3 text-sm leading-6 text-vite-muted">Choose a service method and enter your postal code to see demo availability.</p>
              <div className="mt-7 grid gap-3 sm:grid-cols-2">
                {(["pickup", "dropoff"] as const).map((method) => {
                  const Icon = method === "pickup" ? Truck : Store;
                  return <button key={method} type="button" onClick={() => setFulfillment(method)} className={`rounded-[20px] border p-5 text-left transition ${fulfillment === method ? "border-vite-cobalt bg-vite-blue-soft" : "border-vite-line bg-vite-paper hover:border-vite-blue-mid"}`}><Icon aria-hidden="true" className="size-6 text-vite-cobalt" /><span className="mt-4 block font-display text-xl text-vite-navy">{method === "pickup" ? "Pickup & Delivery" : "Drop Off & Pickup"}</span><span className="mt-2 block text-xs leading-5 text-vite-muted">{method === "pickup" ? "We collect from your Toronto address." : "Visit a Vite Store or BlueBox location."}</span></button>;
                })}
              </div>
              <form onSubmit={checkArea} className="mt-7">
                <label><FieldLabel>Postal code</FieldLabel><Input value={postalCode} onChange={(event) => setPostalCode(normalizePostalCode(event.target.value))} placeholder="M5V 2T6" autoComplete="postal-code" /></label>
                {postalError ? <p className="mt-2 text-xs text-destructive" role="alert">{postalError}</p> : null}
                <div className="mt-6"><PrimaryButton type="submit">See services & prices <ArrowRight aria-hidden="true" className="size-4" /></PrimaryButton></div>
              </form>
            </div>
          ) : null}

          {step === 1 ? (
            <div className="grid gap-7 lg:grid-cols-[minmax(0,1fr)_340px]">
              <div>
                <h2 className="font-display text-3xl text-vite-navy sm:text-4xl">Choose your services.</h2>
                <p className="mt-3 text-sm leading-6 text-vite-muted">Add garments or estimated laundry weight. Final pricing may change after inspection.</p>
                <div className="mt-7 flex gap-2 overflow-x-auto pb-2">
                  {categories.map((category) => <button key={category.id} type="button" onClick={() => setActiveCategory(category.id)} className={`shrink-0 rounded-full border px-4 py-2.5 text-xs font-medium transition ${activeCategory === category.id ? "border-vite-cobalt bg-vite-cobalt text-vite-paper" : "border-vite-line bg-vite-paper text-vite-navy hover:border-vite-blue-mid"}`}>{category.label}</button>)}
                </div>
                <div className="mt-4 overflow-hidden rounded-[24px] border border-vite-line bg-vite-paper">
                  <div className="border-b border-vite-line bg-vite-blue-soft px-5 py-4 sm:px-6">
                    <h3 className="font-display text-xl text-vite-navy">{categories.find((category) => category.id === activeCategory)?.label}</h3>
                    <p className="mt-1 text-xs leading-5 text-vite-muted">{categories.find((category) => category.id === activeCategory)?.note}</p>
                  </div>
                  <div className="divide-y divide-vite-line">
                    {bookingItems.filter((item) => item.category === activeCategory).map((item) => {
                      const quantity = quantities[item.id] ?? 0;
                      return <div key={item.id} className="flex flex-col gap-4 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6"><div><p className="font-medium text-vite-ink">{item.name}</p><p className="mt-1 text-xs text-vite-muted">{item.from ? "From " : ""}{money(itemPrice(item))} / {item.unit}</p></div><div className="flex items-center gap-3"><button type="button" aria-label={`Remove ${item.name}`} onClick={() => setQuantity(item, -1)} disabled={quantity === 0} className="flex size-10 items-center justify-center rounded-full border border-vite-line text-vite-navy hover:bg-vite-blue-soft disabled:opacity-35"><Minus aria-hidden="true" className="size-4" /></button><span className="min-w-14 text-center text-sm font-medium text-vite-navy">{quantity}{item.unit === "lb" ? " lb" : ""}</span><button type="button" aria-label={`Add ${item.name}`} onClick={() => setQuantity(item, 1)} className="flex size-10 items-center justify-center rounded-full bg-vite-cobalt text-vite-paper hover:bg-vite-navy"><Plus aria-hidden="true" className="size-4" /></button></div></div>;
                    })}
                  </div>
                </div>
              </div>
              <OrderSummary fulfillment={fulfillment} selectedRows={selectedRows} quantities={quantities} itemPrice={itemPrice} subtotal={subtotal} serviceFee={serviceFee} tax={tax} total={total} />
              <div className="flex flex-wrap gap-3 lg:col-span-2"><BackButton onClick={() => next(0)} /><PrimaryButton disabled={selectedRows.length === 0} onClick={() => next(2)}>Choose a time <ArrowRight aria-hidden="true" className="size-4" /></PrimaryButton></div>
            </div>
          ) : null}

          {step === 2 ? (
            <div className="grid gap-7 lg:grid-cols-[minmax(0,1fr)_340px]">
              <form onSubmit={submitSchedule} className="rounded-[28px] border border-vite-line bg-vite-paper p-6 sm:p-8">
                <CalendarDays aria-hidden="true" className="size-7 text-vite-cobalt" strokeWidth={1.7} />
                <h2 className="mt-5 font-display text-3xl text-vite-navy">{fulfillment === "pickup" ? "Where and when should we pick up?" : "Choose your drop-off appointment."}</h2>
                {fulfillment === "pickup" ? (
                  <div className="mt-7 grid gap-5 sm:grid-cols-2">
                    <label className="sm:col-span-2"><FieldLabel>Street address</FieldLabel><Input required value={schedule.street} onChange={(event) => setSchedule({ ...schedule, street: event.target.value })} placeholder="123 King Street West" autoComplete="street-address" /></label>
                    <label><FieldLabel>Unit / Suite</FieldLabel><Input value={schedule.unit} onChange={(event) => setSchedule({ ...schedule, unit: event.target.value })} placeholder="Optional" /></label>
                    <label><FieldLabel>City</FieldLabel><Input required value={schedule.city} onChange={(event) => setSchedule({ ...schedule, city: event.target.value })} /></label>
                    <label><FieldLabel>Postal code</FieldLabel><Input required value={postalCode} onChange={(event) => setPostalCode(normalizePostalCode(event.target.value))} /></label>
                    <label><FieldLabel>Pickup date</FieldLabel><Select value={schedule.date} onChange={(event) => setSchedule({ ...schedule, date: event.target.value })}>{dates.map((date) => <option key={date}>{date}</option>)}</Select></label>
                    <label><FieldLabel>Pickup time</FieldLabel><Select value={schedule.handoffTime} onChange={(event) => setSchedule({ ...schedule, handoffTime: event.target.value })}>{pickupWindows.map((time) => <option key={time}>{time}</option>)}</Select></label>
                    <label><FieldLabel>Estimated return</FieldLabel><Select value={schedule.readyTime} onChange={(event) => setSchedule({ ...schedule, readyTime: event.target.value })}>{readyWindows.map((time) => <option key={time}>{time}</option>)}</Select></label>
                    <label className="sm:col-span-2"><FieldLabel>Pickup instructions</FieldLabel><Input value={schedule.instructions} onChange={(event) => setSchedule({ ...schedule, instructions: event.target.value })} placeholder="Concierge, buzzer or access notes (optional)" /></label>
                  </div>
                ) : (
                  <div className="mt-7 grid gap-5 sm:grid-cols-2">
                    <label className="sm:col-span-2"><FieldLabel>Vite location</FieldLabel><Select value={schedule.store} onChange={(event) => setSchedule({ ...schedule, store: event.target.value })}>{stores.map((store) => <option key={store.id} value={store.id}>{store.name} · {store.address}</option>)}</Select></label>
                    <label><FieldLabel>Drop-off date</FieldLabel><Select value={schedule.date} onChange={(event) => setSchedule({ ...schedule, date: event.target.value })}>{dates.map((date) => <option key={date}>{date}</option>)}</Select></label>
                    <label><FieldLabel>Drop-off time</FieldLabel><Select value={schedule.handoffTime} onChange={(event) => setSchedule({ ...schedule, handoffTime: event.target.value })}>{dropoffWindows.map((time) => <option key={time}>{time}</option>)}</Select></label>
                    <label className="sm:col-span-2"><FieldLabel>Pickup time</FieldLabel><Select value={schedule.readyTime} onChange={(event) => setSchedule({ ...schedule, readyTime: event.target.value })}>{readyWindows.map((time) => <option key={time}>{time}</option>)}</Select></label>
                  </div>
                )}
                <div className="mt-8 flex flex-wrap gap-3"><BackButton onClick={() => next(1)} /><PrimaryButton type="submit">Review order <ArrowRight aria-hidden="true" className="size-4" /></PrimaryButton></div>
              </form>
              <OrderSummary fulfillment={fulfillment} selectedRows={selectedRows} quantities={quantities} itemPrice={itemPrice} subtotal={subtotal} serviceFee={serviceFee} tax={tax} total={total} />
            </div>
          ) : null}

          {step === 3 ? (
            <div className="grid gap-7 lg:grid-cols-[minmax(0,1fr)_340px]">
              <div className="rounded-[28px] border border-vite-line bg-vite-paper p-6 sm:p-8">
                <PackageCheck aria-hidden="true" className="size-7 text-vite-cobalt" strokeWidth={1.7} />
                <h2 className="mt-5 font-display text-3xl text-vite-navy">Review your booking.</h2>
                <p className="mt-3 text-sm leading-6 text-vite-muted">Check the handoff details before confirming your phone number.</p>
                <div className="mt-7 grid gap-4 sm:grid-cols-2">
                  <DetailCard icon={fulfillment === "pickup" ? Truck : Store} label="Service method" value={fulfillment === "pickup" ? "Pickup & Delivery" : "Drop Off & Pickup"} />
                  <DetailCard icon={MapPin} label="Address" value={displayAddress} />
                  <DetailCard icon={CalendarDays} label={fulfillment === "pickup" ? "Pickup time" : "Drop-off time"} value={`${schedule.date} · ${schedule.handoffTime}`} />
                  <DetailCard icon={PackageCheck} label={fulfillment === "pickup" ? "Estimated return" : "Pickup time"} value={schedule.readyTime} />
                </div>
                <div className="mt-8 flex flex-wrap gap-3"><BackButton onClick={() => next(2)} /><PrimaryButton onClick={() => next(4)}>Verify phone <Smartphone aria-hidden="true" className="size-4" /></PrimaryButton></div>
              </div>
              <OrderSummary fulfillment={fulfillment} selectedRows={selectedRows} quantities={quantities} itemPrice={itemPrice} subtotal={subtotal} serviceFee={serviceFee} tax={tax} total={total} />
            </div>
          ) : null}

          {step === 4 ? (
            <div className="mx-auto max-w-xl rounded-[28px] border border-vite-line bg-vite-paper p-6 sm:p-9">
              <Smartphone aria-hidden="true" className="size-7 text-vite-cobalt" strokeWidth={1.7} />
              <h2 className="mt-5 font-display text-3xl text-vite-navy">Confirm your phone number.</h2>
              <p className="mt-3 text-sm leading-6 text-vite-muted">We use your phone number to identify this booking. For this demo, no message is sent.</p>
              <div className="mt-7">
                <label><FieldLabel>Mobile phone</FieldLabel><Input type="tel" value={phone} onChange={(event) => setPhone(event.target.value)} placeholder="(416) 555-0123" autoComplete="tel" /></label>
                {!codeSent ? <div className="mt-5"><PrimaryButton onClick={sendCode}>Send demo code <ChevronRight aria-hidden="true" className="size-4" /></PrimaryButton></div> : (
                  <div className="mt-6 rounded-[20px] bg-vite-blue-soft p-5">
                    <div className="flex items-start gap-3"><LockKeyhole aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-vite-cobalt" /><div><p className="text-sm font-medium text-vite-navy">Enter the 6-digit code</p><p className="mt-1 text-xs text-vite-muted">Demo code: <strong className="text-vite-navy">000000</strong></p></div></div>
                    <label className="mt-4 block"><FieldLabel>Verification code</FieldLabel><Input inputMode="numeric" maxLength={6} value={verificationCode} onChange={(event) => setVerificationCode(event.target.value.replace(/\D/g, ""))} placeholder="000000" className="text-center text-lg tracking-[0.35em]" /></label>
                    <button type="button" onClick={() => setVerifyError("")} className="mt-3 text-xs font-medium text-vite-cobalt hover:text-vite-navy">Resend code</button>
                  </div>
                )}
                {verifyError ? <p className="mt-3 text-xs text-destructive" role="alert">{verifyError}</p> : null}
              </div>
              <div className="mt-8 flex flex-wrap gap-3"><BackButton onClick={() => next(3)} />{codeSent ? <PrimaryButton onClick={verifyCode}>Continue to payment <ArrowRight aria-hidden="true" className="size-4" /></PrimaryButton> : null}</div>
            </div>
          ) : null}

          {step === 5 ? (
            <div className="grid gap-7 lg:grid-cols-[minmax(0,1fr)_340px]">
              <form onSubmit={completePayment} className="rounded-[28px] border border-vite-line bg-vite-paper p-6 sm:p-8">
                <CreditCard aria-hidden="true" className="size-7 text-vite-cobalt" strokeWidth={1.7} />
                <h2 className="mt-5 font-display text-3xl text-vite-navy">Demo payment.</h2>
                <div className="mt-4 flex items-start gap-3 rounded-[16px] bg-vite-blue-soft p-4 text-xs leading-5 text-vite-navy"><LockKeyhole aria-hidden="true" className="mt-0.5 size-4 shrink-0" /><p>This is a simulated payment. Your card will not be stored or charged.</p></div>
                <div className="mt-7 grid gap-5 sm:grid-cols-2">
                  <label className="sm:col-span-2"><FieldLabel>Cardholder name</FieldLabel><Input required value={payment.name} onChange={(event) => setPayment({ ...payment, name: event.target.value })} /></label>
                  <label className="sm:col-span-2"><FieldLabel>Card number</FieldLabel><Input required inputMode="numeric" value={payment.card} onChange={(event) => setPayment({ ...payment, card: event.target.value })} /></label>
                  <label><FieldLabel>Expiry</FieldLabel><Input required value={payment.expiry} onChange={(event) => setPayment({ ...payment, expiry: event.target.value })} /></label>
                  <label><FieldLabel>CVC</FieldLabel><Input required inputMode="numeric" value={payment.cvc} onChange={(event) => setPayment({ ...payment, cvc: event.target.value })} /></label>
                  <label className="sm:col-span-2 flex items-start gap-3 rounded-[16px] border border-vite-line p-4"><input type="checkbox" defaultChecked className="mt-0.5 size-4 accent-vite-cobalt" /><span className="text-sm text-vite-ink">Billing address is the same as the booking address.</span></label>
                </div>
                <div className="mt-8 flex flex-wrap gap-3"><BackButton onClick={() => next(4)} /><PrimaryButton type="submit" disabled={isPaying}>{isPaying ? "Confirming…" : `Pay ${money(total)} & confirm`} {!isPaying ? <ArrowRight aria-hidden="true" className="size-4" /> : null}</PrimaryButton></div>
              </form>
              <OrderSummary fulfillment={fulfillment} selectedRows={selectedRows} quantities={quantities} itemPrice={itemPrice} subtotal={subtotal} serviceFee={serviceFee} tax={tax} total={total} />
            </div>
          ) : null}

          {step === 6 ? (
            <div className="mx-auto max-w-3xl overflow-hidden rounded-[30px] border border-vite-line bg-vite-paper">
              <div className="bg-vite-navy px-6 py-9 text-vite-paper sm:px-10">
                <span className="flex size-14 items-center justify-center rounded-full bg-vite-paper text-vite-cobalt"><Check aria-hidden="true" className="size-7" strokeWidth={2} /></span>
                <p className="mt-6 text-xs font-medium text-vite-blue-soft">BOOKING CONFIRMED</p>
                <h2 className="mt-3 font-display text-4xl sm:text-5xl">Your care is scheduled.</h2>
                <p className="mt-4 text-sm text-vite-blue-soft">Order VITE-260902-1847 · Demo payment</p>
              </div>
              <div className="p-6 sm:p-10">
                <div className="grid gap-4 sm:grid-cols-2">
                  <DetailCard icon={Shirt} label="Services" value={selectedRows.map((item) => `${item.name} × ${quantities[item.id] ?? 0}${item.unit === "lb" ? " lb" : ""}`).join(" · ")} />
                  <DetailCard icon={CircleDollarSign} label="Estimated total" value={money(total)} />
                  <DetailCard icon={MapPin} label="Address" value={displayAddress} />
                  <DetailCard icon={CalendarDays} label={fulfillment === "pickup" ? "Pickup time" : "Drop-off time"} value={`${schedule.date} · ${schedule.handoffTime}`} />
                  <DetailCard icon={PackageCheck} label={fulfillment === "pickup" ? "Estimated return" : "Pickup time"} value={schedule.readyTime} />
                  <DetailCard icon={Smartphone} label="Phone" value={phone ? `••• ••• ${phone.replace(/\D/g, "").slice(-4)}` : "Verified"} />
                </div>
                <div className="mt-8 flex flex-wrap gap-3"><Link href="/" className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-vite-cobalt px-6 text-sm font-medium text-vite-paper hover:bg-vite-navy"><Home aria-hidden="true" className="size-4" />Back to home</Link><button type="button" className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-vite-cobalt px-6 text-sm font-medium text-vite-cobalt hover:bg-vite-blue-soft">View booking <ArrowRight aria-hidden="true" className="size-4" /></button></div>
              </div>
            </div>
          ) : null}
        </div>
      </section>

      {showNotice ? (
        <div className="fixed inset-0 z-[80] flex items-center justify-center bg-vite-navy/55 px-5 py-8 backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby="booking-area-notice">
          <div className="relative w-full max-w-lg rounded-[28px] bg-vite-paper p-7 shadow-2xl sm:p-9">
            <button type="button" onClick={() => setShowNotice(false)} aria-label="Close notice" className="absolute right-5 top-5 flex size-10 items-center justify-center rounded-full border border-vite-line text-vite-navy hover:bg-vite-blue-soft"><X aria-hidden="true" className="size-5" /></button>
            <p className="text-xs font-medium text-vite-cobalt">SERVICE AREA NOTICE</p>
            <h2 id="booking-area-notice" className="mt-4 pr-10 font-display text-3xl leading-tight text-vite-navy">Pickup is not available in this area yet.</h2>
            <p className="mt-4 text-sm leading-6 text-vite-muted">Switch to Drop Off & Pickup to continue at a Vite location, or try another postal code.</p>
            <div className="mt-7 flex flex-wrap gap-3"><PrimaryButton onClick={() => { setFulfillment("dropoff"); setShowNotice(false); setStep(1); }}>Choose drop off</PrimaryButton><button type="button" onClick={() => setShowNotice(false)} className="h-12 rounded-full border border-vite-cobalt px-5 text-sm font-medium text-vite-cobalt hover:bg-vite-blue-soft">Try another code</button></div>
          </div>
        </div>
      ) : null}

      <SiteFooter />
    </>
  );
}

function DetailCard({ icon: Icon, label, value }: { icon: React.ComponentType<{ className?: string; "aria-hidden"?: boolean; strokeWidth?: number }>; label: string; value: string }) {
  return <div className="rounded-[18px] border border-vite-line bg-vite-surface p-5"><Icon aria-hidden="true" className="size-5 text-vite-cobalt" strokeWidth={1.7} /><p className="mt-4 text-xs font-medium uppercase tracking-[0.08em] text-vite-muted">{label}</p><p className="mt-2 text-sm font-medium leading-6 text-vite-navy">{value}</p></div>;
}

function OrderSummary({ fulfillment, selectedRows, quantities, itemPrice, subtotal, serviceFee, tax, total }: { fulfillment: Fulfillment; selectedRows: BookingItem[]; quantities: Record<string, number>; itemPrice: (item: BookingItem) => number; subtotal: number; serviceFee: number; tax: number; total: number }) {
  return (
    <aside className="h-fit rounded-[24px] border border-vite-line bg-vite-paper p-6 lg:sticky lg:top-28">
      <div className="flex items-center justify-between"><h3 className="font-display text-xl text-vite-navy">Order summary</h3><Sparkles aria-hidden="true" className="size-5 text-vite-cobalt" /></div>
      <p className="mt-2 text-xs text-vite-muted">{fulfillment === "pickup" ? "Pickup & Delivery" : "Drop Off & Pickup"}</p>
      <div className="mt-5 grid gap-3 border-y border-vite-line py-5">
        {selectedRows.length ? selectedRows.map((item) => <div key={item.id} className="flex items-start justify-between gap-4 text-xs"><span className="leading-5 text-vite-muted">{item.name} × {quantities[item.id] ?? 0}{item.unit === "lb" ? " lb" : ""}</span><span className="shrink-0 font-medium text-vite-ink">{money(itemPrice(item) * (quantities[item.id] ?? 0))}</span></div>) : <p className="text-xs leading-5 text-vite-muted">Your selected services will appear here.</p>}
      </div>
      <div className="mt-5 grid gap-3 text-xs">
        <div className="flex justify-between"><span className="text-vite-muted">Subtotal</span><span>{money(subtotal)}</span></div>
        <div className="flex justify-between"><span className="text-vite-muted">Pickup fee</span><span>{serviceFee ? money(serviceFee) : "Free"}</span></div>
        <div className="flex justify-between"><span className="text-vite-muted">HST</span><span>{money(tax)}</span></div>
        <div className="mt-1 flex justify-between border-t border-vite-line pt-4 text-base font-medium text-vite-navy"><span>Estimated total</span><span>{money(total)}</span></div>
      </div>
      <div className="mt-5 flex items-start gap-2 rounded-[14px] bg-vite-blue-soft p-3 text-[11px] leading-5 text-vite-navy"><CheckCircle2 aria-hidden="true" className="mt-0.5 size-4 shrink-0" /><p>Pickup is free on orders of $50 or more. Final pricing is confirmed after garment inspection.</p></div>
    </aside>
  );
}
