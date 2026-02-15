
import React, { useState, useMemo } from 'react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine 
} from 'recharts';
import { Zap, Target, Wind, Rocket, HelpCircle, Activity } from 'lucide-react';

const EngineeringView: React.FC = () => {
  const [velocity, setVelocity] = useState(25); // m/s
  const [angle, setAngle] = useState(45); // degrees
  const [gravity, setGravity] = useState(9.8); // m/s^2

  const simulationData = useMemo(() => {
    const angleRad = (angle * Math.PI) / 180;
    const v0x = velocity * Math.cos(angleRad);
    const v0y = velocity * Math.sin(angleRad);
    
    // Time of flight: y = v0y*t - 0.5*g*t^2 = 0 => t(v0y - 0.5gt) = 0 => t = 2*v0y/g
    const totalTime = (2 * v0y) / gravity;
    
    const data = [];
    for (let t = 0; t <= totalTime; t += totalTime / 40) {
      const x = v0x * t;
      const y = v0y * t - 0.5 * gravity * t * t;
      data.push({ 
        x: Number(x.toFixed(2)), 
        y: Number(y.toFixed(2)),
        t: Number(t.toFixed(2))
      });
    }
    
    return {
      points: data,
      maxDistance: v0x * totalTime,
      maxHeight: (v0y * v0y) / (2 * gravity),
      totalTime
    };
  }, [velocity, angle, gravity]);

  return (
    <div className="space-y-8 pb-20">
      <header className="flex items-center gap-4">
        <div className="p-3 bg-blue-600 text-white rounded-2xl">
          <Zap size={24} />
        </div>
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900">Engineering Physics</h1>
          <p className="text-slate-500">Simulasi Gerak Parabola (Proyektil) berbasis Komputasi Kuadratik.</p>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4 space-y-6">
          <div className="p-8 rounded-[32px] bg-white border border-slate-200 shadow-xl shadow-slate-200/50">
            <h3 className="font-bold text-slate-900 mb-6 flex items-center gap-2">
              <Activity size={18} /> Parameters
            </h3>
            
            <div className="space-y-6">
              <div>
                <label className="flex justify-between text-xs font-bold text-slate-500 mb-2 uppercase">
                  Initial Velocity <span>{velocity} m/s</span>
                </label>
                <input 
                  type="range" min="1" max="100" value={velocity}
                  onChange={(e) => setVelocity(Number(e.target.value))}
                  className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
              </div>
              <div>
                <label className="flex justify-between text-xs font-bold text-slate-500 mb-2 uppercase">
                  Launch Angle <span>{angle}°</span>
                </label>
                <input 
                  type="range" min="1" max="89" value={angle}
                  onChange={(e) => setAngle(Number(e.target.value))}
                  className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
              </div>
              <div>
                <label className="flex justify-between text-xs font-bold text-slate-500 mb-2 uppercase">
                  Gravity <span>{gravity} m/s²</span>
                </label>
                <input 
                  type="range" min="1.6" max="25" step="0.1" value={gravity}
                  onChange={(e) => setGravity(Number(e.target.value))}
                  className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-slate-100 space-y-4">
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
                <span className="text-xs font-bold text-slate-400">Range</span>
                <span className="font-mono font-bold text-slate-900">{simulationData.maxDistance.toFixed(2)}m</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
                <span className="text-xs font-bold text-slate-400">Peak Height</span>
                <span className="font-mono font-bold text-slate-900">{simulationData.maxHeight.toFixed(2)}m</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
                <span className="text-xs font-bold text-slate-400">Flight Time</span>
                <span className="font-mono font-bold text-slate-900">{simulationData.totalTime.toFixed(2)}s</span>
              </div>
            </div>
          </div>

          <div className="p-6 bg-blue-50 border border-blue-100 rounded-[28px]">
            <h4 className="font-bold text-blue-900 mb-2 flex items-center gap-2">
              <HelpCircle size={16} /> Technical Context
            </h4>
            <p className="text-xs text-blue-800/70 leading-relaxed">
              Persamaan lintasan: <br/>
              <code className="bg-blue-200/50 px-1 rounded text-blue-900 font-bold">y = (tan θ)x - (g / (2v₀²cos²θ))x²</code><br/>
              Ini adalah persamaan kuadratik murni yang mendasari perhitungan balistik dan desain struktural lengkungan.
            </p>
          </div>
        </div>

        <div className="lg:col-span-8 space-y-8">
          <div className="p-8 rounded-[40px] bg-white border border-slate-200 shadow-xl overflow-hidden min-h-[500px]">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-bold text-slate-900">Projectile Trajectory</h3>
              <div className="flex items-center gap-4 text-[10px] font-bold text-slate-400 uppercase">
                <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-blue-500" /> Trajectory Path</div>
              </div>
            </div>
            
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={simulationData.points}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="x" type="number" label={{ value: 'Distance (m)', position: 'bottom', offset: -5 }} />
                  <YAxis label={{ value: 'Height (m)', angle: -90, position: 'insideLeft' }} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                    formatter={(val) => [`${val}m`, 'Value']}
                  />
                  <Line 
                    type="monotone" dataKey="y" stroke="#2563eb" strokeWidth={4} dot={false} 
                    animationDuration={500}
                  />
                  <ReferenceLine y={0} stroke="#94a3b8" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-8 rounded-[32px] bg-slate-900 text-white">
              <Rocket className="text-blue-400 mb-4" size={32} />
              <h3 className="font-bold mb-2">Aplikasi Balistik</h3>
              <p className="text-sm text-slate-400 leading-relaxed">Digunakan oleh militer dan kedirgantaraan untuk menghitung lintasan roket dengan mempertimbangkan gaya gravitasi.</p>
            </div>
            <div className="p-8 rounded-[32px] bg-white border border-slate-200 shadow-md">
              <Wind className="text-emerald-500 mb-4" size={32} />
              <h3 className="font-bold text-slate-900 mb-2">Hambatan Udara</h3>
              <p className="text-sm text-slate-500 leading-relaxed">Versi advanced mencakup koefisien drag yang membuat persamaan kuadratik menjadi diferensial kompleks.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EngineeringView;
