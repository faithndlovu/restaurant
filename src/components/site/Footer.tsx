import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { Instagram, Facebook, MessageCircle, Mail, Phone, MapPin } from "lucide-react";
import { logo } from "@/assets/images";
import { subscribeNewsletter } from "@/lib/contact.functions";

function Newsletter() {
  const subscribe = useServerFn(subscribeNewsletter);
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);
  // One slot for whatever we need to tell them — success, "already on the
  // list", or a failure. Silence was the old bug; there is always a reply now.
  const [status, setStatus] = useState<{ ok: boolean; text: string } | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setStatus(null);
    try {
      const { alreadySubscribed } = await subscribe({ data: { email: email.trim() } });
      setStatus({
        ok: true,
        text: alreadySubscribed ? "You're already on the list." : "You're on the list — thank you!",
      });
      setEmail("");
    } catch (err) {
      setStatus({
        ok: false,
        text: err instanceof Error ? err.message : "Could not sign you up. Please try again.",
      });
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      <form onSubmit={onSubmit} className="flex">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          className="flex-1 min-w-0 rounded-l-full bg-card border border-border text-foreground placeholder:text-muted-foreground px-4 py-2.5 text-sm outline-none focus:ring-1 focus:ring-clay"
        />
        <button
          type="submit"
          disabled={busy}
          className="btn-clay rounded-r-full px-4 text-sm font-medium disabled:opacity-60"
        >
          {busy ? "…" : "Join"}
        </button>
      </form>
      {status && (
        <p role="status" className={`mt-2 text-xs ${status.ok ? "text-clay" : "text-red-700"}`}>
          {status.text}
        </p>
      )}
    </>
  );
}

export function Footer() {
  return (
    <footer className="on-dark relative bg-bark">
      <div className="hairline" />
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-4 md:px-8">
        <div className="md:col-span-1">
          <div className="flex items-center gap-3">
            <img
              src={logo.url}
              alt="Savanna Grill"
              className="h-14 w-14 rounded-full ring-1 ring-clay/40"
            />
            <div>
              <div className="font-display text-xl text-clay">Savanna Grill</div>
              <div className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground">
                Est. 2024
              </div>
            </div>
          </div>
          <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
            Fine dining, premium cuts and tshisanyama under one roof — in the heart of Bulawayo.
          </p>
        </div>

        <div>
          <h4 className="text-sm uppercase tracking-[0.25em] text-clay mb-4">Visit</h4>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li className="flex gap-2">
              <MapPin size={16} className="text-clay mt-0.5 shrink-0" /> Demo Street, City Centre,
              Bulawayo, Zimbabwe
            </li>
            <li className="flex gap-2">
              <Phone size={16} className="text-clay mt-0.5 shrink-0" /> +263 00 000 0000
            </li>
            <li className="flex gap-2">
              <Mail size={16} className="text-clay mt-0.5 shrink-0" /> hello@savannagrill.example
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm uppercase tracking-[0.25em] text-clay mb-4">Explore</h4>
          <ul className="space-y-2 text-sm">
            {[
              ["/menu", "Menu"],
              ["/about", "Our Story"],
              ["/gallery", "Gallery"],
              ["/reservations", "Reservations"],
              ["/contact", "Contact"],
            ].map(([to, label]) => (
              <li key={to}>
                <Link to={to} className="text-muted-foreground hover:text-clay transition-colors">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-sm uppercase tracking-[0.25em] text-clay mb-4">Newsletter</h4>
          <p className="text-sm text-muted-foreground mb-3">
            Be first to know about chef specials and events.
          </p>
          <Newsletter />
          <div className="mt-6 flex gap-3">
            <a
              href="https://www.instagram.com/"
              aria-label="Instagram"
              target="_blank"
              rel="noreferrer"
              className="h-10 w-10 grid place-items-center rounded-full border border-clay/40 text-clay hover:bg-clay hover:text-primary-foreground transition"
            >
              <Instagram size={16} />
            </a>
            <a
              href="https://www.facebook.com/"
              aria-label="Facebook"
              target="_blank"
              rel="noreferrer"
              className="h-10 w-10 grid place-items-center rounded-full border border-clay/40 text-clay hover:bg-clay hover:text-primary-foreground transition"
            >
              <Facebook size={16} />
            </a>
            <a
              href="https://wa.me/"
              aria-label="WhatsApp"
              target="_blank"
              rel="noreferrer"
              className="h-10 w-10 grid place-items-center rounded-full border border-clay/40 text-clay hover:bg-clay hover:text-primary-foreground transition"
            >
              <MessageCircle size={16} />
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-border/50 py-5 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Savanna Grill. All rights reserved.
      </div>
    </footer>
  );
}
