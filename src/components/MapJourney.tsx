/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Lesson, UserStats, TrackType, LevelType } from '../types';
import { SYLLABUS } from '../data/syllabus';
import { Play, Check, Lock, Star, ChevronRight, Award, Compass, Sparkles } from 'lucide-react';

interface MapJourneyProps {
  stats: UserStats;
  onStartLesson: (lesson: Lesson) => void;
}

export default function MapJourney({ stats, onStartLesson }: MapJourneyProps) {
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);

  // Filter lessons for active track and sort by difficulty (Iniciante -> Intermediário -> Avançado) and order
  const trackLessons = SYLLABUS.filter((l) => l.track === stats.activeTrack);
  const difficultyOrderObj: Record<LevelType, number> = { iniciante: 1, intermediario: 2, avancado: 3 };

  const sortedLessons = [...trackLessons].sort((a, b) => {
    if (a.difficulty !== b.difficulty) {
      return difficultyOrderObj[a.difficulty] - difficultyOrderObj[b.difficulty];
    }
    return a.order - b.order;
  });

  const getDifficultyTitleAndDetails = (difficulty: LevelType) => {
    switch (difficulty) {
      case 'iniciante':
        return {
          title: 'Módulo I: Desbravador Iniciante',
          goal: 'Objetivo: Dominar os fundamentos básicos da tecnologia praticando comandos primitivos.',
          badge: '🟢 Fácil',
          borderColor: 'border-emerald-500/20 bg-emerald-500/5',
          textHex: 'text-emerald-400',
          desc: 'Aborda a sintaxe inicial, coleções estáticas e formatação primitiva de exibição.'
        };
      case 'intermediario':
        return {
          title: 'Módulo II: Guerreiro Intermediário',
          goal: 'Objetivo: Compor estruturas complexas e reatividades modernas em múltiplos planos.',
          badge: '🔵 Médio',
          borderColor: 'border-indigo-500/20 bg-indigo-500/5',
          textHex: 'text-indigo-400',
          desc: 'Adentra responsividades adaptáveis, organizações de fluxos e vinculação de eventos.'
        };
      case 'avancado':
        return {
          title: 'Módulo III: Grão-Mestre Avançado',
          goal: 'Objetivo: Codificar fluxos assíncronas do tempo, acessibilidade inclusiva e persistências físicas.',
          badge: '🟣 Avançado',
          borderColor: 'border-purple-500/20 bg-purple-500/5',
          textHex: 'text-purple-400',
          desc: 'Prerrogativas seniores envolvendo APIs, serializações JSON e transformações 3D.'
        };
    }
  };

  // Check if a specific lesson is unlocked for the user
  const isLessonUnlocked = (lesson: Lesson) => {
    const idx = sortedLessons.findIndex((l) => l.id === lesson.id);
    if (idx === 0) return true;
    const prevLesson = sortedLessons[idx - 1];
    return stats.completedLessons.includes(prevLesson.id);
  };

  // Group lessons by difficulty to render blocks
  const sections: { difficulty: LevelType; lessons: Lesson[] }[] = [
    { difficulty: 'iniciante', lessons: sortedLessons.filter((l) => l.difficulty === 'iniciante') },
    { difficulty: 'intermediario', lessons: sortedLessons.filter((l) => l.difficulty === 'intermediario') },
    { difficulty: 'avancado', lessons: sortedLessons.filter((l) => l.difficulty === 'avancado') }
  ];

  const getTrackColor = (track: TrackType) => {
    switch (track) {
      case 'html': return 'from-rose-500 to-red-600 shadow-rose-500/20 text-rose-400 active-ring-rose';
      case 'css': return 'from-blue-500 to-indigo-600 shadow-blue-500/20 text-blue-400 active-ring-blue';
      case 'js': return 'from-amber-400 to-amber-600 shadow-amber-500/20 text-amber-400 active-ring-amber';
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fade-in">
      
      {/* LEFT: Complete vertical tree list of active track */}
      <div className="lg:col-span-2 space-y-8 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-2">
          <div>
            <h3 className="text-xl font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Compass size={20} className="text-indigo-400" /> Mapa Cósmico da Jornada
            </h3>
            <p className="text-slate-400 text-xs mt-0.5">Siga os caminhos em ordem. Complete uma lição para desbloquear o portal seguinte.</p>
          </div>
          <span className="text-xs bg-indigo-500/15 text-indigo-400 border border-indigo-500/30 font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
            {stats.activeTrack.toUpperCase()}
          </span>
        </div>

        {sections.map((section) => {
          const detail = getDifficultyTitleAndDetails(section.difficulty);
          return (
            <div key={section.difficulty} className="space-y-4">
              
              {/* Module Header Card */}
              <div className={`border rounded-xl p-4 ${detail.borderColor} shadow-sm`}>
                <div className="flex justify-between items-center mb-1">
                  <h4 className="font-bold text-sm text-white">{detail.title}</h4>
                  <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-slate-950 border border-slate-850 ${detail.textHex}`}>
                    {detail.badge}
                  </span>
                </div>
                <p className="text-xs text-slate-300 mb-2">{detail.goal}</p>
                <p className="text-[11px] text-[#94a3b8] italic">{detail.desc}</p>
              </div>

              {/* Winding journey path alignment */}
              <div className="flex flex-col items-center py-4 relative md:px-12">
                {/* Winding connections */}
                <div className="absolute left-1/2 top-4 bottom-4 w-1 bg-slate-950 -translate-x-1/2 rounded-full border-r border-[#1e293b]" />

                <div className="space-y-8 w-full z-10 relative">
                  {section.lessons.map((lesson, index) => {
                    const isCompleted = stats.completedLessons.includes(lesson.id);
                    const isUnlocked = isLessonUnlocked(lesson);
                    const isActive = isUnlocked && !isCompleted;
                    
                    // Serpentine horizontal offset mapping based on levels
                    // 0 = centered, 1 = right, 2 = left, 3 = center...
                    const windingOffsets = [
                      'md:translate-x-[-40px]',
                      'md:translate-x-[0px]',
                      'md:translate-x-[40px]',
                      'md:translate-x-[0px]',
                      'md:translate-x-[-40px]'
                    ];
                    const offsetClass = windingOffsets[index % windingOffsets.length];

                    return (
                      <div
                        key={lesson.id}
                        className={`flex flex-col items-center justify-center transition-all ${offsetClass}`}
                      >
                        {/* Interactive Node Button */}
                        <button
                          onClick={() => isUnlocked && setSelectedLesson(lesson)}
                          disabled={!isUnlocked}
                          className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-transform focus:outline-none relative select-none cursor-pointer ${
                            isCompleted
                              ? 'bg-gradient-to-br from-emerald-400 to-emerald-600 text-white hover:scale-110 border-4 border-slate-900 ring-4 ring-emerald-500/20'
                              : isActive
                              ? `bg-gradient-to-br ${getTrackColor(stats.activeTrack)} text-white hover:scale-110 border-4 border-slate-900 ring-4 ring-indigo-500/50 animate-pulse`
                              : 'bg-slate-800 text-slate-500 cursor-not-allowed border-4 border-slate-900 ring-2 ring-slate-800'
                          }`}
                        >
                          {isCompleted ? (
                            <Check size={22} className="stroke-[3]" />
                          ) : isUnlocked ? (
                            <Play size={20} className="ml-1 fill-current text-white" />
                          ) : (
                            <Lock size={18} className="text-slate-600" />
                          )}

                          {/* Order bubble indicator */}
                          <div className="absolute -top-1 -right-1 bg-slate-950 text-[10px] font-bold text-slate-400 w-5 h-5 rounded-full flex items-center justify-center border border-slate-800 shadow">
                            {index + 1}
                          </div>
                        </button>

                        {/* Popover helper tags */}
                        {isUnlocked && (
                          <span
                            onClick={() => isUnlocked && setSelectedLesson(lesson)}
                            className={`text-[11px] font-bold mt-1.5 px-2 py-0.5 rounded-full max-w-[150px] truncate text-center cursor-pointer hover:bg-slate-800 transition-all ${
                              isCompleted
                                ? 'text-emerald-400 bg-emerald-500/5 border border-emerald-500/10'
                                : isActive
                                ? 'text-indigo-300 bg-indigo-500/10 border border-indigo-500/20'
                                : 'text-slate-400 bg-slate-900 border border-slate-850'
                            }`}
                          >
                            {lesson.title}
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* RIGHT: Tips & Guidance column */}
      <div className="space-y-6">
        {/* Dynamic Tips panel */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl text-xs space-y-3 text-slate-300">
          <h4 className="font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles size={14} className="text-amber-400" /> Dicas de Combate
          </h4>
          <ul className="space-y-2 text-slate-400 leading-normal pl-4 list-disc">
            <li>Você pode recarregar as suas vidas ❤️ gastando 50 moedas de ouro no topo.</li>
            <li>Use o editor de código para testar e depurar a sua lógica ao vivo.</li>
            <li>Se travar em um desafio avançado, use as dicas 💡 dentro do editor de código. Elas custam apenas 10 Moedas!</li>
          </ul>
        </div>

        {/* Small encouragement badge */}
        <div className="bg-gradient-to-br from-slate-900 to-indigo-950/40 border border-[#1e293b] rounded-2xl p-5 shadow-xl text-center space-y-3">
          <div className="w-10 h-10 rounded-full bg-indigo-500/10 text-indigo-400 flex items-center justify-center mx-auto border border-indigo-500/20 text-sm">
            ✨
          </div>
          <p className="text-xs text-slate-400 leading-normal">
            "O programador paciente forja linhas indestrutíveis." Complete as tarefas passo a passo para se tornar um mestre lendário!
          </p>
        </div>
      </div>

      {/* IMMERSIVE CENTERED DIALOG MODAL FOR SELECTED LESSON */}
      {selectedLesson && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4 transition-all animate-fade-in">
          <div className="bg-slate-900 border-2 border-indigo-500/40 rounded-2xl p-6 md:p-8 shadow-2xl space-y-5 max-w-xl w-full animate-scale-in text-slate-200 relative">
            <div className="flex justify-between items-start">
              <div>
                <span className="px-2.5 py-0.5 text-[9px] font-bold bg-indigo-500/15 text-indigo-300 border border-indigo-500/30 rounded-full uppercase tracking-widest font-mono">
                  MÓDULO: {selectedLesson.difficulty.toUpperCase()}
                </span>
                <h4 className="text-xl font-black font-sans text-white mt-2 tracking-wide leading-tight">{selectedLesson.title}</h4>
              </div>
              <button
                onClick={() => setSelectedLesson(null)}
                className="text-slate-400 hover:text-white text-xs font-bold px-2.5 py-1.5 bg-slate-950 hover:bg-slate-850 rounded-lg border border-slate-800 cursor-pointer transition-all active:scale-95"
              >
                Fechar
              </button>
            </div>

            <div className="h-px bg-slate-800 w-full" />

            <div className="space-y-4 text-xs leading-relaxed">
              <div>
                <span className="text-[10px] uppercase font-bold text-indigo-400 tracking-wider">Quest Primordial:</span>
                <p className="text-slate-300 mt-1 pl-1">{selectedLesson.description}</p>
              </div>

              <div>
                <span className="text-[10px] uppercase font-bold text-emerald-400 tracking-wider">O Conceito Secreto:</span>
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-850 mt-1 font-mono text-[11px] text-slate-300 whitespace-pre-line leading-relaxed">
                  {selectedLesson.concept}
                </div>
              </div>

              <div>
                <span className="text-[10px] uppercase font-bold text-amber-500 tracking-wider">Instruções Práticas:</span>
                <p className="text-slate-200 font-bold bg-amber-500/5 p-3 rounded-lg border border-amber-500/20 border-l-4 border-l-amber-500 mt-1 leading-normal">
                  {selectedLesson.task}
                </p>
              </div>
            </div>

            <div className="flex gap-4 p-3 bg-slate-950 rounded-xl border border-slate-850 justify-around text-center">
              <div>
                <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Recompensa</div>
                <div className="text-sm font-black text-indigo-400 flex items-center gap-1 justify-center mt-0.5">
                  <Award size={14} /> +{selectedLesson.xpReward} XP
                </div>
              </div>
              <div className="w-px bg-slate-800 h-8 self-center" />
              <div>
                <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Tesouro</div>
                <div className="text-sm font-black text-amber-400 flex items-center gap-1 justify-center mt-0.5">
                  <span>🪙</span> +{selectedLesson.coinsReward} Moedas
                </div>
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setSelectedLesson(null)}
                className="flex-1 py-3 bg-slate-800 hover:bg-slate-750 text-slate-300 font-extrabold text-xs uppercase rounded-xl border border-slate-700 tracking-wider transition-all cursor-pointer active:scale-[0.98]"
              >
                Voltar ao Mapa
              </button>
              <button
                onClick={() => {
                  onStartLesson(selectedLesson);
                  setSelectedLesson(null);
                }}
                className="flex-1 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-black text-xs uppercase rounded-xl tracking-wider shadow-lg flex items-center justify-center gap-2 transition-all cursor-pointer hover:shadow-emerald-500/10 active:scale-[0.98]"
              >
                Iniciar Lição <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
