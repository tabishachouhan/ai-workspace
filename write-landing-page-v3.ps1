$content = @'
import { Link } from "react-router-dom";
import { Upload, MessageSquare, FileCheck, ArrowRight, Quote } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-stone-50">
      <nav className="max-w-6xl mx-auto px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-md bg-zinc-900 flex items-center justify-center">
            <span className="text-emerald-400 text-sm font-bold">AI</span>
          </div>
          <span className="text-lg font-bold text-zinc-900">Workspace</span>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/login" className="text-sm font-medium text-zinc-600 hover:text-zinc-900">Log in</Link>
          <Link to="/register" className="text-sm bg-zinc-900 text-white px-4 py-2 rounded-md font-medium hover:bg-zinc-800 transition">Get started</Link>
        </div>
      </nav>

      <section className="max-w-5xl mx-auto px-6 pt-16 pb-20 text-center">
        <div className="inline-flex items-center gap-2 bg-white text-zinc-600 text-xs font-medium px-3.5 py-1.5 rounded-full mb-8 border border-zinc-200">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
          AI-powered document workspace
        </div>
        <h1 className="text-5xl md:text-6xl font-bold text-zinc-900 leading-[1.1] mb-6 tracking-tight">
          Turn your documents into<br />something you can talk to
        </h1>
        <p className="text-lg text-zinc-500 max-w-xl mx-auto mb-10 leading-relaxed">
          Upload PDFs, notes, and files to a project. Ask questions in plain English
          and get answers grounded in your own content, with the source cited every time.
        </p>
        <div className="flex items-center justify-center gap-3 mb-20">
          <Link to="/register" className="group bg-zinc-900 text-white px-6 py-3 rounded-md font-semibold hover:bg-zinc-800 transition flex items-center gap-2">
            Start for free
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
          <Link to="/login" className="border border-zinc-300 bg-white text-zinc-700 px-6 py-3 rounded-md font-semibold hover:bg-zinc-50 transition">Sign in</Link>
        </div>

        <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-xl shadow-zinc-200/50 border border-zinc-200 overflow-hidden text-left">
          <div className="bg-zinc-50 border-b border-zinc-200 px-5 py-3 flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-zinc-300"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-zinc-300"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-zinc-300"></div>
            <span className="ml-2 text-xs text-zinc-400 font-medium">Research Notes</span>
          </div>
          <div className="p-6 space-y-4">
            <div className="flex justify-end">
              <div className="bg-zinc-900 text-white text-sm px-4 py-2.5 rounded-2xl rounded-tr-sm max-w-[75%]">
                What were the key findings in the Q3 report?
              </div>
            </div>
            <div className="flex justify-start">
              <div className="bg-zinc-50 border border-zinc-200 text-sm text-zinc-700 px-4 py-2.5 rounded-2xl rounded-tl-sm max-w-[85%]">
                Revenue grew 18% quarter-over-quarter, driven primarily by enterprise accounts <span className="text-emerald-700 font-semibold">[1]</span>. Customer churn dropped to 2.1% <span className="text-emerald-700 font-semibold">[2]</span>.
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-zinc-200 bg-white">
        <div className="max-w-6xl mx-auto px-6 py-24">
          <h2 className="text-3xl font-bold text-zinc-900 text-center mb-16">How it works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6">
              <div className="w-11 h-11 bg-zinc-900 rounded-lg flex items-center justify-center mb-5">
                <Upload className="w-5 h-5 text-emerald-400" />
              </div>
              <h3 className="font-bold text-zinc-900 mb-2">Upload your documents</h3>
              <p className="text-sm text-zinc-500 leading-relaxed">Drop in PDFs and other files to a project. They're automatically parsed and prepared for search.</p>
            </div>
            <div className="p-6">
              <div className="w-11 h-11 bg-zinc-900 rounded-lg flex items-center justify-center mb-5">
                <MessageSquare className="w-5 h-5 text-emerald-400" />
              </div>
              <h3 className="font-bold text-zinc-900 mb-2">Ask anything</h3>
              <p className="text-sm text-zinc-500 leading-relaxed">Chat naturally about what's inside your documents, the way you'd ask a colleague who read them.</p>
            </div>
            <div className="p-6">
              <div className="w-11 h-11 bg-zinc-900 rounded-lg flex items-center justify-center mb-5">
                <FileCheck className="w-5 h-5 text-emerald-400" />
              </div>
              <h3 className="font-bold text-zinc-900 mb-2">Get grounded answers</h3>
              <p className="text-sm text-zinc-500 leading-relaxed">Every answer is generated from your actual content, with citations back to the source.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 py-24 text-center">
        <Quote className="w-7 h-7 text-zinc-300 mx-auto mb-6" />
        <p className="text-2xl font-medium text-zinc-800 leading-snug">
          Stop re-reading the same document five times looking for one fact. Just ask.
        </p>
      </section>

      <section className="bg-zinc-900 py-20 text-center">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to stop searching and start asking?</h2>
          <p className="text-zinc-400 mb-8">Free to use. No credit card required.</p>
          <Link to="/register" className="inline-flex items-center gap-2 bg-emerald-500 text-zinc-900 px-6 py-3 rounded-md font-semibold hover:bg-emerald-400 transition">
            Create your workspace
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <footer className="border-t border-zinc-200 bg-white py-8 text-center text-sm text-zinc-400">
        AI Workspace
      </footer>
    </div>
  );
}
'@

$content | Set-Content -Path "apps\web\src\features\landing\LandingPage.jsx" -Encoding UTF8
Remove-Item "write-landing-page-v3.ps1"