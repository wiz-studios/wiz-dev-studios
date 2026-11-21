import Image from "next/image"
import { PortfolioSection } from "@/components/portfolio-section"
import { ServicesSection } from "@/components/services-section"
import { ContactSection } from "@/components/contact-section"

export default function HomePage() {
  return (
    <>
      <section id="home" className="studio-hero" aria-labelledby="hero-title" data-enter>
        <div className="studio-shell">
          <div className="studio-hero-intro">
            <h1 id="hero-title">Web &amp; software<br className="studio-hero-break" /> built to last<span>.</span></h1>
            <div className="studio-hero-summary">
              <p>Based in Nairobi, we build web apps, custom software, and the cloud systems that keep them running.</p>
              <div className="studio-hero-actions">
                <a className="studio-button" href="#contact">Discuss a project</a>
                <a className="studio-text-link" href="#portfolio">See our work</a>
              </div>
            </div>
          </div>
          <div className="studio-hero-art" data-enter-media>
            <Image src="/studio-sculpture.webp" alt="" fill priority sizes="(max-width: 1350px) 100vw, 1280px" />
          </div>
        </div>
      </section>
      <PortfolioSection />
      <ServicesSection />
      <ContactSection />
    </>
  )
}
