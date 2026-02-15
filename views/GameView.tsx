
import React, { useState, useEffect, useCallback } from 'react';
import { 
  Gamepad2, 
  Timer, 
  Trophy, 
  Heart, 
  Sparkles, 
  CheckCircle2, 
  XCircle,
  Play,
  RotateCcw,
  Save,
  Loader2
} from 'lucide-react';
import { saveScore } from '../lib/db';

const GameView: React.FC = () => {
  const [gameState, setGameState] = useState<'start' | 'playing' | 'end'>('start');
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [timeLeft, setTimeLeft] = useState(30);
  const [currentQuestion, setCurrentQuestion] = useState<{ equation: string, answer: number, options: number[] } | null>(null);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  
  // Submission state
  const [playerName, setPlayerName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const generateQuestion = useCallback(() => {
    const r1 = Math.floor(Math.random() * 10) - 5;
    const r2 = Math.floor(Math.random() * 10) - 5;
    const b = -(r1 + r2);
    const c = r1 * r2;
    const equation = `x² ${b >= 0 ? '+' : '-'} ${Math.abs(b)}x ${c >= 0 ? '+' : '-'} ${Math.abs(c)} = 0`;
    const correctAnswer = r1;
    const options = new Set<number>();
    options.add(correctAnswer);
    while (options.size < 4) {
      options.add(Math.floor(Math.random() * 20) - 10);
    }
    setCurrentQuestion({
      equation,
      answer: correctAnswer,
      options: Array.from(options).sort((a, b) => a - b)
    });
  }, []);

  const startGame = () => {
    setGameState('playing');
    setScore(0);
    setLives(3);
    setTimeLeft(30);
    setHasSubmitted(false);
    setPlayerName('');
    generateQuestion();
  };

  const handleAnswer = (option: number) => {
    if (gameState !== 'playing') return;

    if (option === currentQuestion?.answer) {
      setScore(s => s + 10);
      setFeedback('correct');
      setTimeLeft(t => t + 5);
    } else {
      setLives(l => l - 1);
      setFeedback('wrong');
      if (lives <= 1) {
        setGameState('end');
      }
    }

    setTimeout(() => {
      setFeedback(null);
      generateQuestion();
    }, 1000);
  };

  const handleSaveScore = async () => {
    if (!playerName.trim() || isSubmitting) return;
    setIsSubmitting(true);
    try {
      await saveScore({
        name: playerName.trim(),
        score: score,
        date: new Date().toLocaleDateString()
      });
      setHasSubmitted(true);
    } catch (err) {
      console.error("Failed to save score", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    let timer: any;
    if (gameState === 'playing' && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(t => t - 1);
      }, 1000);
    } else if (timeLeft === 0 && gameState === 'playing') {
      setGameState('end');
    }
    return () => clearInterval(timer);
  }, [gameState, timeLeft]);

  if (gameState === 'start') {
    return (
      <div className="max-w-2xl mx-auto py-12 text-center space-y-8">
        <div className="w-24 h-24 bg-blue-600 rounded-3xl flex items-center justify-center mx-auto shadow-xl shadow-blue-500/30 text-white animate-bounce">
          <Gamepad2 size={48} />
        </div>
        <div className="space-y-4">
          <h1 className="text-4xl font-extrabold text-slate-900">Tantangan Akar Kuadrat</h1>
          <p className="text-slate-500 text-lg max-w-md mx-auto">
            Bisakah kamu menebak salah satu akar dari persamaan yang muncul sebelum waktu habis?
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto">
          <div className="p-4 rounded-2xl bg-white border border-slate-200">
            <span className="block text-blue-600 font-bold text-xl">+10</span>
            <span className="text-xs font-bold text-slate-400 uppercase">Per Jawaban</span>
          </div>
          <div className="p-4 rounded-2xl bg-white border border-slate-200">
            <span className="block text-emerald-600 font-bold text-xl">+5s</span>
            <span className="text-xs font-bold text-slate-400 uppercase">Bonus Waktu</span>
          </div>
        </div>
        <button 
          onClick={startGame}
          className="px-12 py-5 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-bold text-xl shadow-xl transition-all transform hover:scale-105 active:scale-95 flex items-center gap-3 mx-auto"
        >
          <Play fill="currentColor" />
          Mulai Bermain
        </button>
      </div>
    );
  }

  if (gameState === 'end') {
    return (
      <div className="max-w-2xl mx-auto py-12 text-center space-y-8 animate-in zoom-in duration-500">
        <div className="w-24 h-24 bg-yellow-500 rounded-full flex items-center justify-center mx-auto shadow-xl shadow-yellow-500/30 text-white">
          <Trophy size={48} />
        </div>
        <div className="space-y-2">
          <h1 className="text-4xl font-extrabold text-slate-900">Selesai!</h1>
          <p className="text-slate-500 text-lg uppercase tracking-widest font-bold">Skor Akhir Kamu</p>
          <div className="text-7xl font-black text-blue-600">{score}</div>
        </div>
        
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-lg max-w-md mx-auto">
          {!hasSubmitted ? (
            <div className="space-y-4">
              <p className="text-slate-600 text-sm">Simpan skor kamu ke Leaderboard!</p>
              <input 
                type="text"
                placeholder="Masukkan Namamu"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                className="w-full p-4 rounded-xl bg-slate-50 border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none font-bold text-center"
                maxLength={15}
              />
              <button 
                onClick={handleSaveScore}
                disabled={!playerName.trim() || isSubmitting}
                className="w-full py-4 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-all"
              >
                {isSubmitting ? <Loader2 className="animate-spin" /> : <Save size={20} />}
                {isSubmitting ? 'Menyimpan...' : 'Simpan Skor'}
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-center gap-2 text-emerald-600 font-bold">
                <CheckCircle2 size={24} />
                <span>Skor Berhasil Disimpan!</span>
              </div>
              <p className="text-slate-500 text-sm">Cek peringkatmu di halaman Leaderboard.</p>
            </div>
          )}
          
          <div className="pt-6 border-t border-slate-100 mt-6">
            <button 
              onClick={startGame}
              className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold flex items-center justify-center gap-3 transition-all"
            >
              <RotateCcw size={18} />
              Main Lagi
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto py-8 space-y-8">
      {/* Game Header */}
      <div className="flex items-center justify-between px-6 py-4 bg-white rounded-3xl border border-slate-200 shadow-sm sticky top-24 z-10">
        <div className="flex items-center gap-4">
          <div className="p-2 bg-blue-100 text-blue-600 rounded-xl">
            <Trophy size={20} />
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase">Skor</p>
            <p className="text-xl font-bold text-slate-900">{score}</p>
          </div>
        </div>

        <div className="flex flex-col items-center">
          <div className={`flex items-center gap-2 p-2 px-4 rounded-xl ${timeLeft < 10 ? 'bg-red-100 text-red-600' : 'bg-slate-100 text-slate-700'}`}>
            <Timer size={20} className={timeLeft < 10 ? 'animate-pulse' : ''} />
            <span className="font-mono text-xl font-bold">{timeLeft}s</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {[...Array(3)].map((_, i) => (
            <Heart key={i} size={24} fill={i < lives ? '#ef4444' : 'none'} className={i < lives ? 'text-red-500' : 'text-slate-200'} />
          ))}
        </div>
      </div>

      <div className="p-8 md:p-12 rounded-[40px] bg-slate-900 text-white text-center shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-10 left-10 text-6xl font-serif">x²</div>
          <div className="absolute bottom-10 right-10 text-6xl font-serif">√D</div>
        </div>

        <div className="relative z-10">
          <p className="text-blue-400 font-bold uppercase tracking-widest text-sm mb-6">Selesaikan Persamaannya</p>
          <div className="text-4xl md:text-5xl font-mono font-bold mb-12 tracking-tight">
            {currentQuestion?.equation}
          </div>

          <div className="grid grid-cols-2 gap-4">
            {currentQuestion?.options.map((opt, i) => (
              <button
                key={i}
                onClick={() => handleAnswer(opt)}
                disabled={feedback !== null}
                className={`p-6 rounded-3xl text-2xl font-bold transition-all transform active:scale-95 ${
                  feedback === 'correct' && opt === currentQuestion.answer 
                    ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/30'
                    : feedback === 'wrong' && opt !== currentQuestion.answer
                    ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                    : 'bg-white/10 hover:bg-white/20 text-white'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        {feedback && (
          <div className="absolute inset-0 flex items-center justify-center bg-slate-900/80 backdrop-blur-sm z-20 rounded-[40px] animate-in fade-in duration-300">
            {feedback === 'correct' ? (
              <div className="text-center space-y-2 animate-in zoom-in">
                <CheckCircle2 size={80} className="text-emerald-500 mx-auto" />
                <p className="text-2xl font-bold text-white">Luar Biasa!</p>
                <div className="text-emerald-400 font-bold">+10 Skor & +5 Detik</div>
              </div>
            ) : (
              <div className="text-center space-y-2 animate-in zoom-in">
                <XCircle size={80} className="text-red-500 mx-auto" />
                <p className="text-2xl font-bold text-white">Oops, Kurang Tepat!</p>
                <p className="text-slate-400">Kehilangan 1 Nyawa</p>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="text-center">
        <div className="inline-flex items-center gap-2 text-slate-400 text-sm">
          <Sparkles size={16} />
          <span>Tip: Faktorkan persamaannya untuk menemukan akarnya lebih cepat.</span>
        </div>
      </div>
    </div>
  );
};

export default GameView;
