"use client"

import { useSyncExternalStore } from "react"
import Image from "next/image"
import { ArrowUpRight } from "lucide-react"

const filters = [
  { value: "all", label: "All work" },
  { value: "web", label: "Web" },
  { value: "software", label: "Software" },
  { value: "fullstack", label: "Full stack" },
] as const

const projects = [
  {
    title: "E-commerce platform",
    description: "Manage orders, stock, and payments in one admin dashboard.",
    category: "fullstack",
    technology: "Next.js · Stripe · PostgreSQL",
    image: "/modern-ecommerce-dashboard.webp",
    alt: "Dark commerce dashboard with sales graphs, order rows, and a category breakdown",
  },
  {
    title: "Task management app",
    description: "A shared workspace for assigning tasks and tracking project progress in real time.",
    category: "web",
    technology: "React · Node.js · Socket.io",
    image: "/task-management-interface.webp",
    alt: "A task list with assignee avatars and colored status labels",
  },
  {
    title: "Desktop analytics tool",
    description: "A cross-platform desktop app for exploring data and building reports.",
    category: "software",
    technology: "Electron · D3.js · SQLite",
    image: "/analytics-dashboard-desktop-app.webp",
    alt: "A desktop analytics interface with charts and reporting panels",
  },
  {
    title: "Healthcare management system",
    description: "A single workspace for patient records, appointment scheduling, and virtual care.",
    category: "fullstack",
    technology: "Vue.js · Laravel · WebRTC",
    image: "/healthcare-management-system.webp",
    alt: "A healthcare interface mockup with patient cards and a data flow diagram",
  },
  {
    title: "Portfolio website builder",
    description: "A drag-and-drop editor for creatives and agencies to assemble portfolio sites.",
    category: "web",
    technology: "React · Express.js · AWS S3",
    image: "/website-builder-interface.webp",
    alt: "A visual website editor with a page preview and editing controls",
  },
  {
    title: "API gateway service",
    description: "A gateway for routing and monitoring microservice traffic, with authentication and rate limiting.",
    category: "software",
    technology: "Go · Kubernetes · Prometheus",
    image: "/api-gateway-architecture.webp",
    alt: "Architecture diagram connecting an API gateway to backend services",
  },
] as const

const filterChange = "portfolio-filter-change"

function subscribe(callback: () => void) {
  window.addEventListener("popstate", callback)
  window.addEventListener(filterChange, callback)
  return () => {
    window.removeEventListener("popstate", callback)
    window.removeEventListener(filterChange, callback)
  }
}

function getFilter() {
  const value = new URLSearchParams(window.location.search).get("work")
  return filters.find((filter) => filter.value === value)?.value ?? "all"
}

function getDefaultFilter() {
  return "all" as const
}

export function PortfolioSection() {
  const filter = useSyncExternalStore(subscribe, getFilter, getDefaultFilter)
  const visibleProjects = filter === "all" ? projects : projects.filter((project) => project.category === filter)

  function selectFilter(value: (typeof filters)[number]["value"]) {
    if (value === filter) return
    const url = new URL(window.location.href)
    if (value === "all") url.searchParams.delete("work")
    else url.searchParams.set("work", value)
    url.hash = "portfolio"
    window.history.pushState(null, "", url)
    window.dispatchEvent(new Event(filterChange))
  }

  return (
    <section id="portfolio" className="studio-work studio-section" aria-labelledby="work-title" tabIndex={-1}>
      <div className="studio-shell">
        <div className="studio-work-head">
          <h2 id="work-title">Selected work</h2>
          <div className="studio-filters" role="group" aria-label="Filter projects">
            {filters.map(({ value, label }) => (
              <button
                key={value}
                type="button"
                aria-pressed={filter === value}
                aria-controls="work-grid"
                onClick={() => selectFilter(value)}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
        <p className="sr-only" aria-live="polite">{visibleProjects.length} projects shown</p>
        <div id="work-grid" className="studio-project-list">
          {visibleProjects.map((project, index) => {
            const featured = filter === "all" && index === 0
            return (
              <article key={project.title} className="studio-project" data-featured={featured ? "" : undefined}>
                <div className="studio-project-image">
                  <Image
                    src={project.image}
                    alt={project.alt}
                    fill
                    sizes={featured ? "(max-width: 760px) 92vw, 800px" : "(max-width: 760px) 32vw, 240px"}
                  />
                </div>
                <div className="studio-project-content">
                  <div>
                    <p className="studio-project-category">{filters.find(({ value }) => value === project.category)?.label}</p>
                    <h3>{project.title}</h3>
                  </div>
                  <div className="studio-project-summary">
                    <p>{project.description}</p>
                    <p className="studio-project-tools">{project.technology}</p>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
        <a className="studio-text-link studio-more-work" href="https://ronoh-portfolio-14.vercel.app/">
          Explore the developer portfolio <ArrowUpRight size={17} aria-hidden="true" />
        </a>
      </div>
    </section>
  )
}
