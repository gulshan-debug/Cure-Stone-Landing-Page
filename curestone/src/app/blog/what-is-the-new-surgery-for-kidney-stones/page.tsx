import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "What is the New Surgery for Kidney Stones? | CureStone",
  description: "The incidence of kidney stones is one of the most prevalent urological issues because millions of individuals across the globe develop it on a yearly basis.",
  alternates: {
    canonical: "https://curestone.in/blog/what-is-the-new-surgery-for-kidney-stones",
  },
  openGraph: {
    title: "What is the New Surgery for Kidney Stones? | CureStone",
    description: "The incidence of kidney stones is one of the most prevalent urological issues because millions of individuals across the globe develop it on a yearly basis.",
    url: "https://curestone.in/blog/what-is-the-new-surgery-for-kidney-stones",
    siteName: "CureStone",
    images: [{ url: "/og-image.svg", width: 1200, height: 630, alt: "What is the New Surgery for Kidney Stones? | CureStone" }],
    locale: "en_IN",
    type: "website",
  },
};


const blogSchema = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: "What is the New Surgery for Kidney Stones? | CureStone",
  description: "The incidence of kidney stones is one of the most prevalent urological issues because millions of individuals across the globe develop it on a yearly basis.",
  image: "https://curestone.in/blogs/what-is-the-new-surgery-for-kidney-stones.jpg",
  url: "https://curestone.in/blog/what-is-the-new-surgery-for-kidney-stones",
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
    "@id": "https://curestone.in/blog/what-is-the-new-surgery-for-kidney-stones",
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
      name: "What is the New Surgery for Kidney Stones? | CureStone",
      item: "https://curestone.in/blog/what-is-the-new-surgery-for-kidney-stones",
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
              What is the New Surgery for Kidney Stones?
            </h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-8">
              The incidence of kidney stones is one of the most prevalent urological issues because millions of individuals across the globe develop it on a yearly basis.
            </p>
            <a
              href="https://thecurestone.com/kidney/what-is-the-new-surgery-for-kidney-stones/"
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
              src="/blogs/what-is-the-new-surgery-for-kidney-stones.jpg"
              alt="What is the New Surgery for Kidney Stones?"
              className="w-full rounded-3xl object-cover max-h-[480px]"
            />
          </div>

        {/* Article Content */}
        <article className="max-w-4xl mx-auto px-8 pb-24">
          <div className="prose prose-slate max-w-none">
            
              <p className="text-slate-600 leading-relaxed mb-6">The incidence of kidney stones is one of the most prevalent urological issues because millions of individuals across the globe develop it on a yearly basis. These are mineral and salts deposits that may cause severe pains, difficulties in urinating and at worst lead to complications when it is not treated. Smaller stones have a chance to pass by medication and hydration; whereas, bigger stones sometimes need an operative procedure.</p>
              <p className="text-slate-600 leading-relaxed mb-6">Surgery on kidney stones has increased over the years. Patients do not need to make big incisions and extend recovery processes anymore. Modern operations are aimed towards less invasive surgeries, a quicker recovery, and increased success rate today. When it comes to the question of what the so-called new surgery on kidney stones involves, we should consider the latest urologic methods in a bit more detail.</p>
              <p className="text-slate-600 leading-relaxed mb-6">The previously used treatment option of large or complex kidney stones was the open surgery. This required a very big cut in the back or abdomen and as a result it took longer time in hospital, caused much pain and carried with it high chances of complications.</p>
              <h2 className="text-2xl font-bold text-blue-900 mb-4 mt-10">The Old vs. The Modern Surgeries on Kidney Stones</h2>
              <p className="text-slate-600 leading-relaxed mb-6">Nevertheless, technologies have altered the approach of treating kidney stones by urologists. The contemporary solution entails endoscopic and minimally invasive methods with the application of high-tech equipment and images that enable the physician to treat stones efficiently with less damage to the body.</p>
              <p className="text-slate-600 leading-relaxed mb-6">This is among the most trendy contemporary methods. A slender, steerable scope is known as a ureteroscope and is inserted inside the urinary tract to find the stone. After identification, laser is then used to blast the stone into small pieces that are broken and can be flushed away or they can be removed.</p>
              <p className="text-slate-600 leading-relaxed mb-6">Advantages: No incision, little pain, quick healing, and in most cases, the patients get discharged within 24 Hours
                .</p>
              <p className="text-slate-600 leading-relaxed mb-6">Ideal in: Stones are found in ureter or kidney.</p>
              <p className="text-slate-600 leading-relaxed mb-6">RIRS has become one of the most sophisticated and popular “new surgeries” applied to kidney stones. The ureteroscope to be used is a fine tube, which is inserted into a kidney, and the finer technology of lasers is applied and used in the precise fragmentation of the stones into particles like dust.</p>
              <p className="text-slate-600 leading-relaxed mb-6">Advantages: There is no external incision and it is very safe, has faster recuperation, and it is effective on inaccessible stones.</p>
              <p className="text-slate-600 leading-relaxed mb-6">Ideal uses: Small- and medium-sized renal stones (in difficult to reach areas).</p>
              <p className="text-slate-600 leading-relaxed mb-6">3. Mini Percutaneous Nephrolithotomy (Mini PCNL)</p>
              <p className="text-slate-600 leading-relaxed mb-6">The surgery of large kidney stones which is PCNL is old established surgery but nevertheless the newly developed Mini PCNL surgery has changed the procedure. Rather than having a big incision, the back is punctured with a very small hole to enter into the kidney. It uses a small camera and instruments which are used to crack the stone and extract it.</p>
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
