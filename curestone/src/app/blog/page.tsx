import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import type { Metadata } from "next";
import Image from "next/image";
import { BLOG_POSTS } from "@/constants/blogs";

export const metadata: Metadata = {
  title: "Health Blog | Cure Stone — Kidney Stone & Urology Insights",
  description: "Expert articles on kidney stones, RIRS surgery, diet, prevention and urological health from Dr. Deepanshu Gupta's team.",
};

const posts = BLOG_POSTS;

const categories = ["All", "Kidney Stones", "Treatment Option", "Kidney", "Urological Problems", "Diet", "Staghorn"];
const tagColors: Record<string, string> = {
  Featured: "bg-primary/10 text-primary border-primary/20",
  Essential: "bg-green-500/10 text-green-700 border-green-200",
  Guide: "bg-violet-500/10 text-violet-700 border-violet-200",
  "Patient Guide": "bg-amber-500/10 text-amber-700 border-amber-200",
  Popular: "bg-rose-500/10 text-rose-700 border-rose-200",
};

export default function BlogPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-20 md:pt-44 md:pb-28 bg-foreground overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(43,92,230,0.25),transparent_70%)]" />
        <div className="absolute top-20 right-0 w-80 h-80 bg-primary/15 blur-[100px] rounded-full pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10 text-center">
          <span className="inline-block px-4 py-1.5 mb-6 text-[10px] font-black tracking-widest text-primary bg-primary/10 border border-primary/20 rounded-full uppercase">Cure Stone Health Library</span>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight text-white leading-[1.1] md:leading-[1.05] mb-6">
            Expert <span className="text-primary italic">Kidney Health</span> Insights
          </h1>
          <p className="text-base md:text-lg text-white/60 font-medium max-w-2xl mx-auto mb-12">Evidence-based articles on kidney stones, urology, prevention and recovery — written by Dr. Deepanshu Gupta&apos;s clinical team.</p>

          {/* Search bar */}
          <div className="max-w-xl mx-auto relative">
            <input
              type="search"
              placeholder="Search articles — RIRS, diet, symptoms..."
              className="w-full px-6 py-4 pl-12 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-white/40 font-medium outline-none focus:bg-white/15 focus:border-primary transition-all backdrop-blur-sm"
            />
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          </div>
        </div>
      </section>

      <main className="flex-grow bg-background py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">

          {/* Category Filter */}
          <div className="flex overflow-x-auto pb-4 md:pb-0 md:flex-wrap gap-2 mb-12 md:mb-16 no-scrollbar">
            {categories.map(cat => (
              <button key={cat} className={`whitespace-nowrap px-5 py-2 rounded-full text-xs md:text-sm font-bold border transition-all hover:border-primary hover:text-primary ${cat === "All" ? "bg-primary text-white border-primary" : "bg-white text-slate-600 border-border/50"}`}>
                {cat}
              </button>
            ))}
          </div>

          {/* Featured Post */}
          <div className="mb-16 group cursor-pointer">
            <div className="grid md:grid-cols-2 gap-0 bg-white rounded-[1.5rem] md:rounded-[2rem] overflow-hidden shadow-xl border border-border/30 hover:shadow-2xl hover:border-primary/20 transition-all duration-500">
              <div className="relative h-64 md:h-full overflow-hidden bg-slate-900 flex flex-col justify-center p-8 md:p-12">
                {posts[0].image ? (
                  <>
                    <Image
                      src={posts[0].image}
                      alt={posts[0].title}
                      fill
                      className="object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
                  </>
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent opacity-50" />
                )}
                <p className="text-[10px] font-black uppercase tracking-widest text-white/60 mb-2 relative z-10">{posts[0].category}</p>
                <h2 className="text-xl md:text-2xl lg:text-3xl font-black text-white leading-tight relative z-10">{posts[0].title}</h2>
              </div>
              <div className="p-8 md:p-10 flex flex-col justify-between">
                <div>
                  <p className="text-sm md:text-base text-slate-500 font-medium leading-relaxed mb-6">{posts[0].excerpt}</p>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-bold text-slate-400">
                    <span className="flex items-center gap-1.5">{posts[0].author}</span>
                    <span className="hidden xs:inline">·</span>
                    <span className="flex items-center gap-1.5"> {posts[0].date}</span>
                    <span className="hidden xs:inline">·</span>
                    <span className="flex items-center gap-1.5"> {posts[0].readTime}</span>
                  </div>
                </div>
                <Link href={`/blog/${posts[0].slug}`} className="inline-flex items-center gap-2 mt-8 text-primary font-black text-xs md:text-sm uppercase tracking-widest hover:gap-3 transition-all">
                  Read Article <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
                </Link>
              </div>
            </div>
          </div>

          {/* Grid posts */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.slice(1).map(post => (
              <article key={post.id} className="group bg-white rounded-3xl overflow-hidden border border-border/30 shadow-sm hover:shadow-xl hover:border-primary/20 transition-all duration-400 flex flex-col">
                <div className="relative h-48 bg-slate-100 overflow-hidden">
                  {post.image ? (
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
                       <span className="text-slate-200 font-bold tracking-widest uppercase text-[10px]">No Thumbnail</span>
                    </div>
                  )}
                  {post.tag && <span className={`absolute top-4 left-4 z-10 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${tagColors[post.tag] || 'bg-slate-100'}`}>{post.tag}</span>}
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">{post.category}</p>
                  <h3 className="text-lg font-black text-slate-900 leading-tight mb-3 group-hover:text-primary transition-colors">{post.title}</h3>
                  <p className="text-sm text-slate-500 font-medium leading-relaxed mb-4 flex-grow line-clamp-3">{post.excerpt}</p>
                  <div className="flex items-center justify-between pt-4 border-t border-border/30">
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                      <span>{post.date}</span><span>·</span><span>{post.readTime}</span>
                    </div>
                    <Link href={`/blog/${post.slug}`} className="text-primary text-xs font-black uppercase tracking-widest hover:tracking-[0.2em] transition-all flex items-center gap-1">
                      Read <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Newsletter CTA */}
          <div className="mt-20 bg-foreground rounded-[1.5rem] md:rounded-[2rem] p-8 md:p-12 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(43,92,230,0.3),transparent_70%)]" />
            <div className="relative z-10">
              <span className="inline-block px-4 py-1.5 mb-4 text-[10px] font-black tracking-widest text-primary bg-primary/10 border border-primary/20 rounded-full uppercase">Health Newsletter</span>
              <h3 className="text-2xl md:text-4xl font-black text-white mb-4">Stay Updated on Kidney Health</h3>
              <p className="text-sm md:text-base text-white/60 font-medium mb-8 max-w-lg mx-auto">Get monthly insights on kidney stone prevention, new treatment research and patient success stories.</p>
              <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input type="email" placeholder="Enter your email" className="flex-grow px-5 py-3.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 outline-none focus:border-primary transition-all text-sm" />
                <button className="px-6 py-3.5 bg-primary text-white font-black rounded-xl hover:bg-primary-dark transition-all whitespace-nowrap text-sm">Subscribe Free</button>
              </div>
              <p className="text-[10px] text-white/30 font-bold uppercase tracking-widest mt-4">No spam. Unsubscribe anytime.</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
