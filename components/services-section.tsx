import { AppWindow, Braces, Cloud } from "lucide-react"

const services = [
  {
    title: "Web development",
    icon: AppWindow,
    description: "Responsive websites and web apps with accessible layouts, search metadata, and performance checks.",
    examples: "Marketing sites · E-commerce · Web applications",
  },
  {
    title: "Software development",
    icon: Braces,
    description: "Custom software that fits how your team works, from internal tools to APIs and third-party integrations.",
    examples: "Desktop apps · APIs · Databases",
  },
  {
    title: "DevOps & cloud",
    icon: Cloud,
    description: "Infrastructure and deployment pipelines that make it easier to release, monitor, and maintain your software.",
    examples: "CI/CD · Cloud architecture · Monitoring",
  },
]

export function ServicesSection() {
  return (
    <section id="services" className="studio-services studio-section" aria-labelledby="services-title" tabIndex={-1}>
      <div className="studio-shell studio-services-grid">
        <div className="studio-services-intro">
          <h2 id="services-title">What we build</h2>
          <p>Hire us to launch a website, replace a manual workflow, or automate software releases.</p>
        </div>
        <ul className="studio-service-list">
          {services.map(({ title, description, examples, icon: Icon }) => (
            <li key={title}>
              <Icon size={28} strokeWidth={1.5} aria-hidden="true" />
              <div>
                <h3>{title}</h3>
                <p>{description}</p>
                <p className="studio-service-examples">{examples}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
