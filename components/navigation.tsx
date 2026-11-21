"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, Moon, Sun, X } from "lucide-react"
import { useTheme } from "next-themes"

const sections = [
  { id: "portfolio", label: "Work" },
  { id: "services", label: "Services" },
  { id: "contact", label: "Contact" },
]

export function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false)
  const menuToggle = useRef<HTMLButtonElement>(null)
  const { resolvedTheme, setTheme } = useTheme()
  const sectionBase = usePathname() === "/" ? "" : "/"

  useEffect(() => {
    if (!menuOpen) return
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMenuOpen(false)
        menuToggle.current?.focus()
      }
    }
    window.addEventListener("keydown", closeOnEscape)
    return () => window.removeEventListener("keydown", closeOnEscape)
  }, [menuOpen])

  function closeMenu(id: string) {
    setMenuOpen(false)
    document.getElementById(id)?.focus({ preventScroll: true })
  }

  return (
    <header className="studio-header">
      <div className="studio-shell studio-header-row">
        <Link href="/" className="studio-brand" onClick={() => setMenuOpen(false)}>
          <span className="studio-mark" aria-hidden="true"><i /><i /></span>
          <span translate="no">Wiz Dev Studios</span>
        </Link>
        <nav aria-label="Primary" className="studio-desktop-nav">
          {sections.map(({ id, label }) => <a key={id} href={`${sectionBase}#${id}`}>{label}</a>)}
        </nav>
        <div className="studio-header-actions">
          <button
            className="studio-icon-button studio-theme-button"
            type="button"
            aria-label="Toggle color theme"
            onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
          >
            <Moon className="studio-moon" size={18} aria-hidden="true" />
            <Sun className="studio-sun" size={18} aria-hidden="true" />
          </button>
          <a href={`${sectionBase}#contact`} className="studio-button studio-header-cta">Start a project</a>
          <button
            ref={menuToggle}
            className="studio-icon-button studio-menu-toggle"
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={23} aria-hidden="true" /> : <Menu size={23} aria-hidden="true" />}
          </button>
        </div>
      </div>
      <nav id="mobile-navigation" aria-label="Mobile" className="studio-mobile-nav" hidden={!menuOpen}>
        <div className="studio-shell">
          {sections.map(({ id, label }) => (
            <a key={id} href={`${sectionBase}#${id}`} onClick={() => closeMenu(id)}>{label}</a>
          ))}
        </div>
      </nav>
    </header>
  )
}
