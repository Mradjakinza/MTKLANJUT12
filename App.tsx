
import React, { useState } from 'react';
import { 
  Calculator, 
  BookOpen, 
  Trophy, 
  Gamepad2, 
  Home, 
  Menu, 
  X,
  Info,
  TrendingUp,
  Cpu,
  Zap,
  BarChart3,
  Database
} from 'lucide-react';
import { ViewState } from './types';
import HomeView from './views/HomeView';
import TheoryView from './views/TheoryView';
import CalculatorView from './views/CalculatorView';
import GameView from './views/GameView';
import LeaderboardView from './views/LeaderboardView';
import AboutView from './views/AboutView';
import EngineeringView from './views/EngineeringView';
import BusinessView from './views/BusinessView';
import DataView from './views/DataView';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigate = (view: ViewState) => {
    setCurrentView(view);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navGroups = [
    {
      label: 'Core',
      items: [
        { id: 'home', label: 'Dashboard', icon: Home },
        { id: 'theory', label: 'Materi Dasar', icon: BookOpen },
        { id: 'calculator', label: 'Compute Engine', icon: Calculator },
      ]
    },
    {
      label: 'Simulasi Industri',
      items: [
        { id: 'engineering', label: 'Teknik & Fisika', icon: Zap },
        { id: 'business', label: 'Optimasi Bisnis', icon: BarChart3 },
        { id: 'data', label: 'Analisis Data', icon: Database },
      ]
    },
    {
      label: 'Engagement',
      items: [
        { id: 'game', label: 'Game Arena', icon: Gamepad2 },
        { id: 'leaderboard', label: 'Peringkat', icon: Trophy },
        { id: 'about', label: 'Dokumentasi', icon: Info },
      ]
    }
  ];

  const renderContent = () => {
    switch (currentView) {
      case 'home': return <HomeView onNavigate={navigate} />;
      case 'theory': return <TheoryView />;
      case 'calculator': return <CalculatorView />;
      case 'engineering': return <EngineeringView />;
      case 'business': return <BusinessView />;
      case 'data': return <DataView />;
      case 'game': return <GameView />;
      case 'leaderboard': return <LeaderboardView />;
      case 'about': return <AboutView />;
      default: return <HomeView onNavigate={navigate} />;
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-slate-50">
      {/* Desktop Sidebar */}
      <nav className="hidden md:flex flex-col w-72 bg-slate-900 text-white p-6 sticky top-0 h-screen overflow-y-auto">
        <div className="flex items-center gap-3 mb-8 px-2">
          <div className="bg-blue-600 p-2.5 rounded-xl shadow-lg shadow-blue-500/20">
            <Cpu size={24} />
          </div>
          <div>
            <span className="text-xl font-bold tracking-tight block">QuadraMaster</span>
            <span className="text-[10px] text-blue-400 font-bold uppercase tracking-widest">Advanced Engine</span>
          </div>
        </div>
        
        <div className="space-y-8">
          {navGroups.map((group, gIdx) => (
            <div key={gIdx}>
              <h3 className="px-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3">{group.label}</h3>
              <div className="space-y-1">
                {group.items.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => navigate(item.id as ViewState)}
                    className={`w-full flex items-center gap-4 px-4 py-2.5 rounded-xl transition-all duration-200 ${
                      currentView === item.id 
                        ? 'bg-blue-600 text-white shadow-md' 
                        : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                    }`}
                  >
                    <item.icon size={18} />
                    <span className="text-sm font-semibold">{item.label}</span>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-auto pt-6">
          <div className="p-4 bg-slate-800 rounded-2xl border border-slate-700">
            <div className="flex items-center justify-between mb-2">
              <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">System Status</p>
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            </div>
            <p className="text-xs text-white font-medium">Engine v2.5 Online</p>
          </div>
        </div>
      </nav>

      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between p-4 bg-slate-900 text-white sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <Cpu size={20} className="text-blue-500" />
          <span className="font-bold">QuadraMaster</span>
        </div>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-slate-900 z-40 pt-20 px-6 space-y-6 overflow-y-auto">
          {navGroups.map((group, gIdx) => (
            <div key={gIdx}>
              <h3 className="text-[10px] text-slate-500 font-bold uppercase mb-2">{group.label}</h3>
              <div className="space-y-2">
                {group.items.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => navigate(item.id as ViewState)}
                    className={`w-full flex items-center gap-4 px-6 py-4 rounded-xl text-lg ${
                      currentView === item.id ? 'bg-blue-600 text-white' : 'text-slate-400'
                    }`}
                  >
                    <item.icon size={24} />
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Content */}
      <main className="flex-1 p-4 md:p-8 lg:p-10 overflow-y-auto bg-slate-50/50">
        <div className="max-w-7xl mx-auto">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default App;
