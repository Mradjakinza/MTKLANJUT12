
import React from 'react';
import { BookOpen, Info, Brain, Lightbulb, CheckCircle2, ChevronRight } from 'lucide-react';

const TheoryView: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-12 pb-20">
      <header className="text-center">
        <div className="inline-flex p-3 rounded-2xl bg-indigo-100 text-indigo-600 mb-6">
          <BookOpen size={32} />
        </div>
        <h1 className="text-4xl font-extrabold text-slate-900 mb-4">Materi Persamaan Kuadrat</h1>
        <p className="text-slate-500 text-lg">Memahami dasar-dasar Rumus ABC dan Diskriminan dengan cara yang lebih modern.</p>
      </header>

      <section className="bg-white p-8 md:p-12 rounded-3xl border border-slate-200 shadow-xl space-y-8">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center text-sm">01</span>
            Bentuk Umum
          </h2>
          <p className="text-slate-600 leading-relaxed">
            Persamaan kuadrat adalah suatu persamaan yang pangkat tertinggi variabelnya adalah dua. Bentuk umum dari persamaan kuadrat dalam variabel <i>x</i> adalah:
          </p>
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 text-center text-3xl font-serif font-bold text-slate-800">
            ax² + bx + c = 0
          </div>
          <div className="flex flex-wrap gap-4 text-sm font-medium">
            <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700">a ≠ 0</span>
            <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-700">a, b, c ∈ Bilangan Real</span>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-100 space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center text-sm">02</span>
            Rumus ABC (Kuadratik)
          </h2>
          <p className="text-slate-600 leading-relaxed">
            Rumus ABC digunakan untuk mencari akar-akar (nilai x) dari sebuah persamaan kuadrat. Rumus ini dianggap yang paling fleksibel karena dapat menyelesaikan semua jenis persamaan kuadrat.
          </p>
          <div className="p-8 rounded-3xl bg-slate-900 text-white text-center shadow-lg transform hover:scale-[1.02] transition-transform">
            <div className="text-4xl font-serif mb-4">
              x = <span className="inline-block align-middle text-center">
                <span className="block border-b border-white pb-1">-b ± √b² - 4ac</span>
                <span className="block pt-1">2a</span>
              </span>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-100 space-y-6">
          <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center text-sm">03</span>
            Peran Diskriminan (D)
          </h2>
          <p className="text-slate-600 leading-relaxed">
            Bagian di bawah akar dalam rumus ABC, yaitu <b>D = b² - 4ac</b>, disebut dengan Diskriminan. Nilai ini menentukan jenis dari akar-akar persamaan tersebut:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-100">
              <div className="font-bold text-emerald-700 text-lg mb-2">D &gt; 0</div>
              <p className="text-sm text-emerald-600/80">Persamaan memiliki <b>dua akar real</b> yang berbeda.</p>
            </div>
            <div className="p-6 rounded-2xl bg-blue-50 border border-blue-100">
              <div className="font-bold text-blue-700 text-lg mb-2">D = 0</div>
              <p className="text-sm text-blue-600/80">Persamaan memiliki <b>satu akar real</b> (akar kembar).</p>
            </div>
            <div className="p-6 rounded-2xl bg-amber-50 border border-amber-100">
              <div className="font-bold text-amber-700 text-lg mb-2">D &lt; 0</div>
              <p className="text-sm text-amber-600/80">Persamaan memiliki <b>akar imajiner</b> (bilangan kompleks).</p>
            </div>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-8 rounded-3xl bg-indigo-600 text-white space-y-4 shadow-xl shadow-indigo-500/20">
          <div className="flex items-center gap-3">
            <Brain className="text-indigo-200" />
            <h3 className="text-xl font-bold">Kenapa Belajar Ini?</h3>
          </div>
          <p className="text-indigo-100 leading-relaxed">
            Persamaan kuadrat digunakan dalam fisika untuk menghitung lintasan benda (parabola), dalam ekonomi untuk optimalisasi keuntungan, dan dalam arsitektur untuk desain lengkungan yang presisi.
          </p>
        </div>

        <div className="p-8 rounded-3xl bg-white border border-slate-200 space-y-4 shadow-md">
          <div className="flex items-center gap-3">
            <Lightbulb className="text-amber-500" />
            <h3 className="text-xl font-bold text-slate-900">Tips Cepat</h3>
          </div>
          <ul className="space-y-3">
            {[
              "Pastikan nilai 'a' tidak sama dengan nol.",
              "Perhatikan tanda positif/negatif pada koefisien.",
              "Gunakan kurung saat menghitung kuadrat b negatif.",
              "Cek nilai D terlebih dahulu sebelum menghitung akar."
            ].map((tip, i) => (
              <li key={i} className="flex items-center gap-2 text-slate-600 text-sm">
                <CheckCircle2 size={16} className="text-blue-500 shrink-0" />
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <div className="p-8 rounded-3xl bg-slate-900 text-white flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="text-xl font-bold">Paham teorinya?</h3>
          <p className="text-slate-400">Uji pemahamanmu sekarang dengan tantangan interaktif.</p>
        </div>
        <button className="px-6 py-3 bg-blue-600 rounded-xl font-bold hover:bg-blue-700 transition-colors flex items-center gap-2">
          Mulai Quiz
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
};

export default TheoryView;
