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
  X,
} from "lucide-react";

type LineColor = "red" | "blue" | "yellow" | "green";

const lineStyles: Record<LineColor, { bg: string; text: string; border: string; shadow: string; label: string }> = {
  red: { bg: "bg-lineRed", text: "text-lineRed", border: "border-lineRed", shadow: "shadow-[0_0_26px_rgba(215,51,47,.35)]", label: "Haircuts" },
  blue: { bg: "bg-lineBlue", text: "text-lineBlue", border: "border-lineBlue", shadow: "shadow-[0_0_26px_rgba(40,103,216,.35)]", label: "Beards" },
  yellow: { bg: "bg-lineYellow", text: "text-lineYellow", border: "border-lineYellow", shadow: "shadow-[0_0_26px_rgba(228,183,46,.35)]", label: "Kids" },
  green: { bg: "bg-lineGreen", text: "text-lineGreen", border: "border-lineGreen", shadow: "shadow-[0_0_26px_rgba(77,143,57,.35)]", label: "Packages" },
};

const navItems = ["Home", "About", "Services", "Barbers", "Booking", "Gallery", "Contact"];

const serviceLines = [
  { line: "red" as const, initial: "R", route: "Red Line", name: "Haircuts", desc: "Classic cuts, skin fades, tapers, scissor cuts, and style shaping.", options: ["Classic Cut", "Skin Fade", "Taper", "Scissor Cut"], price: "Starting at $35" },
  { line: "blue" as const, initial: "B", route: "Blue Line", name: "Beard", desc: "Lineups, beard trims, hot towel shaves, and razor detailing.", options: ["Beard Trim", "Beard Lineup", "Hot Towel Shave"], price: "Starting at $20" },
  { line: "yellow" as const, initial: "Y", route: "Yellow Line", name: "Kids Cuts", desc: "Fresh cuts for the next generation. Clean, quick, and comfortable.", options: ["Kids Cut", "Student Cut", "First Cut"], price: "Starting at $25" },
  { line: "green" as const, initial: "G", route: "Green Line", name: "VIP Packages", desc: "Premium service, full grooming, hot towel, wash, and styling.", options: ["Cut + Beard", "Full Service", "Groom Package"], price: "Starting at $65" },
];

const services = [
  { name: "Skin Fade", desc: "Precision fade with clean blend and razor-finished edges.", duration: "45 min", price: "$45", line: "red" as const },
  { name: "Classic Cut", desc: "Timeless cut, styled and finished for the day ahead.", duration: "35 min", price: "$35", line: "red" as const },
  { name: "Beard Lineup", desc: "Sharp edges, shape-up, and balanced beard structure.", duration: "20 min", price: "$20", line: "blue" as const },
  { name: "Hot Towel Shave", desc: "Traditional shave experience with warm towel service.", duration: "30 min", price: "$35", line: "blue" as const },
  { name: "Kids Cut", desc: "Clean cut for younger clients with patient service.", duration: "30 min", price: "$25", line: "yellow" as const },
  { name: "VIP Experience", desc: "Cut, beard, hot towel, wash, and finish in one appointment.", duration: "75 min", price: "$80", line: "green" as const },
];

const barbers = [
  { name: "Chris", role: "Lead Barber", specialty: "Skin Fades, Sharp Lines, Beard Grooming", duty: "Mon-Fri", years: "12 years", line: "red" as const },
  { name: "Mike", role: "Senior Barber", specialty: "Tapers, Textured Styles, Beard Lineup", duty: "Tue-Sat", years: "9 years", line: "blue" as const },
  { name: "Eli", role: "Barber", specialty: "Kids Cuts, Fades, Designs", duty: "Wed-Sun", years: "6 years", line: "yellow" as const },
  { name: "Dez", role: "Beard Specialist", specialty: "Beard Shaping, Razor Work, Hot Towel Shave", duty: "Thu-Sun", years: "8 years", line: "green" as const },
];

const arrivals = [
  ["Skin Fade", "10:30 AM"],
  ["Beard Trim", "11:15 AM"],
  ["Kids Cut", "12:00 PM"],
  ["Cut + Beard", "1:30 PM"],
];

const gallery = ["Crisp Fade", "Barber Chair", "Beard Work", "Shop Detail", "Clean Taper", "After Hours"];
const reviews = [
  ["Best fade in the neighborhood. Clean, fast, and professional.", "Jay"],
  ["The whole shop has a vibe. Booking was easy and the cut was perfect.", "Marcus"],
  ["My beard lineup was sharp. I am definitely coming back.", "Andre"],
];

function RouteDot({ label, color }: { label: string; color: LineColor }) {
  return (
    <span className={`inline-flex h-8 w-8 items-center justify-center rounded-full ${lineStyles[color].bg} text-sm font-black text-white shadow-lg`}>
      {label}
    </span>
  );
}

function SectionHeading({ eyebrow, title, copy }: { eyebrow: string; title: string; copy: string }) {
  return (
    <div className="mx-auto mb-10 max-w-3xl text-center">
      <p className="mb-3 text-xs font-black uppercase tracking-[0.28em] text-lineYellow">{eyebrow}</p>
      <h2 className="display-text text-5xl uppercase leading-none text-cream md:text-7xl">{title}</h2>
      <p className="mt-4 text-base leading-7 text-mutedCream md:text-lg">{copy}</p>
    </div>
  );
}

function CTAButton({ children, href = "#booking", variant = "primary" }: { children: React.ReactNode; href?: string; variant?: "primary" | "secondary" }) {
  return (
    <a
      href={href}
      className={`interactive-button inline-flex min-h-12 items-center justify-center gap-2 rounded-md px-5 py-3 text-sm font-black uppercase ${
        variant === "primary" ? "bg-lineRed text-white shadow-glow" : "border border-white/35 bg-black/20 text-cream hover:bg-white/10"
      }`}
    >
      {children}
      <ChevronRight className="h-4 w-4" />
    </a>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-white/10 bg-black/75 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 lg:px-8" aria-label="Main navigation">
        <a href="#home" className="group">
          <div className="display-text text-2xl uppercase leading-none text-cream">Barber Station</div>
          <div className="mt-1 flex gap-1.5">
            <RouteDot label="B" color="red" />
            <RouteDot label="S" color="blue" />
            <RouteDot label="C" color="green" />
          </div>
        </a>
        <div className="hidden items-center gap-5 lg:flex">
          {navItems.map((item) => (
            <a key={item} href={`#${item.toLowerCase().replaceAll(" ", "-")}`} className="text-xs font-black uppercase text-mutedCream transition hover:text-cream">
              {item}
            </a>
          ))}
        </div>
        <div className="hidden items-center gap-3 lg:flex">
          <CTAButton>Book Now</CTAButton>
        </div>
        <button className="rounded-md border border-white/15 p-2 lg:hidden" aria-label="Toggle menu" onClick={() => setOpen((value) => !value)}>
          {open ? <X /> : <Menu />}
        </button>
      </nav>
      {open && (
        <div className="border-t border-white/10 bg-coal px-4 py-4 lg:hidden">
          <div className="grid gap-3">
            {navItems.map((item) => (
              <a key={item} onClick={() => setOpen(false)} href={`#${item.toLowerCase().replaceAll(" ", "-")}`} className="rounded-md px-3 py-3 text-sm font-black uppercase text-mutedCream hover:bg-white/5">
                {item}
              </a>
            ))}
            <CTAButton>Book Now</CTAButton>
          </div>
        </div>
      )}
    </header>
  );
}

function StationVisual({ label = "Barber Station" }: { label?: string }) {
  return (
    <div className="interactive-frame relative min-h-[520px] overflow-hidden rounded-sm border border-white/15 bg-steel shadow-2xl">
      <div className="absolute inset-0 bg-tile bg-[length:76px_76px] opacity-55" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_20%,rgba(242,239,231,.12),transparent_24rem)]" />
      <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/85 to-transparent" />
      <p className="pointer-events-none absolute left-10 top-8 display-text text-[5.8rem] uppercase leading-none text-white/[.055] md:text-[7.5rem]">
        {label}
      </p>

      <div className="absolute left-6 right-6 top-20 rounded-sm border border-white/25 bg-black/70 px-5 py-5 backdrop-blur-sm md:left-12">
        <div className="flex items-center justify-between gap-4">
          <p className="display-text text-3xl uppercase leading-none sm:text-4xl md:text-6xl">{label}</p>
          <div className="flex gap-3">
            <span className="h-11 w-11 rounded-full bg-lineRed md:h-14 md:w-14" />
            <span className="h-11 w-11 rounded-full bg-lineBlue md:h-14 md:w-14" />
            <span className="h-11 w-11 rounded-full bg-lineYellow md:h-14 md:w-14" />
          </div>
        </div>
      </div>
      <p className="absolute right-6 top-24 hidden text-xs font-black uppercase tracking-[0.08em] text-mutedCream [writing-mode:vertical-rl] md:block">
        Open Mon-Sun / Stay Sharp
      </p>

      <div className="absolute bottom-24 left-1/2 w-[84%] -translate-x-1/2 border border-white/15 bg-black/85 p-5 shadow-[0_22px_60px_rgba(0,0,0,.45)] md:w-[58%]">
        <div className="mb-3 flex justify-between border-b border-white/15 pb-3 text-sm font-bold text-mutedCream">
          <span>Downtown</span>
          <span>Platform 01</span>
        </div>
        <p className="display-text text-4xl uppercase leading-none sm:text-5xl md:text-6xl">Barber Station</p>
        <p className="mt-3 border-t border-white/15 pt-3 text-2xl font-black uppercase text-lineYellow">Next Stop: A Better You</p>
        <div className="mt-4 flex gap-2"><RouteDot label="B" color="red" /><RouteDot label="S" color="blue" /><RouteDot label="C" color="yellow" /><RouteDot label="VIP" color="green" /></div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-36 bg-gradient-to-t from-black via-black/80 to-transparent" />
      <div className="absolute bottom-0 left-[12%] h-28 w-20 bg-black/90 md:w-28" />
      <div className="absolute bottom-0 left-[46%] h-36 w-24 bg-black/95 md:w-32" />
      <div className="absolute bottom-0 right-[8%] h-28 w-20 bg-black/90 md:w-28" />
      <div className="absolute bottom-14 left-12 right-12 h-3 bg-lineYellow/70" />
      <div className="absolute bottom-10 left-12 right-12 h-2 bg-lineRed/65" />
      <div className="absolute bottom-3 left-10 right-10 h-px bg-white/25" />
    </div>
  );
}

function Hero() {
  return (
    <section id="home" className="relative min-h-screen overflow-hidden px-4 pb-10 pt-28 lg:px-8">
      <div className="absolute inset-0 bg-tile bg-[length:96px_96px] opacity-[.13]" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,.86),rgba(0,0,0,.38)_45%,rgba(0,0,0,.85))]" />
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-lineYellow/20" />
      <div className="absolute bottom-0 left-0 right-0 h-10 bg-black/80" />
      <div className="mx-auto grid min-h-[calc(100vh-7rem)] max-w-7xl items-center gap-10 lg:grid-cols-[.86fr_1.14fr]">
        <motion.div className="relative z-10" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <p className="mb-5 text-sm font-black uppercase text-mutedCream">Now Boarding</p>
          <h1 className="display-text max-w-3xl uppercase leading-[.78] text-cream">
            <span className="block text-5xl md:text-7xl">Welcome to</span>
            <span className="block text-[5.6rem] sm:text-[7.2rem] md:text-[10rem]">Barber</span>
            <span className="text-outline block text-[4.7rem] sm:text-[6.2rem] md:text-[8.8rem]">Station</span>
          </h1>
          <p className="mt-8 max-w-xl display-text text-5xl uppercase leading-[.9] text-lineYellow md:text-7xl">
            Next Stop:<br />A Better You
          </p>
          <p className="mt-6 max-w-2xl text-base font-bold leading-7 text-mutedCream md:text-lg">Fresh cuts, sharp fades, clean shaves, and confidence - running on time in the heart of the city.</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <CTAButton>Book Your Cut</CTAButton>
            <CTAButton href="#services" variant="secondary">Explore the Station</CTAButton>
          </div>
        </motion.div>
        <motion.div className="relative z-10 lg:-mr-16" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.15 }}>
          <StationVisual />
        </motion.div>
      </div>
      <a href="#booking" className="fixed right-0 top-1/2 z-30 hidden -translate-y-1/2 rounded-l-md bg-lineRed px-3 py-5 text-xs font-black uppercase text-white shadow-glow [writing-mode:vertical-rl] md:block">Book Now</a>
    </section>
  );
}

function ArrivalBoard({ mini = false }: { mini?: boolean }) {
  return (
    <section id={mini ? undefined : "availability"} className={mini ? "px-4 pb-16 lg:px-8" : "px-4 py-20 lg:px-8"}>
      {!mini && <SectionHeading eyebrow="Availability" title="Next Openings" copy="A quick look at the next appointment times available today." />}
      <div className="interactive-frame mx-auto max-w-5xl rounded-sm border border-lineYellow/40 bg-black p-5 font-mono shadow-[inset_0_0_30px_rgba(228,183,46,.08)]">
        <div className="mb-4 flex items-center justify-between border-b border-white/10 pb-3 text-xs uppercase tracking-[0.25em] text-lineYellow">
          <span>Next Openings</span><span>Today</span>
        </div>
        <div className="grid gap-3 md:grid-cols-4">
          {arrivals.map(([name, time]) => (
            <div key={name} className="interactive-frame arrival-flicker rounded-sm border border-white/10 bg-[#15120a] p-4">
              <p className="text-sm uppercase text-mutedCream">{name}</p>
              <p className="mt-2 text-3xl font-black text-lineYellow">{time}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ChooseLine() {
  return (
    <section id="services" className="relative overflow-hidden px-4 py-24 lg:px-8">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_18%,rgba(242,239,231,.08),transparent_18rem),radial-gradient(circle_at_84%_18%,rgba(40,103,216,.12),transparent_26rem)]" />
      <div className="absolute inset-0 bg-[repeating-radial-gradient(circle_at_20%_22%,rgba(255,255,255,.045)_0_1px,transparent_1px_7px)] opacity-55" />
      <div className="relative">
        <SectionHeading eyebrow="Services" title="Choose a Service" copy="Haircuts, beards, kids cuts, and full grooming packages are easy to compare before you book." />
      </div>
      <div className="relative mx-auto grid max-w-7xl gap-5">
        {serviceLines.map((route) => (
          <article key={route.name} className="interactive-frame overflow-hidden rounded-md border border-white/10 bg-white/[.035] p-5">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center">
              <div className="w-56 shrink-0">
                <p className={`text-xs font-black uppercase ${lineStyles[route.line].text}`}>{lineStyles[route.line].label}</p>
                <h3 className="display-text text-4xl uppercase leading-none md:text-5xl">{route.name}</h3>
                <p className="mt-1 text-sm font-bold text-mutedCream">{route.price}</p>
              </div>
              <div className="min-w-0 flex-1 overflow-x-auto pb-2">
                <div className="flex min-w-max items-center gap-4">
                  <div className={`h-2 w-12 rounded-full ${lineStyles[route.line].bg}`} />
                  {route.options.map((option) => (
                    <div key={option} className="group flex items-center gap-3">
                      <span className={`h-7 w-7 rounded-full border-4 border-black ${lineStyles[route.line].bg} transition duration-300 group-hover:scale-125 ${lineStyles[route.line].shadow}`} />
                      <span className="rounded-sm bg-black/80 px-3 py-2 text-sm font-black uppercase text-cream transition duration-300 group-hover:bg-black">{option}</span>
                    </div>
                  ))}
                </div>
              </div>
              <a href="#services-menu" className="interactive-button inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-md border border-white/20 bg-white/5 px-5 py-3 text-sm font-black uppercase text-cream hover:bg-white/10">
                View Full Menu <ChevronRight className="h-4 w-4" />
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
function ServicesMenu() {
  return (
    <section id="services-menu" className="bg-coal px-4 py-20 lg:px-8">
      <SectionHeading eyebrow="Menu" title="Full Services" copy="Clear timing, pricing, and details so you can pick the right appointment." />
      <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-2 xl:grid-cols-3">
        {services.map((service) => (
          <article key={service.name} className={`interactive-frame rounded-sm border bg-black/40 p-5 ${lineStyles[service.line].border}`}>
            <div className="mb-4 flex items-center justify-between gap-3">
              <RouteDot label={service.name.charAt(0)} color={service.line} />
              <span className="rounded bg-white/10 px-3 py-1 text-xs font-black uppercase">{lineStyles[service.line].label}</span>
            </div>
            <h3 className="display-text text-4xl uppercase">{service.name}</h3>
            <p className="mt-3 min-h-16 text-mutedCream">{service.desc}</p>
            <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4">
              <span className="flex items-center gap-2 text-sm"><Clock3 className="h-4 w-4" />{service.duration}</span>
              <span className="display-text text-3xl">{service.price}</span>
            </div>
            <a href="#booking" className="interactive-button mt-5 inline-flex w-full items-center justify-center rounded-sm bg-white px-4 py-3 text-sm font-black uppercase text-black">Book This Service</a>
          </article>
        ))}
      </div>
    </section>
  );
}

function BookingForm() {
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [form, setForm] = useState({ service: "", barber: "", date: "", time: "", name: "", phone: "", email: "", notes: "" });
  const required = useMemo(() => ["service", "barber", "date", "time", "name", "phone", "email"], []);

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
    <section id="booking" className="px-4 py-20 lg:px-8">
      <SectionHeading eyebrow="Booking" title="Book Your Appointment" copy="Choose a service, barber, date, and time. Add notes if you have a preference." />
      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[.85fr_1.15fr]">
        <div className="interactive-frame rounded-sm border border-white/10 bg-black/45 p-6">
          <CalendarDays className="h-10 w-10 text-lineYellow" />
          <h3 className="display-text mt-4 text-5xl uppercase">Before You Book</h3>
          <p className="mt-3 text-mutedCream">Appointments keep the shop moving, and walk-ins are welcome when a chair is open.</p>
          <div className="interactive-frame mt-8 rounded-sm border border-lineYellow/40 bg-[#171307] p-5 font-mono text-sm uppercase">
            <div className="flex justify-between text-lineYellow"><span>Shop</span><span>Barber Station</span></div>
            <div className="mt-5 h-20 barcode rounded opacity-80" />
            <p className="mt-5 text-mutedCream">Valid for one confirmed appointment.</p>
          </div>
        </div>
        <form onSubmit={submit} className="interactive-frame ticket-edge rounded-sm bg-ticket p-5 text-black shadow-2xl md:p-8" noValidate>
          {submitted ? (
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="flex min-h-[420px] flex-col items-center justify-center text-center">
              <span className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-lineGreen text-white"><Check className="h-9 w-9" /></span>
              <h3 className="display-text text-5xl uppercase">You are booked.</h3>
              <p className="mt-3 max-w-md text-lg text-black/70">Your appointment details are saved in local component state and ready for a future booking API.</p>
            </motion.div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              <Field label="Select Service" error={errors.service}>
                <select value={form.service} onChange={(e) => update("service", e.target.value)} className="field">
                  <option value="">Choose a service</option>
                  {services.map((service) => <option key={service.name}>{service.name}</option>)}
                </select>
              </Field>
              <Field label="Select Barber" error={errors.barber}>
                <select value={form.barber} onChange={(e) => update("barber", e.target.value)} className="field">
                  <option value="">Choose a barber</option>
                  {barbers.map((barber) => <option key={barber.name}>{barber.name}</option>)}
                </select>
              </Field>
              <Field label="Select Date" error={errors.date}><input className="field" type="date" value={form.date} onChange={(e) => update("date", e.target.value)} /></Field>
              <Field label="Select Time" error={errors.time}><input className="field" type="time" value={form.time} onChange={(e) => update("time", e.target.value)} /></Field>
              <Field label="Customer Name" error={errors.name}><input className="field" value={form.name} onChange={(e) => update("name", e.target.value)} /></Field>
              <Field label="Phone Number" error={errors.phone}><input className="field" type="tel" value={form.phone} onChange={(e) => update("phone", e.target.value)} /></Field>
              <Field label="Email" error={errors.email}><input className="field" type="email" value={form.email} onChange={(e) => update("email", e.target.value)} /></Field>
              <Field label="Notes / Preferences"><textarea className="field min-h-28" value={form.notes} onChange={(e) => update("notes", e.target.value)} /></Field>
              <button className="interactive-button mt-2 rounded-sm bg-lineRed px-5 py-4 text-sm font-black uppercase text-white md:col-span-2">Request Appointment</button>
            </div>
          )}
        </form>
      </div>
    </section>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <label className="grid gap-2 text-sm font-black uppercase">
      <span className="flex justify-between"><span>{label}</span>{error && <span className="text-lineRed">{error}</span>}</span>
      {children}
    </label>
  );
}

function About() {
  return (
    <section id="about" className="bg-steel px-4 py-20 lg:px-8">
      <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2">
        <StationVisual label="Inside the Shop" />
        <div>
          <p className="text-xs font-black uppercase tracking-[0.3em] text-lineYellow">About the Shop</p>
          <h2 className="display-text mt-3 text-6xl uppercase leading-none md:text-8xl">Built in NYC. Cut for You.</h2>
          <p className="mt-6 text-lg leading-8 text-mutedCream">Barber Station is a neighborhood shop for sharp haircuts, detailed beard work, and consistent service. We keep the energy bold, the chairs clean, and the appointment process simple.</p>
          <div className="mt-7 grid gap-3 sm:grid-cols-2">
            {["Clean fades and tapers", "Skilled barbers", "Appointments and walk-ins", "Sanitized tools", "Family-friendly cuts"].map((item) => (
              <div key={item} className="interactive-frame rounded-sm border border-white/10 bg-black/35 p-4 font-bold">{item}</div>
            ))}
          </div>
          <p className="mt-7 rotate-[-2deg] text-3xl font-black text-lineRed">Stay sharp</p>
        </div>
      </div>
    </section>
  );
}

function Barbers() {
  return (
    <section id="barbers" className="px-4 py-20 lg:px-8">
      <SectionHeading eyebrow="Barbers" title="Meet the Barbers" copy="Experienced barbers with clear specialties, schedules, and booking options." />
      <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-2 xl:grid-cols-4">
        {barbers.map((barber) => (
          <article key={barber.name} className="interactive-frame overflow-hidden rounded-sm border border-white/10 bg-white/[.035]">
            <div className="relative h-56 bg-gradient-to-br from-zinc-700 via-zinc-950 to-black">
              <div className={`absolute left-5 top-5 h-28 w-28 rounded-full ${lineStyles[barber.line].bg} opacity-20 blur-2xl`} />
              <Scissors className="absolute bottom-6 right-6 h-16 w-16 text-white/15" />
            </div>
            <div className="p-5">
              <span className={`rounded px-3 py-1 text-xs font-black uppercase text-white ${lineStyles[barber.line].bg}`}>{barber.role}</span>
              <h3 className="display-text mt-4 text-4xl uppercase">{barber.name}</h3>
              <p className="mt-2 text-sm text-mutedCream">{barber.specialty}</p>
              <div className="mt-4 grid gap-2 border-t border-white/10 pt-4 text-sm">
                <span>{barber.years}</span><span>Schedule: {barber.duty}</span>
              </div>
              <a href="#booking" className="interactive-button mt-5 inline-flex w-full justify-center rounded-sm border border-white/15 px-4 py-3 text-sm font-black uppercase">Book with {barber.name}</a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function Gallery() {
  return (
    <section id="gallery" className="bg-coal px-4 py-20 lg:px-8">
      <SectionHeading eyebrow="Gallery" title="Recent Work" copy="Cuts, fades, beards, shop details, and behind-the-chair atmosphere." />
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 lg:grid-cols-3">
        {gallery.map((item, index) => (
          <div key={item} className={`interactive-frame group relative min-h-56 overflow-hidden rounded-sm border border-white/10 bg-gradient-to-br ${index % 4 === 0 ? "from-lineRed/50" : index % 4 === 1 ? "from-lineBlue/50" : index % 4 === 2 ? "from-lineYellow/50" : "from-lineGreen/50"} via-zinc-900 to-black`}>
            <div className="absolute inset-0 bg-tile bg-[length:36px_36px] opacity-20" />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black to-transparent p-5">
              <p className="font-black uppercase">{item}</p>
              <p className="text-sm text-mutedCream opacity-0 transition group-hover:opacity-100">View Style</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section className="px-4 py-20 lg:px-8">
      <SectionHeading eyebrow="Reviews" title="Customer Reviews" copy="First names only. Real feedback from customers who trust the shop." />
      <div className="mx-auto grid max-w-6xl gap-5 md:grid-cols-3">
        {reviews.map(([quote, name]) => (
          <article key={name} className="interactive-frame ticket-edge rounded-sm bg-ticket p-6 text-black">
            <div className="mb-4 flex gap-1">{Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-5 w-5 fill-lineYellow text-lineYellow" />)}</div>
            <p className="text-lg font-bold">"{quote}"</p>
            <p className="mt-5 font-black uppercase">- {name}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function Location() {
  return (
    <section id="contact" className="px-4 py-20 lg:px-8">
      <SectionHeading eyebrow="Location" title="Visit the Shop" copy="Find our Brooklyn barbershop, check hours, or call before you come in." />
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-2">
        <div className="interactive-frame rounded-sm border border-white/10 bg-black/45 p-6">
          <h3 className="display-text text-5xl uppercase">Shop Location</h3>
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
        <div className="interactive-frame relative min-h-80 overflow-hidden rounded-sm border border-white/10 bg-zinc-900 grayscale">
          <div className="absolute inset-0 bg-tile bg-[length:48px_48px] opacity-50" />
          <div className="absolute left-1/2 top-0 h-full w-2 -translate-x-1/2 bg-lineRed" />
          <div className="absolute left-0 top-1/2 h-2 w-full -translate-y-1/2 bg-lineBlue" />
          <div className="absolute left-1/2 top-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-8 border-black bg-lineYellow text-black">
            <Scissors className="h-8 w-8" />
          </div>
          <span className="absolute left-5 top-5 rounded bg-black px-4 py-2 font-mono text-sm uppercase text-white">Shop</span>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="rounded-t-[1.7rem] border border-white/10 bg-black px-4 py-14 shadow-[0_-14px_45px_rgba(0,0,0,.42)] lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-2 xl:grid-cols-[1.2fr_1fr_1fr_1.2fr]">
        <div>
          <h2 className="display-text text-4xl uppercase leading-none">Barber<br />Station</h2>
          <div className="mt-4 flex gap-2">
            <span className="h-3 w-3 rounded-full bg-lineRed" />
            <span className="h-3 w-3 rounded-full bg-lineBlue" />
            <span className="h-3 w-3 rounded-full bg-lineYellow" />
            <span className="h-3 w-3 rounded-full bg-lineGreen" />
          </div>
          <p className="mt-7 text-xl font-black text-mutedCream">Next Stop: A Better You</p>
        </div>
        <div>
          <h3 className="display-text text-4xl uppercase">Visit Us</h3>
          <p className="mt-6 max-w-56 text-xl font-bold leading-8 text-mutedCream">123 Barber Station Blvd<br />Brooklyn, NY 11201</p>
        </div>
        <div>
          <h3 className="display-text text-4xl uppercase">Hours</h3>
          <p className="mt-6 text-xl font-bold leading-8 text-mutedCream">Mon-Fri: 10AM-8PM<br />Sat: 9AM-7PM<br />Sun: 11AM-5PM</p>
        </div>
        <form className="grid gap-4">
          <label className="display-text text-4xl uppercase" htmlFor="newsletter">Stay On Track</label>
          <input id="newsletter" className="interactive-frame min-h-16 w-full rounded-none border border-white/15 bg-white/55 px-5 text-lg font-black text-black placeholder:text-black/40" placeholder="Enter your email" type="email" />
          <button className="interactive-button min-h-16 bg-ticket px-5 text-base font-black uppercase text-black">Join</button>
        </form>
      </div>
      <div className="mx-auto mt-12 max-w-7xl border-t border-white/10 pt-7 text-xl font-black text-mutedCream">
        <p>&copy; 2026 Barber Station. All rights reserved. Stay sharp. Ride clean.</p>
      </div>
    </footer>
  );
}

export default function Home() {
  return (
    <main>
      <style jsx global>{`
        .field {
          width: 100%;
          border-radius: 0.375rem;
          border: 1px solid rgba(0, 0, 0, 0.18);
          background: rgba(255, 255, 255, 0.45);
          padding: 0.85rem 0.9rem;
          color: #080808;
          font-weight: 700;
        }
      `}</style>
      <Header />
      <Hero />
      <ArrivalBoard mini />
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
