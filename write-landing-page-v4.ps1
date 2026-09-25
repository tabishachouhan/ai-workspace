$content = @'
import { Link } from "react-router-dom";
import { Upload, Sparkles, MessageSquare, ArrowRight, ArrowDown, Quote, CheckCircle2, ShieldCheck } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-stone-50">
      <nav className="max-w-6xl mx-auto px-6 py-6 flex items-center justify-between border-b border-zinc-200">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-md bg-zinc-900 flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <span className="text-lg font-bold text-zinc-900">AI Workspace</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-600">
          <span>How it works</span>
          <span>Security</span>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/login" className="text-sm font-medium text-zinc-600 hover:text-zinc-900">Sign in</Link>
          <Link to="/register" className="text-sm bg-zinc-900 text-white px-4 py-2.5 rounded-md font-semibold hover:bg-zinc-800 transition flex items-center gap-1.5">
            Start for free
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </nav>

      <section className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <div className="flex items-center gap-2 text-blue-600 text-xs font-semibold tracking-widest uppercase mb-6">
            <span className="w-6 h-px bg-blue-600"></span>
            Intelligence, with receipts
          </div>
          <h1 className="text-6xl leading-[1.05] mb-6">
            <span className="font-serif text-zinc-900">Your documents.</span><br />
            <span className="font-serif italic text-blue-600">Finally understood.</span>
          </h1>
          <p className="text-lg text-zinc-500 mb-8 leading-relaxed max-w-md">
            Ask questions across PDFs, reports, and notes. Get a precise
            answer, grounded in your sources, with every citation attached.
          </p>
          <div className="flex items-center gap-6 mb-8">
            <Link to="/register" className="bg-zinc-900 text-white px-6 py-3 rounded-md font-semibold hover:bg-zinc-800 transition flex items-center gap-2">
              Start for free
              <ArrowRight className="w-4 h-4" />
            </Link>
            <span className="text-sm font-semibold text-zinc-700 flex items-center gap-1.5">
              See how it works
              <ArrowDown className="w-3.5 h-3.5" />
            </span>
          </div>
          <div className="flex items-center gap-6 text-sm text-zinc-500">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              No credit card
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              Private by default
            </span>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -top-4 right-4 z-10 bg-white border border-zinc-200 rounded-lg px-3 py-2 text-xs font-medium text-zinc-600 shadow-md flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            Private workspace
          </div>
          <div className="bg-zinc-950 rounded-xl shadow-2xl overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-zinc-800">
              <div className="w-2.5 h-2.5 rounded-full bg-zinc-700"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-zinc-700"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-zinc-700"></div>
              <span className="ml-2 text-xs text-zinc-400 font-medium tracking-wide">Q3 MARKET REVIEW</span>
              <span className="ml-auto text-xs text-emerald-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                Analysis complete
              </span>
            </div>
            <div className="p-5">
              <p className="text-xs text-blue-400 font-semibold tracking-wide mb-3">ASK WORKSPACE</p>
              <div className="bg-zinc-900 rounded-lg px-4 py-2.5 text-sm text-zinc-200 mb-4 max-w-xs ml-auto">
                What were the key findings in the Q3 report?
              </div>
              <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4">
                <p className="text-sm text-zinc-300 leading-relaxed">
                  Revenue grew <span className="text-white font-semibold">18% quarter-over-quarter</span>, led by enterprise expansion. Customer churn also fell to <span className="text-white font-semibold">2.1%</span>.
                </p>
                <div className="flex gap-2 mt-3">
                  <span className="text-xs bg-zinc-800 text-blue-400 px-2 py-1 rounded">[1] Page 14</span>
                  <span className="text-xs bg-zinc-800 text-blue-400 px-2 py-1 rounded">[2] Page 22</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-zinc-950 py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
            <span className="text-xs font-semibold tracking-widest uppercase text-zinc-500">From file to finding</span>
            <h2 className="text-5xl leading-tight text-right">
              <span className="font-serif text-white">Less searching.</span><br />
              <span className="font-serif italic text-blue-400">More knowing.</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="border border-zinc-800 rounded-xl p-6">
              <div className="flex items-center justify-between mb-8">
                <div className="w-10 h-10 bg-zinc-900 border border-zinc-800 rounded-lg flex items-center justify-center">
                  <Upload className="w-4 h-4 text-blue-400" />
                </div>
                <span className="text-xs text-zinc-600 font-medium">01</span>
              </div>
              <h3 className="font-semibold text-white mb-2">Bring your sources</h3>
              <p className="text-sm text-zinc-500 leading-relaxed">Drop in reports, notes, or PDFs. Your workspace stays organized and private.</p>
            </div>
            <div className="border border-zinc-800 rounded-xl p-6">
              <div className="flex items-center justify-between mb-8">
                <div className="w-10 h-10 bg-zinc-900 border border-zinc-800 rounded-lg flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-blue-400" />
                </div>
                <span className="text-xs text-zinc-600 font-medium">02</span>
              </div>
              <h3 className="font-semibold text-white mb-2">We map the context</h3>
              <p className="text-sm text-zinc-500 leading-relaxed">Workspace reads across every page, connecting claims, figures, and evidence.</p>
            </div>
            <div className="border border-zinc-800 rounded-xl p-6">
              <div className="flex items-center justify-between mb-8">
                <div className="w-10 h-10 bg-zinc-900 border border-zinc-800 rounded-lg flex items-center justify-center">
                  <MessageSquare className="w-4 h-4 text-blue-400" />
                </div>
                <span className="text-xs text-zinc-600 font-medium">03</span>
              </div>
              <h3 className="font-semibold text-white mb-2">Ask. Verify. Move on.</h3>
              <p className="text-sm text-zinc-500 leading-relaxed">Get a direct answer with citations, so you can check the source without searching again.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 py-28 text-center">
        <Quote className="w-8 h-8 text-blue-300 mx-auto mb-6" />
        <p className="font-serif text-3xl text-zinc-800 leading-snug">
          "Stop re-reading the same document five times looking for one fact. Just ask."
        </p>
      </section>

      <section className="bg-zinc-950 py-20 text-center">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="font-serif text-4xl text-white mb-4">Ready to stop searching?</h2>
          <p className="text-zinc-400 mb-8">Free to use. No credit card required.</p>
          <Link to="/register" className="inline-flex items-center gap-2 bg-white text-zinc-900 px-6 py-3 rounded-md font-semibold hover:bg-zinc-100 transition">
            Create your workspace
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <footer className="border-t border-zinc-200 bg-stone-50 py-8 text-center text-sm text-zinc-400">
        AI Workspace
      </footer>
    </div>
  );
}
'@

$content | Set-Content -Path "apps\web\src\features\landing\LandingPage.jsx" -Encoding UTF8
Remove-Item "write-landing-page-v4.ps1"