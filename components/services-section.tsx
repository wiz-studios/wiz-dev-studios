const services = [
  {
    title: "Web development",
    description: "Responsive websites and web apps, with performance, SEO, and accessibility considered from the start.",
    examples: "Marketing sites · E-commerce · Web applications",
  },
  {
    title: "Software development",
    description: "Custom software that fits how your team works, from internal tools to APIs and third-party integrations.",
    examples: "Desktop apps · APIs · Databases",
  },
  {
    title: "DevOps & cloud",
    description: "Infrastructure and deployment pipelines that make it easier to release, monitor, and maintain your software.",
    examples: "CI/CD · Cloud architecture · Monitoring",
  },
]

export function ServicesSection() {
  return (
    <section id="services" className="studio-services studio-section" aria-labelledby="services-title" tabIndex={-1}>
      <div className="studio-shell studio-services-grid">
        <div className="studio-services-intro">
          <h2 id="services-title">Development<br className="studio-hero-break" /> services<span>.</span></h2>
          <p>From the interface people use to the infrastructure behind it.</p>
        </div>
        <ul className="studio-service-list">
          {services.map(({ title, description, examples }) => (
            <li key={title}>
              <h3>{title}</h3>
              <p>{description}</p>
              <p className="studio-service-examples">{examples}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
