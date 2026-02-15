
import React from 'react';
import { ShieldCheck, Server, Cpu, Database, Layout, Code2, GraduationCap, Workflow } from 'lucide-react';

const AboutView: React.FC = () => {
  const architecture = [
    { name: 'Frontend', tech: 'React 19, Tailwind CSS', icon: Layout, color: 'bg-blue-100 text-blue-600' },
    { name: 'Logic Engine', tech: 'TypeScript / Rumus ABC Algorithms', icon: Cpu, color: 'bg-purple-100 text-purple-600' },
    { name: 'Visualization', tech: 'Recharts (Chart.js)', icon: Workflow, color: 'bg-orange-100 text-orange-600' },
    { name: 'Persistence', tech: 'Firebase / LocalStorage Sync', icon: Database, color: 'bg-emerald-100 text-emerald-600' },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-12 pb-24">
      <header className="text-center space-y-4">
        <div className="inline-block p-4 bg-blue-600 text-white rounded-3xl shadow-xl shadow-blue-500/20">
          <GraduationCap size={40} />
        </div>
        <h1 className="text-4xl font-extrabold text-slate-900">Dokumentasi Projek</h1>
        <p className="text-slate-500 text-lg">Transparansi alur logika dan arsitektur pengembangan QuadraMaster.</p>
      </header>

      <section className="bg-white p-8 md:p-12 rounded-[40px] border border-slate-200 shadow-xl space-y-10">
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
            <ShieldCheck className="text-blue-600" />
            Tujuan Akademik
          </h2>
          <p className="text-slate-600 leading-relaxed">
            Proyek ini dikembangkan untuk mendemonstrasikan bagaimana konsep matematika teoretis (Rumus ABC) dapat diintegrasikan ke dalam sistem perangkat lunak modern. Tujuannya adalah menciptakan alat bantu belajar yang tidak hanya menghitung, tetapi juga memberikan pemahaman visual dan pengalaman interaktif bagi siswa.
          </p>
        </div>

        <div className="pt-10 border-t border-slate-100 space-y-8">
          <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
            <Code2 className="text-blue-600" />
            Alur Logika Sistem (Algorithm)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200">
              <h3 className="font-bold text-slate-800 mb-3">1. Input & Validasi</h3>
              <p className="text-sm text-slate-500">Menerima koefisien a, b, dan c. Memastikan 'a' tidak sama dengan nol untuk menjaga sifat persamaan kuadrat.</p>
            </div>
            <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200">
              <h3 className="font-bold text-slate-800 mb-3">2. Perhitungan Diskriminan</h3>
              <p className="text-sm text-slate-500">Menghitung D = b² - 4ac untuk menentukan jumlah dan sifat akar-akar persamaan.</p>
            </div>
            <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200">
              <h3 className="font-bold text-slate-800 mb-3">3. Penyelesaian Akar</h3>
              <p className="text-sm text-slate-500">Menggunakan rumus kuadratik untuk mengekstrak nilai x1 dan x2, termasuk penanganan bilangan imajiner.</p>
            </div>
            <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200">
              <h3 className="font-bold text-slate-800 mb-3">4. Transformasi Data</h3>
              <p className="text-sm text-slate-500">Mengonversi hasil matematika menjadi koordinat grafik (x,y) untuk visualisasi kurva parabola.</p>
            </div>
          </div>
        </div>

        <div className="pt-10 border-t border-slate-100 space-y-8">
          <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
            <Server className="text-blue-600" />
            Arsitektur Aplikasi
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {architecture.map((item, idx) => (
              <div key={idx} className="p-6 rounded-3xl bg-white border border-slate-200 text-center space-y-3">
                <div className={`w-12 h-12 rounded-2xl ${item.color} flex items-center justify-center mx-auto`}>
                  <item.icon size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">{item.name}</h4>
                  <p className="text-[10px] text-slate-400 font-bold uppercase">{item.tech}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="p-8 rounded-[30px] bg-slate-900 text-white flex flex-col md:flex-row items-center gap-8 border border-white/10">
        <div className="shrink-0">
          <div className="w-16 h-16 rounded-2xl bg-blue-600 flex items-center justify-center shadow-lg">
            <Workflow size={32} />
          </div>
        </div>
        <div>
          <h3 className="text-xl font-bold mb-2">Rekomendasi Pengembangan</h3>
          <p className="text-slate-400 text-sm leading-relaxed">
            Untuk pengembangan lebih lanjut, disarankan penambahan fitur OCR (Optical Character Recognition) untuk membaca soal dari foto, serta integrasi AI untuk penjelasan materi yang lebih personal.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutView;
