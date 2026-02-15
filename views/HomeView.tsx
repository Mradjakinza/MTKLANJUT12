
import React from 'react';
import { 
  ArrowRight, 
  Calculator, 
  Zap, 
  BarChart3, 
  Database, 
  Cpu, 
  ShieldCheck, 
  Rocket 
} from 'lucide-react';
import { ViewState } from '../types';

interface HomeViewProps {
  onNavigate: (view: ViewState) => void;
}

const HomeView: React.FC<HomeViewProps> = ({ onNavigate }) => {
  const sectors = [
    {
      id: 'engineering',
      title: 'Engineering Simulation',
      desc: 'Analisis lintasan proyektil dan struktur mekanikal berbasis fungsi kuadratik.',
      icon: Zap,
      color: 'bg-blue-600'
    },
    {
      id: 'business',
      title: 'Business Optimization',
      desc: 'Maksimalkan profit dan analisis break-even menggunakan kurva pendapatan marginal.',
      icon: BarChart3,
      color: 'bg-emerald-600'
    },
    {
      id: 'data',
      title: 'Data & Informatics',
      desc: 'Simulasi kompleksitas algoritma dan curve fitting untuk prediksi tren data.',
      icon: Database,
      color: 'bg-indigo-600'
    }
  ];

  return (
    <div className="space-y-12 pb-20">
      <header className="relative p-8 md:p-16 rounded-[40px] bg-slate-900 overflow-hidden shadow-2xl border border-white/5">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px]" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-indigo-500/10 rounded-full blur-[120px]" />
        
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-blue-400 text-xs font-bold tracking-widest uppercase">
              <ShieldCheck size={14} />
              Industrial Grade Systems
            </div>
            <h1 className="text-4xl md:text-7xl font-extrabold text-white leading-[1.1]">
              Quadratic <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-300">Compute Engine.</span>
            </h1>
            <p className="text-slate-400 text-lg md:text-xl max-w-xl leading-relaxed">
              Implementasi algoritma Rumus ABC untuk solusi komputasi tingkat lanjut: Simulasi Fisika, Optimasi Bisnis, dan Analisis Performa Sistem.
            </p>
            <div className="flex flex-wrap gap-4">
              <button 
                onClick={() => onNavigate('calculator')}
                className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-bold transition-all shadow-xl shadow-blue-600/20 flex items-center gap-2"
              >
                Launch Engine <Rocket size={18} />
              </button>
              <button 
                onClick={() => onNavigate('engineering')}
                className="px-8 py-4 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-2xl font-bold transition-all"
              >
                View Simulations
              </button>
            </div>
          </div>
          
          <div className="hidden lg:grid grid-cols-2 gap-4">
            <div className="p-8 rounded-[32px] bg-white/5 border border-white/10 backdrop-blur-md">
              <Cpu className="text-blue-400 mb-4" size={32} />
              <h3 className="text-white font-bold mb-2">High Precision</h3>
              <p className="text-slate-500 text-sm">Floating point optimization untuk akurasi teknik.</p>
            </div>
            <div className="p-8 rounded-[32px] bg-white/5 border border-white/10 backdrop-blur-md mt-12">
              <Database className="text-indigo-400 mb-4" size={32} />
              <h3 className="text-white font-bold mb-2">Data Persistence</h3>
              <p className="text-slate-500 text-sm">Integrasi database untuk monitoring performa.</p>
            </div>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {sectors.map((s) => (
          <div 
            key={s.id}
            onClick={() => onNavigate(s.id as ViewState)}
            className="group p-8 rounded-[32px] bg-white border border-slate-200 hover:border-blue-300 hover:shadow-2xl transition-all cursor-pointer"
          >
            <div className={`w-14 h-14 rounded-2xl ${s.color} text-white flex items-center justify-center mb-6 shadow-lg shadow-black/5 group-hover:scale-110 transition-transform`}>
              <s.icon size={28} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">{s.title}</h3>
            <p className="text-slate-500 text-sm leading-relaxed mb-6">{s.desc}</p>
            <div className="flex items-center text-blue-600 font-bold text-sm gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              Explore Module <ArrowRight size={16} />
            </div>
          </div>
        ))}
      </div>

      <div className="p-10 rounded-[40px] bg-slate-100 border border-slate-200 flex flex-col md:flex-row items-center justify-between gap-8">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Siap diimplementasikan ke Industri?</h2>
          <p className="text-slate-500">QuadraMaster menyediakan API modular untuk integrasi sistem monitoring produksi.</p>
        </div>
        <button 
          onClick={() => onNavigate('about')}
          className="px-8 py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 transition-all shadow-lg"
        >
          Check Architecture
        </button>
      </div>
    </div>
  );
};

export default HomeView;
