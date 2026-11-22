"use client"

import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react"
import { ChevronDown, LoaderCircle } from "lucide-react"

const emailAddress = "wiz.dev.studios@gmail.com"

function OptionalSelect({ name, label, children }: { name: string; label: string; children: ReactNode }) {
  return (
    <label className="studio-field">
      <span>{label}</span>
      <select name={name} defaultValue="">
        <option value="">Choose {label.toLowerCase()}</option>
        {children}
      </select>
    </label>
  )
}

export function ContactSection() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle")
  const [dirty, setDirty] = useState(false)
  const statusMessage = useRef<HTMLParagraphElement>(null)
  const requestPending = useRef(false)

  useEffect(() => {
    if (status === "error" || status === "sent") statusMessage.current?.focus()
  }, [status])

  useEffect(() => {
    if (!dirty) return
    function warnBeforeLeaving(event: BeforeUnloadEvent) {
      event.preventDefault()
      event.returnValue = ""
    }
    window.addEventListener("beforeunload", warnBeforeLeaving)
    return () => window.removeEventListener("beforeunload", warnBeforeLeaving)
  }, [dirty])

  async function submitInquiry(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (requestPending.current) return
    const form = event.currentTarget
    const name = form.elements.namedItem("name") as HTMLInputElement
    const message = form.elements.namedItem("message") as HTMLTextAreaElement
    name.setCustomValidity(name.value.trim() ? "" : "Enter your name.")
    message.setCustomValidity(message.value.trim().length >= 10 ? "" : "Use at least 10 characters to describe your project.")
    if (!form.reportValidity()) return

    const fields = Object.fromEntries(
      Array.from(new FormData(form), ([key, value]) => [key, String(value).trim()]),
    )
    requestPending.current = true
    setStatus("sending")

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fields),
      })

      if (!response.ok) throw new Error("Unable to send inquiry")
      form.reset()
      setDirty(false)
      setStatus("sent")
    } catch {
      setStatus("error")
    } finally {
      requestPending.current = false
    }
  }

  return (
    <section id="contact" className="studio-contact studio-section" aria-labelledby="contact-title" tabIndex={-1}>
      <div className="studio-shell studio-contact-grid">
        <div className="studio-contact-intro">
          <h2 id="contact-title">Let’s build your next project<span>.</span></h2>
          <p>Share a little about the problem, who it affects, and what you’d like to change.</p>
          <a className="studio-text-link studio-email" href={`mailto:${emailAddress}`}>{emailAddress}</a>
          <div className="studio-contact-links">
            <a className="studio-text-link" href="https://calendly.com/wiz-dev-studios">Schedule a call</a>
            <a className="studio-text-link" href="https://wa.me/254719267759">Message on WhatsApp</a>
          </div>
        </div>

        <form className="studio-form" onSubmit={submitInquiry} onChange={() => setDirty(true)}>
          <fieldset disabled={status === "sending"} className="studio-form-fields">
            <div className="studio-form-pair">
              <label className="studio-field">
                <span>Name</span>
                <input name="name" autoComplete="name" required maxLength={120} onInput={(event) => event.currentTarget.setCustomValidity("")} />
              </label>
              <label className="studio-field">
                <span>Email</span>
                <input name="email" type="email" autoComplete="email" spellCheck={false} required maxLength={254} />
              </label>
            </div>
            <label className="studio-field">
              <span>Project details</span>
              <textarea
                name="message"
                autoComplete="off"
                required
                minLength={10}
                rows={4}
                maxLength={5000}
                onInput={(event) => event.currentTarget.setCustomValidity("")}
              />
            </label>
            <details className="studio-form-options">
              <summary>
                <ChevronDown size={16} aria-hidden="true" />
                Add budget, timing, or phone <span>(optional)</span>
              </summary>
              <div className="studio-form-extra">
                <div className="studio-form-pair">
                  <OptionalSelect name="projectType" label="Project type">
                    <option value="web-development">Web development</option>
                    <option value="software-development">Software development</option>
                    <option value="devops-cloud">DevOps &amp; cloud</option>
                    <option value="mobile-app">Mobile app</option>
                    <option value="consultation">Consultation</option>
                    <option value="other">Other</option>
                  </OptionalSelect>
                  <OptionalSelect name="budget" label="Budget">
                    <option value="under-5k">Under $5,000</option>
                    <option value="5k-15k">$5,000–$15,000</option>
                    <option value="15k-30k">$15,000–$30,000</option>
                    <option value="30k-50k">$30,000–$50,000</option>
                    <option value="over-50k">Over $50,000</option>
                    <option value="discuss">Let’s discuss</option>
                  </OptionalSelect>
                  <OptionalSelect name="timeline" label="Timeline">
                    <option value="asap">As soon as possible</option>
                    <option value="1-month">Within 1 month</option>
                    <option value="2-3-months">2–3 months</option>
                    <option value="3-6-months">3–6 months</option>
                    <option value="6-months-plus">6+ months</option>
                    <option value="flexible">Flexible</option>
                  </OptionalSelect>
                  <label className="studio-field">
                    <span>Phone</span>
                    <input name="phone" type="tel" autoComplete="tel" maxLength={40} />
                  </label>
                </div>
              </div>
            </details>
            <button className="studio-button" type="submit">
              {status === "sending" && <LoaderCircle size={17} className="studio-spinner" aria-hidden="true" />}
              {status === "sending" ? "Sending…" : "Send inquiry"}
            </button>
          </fieldset>
          <div aria-live="polite">
            {status === "sent" && (
              <p className="studio-form-status" ref={statusMessage} tabIndex={-1}>Thanks. Your inquiry was sent.</p>
            )}
            {status === "error" && (
              <p className="studio-form-status studio-form-error" ref={statusMessage} tabIndex={-1}>
                Your inquiry couldn’t be sent. Try again or <a href={`mailto:${emailAddress}`}>email us directly</a>.
              </p>
            )}
          </div>
        </form>
      </div>
    </section>
  )
}
