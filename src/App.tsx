/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Dna, 
  ChevronDown, 
  ChevronUp,
  Heart, 
  BookOpen, 
  GraduationCap, 
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  XCircle,
  Trophy,
  Activity,
  Info,
  Layers,
  Lightbulb,
  Menu,
  X
} from 'lucide-react';
import { BLOCKS, QUIZ_QUESTIONS, Block, Question } from './data';

// --- Professional Polish Components ---

const SidebarItem = ({ 
  block, 
  index, 
  isActive, 
  isCompleted, 
  onClick 
}: { 
  block: Block, 
  index: number, 
  isActive: boolean, 
  isCompleted: boolean, 
  onClick: () => void,
  key?: string
}) => {
  const num = (index + 1).toString().padStart(2, '0');
  
  return (
    <button 
      onClick={onClick}
      className={`w-full p-4 flex items-center gap-3 border-l-4 transition-all text-left ${
        isActive 
          ? 'border-blue-500 bg-blue-900/20 text-white' 
          : isCompleted 
            ? 'border-emerald-500 bg-slate-800/50 text-emerald-400'
            : 'border-transparent text-slate-400 hover:bg-slate-800'
      }`}
    >
      <span className={`w-6 h-6 flex items-center justify-center rounded-full text-[10px] font-bold ${
        isActive ? 'bg-blue-500 text-white' : 'bg-slate-700 text-slate-300'
      }`}>
        {num}
      </span>
      <span className="text-xs font-bold leading-tight line-clamp-1">{block.title}</span>
    </button>
  );
};

const Header = ({ progress }: { progress: number }) => (
  <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-6 shrink-0 z-10 shadow-sm">
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-blue-200">E</div>
      <div className="hidden md:block">
        <h1 className="text-[10px] font-black uppercase tracking-widest text-slate-400 leading-none mb-1">Interactive EdTech System</h1>
        <p className="text-lg font-black text-blue-950 leading-tight">Ембріональний розвиток людини</p>
      </div>
    </div>
    
    <div className="flex-1 max-w-md mx-6 lg:mx-12">
      <div className="flex justify-between text-[10px] font-black text-slate-400 mb-1.5 px-1">
        <span>ЗАГАЛЬНИЙ ПРОГРЕС КУРСУ</span>
        <span>{Math.round(progress)}% ПЕРЕГЛЯНУТО</span>
      </div>
      <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden border border-slate-50">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          className="h-full bg-blue-500 shadow-[0_0_12px_rgba(59,130,246,0.4)]"
        />
      </div>
    </div>

    <div className="flex gap-2">
      <button className="hidden sm:block px-4 py-2 border border-slate-200 rounded-xl text-[10px] font-black text-slate-500 hover:bg-slate-50 transition-colors uppercase tracking-tight">МАТЕРІАЛИ</button>
      <div className="w-px h-8 bg-slate-200 mx-2 hidden sm:block" />
      <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
        <Activity size={16} />
      </div>
    </div>
  </header>
);

// --- Sections ---

const SplashPage = ({ onStart }: { onStart: () => void, key?: string }) => (
  <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6 text-center"
  >
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px]" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-[100px]" />
    </div>

    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.2, type: 'spring', damping: 20 }}
      className="relative z-10"
    >
      <div className="w-20 h-20 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-[0_0_40px_rgba(37,99,235,0.4)] mb-8 mx-auto -rotate-3">
        <Dna size={40} />
      </div>
      <h1 className="text-5xl md:text-6xl font-black text-white mb-6 tracking-tight">EmbryoQuest</h1>
      <p className="text-xl text-slate-400 max-w-lg mx-auto font-medium mb-12">
        Інтерактивна подорож у глибини людського генезису. Від першої іскри до цілого життя.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
        <motion.button
          whileHover={{ scale: 1.05, translateY: -2 }}
          whileTap={{ scale: 0.95 }}
          onClick={onStart}
          className="bg-blue-600 text-white px-12 py-5 rounded-2xl font-black text-lg shadow-2xl shadow-blue-900/20 flex items-center gap-3 transition-colors hover:bg-blue-500"
        >
          <span>РОЗПОЧАТИ КУРС</span>
          <ArrowRight size={20} />
        </motion.button>
      </div>
    </motion.div>
  </motion.div>
);

const BlockContent = ({ 
  block, 
  index, 
  onNext, 
  onPrev 
}: { 
  block: Block, 
  index: number, 
  onNext: () => void, 
  onPrev: () => void 
}) => (
  <motion.div
    key={block.id}
    initial={{ opacity: 0, scale: 0.98 }}
    animate={{ opacity: 1, scale: 1 }}
    className="flex flex-col h-full gap-6 overflow-hidden"
  >
    {/* Active Module Header */}
    <div className="flex flex-col md:flex-row items-start justify-between gap-4 shrink-0">
      <div>
        <div className="flex items-center gap-2 text-blue-600 font-black text-[10px] mb-2">
          <span className="bg-blue-100 px-2.5 py-1 rounded-md uppercase tracking-widest">БЛОК {(index + 1).toString().padStart(2, '0')}</span>
          <span className="uppercase tracking-widest opacity-80">{block.id.replace('_', ' ')}</span>
        </div>
        <h2 className="text-4xl font-black text-slate-900 leading-none tracking-tight">{block.title}</h2>
        <p className="text-slate-500 font-bold mt-2 italic">{block.subtitle}</p>
      </div>
      <div className="text-left md:text-right shrink-0">
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">СТАТУС: АКТИВНЕ ВИВЧЕННЯ</p>
        <div className="flex items-center gap-2 text-emerald-600 font-black text-xs mt-1 md:justify-end">
          <Activity size={14} className="animate-pulse" />
          <span>Real-time Sync Active</span>
        </div>
      </div>
    </div>

    {/* Main columns */}
    <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-0">
      {/* Left Column: Theory */}
      <section className="lg:col-span-8 flex flex-col gap-6 overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-slate-200">
        <div className="bg-white p-8 md:p-10 rounded-[32px] border border-slate-200 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 left-0 w-2 h-full bg-blue-500" />
          <h3 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-3 uppercase tracking-tight">
            <BookOpen size={20} className="text-blue-500" />
            Теоретичний базис
          </h3>
          <div className="text-slate-600 leading-relaxed text-lg whitespace-pre-wrap space-y-4 font-medium">
            {block.theory}
          </div>
          
          <div className="mt-10 p-6 bg-blue-50 border-2 border-blue-100 rounded-3xl relative">
            <h4 className="font-black text-blue-900 mb-2 italic flex items-center gap-2">
              <Lightbulb size={20} className="text-blue-600" />
              Дослідницька аналогія
            </h4>
            <p className="text-blue-800 leading-relaxed italic text-base">
              {block.analogy}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-red-50 p-8 rounded-[32px] border border-red-100 shadow-sm">
            <h4 className="text-red-900 font-black mb-3 flex items-center gap-2 uppercase tracking-tighter">
              <XCircle size={20} className="text-red-500" />
              Критичні помилки
            </h4>
            <p className="text-red-800 text-sm leading-relaxed font-semibold italic">
              {block.commonMistakes}
            </p>
          </div>
          <div className="bg-emerald-50 p-8 rounded-[32px] border border-emerald-100 shadow-sm">
            <h4 className="text-emerald-900 font-black mb-3 flex items-center gap-2 uppercase tracking-tighter">
              <Activity size={20} className="text-emerald-500" />
              Вплив на життя
            </h4>
            <p className="text-emerald-800 text-sm leading-relaxed font-semibold italic">
              {block.lifeApplication}
            </p>
          </div>
        </div>
      </section>

      {/* Right Column: Glossary & Tips */}
      <aside className="lg:col-span-4 flex flex-col gap-6 overflow-y-auto">
        <div className="bg-slate-900 text-white p-8 rounded-[32px] flex-1 shadow-2xl border border-slate-800 flex flex-col">
          <h3 className="text-xs font-black tracking-[0.2em] text-blue-400 mb-8 flex items-center gap-3 uppercase">
            <Layers size={18} />
            ТЕРМІНОЛОГІЧНИЙ ГЛОСАРІЙ
          </h3>
          <div className="space-y-8 flex-1">
            {block.glossary.map((term, i) => (
              <div key={i} className="group">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-blue-400 font-black text-sm uppercase tracking-wide group-hover:text-white transition-colors">{term.word}</p>
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-700 group-hover:bg-blue-500 transition-colors" />
                </div>
                <p className="text-xs leading-loose text-slate-400 group-hover:text-slate-300 transition-colors">{term.definition}</p>
                <div className="mt-2 text-[10px] text-slate-500 font-bold uppercase tracking-tight flex items-center gap-1.5">
                  <span className="w-1 h-1 bg-blue-500 rounded-full" />
                  {term.simpleExplanation}
                </div>
              </div>
            ))}
          </div>
          <button className="mt-8 py-4 bg-slate-800 hover:bg-slate-750 rounded-2xl text-[10px] font-black uppercase text-slate-400 transition-colors border border-slate-700">Переглянути повний словник</button>
        </div>
      </aside>
    </div>

    {/* Footer Navigation */}
    <footer className="h-20 bg-white border-2 border-slate-100 rounded-[32px] flex items-center justify-between px-8 mt-6">
      <button 
        onClick={onPrev}
        disabled={index === 0}
        className="flex items-center gap-2 text-slate-400 font-black text-[11px] uppercase tracking-widest hover:text-slate-900 transition-colors disabled:opacity-20"
      >
        <ArrowLeft size={16} /> Попередній блок
      </button>
      
      <div className="hidden sm:flex items-center gap-6">
        <span className="text-[10px] font-black text-slate-300 tracking-[0.3em] uppercase">Блок {index + 1} / {BLOCKS.length}</span>
        <div className="flex gap-2">
          {BLOCKS.map((_, i) => (
            <div 
              key={i} 
              className={`w-2 h-2 rounded-full transition-all duration-500 ${i === index ? 'w-6 bg-blue-600' : i < index ? 'bg-emerald-400' : 'bg-slate-200'}`} 
            />
          ))}
        </div>
      </div>

      <button 
        onClick={onNext}
        className="flex items-center gap-2 text-blue-600 font-black text-[11px] uppercase tracking-widest hover:text-blue-950 transition-colors"
      >
        {index === BLOCKS.length - 1 ? 'Завершити курс' : 'Наступний блок'} <ArrowRight size={16} />
      </button>
    </footer>
  </motion.div>
);

const QuizView = ({ onComplete, onBack }: { onComplete: (score: number, answers: number[]) => void, onBack: () => void, key?: string }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [userAnswers, setUserAnswers] = useState<number[]>([]);

  const handleSelect = (idx: number) => {
    if (isAnswered) return;
    setSelected(idx);
    setIsAnswered(true);
    const correct = idx === QUIZ_QUESTIONS[currentIdx].correctIndex;
    if (correct) setScore(s => s + 1);
    setUserAnswers([...userAnswers, idx]);
  };

  const nextQuestion = () => {
    if (currentIdx < QUIZ_QUESTIONS.length - 1) {
      setCurrentIdx(currentIdx + 1);
      setSelected(null);
      setIsAnswered(false);
    } else {
      onComplete(score, userAnswers);
    }
  };

  const q = QUIZ_QUESTIONS[currentIdx];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-slate-950 p-6 flex items-center justify-center relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-full h-1 bg-slate-900">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${((currentIdx + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
          className="h-full bg-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.6)]"
        />
      </div>

      <div className="max-w-2xl w-full z-10">
        <div className="mb-10 flex justify-between items-center text-slate-500 font-black text-[10px] uppercase tracking-widest">
          <button onClick={onBack} className="flex items-center hover:text-white transition-colors">
            <X size={16} className="mr-2" /> ПЕРЕРИВАТИ СЕСІЮ
          </button>
          <span className="text-blue-400">ПИТАННЯ {currentIdx + 1} / {QUIZ_QUESTIONS.length}</span>
        </div>

        <div className="bg-slate-900 p-10 md:p-14 rounded-[48px] shadow-3xl border border-slate-800">
          <h2 className="text-3xl font-black text-white mb-10 leading-tight">
            {q.text}
          </h2>

          <div className="grid grid-cols-1 gap-4 mb-10">
            {q.options.map((opt, i) => {
              let style = "bg-slate-800/50 border-slate-800 text-slate-300 hover:bg-slate-800 hover:border-slate-700";
              if (isAnswered) {
                if (i === q.correctIndex) style = "bg-emerald-900/30 border-emerald-500 text-emerald-400";
                else if (i === selected) style = "bg-red-900/30 border-red-500 text-red-400";
                else style = "bg-slate-900 border-slate-900 text-slate-600";
              }

              return (
                <button
                  key={i}
                  disabled={isAnswered}
                  onClick={() => handleSelect(i)}
                  className={`w-full text-left p-6 rounded-3xl border-2 font-black transition-all flex items-center justify-between ${style}`}
                >
                  <span className="text-lg">{opt}</span>
                  {isAnswered && i === q.correctIndex && <CheckCircle2 size={24} />}
                  {isAnswered && i === selected && i !== q.correctIndex && <XCircle size={24} />}
                </button>
              );
            })}
          </div>

          <AnimatePresence>
            {isAnswered && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className={`p-8 rounded-[32px] mb-10 border-2 ${selected === q.correctIndex ? 'bg-emerald-950/20 border-emerald-900/50 text-emerald-300' : 'bg-red-950/20 border-red-900/50 text-red-300'}`}
              >
                <div className="font-black flex items-center mb-3 uppercase tracking-wider text-xs">
                  <Lightbulb size={18} className="mr-2" />
                  АНАЛІЗ ВІДПОВІДІ
                </div>
                <p className="text-base leading-relaxed opacity-90 italic">
                  {selected === q.correctIndex ? q.explanationCorrect : q.explanationWrong}
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {isAnswered && (
            <motion.button
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              onClick={nextQuestion}
              className="w-full bg-blue-600 text-white py-5 rounded-[24px] font-black text-lg shadow-2xl shadow-blue-900 transition-colors hover:bg-blue-500"
            >
              ПРОДОВЖИТИ
            </motion.button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const ResultsView = ({ score, answers, onReset }: { score: number, answers: number[], onReset: () => void, key?: string }) => {
  const percentage = (score / QUIZ_QUESTIONS.length) * 100;
  
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-slate-950 text-white p-6 pt-20 flex flex-col items-center overflow-y-auto"
    >
      <div className="max-w-4xl w-full text-center">
        <motion.div
          initial={{ scale: 0, rotate: -45 }}
          animate={{ scale: 1, rotate: 0 }}
          className="w-40 h-40 bg-gradient-to-br from-yellow-400 to-amber-600 rounded-[40px] mx-auto flex items-center justify-center text-slate-950 mb-10 shadow-[0_0_80px_rgba(251,191,36,0.3)]"
        >
          <Trophy size={80} />
        </motion.div>
        
        <p className="text-blue-500 font-black tracking-[0.4em] uppercase mb-4">АКАДЕМІЧНИЙ ЗВІТ</p>
        <h2 className="text-5xl font-black mb-6">Фінішна пряма</h2>
        
        <div className="flex items-center justify-center gap-10 mb-16">
          <div className="text-center">
            <div className="text-6xl font-black text-white mb-1">{percentage.toFixed(0)}%</div>
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">ТОЧНІСТЬ</p>
          </div>
          <div className="w-px h-16 bg-slate-800" />
          <div className="text-center text-left">
            <div className="text-2xl font-black text-white mb-1 uppercase tracking-tight">{percentage >= 80 ? 'Експерт-біолог' : percentage >= 50 ? 'Дослідник' : 'Асистент'}</div>
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">КВАЛІФІКАЦІЯ</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="bg-slate-900 p-10 rounded-[40px] border border-slate-800 text-left">
            <h3 className="text-xl font-black mb-6 flex items-center text-emerald-400">
              <CheckCircle2 className="mr-3" size={24} /> Аналіз знань
            </h3>
            <p className="text-slate-400 leading-relaxed font-medium">
              {percentage >= 80 
                ? "Ви продемонстрували глибоке розуміння генетичних закономірностей та стадій онтогенезу. Ваша база знань дозволяє перейти до вивчення специфічних патологій розвитку." 
                : "Основні концепції засвоєні, проте деякі нюанси гаструляції та плацентарного бар'єру залишилися в тіні. Рекомендуємо перечитати Блок 04 та Блок 05."}
            </p>
          </div>

          <div className="bg-slate-900 p-10 rounded-[40px] border border-slate-800 text-left">
            <h3 className="text-xl font-black mb-6 flex items-center text-blue-400">
              <ArrowRight className="mr-3" size={24} /> Наступні кроки
            </h3>
            <ul className="space-y-4 text-slate-400 font-bold text-sm">
              <li className="flex gap-2"><span>•</span> Повторити механізм формування тризародкових листків</li>
              <li className="flex gap-2"><span>•</span> Вивчити вплив тератогенів на 1-й триместр</li>
              <li className="flex gap-2"><span>•</span> Закріпити відмінність між типами близнят</li>
            </ul>
          </div>
        </div>

        <button 
          onClick={onReset}
          className="bg-blue-600 hover:bg-blue-500 text-white px-16 py-6 rounded-[28px] font-black text-xl transition-all shadow-3xl shadow-blue-900 mb-20"
        >
          ПОВТОРИТИ ТРАЄКТОРІЮ
        </button>
      </div>
    </motion.div>
  );
};

// --- Main App ---

export default function App() {
  const [view, setView] = useState<'splash' | 'story' | 'results' | 'quiz'>('splash');
  const [activeBlockIdx, setActiveBlockIdx] = useState(0);
  const [completedBlocks, setCompletedBlocks] = useState<number[]>([]);
  const [quizScore, setQuizScore] = useState(0);
  const [userAnswers, setUserAnswers] = useState<number[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const activeBlock = BLOCKS[activeBlockIdx];
  const totalProgress = (completedBlocks.length / BLOCKS.length) * 100;

  const handleStart = () => {
    setView('story');
    if (!completedBlocks.includes(0)) setCompletedBlocks([0]);
  };
  
  const handleBlockSelect = (idx: number) => {
    setActiveBlockIdx(idx);
    if (!completedBlocks.includes(idx)) {
      setCompletedBlocks([...completedBlocks, idx]);
    }
  };

  const nextBlock = () => {
    if (activeBlockIdx < BLOCKS.length - 1) {
      handleBlockSelect(activeBlockIdx + 1);
    } else {
      setView('quiz'); // Transition to assessment
    }
  };

  const prevBlock = () => {
    if (activeBlockIdx > 0) {
      setActiveBlockIdx(activeBlockIdx - 1);
    }
  };

  const handleQuizComplete = (score: number, answers: number[]) => {
    setQuizScore(score);
    setUserAnswers(answers);
    setView('results');
  };

  const handleReset = () => {
    setView('splash');
    setActiveBlockIdx(0);
    setCompletedBlocks([]);
    setQuizScore(0);
    setUserAnswers([]);
  };

  return (
    <div className="font-sans antialiased text-slate-900 bg-slate-50 selection:bg-blue-100 h-screen overflow-hidden">
      <AnimatePresence mode="wait">
        {view === 'splash' && <SplashPage key="splash" onStart={handleStart} />}

        {view === 'story' && (
          <motion.div 
            key="story"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col h-full"
          >
            <Header progress={totalProgress} />
            
            <div className="flex-1 flex overflow-hidden">
              {/* Sidebar Navigation */}
              <motion.nav 
                initial={false}
                animate={{ width: sidebarOpen ? 280 : 0, opacity: sidebarOpen ? 1 : 0 }}
                className="bg-slate-900 text-slate-400 flex flex-col shrink-0 border-r border-slate-800 overflow-hidden relative"
              >
                <div className="p-5 text-[10px] font-black tracking-[0.2em] text-slate-500 border-b border-slate-800 shrink-0">МОДУЛІ НАВЧАННЯ</div>
                <div className="flex-1 overflow-y-auto pt-2 scrollbar-hide">
                  {BLOCKS.map((block, i) => (
                    <SidebarItem 
                      key={block.id}
                      block={block}
                      index={i}
                      isActive={i === activeBlockIdx}
                      isCompleted={completedBlocks.includes(i)}
                      onClick={() => handleBlockSelect(i)}
                    />
                  ))}
                </div>
                
                <div className="mt-auto p-4 bg-blue-900/10 border-t border-slate-800 shrink-0">
                  <div className="flex items-center gap-2 text-blue-400 font-black mb-3">
                    <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></div>
                    <span className="text-[10px] uppercase tracking-[0.15em]">Фінальна перевірка</span>
                  </div>
                  <button 
                    onClick={() => setView('quiz')}
                    disabled={completedBlocks.length < BLOCKS.length}
                    className="w-full py-3 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-800 disabled:text-slate-600 disabled:cursor-not-allowed rounded-xl text-[10px] uppercase font-black text-white transition-all shadow-lg"
                  >
                    Перейти до тестування
                  </button>
                </div>
              </motion.nav>

              {/* Main Content Area */}
              <main className="flex-1 p-6 lg:p-10 flex flex-col overflow-hidden bg-slate-50 relative">
                <button 
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  className="absolute left-4 top-4 z-20 w-8 h-8 flex items-center justify-center bg-white border border-slate-200 rounded-lg text-slate-400 hover:text-blue-600 transition-colors shadow-sm"
                >
                  {sidebarOpen ? <X size={18} /> : <Menu size={18} />}
                </button>

                <BlockContent 
                  block={activeBlock} 
                  index={activeBlockIdx} 
                  onNext={nextBlock}
                  onPrev={prevBlock}
                />
              </main>
            </div>
          </motion.div>
        )}

        {view === 'quiz' && (
          <QuizView 
            key="quiz" 
            onBack={() => setView('story')}
            onComplete={handleQuizComplete} 
          />
        )}

        {view === 'results' && (
          <ResultsView 
            key="results" 
            score={quizScore} 
            answers={userAnswers} 
            onReset={handleReset} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}
