import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { PortfolioSection } from "@/components/portfolio-section"
import { ServicesSection } from "@/components/services-section"
import { ContactSection } from "@/components/contact-section"

export default function HomePage() {
  return (
    <>
      <section id="home" className="studio-hero" aria-labelledby="hero-title">
        <div className="studio-shell studio-hero-layout">
          <div className="studio-hero-intro">
            <h1 id="hero-title">
              Websites &amp;<br className="studio-hero-break" /> software{" "}
              <span>that work.</span>
            </h1>
            <p>We build websites, custom software, and cloud infrastructure from our studio in Nairobi.</p>
            <div className="studio-hero-actions">
              <a className="studio-button" href="#contact">
                Start a project <ArrowRight size={18} aria-hidden="true" />
              </a>
              <a className="studio-text-link" href="#portfolio">Explore our work</a>
            </div>
          </div>
          <div className="studio-hero-art">
            <Image src="/studio-w.webp" alt="" fill priority sizes="(max-width: 760px) 92vw, (max-width: 1440px) 50vw, 680px" />
          </div>
        </div>
      </section>
      <PortfolioSection />
      <ServicesSection />
      <ContactSection />
    </>
  )
}
