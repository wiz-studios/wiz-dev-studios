export default function TermsPage() {
  return (
    <article className="studio-shell studio-legal py-16">
      <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
        Terms & Conditions
      </h1>

      <p className="text-muted-foreground mb-4">
        Welcome to <span className="font-semibold">Wiz Dev Studios</span>. By
        accessing or purchasing from our website, you agree to the following
        terms and conditions.
      </p>

      <p className="text-muted-foreground mb-4">
        All purchases are subject to availability and confirmation of payment.
        We reserve the right to refuse service, update prices, or modify our
        policies at any time without prior notice.
      </p>

      <p className="text-muted-foreground mb-4">
        Customers are responsible for providing accurate information during
        checkout. Any misuse of our website may result in restricted access.
      </p>

      <p className="text-muted-foreground mb-4">
        If you have any questions about these Terms, please{" "}
        <a href="/#contact" className="studio-inline-link">
          reach out to us
        </a>
        .
      </p>

      <a
        href="/"
        className="studio-button studio-legal-return"
      >
        Back to home
      </a>
    </article>
  )
}
