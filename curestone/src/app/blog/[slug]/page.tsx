import { BLOG_POSTS, BlogPost } from "@/constants/blogs";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";
import Image from "next/image";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) return { title: "Article Not Found" };

  return {
    title: `${post.title} | Cure Stone Health Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = BLOG_POSTS.filter(
    (p) => p.category === post.category && p.slug !== post.slug
  ).slice(0, 3);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow pt-32 pb-20">
        <article className="max-w-4xl mx-auto px-6 lg:px-12">
          
          {/* Header */}
          <header className="mb-12">
            <nav className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 mb-8">
              <Link href="/blog" className="hover:text-primary transition-colors">Blog</Link>
              <span>/</span>
              <span className="text-primary">{post.category}</span>
            </nav>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 leading-[1.1] mb-8 tracking-tight">
              {post.title}
            </h1>

            {/* Featured Image */}
            <div className="relative h-[300px] md:h-[450px] w-full rounded-[2rem] overflow-hidden mb-12 shadow-2xl border border-slate-100">
               <Image 
                src={post.image} 
                alt={post.title} 
                fill 
                className="object-cover"
                priority
               />
               <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent" />
            </div>

            <div className="flex flex-wrap items-center gap-6 py-8 border-y border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-lg">👨‍⚕️</div>
                <div className="flex flex-col">
                  <span className="text-xs font-black text-slate-900 uppercase tracking-wider">{post.author}</span>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Lead Urologist</span>
                </div>
              </div>
              <div className="flex gap-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                <span>📅 {post.date}</span>
                <span>⏱ {post.readTime}</span>
              </div>
            </div>
          </header>

          {/* Content Area */}
          <div className="prose prose-slate prose-lg max-w-none mb-20 section-content">
            <p className="text-xl font-medium text-slate-600 leading-relaxed mb-12 italic border-l-4 border-primary pl-6 bg-primary/5 py-4 rounded-r-xl">
              {post.excerpt}
            </p>
            
            <div 
              className="blog-main-content"
              dangerouslySetInnerHTML={{ __html: post.content }} 
            />
          </div>

          {/* CTA Section */}
          <div className="bg-primary/5 rounded-3xl p-8 md:p-12 text-center mb-20 border border-primary/10">
            <h3 className="text-xl md:text-2xl font-black text-slate-900 mb-4">Have Questions About This Topic?</h3>
            <p className="text-slate-500 font-medium mb-8 max-w-md mx-auto">Get a personalized consultation with Dr. Deepanshu Gupta to discuss your specific urological concerns.</p>
            <Link 
              href="/book" 
              className="inline-block px-10 py-5 bg-primary text-white font-black rounded-2xl shadow-xl shadow-primary/30 hover:bg-primary-dark transition-all hover:scale-105"
            >
              📅 BOOK FREE CONSULTATION
            </Link>
          </div>

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <footer className="pt-20 border-t border-slate-100">
              <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-10">You Might Also Find Helpful</h4>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {relatedPosts.map(rp => (
                  <Link key={rp.id} href={`/blog/${rp.slug}`} className="group block">
                    <p className="text-[10px] font-black text-primary uppercase tracking-widest mb-2">{rp.category}</p>
                    <h5 className="text-base font-black text-slate-900 leading-tight group-hover:text-primary transition-colors">{rp.title}</h5>
                  </Link>
                ))}
              </div>
            </footer>
          )}
        </article>
      </main>

      <Footer />
      <style dangerouslySetInnerHTML={{ __html: blogStyles }} />
    </div>
  );
}

// Custom CSS for article content
const blogStyles = `
  .blog-main-content h2 {
    font-size: 1.875rem;
    font-weight: 900;
    color: #0f172a;
    margin-top: 2.5rem;
    margin-bottom: 1.25rem;
    letter-spacing: -0.025em;
    text-transform: uppercase;
  }
  .blog-main-content h3 {
    font-size: 1.5rem;
    font-weight: 800;
    color: #1e293b;
    margin-top: 2rem;
    margin-bottom: 1rem;
  }
  .blog-main-content p {
    margin-bottom: 1.5rem;
    line-height: 1.75;
    color: #475569;
  }
  .blog-main-content ul {
    margin-bottom: 1.5rem;
    list-style-type: disc;
    padding-left: 1.5rem;
    color: #475569;
  }
  .blog-main-content li {
    margin-bottom: 0.5rem;
  }
  .blog-main-content strong {
    color: #2b5ce6;
    font-weight: 800;
  }
`;
