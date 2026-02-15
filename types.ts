
export interface QuadraticResult {
  a: number;
  b: number;
  c: number;
  discriminant: number;
  x1: number | string;
  x2: number | string;
  type: 'two-real' | 'one-real' | 'complex' | 'not-quadratic';
  steps: string[];
}

export interface ScoreEntry {
  name: string;
  score: number;
  date: string;
}

export type ViewState = 
  | 'home' 
  | 'theory' 
  | 'calculator' 
  | 'engineering' 
  | 'business' 
  | 'data' 
  | 'game' 
  | 'leaderboard' 
  | 'about';
