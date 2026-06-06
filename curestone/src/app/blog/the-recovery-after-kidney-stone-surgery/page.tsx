import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Recovery after Kidney Stone Surgery | CureStone",
  description: "Kidney stones are crystalline solid accumulations that develop in the kidney and result in acute discomfort and difficulty urinating. Surgery is required when",
  alternates: {
    canonical: "https://curestone.in/blog/the-recovery-after-kidney-stone-surgery",
  },
  openGraph: {
    title: "The Recovery after Kidney Stone Surgery | CureStone",
    description: "Kidney stones are crystalline solid accumulations that develop in the kidney and result in acute discomfort and difficulty urinating. Surgery is required when",
    url: "https://curestone.in/blog/the-recovery-after-kidney-stone-surgery",
    siteName: "CureStone",
    images: [{ url: "/og-image.svg", width: 1200, height: 630, alt: "The Recovery after Kidney Stone Surgery | CureStone" }],
    locale: "en_IN",
    type: "website",
  },
};


const blogSchema = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: "The Recovery after Kidney Stone Surgery | CureStone",
  description: "Kidney stones are crystalline solid accumulations that develop in the kidney and result in acute discomfort and difficulty urinating. Surgery is required when",
  image: "https://curestone.in/blogs/the-recovery-after-kidney-stone-surgery.jpg",
  url: "https://curestone.in/blog/the-recovery-after-kidney-stone-surgery",
  datePublished: "2024-01-01",
  dateModified: "2025-01-01",
  author: {
    "@type": "Person",
    name: "Dr. Anshul Goel",
    url: "https://curestone.in",
    jobTitle: "Senior Urologist",
  },
  publisher: {
    "@type": "Organization",
    name: "CureStone",
    logo: {
      "@type": "ImageObject",
      url: "https://curestone.in/PNG-Black-e1664728676618.png",
    },
  },
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": "https://curestone.in/blog/the-recovery-after-kidney-stone-surgery",
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://curestone.in",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Blog",
      item: "https://curestone.in/blog",
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "The Recovery after Kidney Stone Surgery | CureStone",
      item: "https://curestone.in/blog/the-recovery-after-kidney-stone-surgery",
    },
  ],
};

export default function BlogPage() {
  return (
    <div className="flex flex-col min-h-screen font-sans bg-white text-slate-900">
      <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      <style dangerouslySetInnerHTML={{
        __html: `
        .material-symbols-outlined { font-variation-settings: 'FILL' 0, 'wght' 300, 'GRAD' 0, 'opsz' 24; }
        .editorial-gradient { background: linear-gradient(135deg, #1e3a8a 0%, #1d4ed8 100%); }
      `}} />

      
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
        <Navbar />

      <main className="flex-grow pt-20">

        {/* Hero */}
        <section className="relative overflow-hidden py-20 lg:py-28 bg-slate-50">
          <div className="max-w-4xl mx-auto px-8 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-100 text-blue-900 text-xs font-bold uppercase tracking-widest mb-6">
              <span className="material-symbols-outlined text-sm">article</span> CureStone Blog
            </div>
            <h1 className="font-sans text-4xl lg:text-6xl font-extrabold text-blue-900 leading-tight tracking-tighter mb-6">
              The Recovery after Kidney Stone Surgery
            </h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-8">
              Kidney stones are crystalline solid accumulations that develop in the kidney and result in acute discomfort and difficulty urinating. Surgery is required when
            </p>
            <a
              href="https://thecurestone.com/kidney-stones/the-recovery-after-kidney-stone-surgery/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-blue-700 text-sm font-medium hover:underline"
            >
              <span className="material-symbols-outlined text-sm">open_in_new</span>
              Read original article
            </a>
          </div>
        </section>

        
          {/* Featured Image */}
          <div className="max-w-4xl mx-auto px-8 mb-12">
            <img
              src="/blogs/the-recovery-after-kidney-stone-surgery.jpg"
              alt="The Recovery after Kidney Stone Surgery"
              className="w-full rounded-3xl object-cover max-h-[480px]"
            />
          </div>

        {/* Article Content */}
        <article className="max-w-4xl mx-auto px-8 pb-24">
          <div className="prose prose-slate max-w-none">
            
              <p className="text-slate-600 leading-relaxed mb-6">Kidney stones are crystalline solid accumulations that develop in the kidney and result in acute discomfort and difficulty urinating. Surgery is required when stones are larger than normal to pass or continuously cause symptoms. A patient’s comprehension of the recovery period after stone surgery is essential to achieving the best possible outcome in healing and avoiding future incidents.</p>
              <p className="text-slate-600 leading-relaxed mb-6">Below are the different types of kidney stone removal surgeries:-</p>
              <p className="text-slate-600 leading-relaxed mb-6">1. Ureteroscopy (URS) with Laser Lithotripsy:</p>
              <h2 className="text-2xl font-bold text-blue-900 mb-4 mt-10">Different Types Of Kidney Stone Surgeries</h2>
              <p className="text-slate-600 leading-relaxed mb-6">Procedure: A slender scope is threaded through the urinary passage to locate and destroy stones using a laser.</p>
              <p className="text-slate-600 leading-relaxed mb-6">Recovery: Patients, in general, will be able to perform routine activities within a few days, mostly 2 or 3 days. Stents left temporarily to allow urine to flow may be mildly painful until removed. ​</p>
              <p className="text-slate-600 leading-relaxed mb-6">Procedure: Access and treatment of stones located inside the kidney are done using a flexible scope without any cuts being made.</p>
              <h2 className="text-2xl font-bold text-blue-900 mb-4 mt-10">2. Retrograde Intrarenal Surgery (RIRS)</h2>
              <p className="text-slate-600 leading-relaxed mb-6">Recovery: includes a short-time hospitalization — with patients being sent home within 24 hours or post one-night stay in the hospital. Return to normal activities is assumed to happen in a few days.</p>
              <p className="text-slate-600 leading-relaxed mb-6">Procedure: A large or complex kidney stone will be removed through the back by making an incision in the body.</p>
              <p className="text-slate-600 leading-relaxed mb-6">Recovery: Hospitalization could be as short as one to two days, while full recovery will take two to four weeks. Patients should be advised that heavy lifting is prohibited during this time.</p>
              <h2 className="text-2xl font-bold text-blue-900 mb-4 mt-10">3. Percutaneous Nephrolithotomy (PCNL)</h2>
              <p className="text-slate-600 leading-relaxed mb-6">Procedure: This is a non-invasive procedure that uses shock waves to reduce the size of the stones by breaking them into smaller fragments.</p>
              <p className="text-slate-600 leading-relaxed mb-6">Recovery: Most patients resume normal activities within two days and adequate hydration facilitates the excretion of stone fragments.</p>
              <p className="text-slate-600 leading-relaxed mb-6">The time taken for kidney stone surgery will rely on the type of procedure, the stone’s size and location, and how complex the case is. Below is a summary of the average time taken for each commonly performed procedure:</p>
          </div>

          {/* CTA */}
          <div className="editorial-gradient rounded-3xl p-12 text-center mt-16 relative overflow-hidden">
            <div className="relative z-10">
              <h2 className="font-sans text-3xl lg:text-4xl font-extrabold text-white mb-4 tracking-tighter">
                Ready to Be Stone-Free?
              </h2>
              <p className="text-blue-100 text-lg max-w-xl mx-auto mb-8 opacity-90">
                Consult with our expert urologists. Advanced laser procedures with 24-hour recovery.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button className="bg-amber-500 text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-blue-900 transition-all duration-300">
                  Book Free Consultation
                </button>
                <a className="text-white flex items-center gap-2 font-bold text-lg" href="tel:+918800263884">
                  <span className="material-symbols-outlined">call</span> +91 88002 63884
                </a>
              </div>
            </div>
            <div className="absolute -top-20 -right-20 w-80 h-80 bg-white/5 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-black/5 rounded-full blur-3xl"></div>
          </div>
        </article>

      </main>

      <Footer />
    </div>
  );
}
