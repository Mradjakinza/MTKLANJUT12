
import React, { useState, useMemo } from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  ReferenceLine,
  ComposedChart,
  Scatter
} from 'recharts';
import { HelpCircle, RefreshCw, Layers, TrendingUp, AlertCircle, CheckCircle2, Calculator, Target } from 'lucide-react';
import { QuadraticResult } from '../types';

const CalculatorView: React.FC = () => {
  const [a, setA] = useState<number>(1);
  const [b, setB] = useState<number>(2);
  const [c, setC] = useState<number>(1);

  const result = useMemo((): QuadraticResult => {
    const steps: string[] = [];
    
    if (a === 0) {
      return {
        a, b, c,
        discriminant: 0,
        x1: 'Undefined',
        x2: 'Undefined',
        type: 'not-quadratic',
        steps: ['Karena a = 0, ini bukan merupakan persamaan kuadrat melainkan persamaan linier.']
      };
    }

    const D = (b * b) - (4 * a * c);
    steps.push(`1. Hitung Diskriminan (D): D = b² - 4ac`);
    steps.push(`D = (${b})² - 4(${a})(${c}) = ${b * b} - ${4 * a * c} = ${D}`);

    let x1: number | string, x2: number | string;
    let type: QuadraticResult['type'];

    if (D > 0) {
      type = 'two-real';
      x1 = (-b + Math.sqrt(D)) / (2 * a);
      x2 = (-b - Math.sqrt(D)) / (2 * a);
      steps.push(`2. Karena D > 0, terdapat dua akar real berbeda.`);
      steps.push(`x1 = (-b + √D) / 2a = (${-b} + ${Math.sqrt(D).toFixed(2)}) / ${2 * a} = ${(x1 as number).toFixed(4)}`);
      steps.push(`x2 = (-b - √D) / 2a = (${-b} - ${Math.sqrt(D).toFixed(2)}) / ${2 * a} = ${(x2 as number).toFixed(4)}`);
    } else if (D === 0) {
      type = 'one-real';
      x1 = -b / (2 * a);
      x2 = x1;
      steps.push(`2. Karena D = 0, terdapat satu akar real kembar.`);
      steps.push(`x = -b / 2a = ${-b} / ${2 * a} = ${(x1 as number).toFixed(4)}`);
    } else {
      type = 'complex';
      const real = -b / (2 * a);
      const imag = Math.sqrt(-D) / (2 * a);
      x1 = `${real.toFixed(2)} + ${imag.toFixed(2)}i`;
      x2 = `${real.toFixed(2)} - ${imag.toFixed(2)}i`;
      steps.push(`2. Karena D < 0, terdapat dua akar imajiner (kompleks).`);
      steps.push(`x1 = ${real.toFixed(2)} + ${imag.toFixed(2)}i`);
      steps.push(`x2 = ${real.toFixed(2)} - ${imag.toFixed(2)}i`);
    }

    return { a, b, c, discriminant: D, x1, x2, type, steps };
  }, [a, b, c]);

  const { graphData, rootPoints } = useMemo(() => {
    const data = [];
    const roots = [];
    const vertexX = -b / (2 * a);
    const range = 10;
    
    for (let x = vertexX - range; x <= vertexX + range; x += 0.5) {
      const y = a * x * x + b * x + c;
      data.push({ x: Number(x.toFixed(1)), y: Number(y.toFixed(2)) });
    }

    // Add roots to highlights if real
    if (typeof result.x1 === 'number') {
      roots.push({ x: result.x1, y: 0, name: 'x1' });
    }
    if (typeof result.x2 === 'number' && result.x1 !== result.x2) {
      roots.push({ x: result.x2, y: 0, name: 'x2' });
    }

    return { graphData: data, rootPoints: roots };
  }, [a, b, c, result]);

  const reset = () => {
    setA(1); setB(0); setC(0);
  };

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
            <Calculator className="text-blue-600" />
            Kalkulator Rumus ABC
          </h1>
          <p className="text-slate-500 mt-1">Masukkan koefisien untuk mendapatkan solusi langkah demi langkah.</p>
        </div>
        <button 
          onClick={reset}
          className="flex items-center gap-2 px-4 py-2 bg-slate-200 hover:bg-slate-300 rounded-xl transition-colors text-slate-700 font-semibold"
        >
          <RefreshCw size={18} />
          Reset Nilai
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Inputs */}
        <div className="lg:col-span-4 space-y-6">
          <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-xl shadow-slate-200/50">
            <div className="text-center mb-8">
              <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">Bentuk Umum</span>
              <div className="mt-2 text-2xl font-mono font-bold text-slate-800">
                ax² + bx + c = 0
              </div>
            </div>

            <div className="space-y-6">
              <div className="relative">
                <label className="text-sm font-bold text-slate-500 mb-2 block">Koefisien a</label>
                <input 
                  type="number"
                  value={a}
                  onChange={(e) => setA(Number(e.target.value))}
                  className="w-full p-4 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-blue-500 focus:bg-white transition-all outline-none font-bold text-lg"
                />
              </div>
              <div className="relative">
                <label className="text-sm font-bold text-slate-500 mb-2 block">Koefisien b</label>
                <input 
                  type="number"
                  value={b}
                  onChange={(e) => setB(Number(e.target.value))}
                  className="w-full p-4 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-blue-500 focus:bg-white transition-all outline-none font-bold text-lg"
                />
              </div>
              <div className="relative">
                <label className="text-sm font-bold text-slate-500 mb-2 block">Konstanta c</label>
                <input 
                  type="number"
                  value={c}
                  onChange={(e) => setC(Number(e.target.value))}
                  className="w-full p-4 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-blue-500 focus:bg-white transition-all outline-none font-bold text-lg"
                />
              </div>
            </div>

            {a === 0 && (
              <div className="mt-6 flex items-start gap-3 p-4 bg-amber-50 rounded-2xl border border-amber-200 text-amber-800 text-sm">
                <AlertCircle className="shrink-0 mt-0.5" size={18} />
                <p><strong>Peringatan:</strong> Nilai <b>a</b> tidak boleh 0 dalam persamaan kuadrat.</p>
              </div>
            )}
          </div>

          <div className="p-6 rounded-3xl bg-blue-50 border border-blue-100">
            <h3 className="flex items-center gap-2 font-bold text-blue-900 mb-3">
              <HelpCircle size={18} />
              Info Diskriminan (D)
            </h3>
            <div className="space-y-2 text-sm text-blue-800/80">
              <div className="flex justify-between border-b border-blue-200/50 pb-2">
                <span>D &gt; 0</span>
                <span className="font-bold">2 Akar Real</span>
              </div>
              <div className="flex justify-between border-b border-blue-200/50 py-2">
                <span>D = 0</span>
                <span className="font-bold">1 Akar Real</span>
              </div>
              <div className="flex justify-between pt-2">
                <span>D &lt; 0</span>
                <span className="font-bold">2 Akar Imajiner</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Visualization & Results */}
        <div className="lg:col-span-8 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-md">
              <p className="text-xs font-bold text-slate-400 uppercase mb-1">Diskriminan</p>
              <div className="text-3xl font-bold text-slate-900">{result.discriminant.toFixed(2)}</div>
            </div>
            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-md">
              <p className="text-xs font-bold text-slate-400 uppercase mb-1">Status Akar</p>
              <div className={`text-xl font-bold capitalize ${
                result.type === 'complex' ? 'text-amber-600' : 'text-emerald-600'
              }`}>
                {result.type === 'two-real' ? 'Dua Akar Real' : result.type === 'one-real' ? 'Satu Akar Kembar' : result.type === 'complex' ? 'Akar Imajiner' : 'Bukan Kuadrat'}
              </div>
            </div>
          </div>

          <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-xl overflow-hidden">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <TrendingUp className="text-blue-600" size={24} />
                Visualisasi Grafik Parabola
              </h3>
              <div className="flex items-center gap-4 text-xs font-bold text-slate-400">
                <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-blue-500"></div> f(x)</div>
                <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-red-500"></div> Akar (Roots)</div>
              </div>
            </div>
            
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={graphData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                  <XAxis dataKey="x" type="number" domain={['auto', 'auto']} />
                  <YAxis />
                  <Tooltip 
                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  />
                  <ReferenceLine y={0} stroke="#cbd5e1" strokeWidth={2} />
                  <ReferenceLine x={0} stroke="#cbd5e1" strokeWidth={2} />
                  <Line 
                    type="monotone" 
                    dataKey="y" 
                    stroke="#2563eb" 
                    strokeWidth={4} 
                    dot={false}
                    animationDuration={1000}
                  />
                  {rootPoints.length > 0 && (
                    <Scatter 
                      name="Akar" 
                      data={rootPoints} 
                      fill="#ef4444" 
                      shape={(props: any) => {
                        return (
                          <circle cx={props.cx} cy={props.cy} r={6} fill="#ef4444" stroke="#fff" strokeWidth={2} />
                        );
                      }}
                    />
                  )}
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="p-8 rounded-3xl bg-slate-900 text-white shadow-2xl">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
              <Layers className="text-blue-400" />
              Langkah Penyelesaian
            </h3>
            <div className="space-y-6">
              {result.steps.map((step, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center shrink-0 font-bold text-sm">
                    {idx + 1}
                  </div>
                  <p className="text-slate-300 py-1 leading-relaxed">{step}</p>
                </div>
              ))}
              
              <div className="mt-8 p-6 rounded-2xl bg-white/5 border border-white/10 flex flex-col md:flex-row gap-6 md:items-center justify-between">
                <div>
                  <p className="text-sm font-bold text-blue-400 uppercase tracking-widest mb-2">Akar Solusi</p>
                  <div className="flex flex-wrap gap-4">
                    <div className="px-4 py-2 rounded-xl bg-white/10 font-mono text-lg">x₁ = {typeof result.x1 === 'number' ? result.x1.toFixed(4) : result.x1}</div>
                    <div className="px-4 py-2 rounded-xl bg-white/10 font-mono text-lg">x₂ = {typeof result.x2 === 'number' ? result.x2.toFixed(4) : result.x2}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-emerald-400 font-bold">
                  <CheckCircle2 size={24} />
                  <span>Solusi Terverifikasi</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalculatorView;
