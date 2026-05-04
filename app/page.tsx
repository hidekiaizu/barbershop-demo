"use client";

import { FormEvent, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  CalendarDays,
  Check,
  ChevronRight,
  Clock3,
  Mail,
  MapPin,
  Menu,
  Phone,
  Scissors,
  Star,
  Ticket,
  TrainFront,
  UserRound,
  X,
} from "lucide-react";

type LineColor = "red" | "blue" | "yellow" | "green";

const lineStyles: Record<LineColor, { bg: string; text: string; border: string; ring: string; label: string }> = {
  red: { bg: "bg-lineRed", text: "text-lineRed", border: "border-lineRed", ring: "ring-lineRed", label: "Haircuts" },
  blue: { bg: "bg-lineBlue", text: "text-lineBlue", border: "border-lineBlue", ring: "ring-lineBlue", label: "Beard" },
  yellow: { bg: "bg-lineYellow", text: "text-lineYellow", border: "border-lineYellow", ring: "ring-lineYellow", label: "Kids" },
  green: { bg: "bg-lineGreen", text: "text-lineGreen", border: "border-lineGreen", ring: "ring-lineGreen", label: "VIP" },
};

const navItems = [
  { label: "Station", href: "#home" },
  { label: "Our Station", href: "#about" },
  { label: "Lines", href: "#services" },
  { label: "Conductors", href: "#barbers" },
  { label: "Book Your Ride", href: "#booking" },
  { label: "Archive", href: "#gallery" },
  { label: "Visit", href: "#contact" },
];

const routes = [
  {
    line: "red" as const,
    code: "B",
    route: "Red Line",
    name: "Haircuts",
    desc: "Classic cuts, skin fades, tapers, scissor cuts, and style shaping.",
    stops: [
      { code: "B01", name: "Classic Cut", duration: "35 min", price: "$35" },
      { code: "B02", name: "Skin Fade", duration: "45 min", price: "$45" },
      { code: "B03", name: "Taper", duration: "40 min", price: "$40" },
      { code: "B04", name: "Scissor Cut", duration: "45 min", price: "$50" },
    ],
  },
  {
    line: "blue" as const,
    code: "S",
    route: "Blue Line",
    name: "Beard",
    desc: "Lineups, beard trims, hot towel shaves, and razor detailing.",
    stops: [
      { code: "S01", name: "Beard Trim", duration: "20 min", price: "$20" },
      { code: "S02", name: "Beard Lineup", duration: "20 min", price: "$20" },
      { code: "S03", name: "Hot Towel Shave", duration: "30 min", price: "$35" },
    ],
  },
  {
    line: "yellow" as const,
    code: "C",
    route: "Yellow Line",
    name: "Kids Cuts",
    desc: "Fresh cuts for the next generation. Clean, quick, and comfortable.",
    stops: [
      { code: "C01", name: "Kids Cut", duration: "30 min", price: "$25" },
      { code: "C02", name: "Student Cut", duration: "35 min", price: "$30" },
      { code: "C03", name: "First Cut", duration: "30 min", price: "$25" },
    ],
  },
  {
    line: "green" as const,
    code: "G",
    route: "Green Line",
    name: "VIP / Packages",
    desc: "Premium service, full grooming, hot towel, wash, and styling.",
    stops: [
      { code: "G01", name: "Cut + Beard", duration: "60 min", price: "$65" },
      { code: "G02", name: "Full Service", duration: "75 min", price: "$80" },
      { code: "G03", name: "Groom Package", duration: "90 min", price: "$95" },
    ],
  },
];

const services = routes.flatMap((route) => route.stops.map((stop) => ({ ...stop, line: route.line, route: route.route, category: route.name })));

const heroArrivals = [
  { name: "Haircuts", time: "2 min", line: "red" as const, label: "B" },
  { name: "Beard Lineup", time: "4 min", line: "blue" as const, label: "S" },
  { name: "Kids Cuts", time: "7 min", line: "yellow" as const, label: "C" },
  { name: "VIP Experience", time: "10 min", line: "green" as const, label: "G" },
];

const barbers = [
  {
    name: "Chris",
    role: "Lead Conductor",
    specialty: "Skin Fades, Sharp Lines, Beard Grooming",
    line: "red" as const,
    schedule: "Mon-Fri",
    next: "Today 10:30 AM",
    note: "Sharp fades. No rushed work.",
  },
  {
    name: "Mike",
    role: "Senior Conductor",
    specialty: "Tapers, Textured Styles, Beard Lineup",
    line: "blue" as const,
    schedule: "Tue-Sat",
    next: "Today 11:15 AM",
    note: "Classic cuts with clean structure.",
  },
  {
    name: "Eli",
    role: "Fade Operator",
    specialty: "Kids Cuts, Fades, Designs",
    line: "yellow" as const,
    schedule: "Wed-Sun",
    next: "Today 12:00 PM",
    note: "Patient chair work, crisp finish.",
  },
  {
    name: "Dez",
    role: "Beard Specialist",
    specialty: "Beard Shaping, Razor Work, Hot Towel Shave",
    line: "green" as const,
    schedule: "Thu-Sun",
    next: "Today 1:30 PM",
    note: "Beard work built on precision.",
  },
];

const gallery = [
  ["Platform 01", "Skin Fade", "red"],
  ["Track B", "Beard Lineup", "blue"],
  ["Downtown Cut", "Taper", "yellow"],
  ["After Hours", "Chair Detail", "green"],
  ["Express Stop", "Clean Taper", "red"],
  ["Night Shift", "Shop Detail", "blue"],
] as const;

const reviews = [
  ["Best fade in the neighborhood. Clean, fast, and professional.", "Jay", "B02"],
  ["The whole shop has a vibe. Booking was easy and the cut was perfect.", "Marcus", "G01"],
  ["My beard lineup was sharp. I am definitely coming back.", "Andre", "S02"],
];

function RouteDot({ label, color }: { label: string; color: LineColor }) {
  return <span className={`route-dot ${lineStyles[color].bg}`}>{label}</span>;
}

function SectionHeading({ eyebrow, title, copy }: { eyebrow: string; title: string; copy: string }) {
  return (
    <div className="mb-10 max-w-4xl">
      <p className="station-eyebrow">{eyebrow}</p>
      <h2 className="display-text text-6xl uppercase leading-[.82] text-cream md:text-8xl">{title}</h2>
      <p className="mt-4 max-w-2xl text-base font-bold leading-7 text-mutedCream md:text-lg">{copy}</p>
    </div>
  );
}

function CTAButton({ children, href = "#booking", variant = "primary" }: { children: React.ReactNode; href?: string; variant?: "primary" | "secondary" }) {
  return (
    <a href={href} className={`ticket-button ${variant === "primary" ? "ticket-button-primary" : "ticket-button-secondary"}`}>
      {children}
      <ChevronRight className="h-5 w-5" />
    </a>
  );
}

function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-white/15 bg-black/90 backdrop-blur lg:hidden">
      <nav className="flex items-center justify-between px-4 py-3" aria-label="Main navigation">
        <a href="#home" className="display-text text-3xl uppercase leading-none text-cream">
          Barber Station
        </a>
        <button className="border border-white/20 p-2" aria-label="Toggle menu" onClick={() => setOpen((value) => !value)}>
          {open ? <X /> : <Menu />}
        </button>
      </nav>
      {open && (
        <div className="grid border-t border-white/15 bg-coal p-4">
          {navItems.map((item) => (
            <a key={item.label} href={item.href} onClick={() => setOpen(false)} className="border-b border-white/10 py-3 text-sm font-black uppercase tracking-[0.08em] text-mutedCream">
              {item.label}
            </a>
          ))}
          <CTAButton>Book Now</CTAButton>
        </div>
      )}
    </header>
  );
}

function StationSidebar() {
  return (
    <aside className="fixed inset-y-0 left-0 z-30 hidden w-72 border-r border-white/15 bg-[#070707]/95 px-6 py-6 lg:block">
      <div className="absolute inset-0 bg-tile bg-[length:34px_34px] opacity-10" />
      <div className="relative">
        <a href="#home">
          <h1 className="display-text text-5xl uppercase leading-[.78] text-cream">Barber<br />Station</h1>
          <div className="mt-4 flex gap-2">
            <RouteDot label="B" color="red" />
            <RouteDot label="S" color="blue" />
            <RouteDot label="C" color="yellow" />
            <RouteDot label="G" color="green" />
          </div>
          <p className="mt-5 border-y border-white/15 py-3 text-[0.65rem] font-black uppercase tracking-[0.24em] text-mutedCream">Brooklyn / Platform 718</p>
        </a>
        <nav className="mt-5 border-y border-white/10" aria-label="Desktop station navigation">
          {navItems.map((item) => (
            <a key={item.label} href={item.href} className="flex min-h-12 items-center gap-4 border-b border-white/10 text-xs font-black uppercase tracking-[0.08em] text-mutedCream last:border-b-0 hover:bg-white/[.04] hover:text-cream">
              <TrainFront className="h-4 w-4 text-white/45" />
              {item.label}
            </a>
          ))}
        </nav>
        <div className="mt-5 border border-lineYellow/45 bg-[#171307] p-4">
          <p className="display-text text-4xl uppercase leading-none text-ticket">Open Now</p>
          <p className="mt-2 text-xs font-black uppercase tracking-[0.18em] text-mutedCream">Mon-Fri 10AM-8PM</p>
          <p className="mt-4 text-sm font-black uppercase text-lineYellow">Walk-ins welcome when chairs are open</p>
        </div>
      </div>
    </aside>
  );
}

function Hero() {
  return (
    <section id="home" className="relative overflow-hidden border-b border-white/15 bg-black pt-16 lg:pt-0">
      <div className="hero-photo absolute inset-0" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,.96)_0%,rgba(0,0,0,.72)_44%,rgba(0,0,0,.38)_73%,rgba(0,0,0,.86)_100%)]" />
      <div className="absolute inset-0 subway-grit opacity-70" />
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black to-transparent" />
      <div className="relative min-h-[920px] px-4 pb-10 pt-10 sm:px-8 lg:min-h-screen lg:px-14 lg:pt-14">
        <div className="mb-8 grid gap-3 border-y border-white/15 py-3 text-xs font-black uppercase tracking-[0.18em] text-mutedCream sm:grid-cols-3">
          <span>Brooklyn, NY</span>
          <span>Open Mon-Sun</span>
          <span>Walk-ins Welcome</span>
        </div>
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="relative z-10">
          <h1 className="hero-title display-text uppercase text-cream">
            <span>This Isn't Just</span>
            <span>A Barbershop.</span>
            <span className="text-lineRed">It's A Station.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-xl font-black leading-8 text-mutedCream md:text-2xl">
            Sharp fades, beard work, and clean cuts moving on schedule in Brooklyn. Pick your line. Choose your conductor. Swipe in.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <CTAButton>Book Your Ride</CTAButton>
            <CTAButton href="#services" variant="secondary">Explore the Lines</CTAButton>
          </div>
        </motion.div>
        <HeroArrivals />
      </div>
    </section>
  );
}

function HeroArrivals() {
  return (
    <div className="arrival-board relative z-10 mt-10 lg:absolute lg:bottom-12 lg:right-12 lg:w-[30rem]">
      <div className="mb-3 flex items-center justify-between border-b border-lineYellow/35 pb-3 font-mono text-xs font-black uppercase tracking-[0.16em] text-lineYellow">
        <span>Next Arrivals</span>
        <span className="arrival-flicker">10:24 AM</span>
      </div>
      {heroArrivals.map((item) => (
        <div key={item.name} className="grid grid-cols-[2.25rem_1fr_auto] items-center gap-3 border-b border-white/10 py-3 last:border-b-0">
          <RouteDot label={item.label} color={item.line} />
          <span className="font-black uppercase tracking-[0.08em] text-mutedCream">{item.name}</span>
          <span className={`display-text text-4xl uppercase ${lineStyles[item.line].text}`}>{item.time}</span>
        </div>
      ))}
    </div>
  );
}

function ChooseLine() {
  return (
    <section id="services" className="relative overflow-hidden bg-[#060606] px-4 py-24 sm:px-8">
      <div className="absolute inset-0 bg-tile bg-[length:42px_42px] opacity-10" />
      <div className="relative mx-auto max-w-7xl">
        <SectionHeading eyebrow="Choose Your Line" title="Pick Your Stop" copy="The service system is the shop map: red for cuts, blue for beard work, yellow for kids, green for VIP packages." />
        <div className="grid gap-7">
          {routes.map((route) => (
            <article key={route.route} className="transit-line-card">
              <div className="grid gap-5 lg:grid-cols-[15rem_1fr] lg:items-center">
                <div>
                  <div className="flex items-center gap-3">
                    <RouteDot label={route.code} color={route.line} />
                    <p className={`text-xs font-black uppercase tracking-[0.16em] ${lineStyles[route.line].text}`}>{route.route}</p>
                  </div>
                  <h3 className="display-text mt-3 text-5xl uppercase leading-none text-cream">{route.name}</h3>
                  <p className="mt-3 text-sm font-bold leading-6 text-mutedCream">{route.desc}</p>
                </div>
                <div className="relative overflow-x-auto pb-2">
                  <div className={`absolute left-8 right-8 top-[3.15rem] h-2 ${lineStyles[route.line].bg}`} />
                  <div className="relative grid min-w-[44rem] grid-cols-4 gap-4">
                    {route.stops.map((stop) => (
                      <a key={stop.code} href="#booking" className="station-stop group">
                        <span className={`mb-3 block h-10 w-10 rounded-full border-[7px] border-black ${lineStyles[route.line].bg} ring-2 ${lineStyles[route.line].ring}`} />
                        <span className="font-mono text-xs font-black uppercase text-white/50">{stop.code}</span>
                        <span className="mt-2 block text-lg font-black uppercase leading-5 text-cream">{stop.name}</span>
                        <span className="mt-4 flex justify-between border-t border-white/10 pt-3 text-xs font-black uppercase tracking-[0.08em] text-mutedCream">
                          <span>{stop.duration}</span>
                          <span>{stop.price}</span>
                        </span>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ServicesMenu() {
  return (
    <section id="services-menu" className="subway-grit bg-coal px-4 py-20 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading eyebrow="Full Menu" title="Pricing Board" copy="Clear service names, duration, and price before you start booking." />
        <div className="overflow-hidden border border-white/15 bg-black/55">
          <div className="grid grid-cols-[1fr_6rem_5rem] gap-4 border-b border-lineYellow/35 bg-[#171307] px-4 py-3 text-xs font-black uppercase tracking-[0.14em] text-lineYellow md:grid-cols-[7rem_1fr_8rem_6rem_10rem]">
            <span className="hidden md:block">Line</span>
            <span>Service</span>
            <span>Time</span>
            <span>Price</span>
            <span className="hidden md:block">Board</span>
          </div>
          {services.map((service) => (
            <div key={service.code} className="grid grid-cols-[1fr_6rem_5rem] gap-4 border-b border-white/10 px-4 py-4 last:border-b-0 md:grid-cols-[7rem_1fr_8rem_6rem_10rem]">
              <span className={`hidden text-xs font-black uppercase tracking-[0.1em] md:block ${lineStyles[service.line].text}`}>{service.route}</span>
              <span>
                <span className="font-mono text-xs font-black text-white/45">{service.code}</span>
                <span className="ml-3 text-base font-black uppercase text-cream">{service.name}</span>
              </span>
              <span className="text-sm font-bold text-mutedCream">{service.duration}</span>
              <span className="display-text text-3xl leading-none text-cream">{service.price}</span>
              <a href="#booking" className="hidden text-xs font-black uppercase tracking-[0.08em] text-ticket hover:text-lineYellow md:block">Book Chair</a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function BookingForm() {
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [form, setForm] = useState({ service: "", barber: "", date: "", time: "", name: "", phone: "", email: "", notes: "" });
  const required = useMemo(() => ["service", "barber", "date", "time", "name", "phone", "email"], []);
  const chosenService = services.find((service) => service.name === form.service);

  function update(field: string, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: "" }));
  }

  function submit(event: FormEvent) {
    event.preventDefault();
    const nextErrors: Record<string, string> = {};
    required.forEach((field) => {
      if (!form[field as keyof typeof form]) nextErrors[field] = "Required";
    });
    if (form.email && !/^\S+@\S+\.\S+$/.test(form.email)) nextErrors.email = "Use a valid email";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length === 0) setSubmitted(true);
  }

  return (
    <section id="booking" className="relative overflow-hidden px-4 py-24 sm:px-8">
      <div className="absolute inset-0 subway-grit opacity-60" />
      <div className="relative mx-auto max-w-7xl">
        <SectionHeading eyebrow="Book Your Ride" title="Swipe In" copy="A simple kiosk flow: select your line, choose your conductor, pick arrival time, and book the chair." />
        <div className="grid gap-6 lg:grid-cols-[1.08fr_.92fr]">
          <form onSubmit={submit} className="ticket-kiosk" noValidate>
            {submitted ? (
              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="grid min-h-[520px] place-items-center text-center">
                <div>
                  <span className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-lineGreen text-white"><Check className="h-9 w-9" /></span>
                  <h3 className="display-text text-6xl uppercase text-black">Ride Booked</h3>
                  <p className="mt-3 max-w-md text-lg font-bold text-black/70">Your appointment details are held in the booking module and ready for a future booking API.</p>
                </div>
              </motion.div>
            ) : (
              <div>
                <div className="mb-6 grid grid-cols-4 gap-2">
                  {["Select Line", "Choose Conductor", "Pick Time", "Swipe In"].map((step, index) => (
                    <div key={step} className="border border-black/25 bg-black/10 p-3">
                      <span className="display-text text-3xl leading-none">{index + 1}</span>
                      <p className="mt-1 text-[0.65rem] font-black uppercase tracking-[0.08em]">{step}</p>
                    </div>
                  ))}
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <Field label="Select Line" error={errors.service}>
                    <select value={form.service} onChange={(event) => update("service", event.target.value)} className="field">
                      <option value="">Choose a service</option>
                      {services.map((service) => <option key={service.code}>{service.name}</option>)}
                    </select>
                  </Field>
                  <Field label="Choose Conductor" error={errors.barber}>
                    <select value={form.barber} onChange={(event) => update("barber", event.target.value)} className="field">
                      <option value="">Choose a barber</option>
                      {barbers.map((barber) => <option key={barber.name}>{barber.name}</option>)}
                    </select>
                  </Field>
                  <Field label="Select Date" error={errors.date}><input className="field" type="date" value={form.date} onChange={(event) => update("date", event.target.value)} /></Field>
                  <Field label="Select Time" error={errors.time}><input className="field" type="time" value={form.time} onChange={(event) => update("time", event.target.value)} /></Field>
                  <Field label="Customer Name" error={errors.name}><input className="field" value={form.name} onChange={(event) => update("name", event.target.value)} /></Field>
                  <Field label="Phone Number" error={errors.phone}><input className="field" type="tel" value={form.phone} onChange={(event) => update("phone", event.target.value)} /></Field>
                  <Field label="Email" error={errors.email}><input className="field" type="email" value={form.email} onChange={(event) => update("email", event.target.value)} /></Field>
                  <Field label="Notes / Preferences"><textarea className="field min-h-28" value={form.notes} onChange={(event) => update("notes", event.target.value)} /></Field>
                  <button className="ticket-button ticket-button-dark md:col-span-2">Swipe In</button>
                </div>
              </div>
            )}
          </form>
          <aside className="ticket-stub">
            <div className="flex items-center justify-between border-b border-black/25 pb-4">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.2em] text-black/60">Ticket Preview</p>
                <h3 className="display-text text-5xl uppercase leading-none text-black">Barber Station</h3>
              </div>
              <Ticket className="h-12 w-12 text-black/45" />
            </div>
            <div className="mt-6 grid gap-4 font-mono text-sm uppercase">
              <TicketRow label="Service" value={form.service || "Select line"} />
              <TicketRow label="Conductor" value={form.barber || "Choose conductor"} />
              <TicketRow label="Time" value={form.time || "Pick arrival"} />
              <TicketRow label="Price" value={chosenService?.price || "--"} />
              <TicketRow label="Status" value={submitted ? "Confirmed" : "Pending swipe"} />
            </div>
            <div className="barcode mt-8 h-24 opacity-80" />
            <p className="mt-5 text-xs font-black uppercase tracking-[0.12em] text-black/60">Late policy: call if you are more than 10 minutes behind schedule.</p>
          </aside>
        </div>
      </div>
    </section>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <label className="grid gap-2 text-sm font-black uppercase text-black">
      <span className="flex justify-between gap-3"><span>{label}</span>{error && <span className="text-lineRed">{error}</span>}</span>
      {children}
    </label>
  );
}

function TicketRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4 border-b border-black/15 pb-3">
      <span className="text-black/55">{label}</span>
      <span className="text-right font-black text-black">{value}</span>
    </div>
  );
}

function About() {
  return (
    <section id="about" className="bg-steel px-4 py-24 sm:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_.9fr] lg:items-center">
        <div className="station-photo-panel">
          <div className="absolute inset-0 bg-[url('/images/barber-station-hero.png')] bg-cover bg-center opacity-70 grayscale" />
          <div className="absolute inset-0 bg-black/45" />
          <div className="relative mt-auto p-6">
            <p className="station-eyebrow">Notice 718</p>
            <h3 className="display-text text-7xl uppercase leading-none text-cream">Built in NYC</h3>
          </div>
        </div>
        <div>
          <SectionHeading eyebrow="Our Station" title="Cut for You" copy="Barber Station is a neighborhood shop for sharp haircuts, detailed beard work, and consistent service." />
          <div className="grid gap-3 sm:grid-cols-2">
            {["Clean fades and tapers", "Skilled barbers", "Appointments and walk-ins", "Sanitized tools", "Family-friendly cuts"].map((item, index) => (
              <div key={item} className="station-notice">
                <span className="font-mono text-xs text-lineYellow">0{index + 1}</span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Barbers() {
  return (
    <section id="barbers" className="relative overflow-hidden px-4 py-24 sm:px-8">
      <div className="relative mx-auto max-w-7xl">
        <SectionHeading eyebrow="Our Conductors" title="Chair Operators" copy="Experienced barbers with clear specialties, schedules, next availability, and booking options." />
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {barbers.map((barber) => (
            <article key={barber.name} className="conductor-card">
              <div className="relative h-64 overflow-hidden bg-gradient-to-br from-zinc-700 via-zinc-950 to-black">
                <div className="absolute inset-0 scratch-lines opacity-50" />
                <div className={`absolute left-5 top-5 h-24 w-24 ${lineStyles[barber.line].bg} opacity-25 blur-2xl`} />
                <p className={`spray-tag absolute left-5 top-20 rotate-[-7deg] text-6xl uppercase leading-none ${lineStyles[barber.line].text} opacity-50`}>{barber.name}</p>
                <UserRound className="absolute bottom-5 right-5 h-20 w-20 text-white/15" />
              </div>
              <div className="p-5">
                <span className={`inline-flex px-3 py-1 text-xs font-black uppercase text-white ${lineStyles[barber.line].bg}`}>{barber.role}</span>
                <h3 className="display-text mt-4 text-5xl uppercase leading-none text-cream">{barber.name}</h3>
                <p className="mt-3 text-sm font-bold text-mutedCream">{barber.note}</p>
                <p className="mt-3 text-sm text-mutedCream">{barber.specialty}</p>
                <div className="mt-5 grid gap-2 border-y border-white/10 py-4 text-sm font-bold text-mutedCream">
                  <span>Schedule: {barber.schedule}</span>
                  <span>Next available: <span className={lineStyles[barber.line].text}>{barber.next}</span></span>
                </div>
                <a href="#booking" className="ticket-button ticket-button-secondary mt-5 w-full">Book This Conductor</a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Gallery() {
  return (
    <section id="gallery" className="subway-grit bg-coal px-4 py-24 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading eyebrow="Station Archive" title="Cuts From The Platform" copy="A contact-sheet archive of cuts, beard work, shop details, and after-hours texture." />
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-3">
          {gallery.map(([label, title, line], index) => (
            <a key={`${label}-${title}`} href="#booking" className={`archive-tile group ${index === 0 || index === 5 ? "lg:row-span-2" : ""}`}>
              <div className={`absolute inset-0 bg-gradient-to-br ${line === "red" ? "from-lineRed/55" : line === "blue" ? "from-lineBlue/55" : line === "yellow" ? "from-lineYellow/55" : "from-lineGreen/55"} via-zinc-900 to-black transition duration-500 group-hover:scale-105`} />
              <div className="absolute inset-0 bg-tile bg-[length:32px_32px] opacity-20" />
              <div className="absolute inset-0 scratch-lines opacity-35" />
              <div className="absolute left-4 top-4 bg-ticket px-3 py-2 text-xs font-black uppercase text-black opacity-0 transition group-hover:opacity-100">View Cut</div>
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black to-transparent p-5">
                <p className="font-mono text-xs font-black uppercase tracking-[0.12em] text-white/55">{label}</p>
                <p className="mt-1 text-xl font-black uppercase text-cream">{title}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section className="px-4 py-24 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading eyebrow="Word on the Platform" title="Customer Signals" copy="Short notes from customers who trust the shop." />
        <div className="grid gap-5 md:grid-cols-3">
          {reviews.map(([quote, name, code]) => (
            <article key={name} className="review-ticket">
              <div className="mb-4 flex items-center justify-between">
                <span className="font-mono text-sm font-black uppercase text-black/55">{code}</span>
                <div className="flex gap-1">{Array.from({ length: 5 }).map((_, index) => <Star key={index} className="h-4 w-4 fill-lineYellow text-lineYellow" />)}</div>
              </div>
              <p className="text-lg font-black leading-7 text-black">"{quote}"</p>
              <p className="mt-5 font-black uppercase text-black/65">- {name}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Location() {
  return (
    <section id="contact" className="relative overflow-hidden bg-[#060606] px-4 py-24 sm:px-8">
      <div className="absolute inset-0 bg-tile bg-[length:46px_46px] opacity-10" />
      <div className="relative mx-auto max-w-7xl">
        <SectionHeading eyebrow="Visit the Shop" title="End Line: Brooklyn" copy="Find the shop, check hours, call ahead, or get directions." />
        <div className="grid gap-6 lg:grid-cols-[.95fr_1.05fr]">
          <div className="station-info-board">
            <h3 className="display-text text-6xl uppercase leading-none text-cream">Station Info</h3>
            <div className="mt-6 grid gap-4 text-mutedCream">
              <p className="flex gap-3"><MapPin className="h-5 w-5 text-lineRed" />123 Barber Station Blvd, Brooklyn, NY 11201</p>
              <p className="flex gap-3"><Phone className="h-5 w-5 text-lineBlue" />(718) 555-0198</p>
              <p className="flex gap-3"><Mail className="h-5 w-5 text-lineYellow" />hello@barberstation.demo</p>
              <p className="flex gap-3"><CalendarDays className="h-5 w-5 text-lineGreen" />Mon-Fri 10 AM-8 PM, Sat 9 AM-7 PM, Sun 11 AM-5 PM</p>
            </div>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <CTAButton href="#">Get Directions</CTAButton>
              <CTAButton href="tel:17185550198" variant="secondary">Call the Shop</CTAButton>
            </div>
          </div>
          <div className="transit-map-panel">
            <div className="absolute left-1/2 top-0 h-full w-2 -translate-x-1/2 bg-lineRed" />
            <div className="absolute left-0 top-1/2 h-2 w-full -translate-y-1/2 bg-lineBlue" />
            <div className="absolute left-[20%] top-[22%] h-2 w-[70%] rotate-[-18deg] bg-lineYellow" />
            <div className="absolute left-[15%] top-[72%] h-2 w-[72%] rotate-[12deg] bg-lineGreen" />
            <div className="absolute left-1/2 top-1/2 flex h-24 w-24 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-8 border-black bg-ticket text-black">
              <Scissors className="h-9 w-9" />
            </div>
            <span className="absolute left-5 top-5 bg-black px-4 py-2 font-mono text-sm uppercase text-white">Platform 718</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/15 bg-black px-4 py-14 sm:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-2 xl:grid-cols-[1.2fr_1fr_1fr_1.2fr]">
        <div>
          <h2 className="display-text text-5xl uppercase leading-none">Barber<br />Station</h2>
          <div className="mt-4 flex gap-2">
            <span className="h-3 w-10 bg-lineRed" />
            <span className="h-3 w-10 bg-lineBlue" />
            <span className="h-3 w-10 bg-lineYellow" />
            <span className="h-3 w-10 bg-lineGreen" />
          </div>
          <p className="mt-7 text-xl font-black text-mutedCream">Next Stop: A Better You</p>
        </div>
        <div>
          <h3 className="display-text text-4xl uppercase">Visit</h3>
          <p className="mt-5 max-w-56 text-lg font-bold leading-7 text-mutedCream">123 Barber Station Blvd<br />Brooklyn, NY 11201</p>
        </div>
        <div>
          <h3 className="display-text text-4xl uppercase">Hours</h3>
          <p className="mt-5 text-lg font-bold leading-7 text-mutedCream">Mon-Fri: 10AM-8PM<br />Sat: 9AM-7PM<br />Sun: 11AM-5PM</p>
        </div>
        <form className="grid gap-4">
          <label className="display-text text-4xl uppercase" htmlFor="newsletter">Stay On Track</label>
          <input id="newsletter" className="field min-h-16" placeholder="Enter your email" type="email" />
          <button className="ticket-button ticket-button-primary min-h-16">Join</button>
        </form>
      </div>
      <div className="mx-auto mt-12 max-w-7xl border-t border-white/10 pt-7 text-sm font-black uppercase tracking-[0.12em] text-mutedCream">
        <p>&copy; 2026 Barber Station. All rights reserved. Stay sharp. Ride clean.</p>
      </div>
      <a href="#booking" className="mobile-sticky-cta">Book Now</a>
    </footer>
  );
}

export default function Home() {
  return (
    <main className="lg:pl-72">
      <Header />
      <StationSidebar />
      <Hero />
      <ChooseLine />
      <ServicesMenu />
      <BookingForm />
      <About />
      <Barbers />
      <Gallery />
      <Testimonials />
      <Location />
      <Footer />
    </main>
  );
}
