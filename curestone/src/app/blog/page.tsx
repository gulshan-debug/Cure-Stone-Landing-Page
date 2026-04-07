import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Health Blog | Cure Stone — Kidney Stone & Urology Insights",
  description: "Expert articles on kidney stones, RIRS surgery, diet, prevention and urological health from Dr. Deepanshu Gupta's team.",
};

const posts = [
  {
    id: 1,
    category: "RIRS Surgery",
    tag: "Featured",
    title: "What Is RIRS? India's Most Advanced Kidney Stone Surgery Explained",
    excerpt: "Retrograde Intrarenal Surgery (RIRS) uses a flexible ureteroscope to reach stones inside the kidney without any cuts. Here's everything you need to know.",
    author: "Dr. Deepanshu Gupta",
    date: "April 2, 2025",
    readTime: "8 min read",
    slug: "#",
    color: "from-blue-500 to-indigo-600",
  },
  {
    id: 2,
    category: "Prevention",
    tag: "Popular",
    title: "7 Dietary Changes That Drastically Reduce Kidney Stone Risk",
    excerpt: "Oxalate-rich foods, insufficient hydration, and excess sodium are among the top contributors to stone formation. Learn how to eat smarter.",
    author: "Dr. Deepanshu Gupta",
    date: "March 18, 2025",
    readTime: "6 min read",
    slug: "#",
    color: "from-emerald-500 to-teal-600",
  },
  {
    id: 3,
    category: "Treatment",
    tag: "Guide",
    title: "RIRS vs ESWL vs PCNL: Which Kidney Stone Treatment Is Right for You?",
    excerpt: "A comprehensive comparison of the three main kidney stone procedures — stone size, recovery time, success rate, and who each is ideal for.",
    author: "Dr. Deepanshu Gupta",
    date: "March 5, 2025",
    readTime: "10 min read",
    slug: "#",
    color: "from-violet-500 to-purple-600",
  },
  {
    id: 4,
    category: "Symptoms",
    tag: "Quick Read",
    title: "Blood in Urine After Stone Treatment: When Is It Normal?",
    excerpt: "Haematuria (blood in urine) is common after kidney stone procedures. We break down what's expected and when to call your doctor immediately.",
    author: "Dr. Deepanshu Gupta",
    date: "February 20, 2025",
    readTime: "5 min read",
    slug: "#",
    color: "from-rose-500 to-pink-600",
  },
  {
    id: 5,
    category: "Nutrition",
    tag: "New",
    title: "The Kidney Stone Diet: What to Eat and What to Avoid in 2025",
    excerpt: "The right diet can prevent 80% of calcium oxalate stones. Here's the definitive evidence-based guide for patients and their families.",
    author: "Dr. Deepanshu Gupta",
    date: "April 1, 2025",
    readTime: "7 min read",
    slug: "#",
    color: "from-orange-500 to-amber-500",
  },
  {
    id: 6,
    category: "Prostate",
    tag: "Guide",
    title: "HoLEP vs TURP: What's the Best Prostate Surgery in India?",
    excerpt: "Holmium Laser Enucleation of the Prostate (HoLEP) is rapidly replacing TURP as the gold-standard BPH treatment. Here's why.",
    author: "Dr. Deepanshu Gupta",
    date: "January 30, 2025",
    readTime: "9 min read",
    slug: "#",
    color: "from-cyan-500 to-blue-500",
  },
];

const categories = ["All", "RIRS Surgery", "Prevention", "Treatment", "Symptoms", "Nutrition", "Prostate"];
const tagColors: Record<string, string> = {
  Featured: "bg-primary/10 text-primary border-primary/20",
  Popular: "bg-green-500/10 text-green-700 border-green-200",
  Guide: "bg-violet-500/10 text-violet-700 border-violet-200",
  "Quick Read": "bg-amber-500/10 text-amber-700 border-amber-200",
  New: "bg-rose-500/10 text-rose-700 border-rose-200",
};

export default function BlogPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-44 pb-28 bg-foreground overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(43,92,230,0.25),transparent_70%)]" />
        <div className="absolute top-20 right-0 w-80 h-80 bg-primary/15 blur-[100px] rounded-full pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10 text-center">
          <span className="inline-block px-4 py-1.5 mb-6 text-[10px] font-black tracking-widest text-primary bg-primary/10 border border-primary/20 rounded-full uppercase">Cure Stone Health Library</span>
          <h1 className="text-5xl md:text-7xl font-black tracking-tight text-white leading-[1.05] mb-6">
            Expert <span className="text-primary italic">Kidney Health</span> Insights
          </h1>
          <p className="text-lg text-white/60 font-medium max-w-2xl mx-auto mb-12">Evidence-based articles on kidney stones, urology, prevention and recovery — written by Dr. Deepanshu Gupta&apos;s clinical team.</p>

          {/* Search bar */}
          <div className="max-w-xl mx-auto relative">
            <input
              type="search"
              placeholder="Search articles — RIRS, diet, symptoms..."
              className="w-full px-6 py-4 pl-12 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-white/40 font-medium outline-none focus:bg-white/15 focus:border-primary transition-all backdrop-blur-sm"
            />
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
          </div>
        </div>
      </section>

      <main className="flex-grow bg-background py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 mb-16">
            {categories.map(cat => (
              <button key={cat} className={`px-5 py-2 rounded-full text-sm font-bold border transition-all hover:border-primary hover:text-primary ${cat === "All" ? "bg-primary text-white border-primary" : "bg-white text-slate-600 border-border/50"}`}>
                {cat}
              </button>
            ))}
          </div>

          {/* Featured Post */}
          <div className="mb-16 group cursor-pointer">
            <div className="grid md:grid-cols-2 gap-0 bg-white rounded-[2rem] overflow-hidden shadow-xl border border-border/30 hover:shadow-2xl hover:border-primary/20 transition-all duration-500">
              <div className={`bg-gradient-to-br ${posts[0].color} p-12 flex flex-col justify-end min-h-64`}>
                <span className={`self-start px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border mb-4 ${tagColors[posts[0].tag]}`}>{posts[0].tag}</span>
                <p className="text-[10px] font-black uppercase tracking-widest text-white/60 mb-2">{posts[0].category}</p>
                <h2 className="text-2xl md:text-3xl font-black text-white leading-tight">{posts[0].title}</h2>
              </div>
              <div className="p-10 flex flex-col justify-between">
                <div>
                  <p className="text-slate-500 font-medium leading-relaxed mb-6">{posts[0].excerpt}</p>
                  <div className="flex items-center gap-4 text-xs font-bold text-slate-400">
                    <span>✍️ {posts[0].author}</span>
                    <span>·</span>
                    <span>📅 {posts[0].date}</span>
                    <span>·</span>
                    <span>⏱ {posts[0].readTime}</span>
                  </div>
                </div>
                <Link href={posts[0].slug} className="inline-flex items-center gap-2 mt-8 text-primary font-black text-sm uppercase tracking-widest hover:gap-3 transition-all">
                  Read Article <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6"/></svg>
                </Link>
              </div>
            </div>
          </div>

          {/* Grid posts */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.slice(1).map(post => (
              <article key={post.id} className="group bg-white rounded-3xl overflow-hidden border border-border/30 shadow-sm hover:shadow-xl hover:border-primary/20 transition-all duration-400 flex flex-col">
                <div className={`bg-gradient-to-br ${post.color} h-44 p-6 flex flex-col justify-end`}>
                  <span className={`self-start px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${tagColors[post.tag]}`}>{post.tag}</span>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">{post.category}</p>
                  <h3 className="text-lg font-black text-slate-900 leading-tight mb-3 group-hover:text-primary transition-colors">{post.title}</h3>
                  <p className="text-sm text-slate-500 font-medium leading-relaxed mb-4 flex-grow">{post.excerpt}</p>
                  <div className="flex items-center justify-between pt-4 border-t border-border/30">
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                      <span>{post.date}</span><span>·</span><span>{post.readTime}</span>
                    </div>
                    <Link href={post.slug} className="text-primary text-xs font-black uppercase tracking-widest hover:tracking-[0.2em] transition-all flex items-center gap-1">
                      Read <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6"/></svg>
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Newsletter CTA */}
          <div className="mt-20 bg-foreground rounded-[2rem] p-12 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(43,92,230,0.3),transparent_70%)]" />
            <div className="relative z-10">
              <span className="inline-block px-4 py-1.5 mb-4 text-[10px] font-black tracking-widest text-primary bg-primary/10 border border-primary/20 rounded-full uppercase">Health Newsletter</span>
              <h3 className="text-3xl md:text-4xl font-black text-white mb-4">Stay Updated on Kidney Health</h3>
              <p className="text-white/60 font-medium mb-8 max-w-lg mx-auto">Get monthly insights on kidney stone prevention, new treatment research and patient success stories.</p>
              <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input type="email" placeholder="Enter your email" className="flex-grow px-5 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 outline-none focus:border-primary transition-all" />
                <button className="px-6 py-3 bg-primary text-white font-black rounded-xl hover:bg-primary-dark transition-all whitespace-nowrap">Subscribe Free</button>
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
