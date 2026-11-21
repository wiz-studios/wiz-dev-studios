import Link from "next/link"

export function Footer() {
  return (
    <footer className="studio-footer">
      <div className="studio-shell">
        <div className="studio-footer-main">
          <Link href="/" className="studio-brand">
            <span className="studio-mark" aria-hidden="true"><i /><i /></span>
            <span translate="no">Wiz Dev Studios</span>
          </Link>
          <div className="studio-footer-links">
            <a href="https://github.com/wiz-studios/">GitHub</a>
            <a href="https://twitter.com/_wiz001">X / Twitter</a>
            <a href="mailto:wiz.dev.studios@gmail.com">Email</a>
          </div>
        </div>
        <div className="studio-footer-meta">
          <p>© {new Date().getUTCFullYear()} Wiz Dev Studios</p>
          <div className="studio-footer-links">
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
