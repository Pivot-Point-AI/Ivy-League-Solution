import Link from "next/link";

export default function NotFound() {
  return (
    <section className="hero" style={{ paddingTop: 140, minHeight: "70vh", display: "flex", alignItems: "center" }}>
      <div className="container">
        <div className="hero-inner">
          <div className="eyebrow">404</div>
          <h1 className="hero-title font-display">
            Page Not <em>Found</em>
          </h1>
          <p className="hero-desc" style={{ maxWidth: 560 }}>
            The page you requested does not exist or has been moved.
          </p>
          <div className="hero-btns">
            <Link href="/" className="btn-primary">Back to Home</Link>
            <Link href="/contact" className="btn-ghost">Contact Us</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
