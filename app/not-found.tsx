import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";

export default function NotFound() {
  return (
    <div className="article-shell not-found">
      <main id="main-content">
        <h1 className="section-title">Page not found</h1>
        <p className="home-body">This page doesn't exist. You can find all my articles on the homepage.</p>
        <Link href="/#writings">Back to writings</Link>
      </main>
      <SiteFooter />
    </div>
  );
}
