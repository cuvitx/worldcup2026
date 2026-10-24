"use client";

import { useState, type FormEvent } from "react";

type Status = "idle" | "loading" | "success" | "error";

const subjects = ["Question", "Suggestion", "Partenariat", "Signaler une erreur", "Autre"];

const inputClass =
  "w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    setStatus("loading");
    setError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) {
        setStatus("error");
        setError(json.error ?? "Une erreur est survenue. Réessayez plus tard.");
        return;
      }
      form.reset();
      setStatus("success");
    } catch {
      setStatus("error");
      setError("Erreur réseau. Réessayez plus tard ou écrivez-nous à contact@cdm2026.fr.");
    }
  }

  if (status === "success") {
    return (
      <div role="status" className="rounded-lg border border-green-200 bg-green-50 p-5 text-green-800">
        <p className="font-semibold">Merci, votre message a bien été envoyé !</p>
        <p className="mt-1 text-sm">Nous vous répondrons par email sous 48 heures.</p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-3 text-sm font-medium text-primary hover:underline"
        >
          Envoyer un autre message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="min-w-0">
          <label htmlFor="contact-name" className="mb-1 block text-sm font-medium text-gray-900">
            Nom
          </label>
          <input id="contact-name" name="name" type="text" required minLength={2} maxLength={100} autoComplete="name" className={inputClass} />
        </div>
        <div className="min-w-0">
          <label htmlFor="contact-email" className="mb-1 block text-sm font-medium text-gray-900">
            Email
          </label>
          <input id="contact-email" name="email" type="email" required maxLength={200} autoComplete="email" placeholder="votre@email.fr" className={inputClass} />
        </div>
      </div>

      <div>
        <label htmlFor="contact-subject" className="mb-1 block text-sm font-medium text-gray-900">
          Sujet
        </label>
        <select id="contact-subject" name="subject" defaultValue="Question" className={inputClass}>
          {subjects.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="contact-message" className="mb-1 block text-sm font-medium text-gray-900">
          Message
        </label>
        <textarea id="contact-message" name="message" required minLength={10} maxLength={5000} rows={6} className={inputClass} />
      </div>

      {/* Honeypot anti-spam, invisible pour les visiteurs */}
      <div aria-hidden="true" className="hidden">
        <label htmlFor="contact-website">Site web</label>
        <input id="contact-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {status === "error" && (
        <p role="alert" className="text-sm text-red-600">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full rounded-lg bg-primary px-6 py-3 font-semibold text-white transition-colors hover:bg-primary/90 disabled:opacity-60 sm:w-auto"
      >
        {status === "loading" ? "Envoi en cours…" : "Envoyer le message"}
      </button>
    </form>
  );
}
