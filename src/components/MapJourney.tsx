/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Lesson, UserStats, TrackType, LevelType } from '../types';
import { SYLLABUS } from '../data/syllabus';
import { Play, Check, Lock, Star, ChevronRight, Award, Compass, Sparkles, BookOpen, Zap, Code, RefreshCw } from 'lucide-react';

interface MapJourneyProps {
  stats: UserStats;
  onStartLesson: (lesson: Lesson) => void;
}

const WISDOM_QUOTES = [
  'HTML Semântico: Nunca use tags apenas pelo tamanho visual (como h1 e h2). Selecione as tags pela hierarquia real de importância da informação.',
  'Layout Perfeito: O segredo supremo da centralização no CSS está em "display: flex; align-items: center; justify-content: center;". Memorize esta trindade suntuosa!',
  'Estilo Reutilizável: Mantenha as cores em variáveis customizadas CSS (--main-color) para facilitar manutenções drásticas no futuro com apenas uma linha.',
  'JavaScript Funcional: Priorize métodos nativos imutáveis como .map(), .filter() e .reduce() sobre estruturas de repetição "for" clássicas e complexas.',
  'Hábito Vencedor: Dedique pelo menos 15 minutos de prática ativa ao dia (fazendo você mesmo!) em vez de apenas assistir vídeo-aulas passivamente.',
  'A Arte de Errar: Se o seu código falhar, não mude coisas aleatoriamente. Leia atentamente a mensagem de feedback do console e isole a falha.',
  'Responsividade Prática: Utilize unidades relativas (rem, %, vh) e evite medidas fixas em pixels (px) nas caixas principais do seu portfólio.',
  'Imagens Saudáveis: Adicione sempre o atributo "alt" descritivo nas suas tags <img /> para acessibilidade impecável e excelente SEO.',
  'Organização Semântica: Agrupar campos com <fieldset> e descrevê-los com <legend> gera formulários comerciais altamente responsivos e adaptáveis.',
  'Otimização de Espaço: Use as tags nativas <details> e <summary> para criar seções expandíveis (FAQs) sem precisar carregar bibliotecas extras de JavaScript!'
];

export default function MapJourney({ stats, onStartLesson }: MapJourneyProps) {
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [tipTab, setTipTab] = useState<'combate' | 'estudos' | 'html_css_js'>('combate');
  const [randomWisdom, setRandomWisdom] = useState<string>(WISDOM_QUOTES[0]);

  const handleRandomizeWisdom = () => {
    const currentIndex = WISDOM_QUOTES.indexOf(randomWisdom);
    let nextIndex = Math.floor(Math.random() * WISDOM_QUOTES.length);
    if (nextIndex === currentIndex) {
      nextIndex = (nextIndex + 1) % WISDOM_QUOTES.length;
    }
    setRandomWisdom(WISDOM_QUOTES[nextIndex]);
  };

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

      {/* RIGHT: Interactive Tips & Educational Guidance Column */}
      <div className="space-y-5 lg:col-span-1">
        {/* Interactive Tips Panel */}
        <div className="bg-slate-900 border border-slate-850 rounded-2xl p-5 shadow-xl space-y-4">
          <div className="flex items-center gap-1.5 border-b border-slate-800 pb-3">
            <Sparkles size={16} className="text-amber-400" />
            <h4 className="font-extrabold text-xs text-white uppercase tracking-wider">
              Manual de Sabedoria Dev
            </h4>
          </div>

          {/* Interactive Navigation Row */}
          <div className="flex bg-slate-950 p-1 rounded-lg border border-slate-800 gap-1">
            <button
              onClick={() => setTipTab('combate')}
              className={`flex-1 py-1 px-2 rounded-md text-[10px] font-bold transition-all cursor-pointer ${
                tipTab === 'combate'
                  ? 'bg-slate-800 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              🎮 Jogo
            </button>
            <button
              onClick={() => setTipTab('estudos')}
              className={`flex-1 py-1 px-2 rounded-md text-[10px] font-bold transition-all cursor-pointer ${
                tipTab === 'estudos'
                  ? 'bg-slate-800 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              🧠 Hábitos
            </button>
            <button
              onClick={() => setTipTab('html_css_js')}
              className={`flex-1 py-1 px-2 rounded-md text-[10px] font-bold transition-all cursor-pointer ${
                tipTab === 'html_css_js'
                  ? 'bg-slate-800 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              💻 Tech Pro
            </button>
          </div>

          {/* Content display based on active Tip tab */}
          <div className="text-slate-300 space-y-3.5 min-h-[140px] animate-fade-in">
            {tipTab === 'combate' && (
              <ul className="space-y-3 text-[11px] leading-relaxed">
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 mt-0.5">❤️</span>
                  <div>
                    <strong className="text-slate-200 block">Gestão das Vidas:</strong>
                    Suas vidas recarregam sozinhas com tempo ou podem ser restauradas gastando moedas de ouro no botão de coração acima.
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-400 mt-0.5">💡</span>
                  <div>
                    <strong className="text-slate-200 block">Dicas de Código (Hints):</strong>
                    Se travar em um teste rígido, compre uma dica no editor por 10 Moedas para clarear os requisitos.
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 mt-0.5">💾</span>
                  <div>
                    <strong className="text-slate-200 block">Salvamento Persistente:</strong>
                    Seu progresso é gravado localmente de forma segura. Compartilhe ou copie o código de Token no cabeçalho para restaurar em qualquer máquina!
                  </div>
                </li>
              </ul>
            )}

            {tipTab === 'estudos' && (
              <ul className="space-y-3 text-[11px] leading-relaxed">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 mt-0.5">🔄</span>
                  <div>
                    <strong className="text-slate-200 block">Estudos Ativos (Recall Ativo):</strong>
                    Evite apenas colar respostas. Experimente reescrever os códigos manualmente no editor para forjar conexões neurais inabaláveis.
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-sky-400 mt-0.5">🧹</span>
                  <div>
                    <strong className="text-slate-200 block">Organização de Código:</strong>
                    Use o recurso da vassoura limpadora antes de cada submissão para manter a legibilidade das quebras de tag no editor.
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-400 mt-0.5">📖</span>
                  <div>
                    <strong className="text-slate-200 block">Aprender com Erros:</strong>
                    Se a compilação falhar, leia atentamente a listagem de requisitos vermelhos abaixo do editor — ela lhe diz exatamente onde corrigir.
                  </div>
                </li>
              </ul>
            )}

            {tipTab === 'html_css_js' && (
              <ul className="space-y-3 text-[11px] leading-relaxed">
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 mt-0.5">🌐</span>
                  <div>
                    <strong className="text-slate-200 block">Semântica é Ouro:</strong>
                    tags como <code className="text-rose-300 font-mono bg-rose-950/40 px-1 py-0.2 rounded">&lt;header&gt;</code>, <code className="text-rose-300 font-mono bg-rose-950/40 px-1 py-0.2 rounded">&lt;nav&gt;</code> e <code className="text-rose-300 font-mono bg-rose-950/40 px-1 py-0.2 rounded">&lt;main&gt;</code> superam drasticas divís, tornando seu site responsivo a buscadores e leitores de tela.
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 mt-0.5">🎨</span>
                  <div>
                    <strong className="text-slate-200 block">Alinhamento Perfeito:</strong>
                    Diga adeus a margens fixas confusas. Para centralizar mídias, declare <code className="text-cyan-300 font-mono bg-cyan-950/40 px-1 py-0.2 rounded">display: flex; align-items: center; justify-content: center;</code>.
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400 mt-0.5">🧪</span>
                  <div>
                    <strong className="text-slate-200 block">Manipulações Imutáveis:</strong>
                    Dê preferência a mapeadores funcionais <code className="text-yellow-300 font-mono bg-yellow-950/40 px-1 py-0.2 rounded">.map()</code> e <code className="text-yellow-300 font-mono bg-yellow-950/40 px-1 py-0.2 rounded">.filter()</code> para tratar arrays sem induzir falhas em dados primitivos.
                  </div>
                </li>
              </ul>
            )}
          </div>
        </div>

        {/* Dynamic Oracle Generator Badge */}
        <div className="bg-gradient-to-br from-slate-900 to-indigo-950/70 border border-slate-800/80 rounded-2xl p-5 shadow-xl text-center space-y-4">
          <div className="w-10 h-10 rounded-full bg-indigo-500/10 text-indigo-400 flex items-center justify-center mx-auto border border-indigo-500/20 text-sm">
            🔮
          </div>
          <div className="space-y-1.5">
            <h5 className="text-[11px] font-black uppercase text-indigo-300 tracking-wider">
              Oráculo de Sabedoria de Código
            </h5>
            <p className="text-[11px] text-slate-300 italic leading-relaxed bg-slate-950/60 p-3.5 rounded-xl border border-slate-850">
              "{randomWisdom}"
            </p>
          </div>
          <button
            onClick={handleRandomizeWisdom}
            className="w-full py-1.5 px-3 bg-indigo-600 hover:bg-indigo-500 text-white border border-indigo-500/30 rounded-lg text-[10px] font-extrabold uppercase tracking-widest cursor-pointer transition-all active:scale-95 flex items-center justify-center gap-1.5 shadow-md shadow-indigo-600/10"
          >
            <RefreshCw size={11} className="animate-spin-slow" />
            Consular Próxima Dica
          </button>
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
