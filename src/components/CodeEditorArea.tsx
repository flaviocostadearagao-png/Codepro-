/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { Lesson, UserStats, CodeTest, TrackType, LevelType } from '../types';
import { Play, RotateCcw, HelpCircle, Eye, Terminal, CheckCircle2, XCircle, ChevronRight, Award, Flame, AlertCircle, ArrowLeft, ArrowRight, Lock, Unlock } from 'lucide-react';
import { SYLLABUS } from '../data/syllabus';

interface CodeEditorAreaProps {
  stats: UserStats;
  activeLesson: Lesson | null;
  onCodeSuccess: (xp: number, coins: number, lessonId: string) => void;
  onCodeFailure: () => void;
  onSpendCoins: (coins: number) => boolean;
  onBuyHint: () => void;
  onClose: () => void;
  onSelectLesson: (lesson: Lesson) => void;
}

export default function CodeEditorArea({
  stats,
  activeLesson,
  onCodeSuccess,
  onCodeFailure,
  onSpendCoins,
  onBuyHint,
  onClose,
  onSelectLesson
}: CodeEditorAreaProps) {
  const [code, setCode] = useState('');
  const [hintBought, setHintBought] = useState(false);
  const [successMode, setSuccessMode] = useState(false);
  const [shakeActive, setShakeActive] = useState(false);
  const [testResults, setTestResults] = useState<{ id: string; passed: boolean; checked: boolean }[]>([]);
  const [consoleLogs, setConsoleLogs] = useState<string[]>([]);
  const [activeRightTab, setActiveRightTab] = useState<'preview' | 'console'>('preview');

  // Iframe ref for HTML/CSS preview
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Filter and sort active track lessons
  const trackLessons = activeLesson ? SYLLABUS.filter((l) => l.track === activeLesson.track) : [];
  const difficultyOrderObj: Record<LevelType, number> = { iniciante: 1, intermediario: 2, avancado: 3 };

  const sortedLessons = [...trackLessons].sort((a, b) => {
    if (a.difficulty !== b.difficulty) {
      return difficultyOrderObj[a.difficulty] - difficultyOrderObj[b.difficulty];
    }
    return a.order - b.order;
  });

  const isLessonUnlocked = (lesson: Lesson) => {
    const idx = sortedLessons.findIndex((l) => l.id === lesson.id);
    if (idx === 0) return true;
    const prevLesson = sortedLessons[idx - 1];
    return stats.completedLessons.includes(prevLesson.id);
  };

  const currentIdx = activeLesson ? sortedLessons.findIndex((l) => l.id === activeLesson.id) : -1;
  const prevLesson = currentIdx > 0 ? sortedLessons[currentIdx - 1] : null;
  const nextLesson = currentIdx !== -1 && currentIdx < sortedLessons.length - 1 ? sortedLessons[currentIdx + 1] : null;
  const isNextLessonUnlocked = nextLesson ? isLessonUnlocked(nextLesson) : false;

  // Load lesson code
  useEffect(() => {
    if (activeLesson) {
      setCode(activeLesson.initialCode);
      setHintBought(stats.completedLessons.includes(activeLesson.id)); // free hint if already solved
      setSuccessMode(false);
      setConsoleLogs([]);
      setActiveRightTab(activeLesson.track === 'js' ? 'console' : 'preview');
      
      // Initialize tests
      const initialTests = activeLesson.tests.map(t => ({ id: t.id, passed: false, checked: false }));
      setTestResults(initialTests);
    }
  }, [activeLesson, stats.completedLessons]);

  // Handle immediate visual response in iframe (for HTML / CSS preview)
  useEffect(() => {
    if (!activeLesson || activeLesson.track === 'js' || !iframeRef.current) return;
    
    // Inject CSS or HTML appropriately
    let documentContent = '';
    if (activeLesson.track === 'html') {
      documentContent = `
        <!doctype html>
        <html>
          <head>
            <style>
              body { font-family: 'Inter', sans-serif; color: white; padding: 15px; margin: 0; background-color: #0b1329; }
              h1, h2, h3 { margin-top: 0; color: #6366f1; }
              ul { padding-left: 20px; }
              li { margin-bottom: 5px; }
              a { color: #f59e0b; font-weight: bold; }
              img { border-radius: 8px; margin-top: 10px; border: 1px solid #1e293b; max-width: 100%; height: auto; }
              table { border-collapse: collapse; width: 100%; margin-top: 12px; }
              th, td { border: 1px solid #334155; padding: 8px; text-align: left; }
              th { background-color: #1e293b; color: #818cf8; }
              select, textarea, input, button { background-color: #1e293b; border: 1px solid #475569; color: white; padding: 6px 12px; border-radius: 6px; font-size: 13px; }
              button { background-color: #10b981; border: none; cursor: pointer; font-weight: bold; }
              button:hover { background-color: #059669; }
            </style>
          </head>
          <body>
            ${code}
          </body>
        </html>
      `;
    } else if (activeLesson.track === 'css') {
      // Simulate HTML context for CSS
      const sampleHTML = getCSSContextHTML(activeLesson.id);
      documentContent = `
        <!doctype html>
        <html>
          <head>
            <style>
              body { font-family: 'Inter', sans-serif; color: white; padding: 15px; margin: 0; background-color: #0b1329; }
              ${code}
            </style>
          </head>
          <body>
            ${sampleHTML}
          </body>
        </html>
      `;
    }

    const iframeDoc = iframeRef.current.contentDocument || iframeRef.current.contentWindow?.document;
    if (iframeDoc) {
      iframeDoc.open();
      iframeDoc.write(documentContent);
      iframeDoc.close();
    }
  }, [code, activeLesson]);

  if (!activeLesson) {
    const trackLessons = SYLLABUS.filter((l) => l.track === stats.activeTrack);
    const difficultyOrderObj: Record<LevelType, number> = { iniciante: 1, intermediario: 2, avancado: 3 };

    const sortedLessons = [...trackLessons].sort((a, b) => {
      if (a.difficulty !== b.difficulty) {
        return difficultyOrderObj[a.difficulty] - difficultyOrderObj[b.difficulty];
      }
      return a.order - b.order;
    });

    const isUnlocked = (lesson: Lesson) => {
      const idx = sortedLessons.findIndex((l) => l.id === lesson.id);
      if (idx === 0) return true;
      const prevLesson = sortedLessons[idx - 1];
      return stats.completedLessons.includes(prevLesson.id);
    };

    return (
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-2xl max-w-4xl mx-auto my-6 space-y-6 animate-scale-in text-slate-200">
        <div className="text-center space-y-2 border-b border-slate-800 pb-6">
          <div className="w-16 h-16 rounded-full bg-slate-950 flex items-center justify-center text-3xl border border-slate-850 mx-auto">
            💻
          </div>
          <h3 className="text-white font-extrabold text-xl font-sans uppercase tracking-wider">Centro de Treinamento e Prática</h3>
          <p className="text-xs text-slate-400 max-w-xl mx-auto">
            Escolha qualquer lição prática desbloqueada na trilha de <strong className="text-indigo-400">{stats.activeTrack.toUpperCase()}</strong> abaixo para carregar as instruções e o editor de código interativo ao vivo.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[420px] overflow-y-auto pr-2">
          {sortedLessons.map((lesson, idx) => {
            const unlocked = isUnlocked(lesson);
            const completed = stats.completedLessons.includes(lesson.id);

            return (
              <div
                key={lesson.id}
                className={`p-4 rounded-xl border transition-all flex flex-col justify-between ${
                  completed
                    ? 'bg-emerald-500/5 border-emerald-500/20 hover:border-emerald-500/40'
                    : unlocked
                    ? 'bg-slate-950 border-slate-850/80 hover:border-indigo-500/40'
                    : 'bg-slate-950/40 border-slate-900 opacity-55 text-slate-500 select-none'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] uppercase font-mono bg-slate-900/80 px-2 py-0.5 rounded text-indigo-400 font-extrabold tracking-wider border border-slate-800">
                      Nível {idx + 1} • {lesson.difficulty}
                    </span>
                    {completed ? (
                      <span className="text-[10px] font-bold text-emerald-400 flex items-center gap-1 bg-emerald-500/10 px-2 py-0.5 rounded">
                        ✓ Concluída
                      </span>
                    ) : unlocked ? (
                      <span className="text-[10px] font-bold text-amber-500 flex items-center gap-1 bg-amber-500/10 px-2 py-0.5 rounded">
                        ⚔️ Disponível
                      </span>
                    ) : (
                      <span className="text-[10px] font-bold text-slate-600 flex items-center gap-1 bg-slate-900 px-2 py-0.5 rounded">
                        <Lock size={10} /> Bloqueada
                      </span>
                    )}
                  </div>
                  <h4 className="text-sm font-bold text-white leading-snug">{lesson.title}</h4>
                  <p className="text-slate-400 text-[11px] mt-1 line-clamp-2 leading-relaxed">{lesson.description}</p>
                </div>

                <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-800/60 text-[11px]">
                  <div className="flex items-center gap-3 text-slate-400 font-medium">
                    <span className="text-indigo-400">+{lesson.xpReward} XP</span>
                    <span>•</span>
                    <span className="text-amber-400">{lesson.coinsReward}🪙</span>
                  </div>

                  {unlocked || completed ? (
                    <button
                      onClick={() => onSelectLesson(lesson)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
                        completed
                          ? 'bg-emerald-500/10 hover:bg-emerald-500 hover:text-white text-emerald-400 border border-emerald-500/20'
                          : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow shadow-indigo-500/20'
                      }`}
                    >
                      {completed ? 'Rejogar' : 'Iniciar'} <ChevronRight size={12} />
                    </button>
                  ) : (
                    <button
                      disabled
                      className="px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-900 text-slate-600 border border-slate-850/60 cursor-not-allowed flex items-center gap-1"
                    >
                      <Lock size={12} /> Bloqueada
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // Supply HTML skeletons for the CSS track to visualize layout
  function getCSSContextHTML(lessonId: string) {
    switch (lessonId) {
      case 'css_ini_1':
        return `<h1>Seu Título CodeQuest</h1><p>Mude o clima deste título utilizando CSS básico de cores.</p>`;
      case 'css_ini_2':
        return `<div class="card"><h3>Muralha Sagrada</h3><p>Estilize as bordas e os cantos arredondados desta carta.</p></div>`;
      case 'css_ini_3':
        return `<section><h3>Seção de Treino</h3><p>Adicione preenchimento interno (padding) e margem externa inferior nesta área.</p></section><p>Elemento Externo de Fronteira</p>`;
      case 'css_ini_4':
        return `<p>Este parágrafo precisa de um toque visual! Ajuste o tamanho da tipografia, o alinhamento central e o negrito com propriedades CSS dedicadas.</p>`;
      case 'css_ini_5':
        return `<div id="guerreiro">Eu sou o #guerreiro heróico (texto deve ficar branco).</div>\n<div class="inimigo">Cuidado com o .inimigo (texto deve ficar vermelho).</div>`;
      case 'css_int_1':
        return `<div class="container">\n  <div style="background:#ef4444; padding: 15px; border-radius: 6px;">Força ❤️</div>\n  <div style="background:#3b82f6; padding: 15px; border-radius: 6px;">Magia ⚡</div>\n  <div style="background:#10b981; padding: 15px; border-radius: 6px;">Ouro 🪙</div>\n</div>`;
      case 'css_int_2':
        return `<div class="mochila">\n  <div style="background:#1e293b; padding: 20px; text-align:center; border: 1px font-size:12px; border-radius:6px;">Espada ⚔️</div>\n  <div style="background:#1e293b; padding: 20px; text-align:center; border: 1px font-size:12px; border-radius:6px;">Escudo 🛡️</div>\n  <div style="background:#1e293b; padding: 20px; text-align:center; border: 1px font-size:12px; border-radius:6px;">Elmo 🪖</div>\n</div>`;
      case 'css_int_3':
        return `<div class="card-pai" style="background:#1e293b; padding: 40px; border-radius:10px; width: 250px; height: 150px; border: 1px solid #334155;">\n  <h4>Card do Jogador</h4>\n  <div class="pin-filho" style="background:#ef4444; color:white; padding: 5px 8px; font-size:10px; border-radius:3px;">Poção Ativa!</div>\n</div>`;
      case 'css_int_4':
        return `<div class="batalha" style="padding: 30px; border-radius:10px; text-align:center; border: 2px dashed #475569;">\n  <h4>Modifique o celular</h4>\n  <p>Reduza a largura do preview ou da janela para menos de 600px para ver a tela ficar azul.</p>\n</div>`;
      case 'css_int_5':
        return `<div class="reliquia" style="background:#1e293b; padding: 30px; border-radius: 12px; text-align:center; border: 1px solid #475569; max-width: 200px;">\n  <h4>Relíquia Mágica</h4>\n  <p>Projete uma sombra sobre este elemento.</p>\n</div>`;
      case 'css_adv_1':
        return `<button class="botao" style="padding: 10px 20px; background: #6366f1; border-radius: 8px; cursor: pointer;">Passe o Mouse</button>`;
      case 'css_adv_2':
        return `<div class="pulsar-alvo" style="width:60px; height:60px; border-radius:50%; background:#f59e0b; margin: auto; animation: pulsar 1.5s infinite alternate;"></div>`;
      case 'css_adv_3':
        return `<h2>Título H2 Colorido por Variável</h2>`;
      case 'css_adv_4':
        return `<div class="dragao-mistico" style="background: red; padding: 30px; border-radius:12px; text-align:center; font-weight: bold;">DRAGÃO MÍSTICO (Estou Desfocado)</div>`;
      case 'css_adv_5':
        return `<div class="carta" style="background:#818cf8; width:150px; height:200px; border-radius:10px; padding:15px; margin:auto; display:flex; align-items:center; justify-content:center; text-align:center; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);">\n  <h4>CARTA DE BATALHA 3D</h4>\n</div>`;
      default:
        return `<div>Visualizador CSS</div>`;
    }
  }

  // Handle hint purchase
  const handleBuyHintClick = () => {
    if (hintBought) return;
    const success = onSpendCoins(10);
    if (success) {
      setHintBought(true);
      onBuyHint();
    }
  };

  // Run the code verification routine
  const handleVerifyCode = () => {
    if (stats.hearts <= 0) {
      alert('Você não possui corações ❤️ restantes! Cure-se na barra superior antes de programar.');
      return;
    }

    setConsoleLogs(prev => [...prev, '> Iniciando checagem técnica...']);
    const evaluatedTests: { id: string; passed: boolean; checked: boolean }[] = [];
    let trackSuccess = true;

    // Check JavaScript code runs without error and passes logical assertions
    let compilationError: string | null = null;
    let evalOutput: any = null;

    if (activeLesson.track === 'js') {
      try {
        // Safe evaluation of the JS block
        // Create virtual scope environment
        const runLogs: string[] = [];
        const customConsole = {
          log: (...args: any[]) => {
            runLogs.push(args.map(a => typeof a === 'object' ? JSON.stringify(a) : a).join(' '));
          }
        };

        // Evaluation code wrap
        // We'll mock variables if they are invoked based on lessons
        let mockContext = '';
        if (activeLesson.id === 'js_ini_2') {
          // decidirRota test context helper
          mockContext = `
            try {
              if (decidirRota(15) !== "Recuar") { throw new Error("Erro de Assert: decidirRota(15) deveria retornar 'Recuar'"); }
              if (decidirRota(45) !== "Avançar") { throw new Error("Erro de Assert: decidirRota(45) deveria retornar 'Avançar'"); }
            } catch(e) { throw e; }
          `;
        } else if (activeLesson.id === 'js_ini_3') {
          mockContext = `
            try {
              if (saudarGuerreiro("Galahad") !== "Olá, Galahad") { throw new Error("Erro: saudarGuerreiro('Galahad') deve retornar 'Olá, Galahad'"); }
            } catch(e) { throw e; }
          `;
        } else if (activeLesson.id === 'js_ini_4') {
          mockContext = `
            try {
              if (calcularAtaque(10, 3) !== 30) { throw new Error("Erro: calcularAtaque(10, 3) deve retornar 30"); }
            } catch(e) { throw e; }
          `;
        } else if (activeLesson.id === 'js_ini_5') {
          mockContext = `
            try {
              if (obterPrimeiroItem(["Poção", "Escudo"]) !== "Poção") { throw new Error("Erro: obterPrimeiroItem deve retornar o primeiro item [0]"); }
            } catch(e) { throw e; }
          `;
        } else if (activeLesson.id === 'js_int_1') {
          mockContext = `
            try {
              if (dispararEcos(3) !== "Eco Eco Eco") { throw new Error("Erro: dispararEcos(3) deveria dar 'Eco Eco Eco'"); }
            } catch(e) { throw e; }
          `;
        } else if (activeLesson.id === 'js_int_2') {
          mockContext = `
            // DOM simulation
            const document = {
              getElementById: function(id) {
                return { textContent: "5/5", innerHTML: "5/5" };
              }
            };
            try {
              const res = capturarStatus();
              if (res !== "5/5") { throw new Error("Erro: capturarStatus() deve recolher textContent de 'vidas-restantes'"); }
            } catch(e) { throw e; }
          `;
        } else if (activeLesson.id === 'js_int_3') {
          mockContext = `
            let clickCallback = null;
            const mockBotao = {
              addEventListener: function(evt, cb) {
                if(evt === "click") clickCallback = cb;
              }
            };
            let trig = false;
            const mockBumbo = () => { trig = true; };
            try {
              prenderEvento(mockBotao, mockBumbo);
              if (typeof clickCallback !== "function") { throw new Error("Erro: addeventlistener de click não cadastrado."); }
              clickCallback();
              if(!trig) { throw new Error("Erro: callback baterBumbo não disparada."); }
            } catch(e) { throw e; }
          `;
        } else if (activeLesson.id === 'js_int_4') {
          mockContext = `
            try {
              const filtrados = selecionarElites([{ level: 20 }, { level: 60 }, { level: 50 }]);
              if (filtrados.length !== 2) { throw new Error("Erro: selecionarElites deve reter apenas maiores de 50 level."); }
            } catch(e) { throw e; }
          `;
        } else if (activeLesson.id === 'js_int_5') {
          mockContext = `
            const mockDivDoc = { textContent: "" };
            const document = {
              createElement: function(tag) {
                return mockDivDoc;
              }
            };
            let appended = null;
            const parent = {
              appendChild: function(node) {
                appended = node;
              }
            };
            try {
              spawnLoote(parent);
              if(mockDivDoc.textContent !== "Item Lendário") { throw new Error("Erro: texto deve ser 'Item Lendário'"); }
              if(appended !== mockDivDoc) { throw new Error("Erro: deve acoplar item no container"); }
            } catch(e) { throw e; }
          `;
        } else if (activeLesson.id === 'js_adv_1') {
          mockContext = `
            try {
              prometerRecompensa().then(res => {
                if(res !== "Tesouro Concedido") throw new Error();
              });
            } catch(e) { throw e; }
          `;
        } else if (activeLesson.id === 'js_adv_2') {
          mockContext = `
            const mockResponse = { json: async () => ({ name: "Hydra" }) };
            const fetch = async () => mockResponse;
            try {
              buscarMonstro("https://test.com").then(res => {
                if(res.name !== "Hydra") throw new Error();
              });
            } catch(e) { throw e; }
          `;
        } else if (activeLesson.id === 'js_adv_3') {
          mockContext = `
            try {
              const res = serializarHeroi({ heroi: "Arthur" });
              if (typeof res !== "string" || !res.includes("Arthur")) { throw new Error(); }
            } catch(e) { throw e; }
          `;
        } else if (activeLesson.id === 'js_adv_4') {
          mockContext = `
            let mockVal = "";
            const localStorage = {
              setItem: function(key, val) {
                if(key === "pontos_xp") mockVal = val;
              }
            };
            try {
              salvarXP("450");
              if(mockVal !== "450") { throw new Error(); }
            } catch(e) { throw e; }
          `;
        } else if (activeLesson.id === 'js_adv_5') {
          mockContext = `
            let timerCb = null;
            let tm = 0;
            const setInterval = function(cb, t) {
              timerCb = cb;
              tm = t;
              return 42;
            };
            try {
              const id = loopDeDano(() => {});
              if(id !== 42 || tm !== 1000) { throw new Error(); }
            } catch(e) { throw e; }
          `;
        }

        // Run user evaluation
        const evaluationPayload = `
          (function() {
            const console = {
              log: function(...args) {
                runLogs.push(args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' '));
              }
            };
            ${code}
            ${mockContext}
          })();
        `;
        
        // Execute eval safely in function context
        const sandboxRunner = new Function('runLogs', evaluationPayload);
        sandboxRunner(runLogs);

        // Append user prints in console emulator
        if (runLogs.length > 0) {
          setConsoleLogs(prev => [...prev, ...runLogs.map(l => `[LOG] ${l}`)]);
        }
        setConsoleLogs(prev => [...prev, '🟢 Executado com sucesso sem crash de compilação.']);
      } catch (err: any) {
        compilationError = err.message || String(err);
        setConsoleLogs(prev => [...prev, `❌ CRASH DE SINTAXE: ${compilationError}`]);
        trackSuccess = false;
      }
    }

    // Process general individual requirements check
    activeLesson.tests.forEach((test) => {
      let passed = false;
      
      if (compilationError && activeLesson.track === 'js') {
        passed = false;
      } else {
        if (test.ruleType === 'regex') {
          passed = new RegExp(test.expected, 'i').test(code);
        } else if (test.ruleType === 'contains') {
          passed = code.toLowerCase().includes(test.expected.toLowerCase());
        } else if (test.ruleType === 'not_contains') {
          passed = !code.toLowerCase().includes(test.expected.toLowerCase());
        } else if (test.ruleType === 'js_eval') {
          passed = !compilationError;
        }
      }

      if (!passed) {
        trackSuccess = false;
      }
      evaluatedTests.push({ id: test.id, passed, checked: true });
    });

    setTestResults(evaluatedTests);

    if (trackSuccess) {
      setSuccessMode(true);
      onCodeSuccess(activeLesson.xpReward, activeLesson.coinsReward, activeLesson.id);
    } else {
      // Trigger error shake animation
      setShakeActive(true);
      setTimeout(() => setShakeActive(false), 800);
      onCodeFailure();
    }
  };

  return (
    <div className={`grid grid-cols-1 xl:grid-cols-12 gap-6 bg-slate-950 border border-slate-900 rounded-2xl p-4 md:p-6 shadow-2xl relative ${shakeActive ? 'animate-shake border-rose-500' : ''}`}>
      
      {/* 1. LEFT SIDEBAR: Instructions & Theory & Tests */}
      <div className="xl:col-span-4 bg-slate-900 border border-slate-800 rounded-xl p-5 flex flex-col justify-between h-[600px] overflow-y-auto">
        <div className="space-y-4">
          <div className="space-y-3 bg-slate-950 p-3 rounded-xl border border-slate-850">
            <div className="flex items-center justify-between gap-2">
              <span className="text-[9px] uppercase font-bold text-indigo-400 tracking-wider">Desafios</span>
              <button
                onClick={onClose}
                className="text-[9px] py-1 px-2.5 rounded bg-slate-900 hover:bg-slate-800 text-slate-400 font-bold border border-slate-800 cursor-pointer transition-all uppercase"
              >
                Voltar ao Mapa
              </button>
            </div>
            
            {/* Dropdown Selector */}
            <select
              value={activeLesson.id}
              onChange={(e) => {
                const selected = sortedLessons.find(l => l.id === e.target.value);
                if (selected) onSelectLesson(selected);
              }}
              className="w-full bg-slate-900 text-stone-105 font-extrabold text-[11px] p-2 rounded-lg border border-slate-800 focus:outline-none focus:border-indigo-500 cursor-pointer"
            >
              {sortedLessons.map((l, i) => {
                const unlocked = isLessonUnlocked(l);
                const completed = stats.completedLessons.includes(l.id);
                const prefix = completed ? '✅' : unlocked ? '⚔️' : '🔒';
                return (
                  <option key={l.id} value={l.id} disabled={!unlocked && !completed}>
                    {prefix} Nível {i + 1}: {l.title}
                  </option>
                );
              })}
            </select>

            {/* Quick Prev / Next Buttons */}
            <div className="flex items-center gap-2 justify-between">
              <button
                onClick={() => prevLesson && onSelectLesson(prevLesson)}
                disabled={!prevLesson}
                className={`flex-1 py-1 px-2 rounded text-[10px] font-bold uppercase flex items-center justify-center gap-1 border transition-all ${
                  prevLesson
                    ? 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-805 cursor-pointer'
                    : 'bg-slate-950/20 border-slate-900/40 text-slate-600 cursor-not-allowed'
                }`}
                title="Ir para o desafio anterior"
              >
                <ArrowLeft size={10} /> Anterior
              </button>
              
              <button
                onClick={() => nextLesson && onSelectLesson(nextLesson)}
                disabled={!nextLesson || (!isNextLessonUnlocked && !stats.completedLessons.includes(activeLesson.id))}
                className={`flex-1 py-1 px-2 rounded text-[10px] font-bold uppercase flex items-center justify-center gap-1 border transition-all ${
                  nextLesson && (isNextLessonUnlocked || stats.completedLessons.includes(activeLesson.id))
                    ? 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-805 cursor-pointer'
                    : 'bg-slate-950/20 border-slate-900/40 text-slate-650 cursor-not-allowed'
                }`}
                title="Avançar para o próximo desafio liberado"
              >
                Próximo <ArrowRight size={10} />
              </button>
            </div>
          </div>

          <div className="flex justify-between items-start pt-1">
            <div>
              <span className="px-2 py-0.5 rounded-full bg-slate-950 text-slate-450 border border-slate-850 uppercase font-black text-[9px] tracking-widest leading-none">
                {activeLesson.track.toUpperCase()} • {activeLesson.difficulty.toUpperCase()}
              </span>
              <h3 className="text-base font-bold text-white mt-1.5 leading-snug">{activeLesson.title}</h3>
            </div>
          </div>

          <div className="h-px bg-slate-800" />

          {/* Theoretical Core */}
          <div className="text-xs">
            <span className="text-[10px] uppercase font-bold tracking-wider text-indigo-400">Lore Teórica</span>
            <p className="text-slate-300 mt-1 leading-relaxed bg-slate-950/50 p-3 rounded-lg border border-slate-850 font-sans">
              {activeLesson.concept}
            </p>
          </div>

          {/* Practical task instructions */}
          <div className="text-xs">
            <span className="text-[10px] uppercase font-bold tracking-wider text-amber-400">Missão Prática</span>
            <div className="bg-amber-500/5 text-slate-200 p-3 rounded-lg border border-amber-500/20 mt-1 font-semibold leading-relaxed border-l-4 border-l-amber-500">
              {activeLesson.task}
            </div>
          </div>
        </div>

        {/* Requirements status list */}
        <div className="space-y-3 pt-4 border-t border-slate-800 mt-4">
          <span className="text-[10px] uppercase font-bold tracking-widest text-[#94a3b8]">Testes de Validação</span>
          <div className="space-y-2 max-h-[140px] overflow-y-auto pr-1">
            {activeLesson.tests.map((test) => {
              const res = testResults.find((r) => r.id === test.id);
              const evaluated = res?.checked;
              const passed = res?.passed;

              return (
                <div
                  key={test.id}
                  className={`flex items-start gap-2.5 p-2 rounded-lg text-xs transition-all ${
                    evaluated
                      ? passed
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                        : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                      : 'bg-slate-950 text-slate-400 border border-slate-850/60'
                  }`}
                >
                  <div className="mt-0.5 shrink-0">
                    {evaluated ? (
                      passed ? (
                        <CheckCircle2 size={14} className="fill-current text-emerald-500 bg-white rounded-full" />
                      ) : (
                        <XCircle size={14} className="fill-current text-rose-500 bg-white rounded-full" />
                      )
                    ) : (
                      <div className="w-3.5 h-3.5 rounded-full border border-slate-700 bg-slate-900" />
                    )}
                  </div>
                  <span className="leading-tight text-[11px] font-medium">{test.description}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 2. CENTER PANEL: Typing code playground */}
      <div className="xl:col-span-5 bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col justify-between h-[600px]">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 shadow shadow-rose-500/50" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 shadow shadow-amber-500/50" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow shadow-emerald-500/50" />
            <span className="text-[11px] text-slate-400 font-mono ml-2 font-semibold">editor.ts</span>
          </div>
          
          {/* Assist buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                if (window.confirm('Tem certeza que deseja redefinir o código inicial deste desafio?')) {
                  setCode(activeLesson.initialCode);
                  setTestResults(activeLesson.tests.map(t => ({ id: t.id, passed: false, checked: false })));
                }
              }}
              className="p-1 px-2 hover:bg-slate-800 text-slate-400 hover:text-slate-200 text-[10px] font-bold rounded flex items-center gap-1 bg-slate-950 border border-slate-850 cursor-pointer transition-all"
              title="Redefinir Código"
            >
              <RotateCcw size={10} /> Resetar
            </button>
            <button
              onClick={handleBuyHintClick}
              disabled={hintBought}
              className={`p-1 px-2.5 rounded text-[10px] font-extrabold flex items-center gap-1 border transition-all cursor-pointer ${
                hintBought
                  ? 'bg-slate-950 text-emerald-400 border-emerald-500/20'
                  : stats.coins >= 10
                  ? 'bg-amber-500/10 text-amber-400 border-amber-500/30 hover:bg-amber-500 hover:text-white'
                  : 'bg-slate-900 text-slate-500 border-slate-800 cursor-not-allowed'
              }`}
              title="Gastar 10 moedas de ouro para ver a dica do especialista"
            >
              💡 {hintBought ? 'Dica Revelada' : 'Comprar Dica (-10🪙)'}
            </button>
          </div>
        </div>

        {/* The code IDE editable zone */}
        <div className="flex-1 w-full bg-slate-950 rounded-lg p-3 border border-slate-850 flex font-mono text-xs relative overflow-hidden group">
          {/* Code line numbers */}
          <div className="text-slate-600 select-none text-right pr-3 border-r border-slate-850 space-y-1 text-[11px]">
            {Array.from({ length: 24 }).map((_, i) => (
              <div key={i}>{i + 1}</div>
            ))}
          </div>

          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="flex-1 bg-transparent text-slate-100 pl-3 focus:outline-none resize-none font-mono text-xs overflow-y-auto leading-relaxed h-full whitespace-pre"
            spellCheck="false"
            placeholder="Digite o código para o desafio..."
          />
        </div>

        {/* Submit & Status action bottom-line */}
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-1.5 text-slate-400">
            {hintBought && (
              <div className="p-2.5 bg-slate-950 border border-amber-550/30 rounded-lg font-sans text-[11px] text-amber-300 leading-normal animate-scale-in">
                <strong>Dica de Sucesso:</strong> {activeLesson.hint}
              </div>
            )}
          </div>
          
          <button
            onClick={handleVerifyCode}
            disabled={stats.hearts <= 0}
            className={`py-3 px-6 rounded-xl font-bold font-sans text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg transition-all cursor-pointer shrink-0 ${
              stats.hearts <= 0
                ? 'bg-slate-800 text-slate-500 border border-slate-850 cursor-not-allowed hover:shadow-none'
                : 'bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white hover:shadow-indigo-500/10 active:scale-95'
            }`}
          >
            Verificar Código <Play size={14} className="fill-current text-white" />
          </button>
        </div>
      </div>

      {/* 3. RIGHT SIDEBAR: Live sandbox visual checker */}
      <div className="xl:col-span-3 bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col justify-between h-[600px]">
        {/* Navigation widgets */}
        <div className="flex bg-slate-950 p-0.5 rounded-lg border border-slate-850 mb-3 font-semibold text-[11px]">
          <button
            onClick={() => setActiveRightTab('preview')}
            disabled={activeLesson.track === 'js'}
            className={`flex-1 py-1 px-2.5 rounded font-bold uppercase transition-all flex items-center justify-center gap-1.5 ${
              activeLesson.track === 'js'
                ? 'opacity-40 cursor-not-allowed text-slate-600'
                : activeRightTab === 'preview'
                ? 'bg-slate-800 text-white font-black'
                : 'text-slate-400 hover:text-slate-200 cursor-pointer'
            }`}
          >
            <Eye size={12} /> Live Preview
          </button>
          <button
            onClick={() => setActiveRightTab('console')}
            className={`flex-1 py-1 px-2.5 rounded font-bold uppercase transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              activeRightTab === 'console'
                ? 'bg-slate-800 text-white font-black'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Terminal size={12} /> Console Log
          </button>
        </div>

        {/* Switch outputs */}
        <div className="flex-1 bg-slate-950 border border-slate-850 rounded-lg overflow-hidden h-full">
          {activeRightTab === 'preview' && activeLesson.track !== 'js' ? (
            <iframe
              ref={iframeRef}
              title="Coding preview area"
              className="w-full h-full border-none bg-slate-950"
            />
          ) : (
            <div className="w-full h-full p-3 font-mono text-[10px] text-zinc-400 overflow-y-auto space-y-1 bg-slate-950">
              <div className="text-zinc-600 border-b border-slate-850 pb-1 mb-2">CodeQuest Safe JS Sandbox Console v1.0</div>
              {consoleLogs.length === 0 ? (
                <div className="text-zinc-700 italic">Escreva logs no seu código ou clique verificar para disparar testes lógicos.</div>
              ) : (
                consoleLogs.map((log, idx) => (
                  <div
                    key={idx}
                    className={`leading-normal ${
                      log.startsWith('❌')
                        ? 'text-rose-400'
                        : log.startsWith('🟢')
                        ? 'text-emerald-400 font-bold'
                        : 'text-slate-200'
                    }`}
                  >
                    {log}
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        {/* Small hint panel footer */}
        <div className="mt-3 p-3 bg-slate-950 rounded-lg text-[10px] leading-normal text-slate-400 border border-slate-850">
          {activeLesson.track === 'js' ? (
            <span><strong>JS Nota:</strong> A simulação executa verificações unitárias ao vivo em cima da sua lógica ao carregar o seu código.</span>
          ) : (
            <span><strong>HTML/CSS Nota:</strong> O Preview espelha o visual instantaneamente. Sinta-se livre para customizar.</span>
          )}
        </div>
      </div>

      {/* 4. CONGRATULATIONS / SUCCESS MODAL OVERLAY */}
      {successMode && (
        <div className="absolute inset-0 bg-slate-950/95 z-50 rounded-2xl flex items-center justify-center p-6 animate-scale-in">
          <div className="max-w-md w-full bg-slate-900 border-2 border-indigo-500 rounded-2xl p-6 text-center shadow-2xl relative overflow-hidden">
            {/* Ambient burst visual */}
            <div className="absolute -top-10 -left-10 w-24 h-24 bg-indigo-500/20 blur-2xl rounded-full" />
            <div className="absolute -bottom-10 -right-10 w-24 h-24 bg-emerald-500/20 blur-2xl rounded-full" />

            <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center text-3xl mx-auto mb-4 border border-emerald-500/20 animate-bounce">
              🏆
            </div>

            <h4 className="text-2xl font-black font-sans text-white uppercase tracking-wider">Desafio Concluído!</h4>
            <p className="text-slate-400 text-xs mt-1">Sua forja de programação funcionou perfeitamente e passou no crivo dos testes.</p>

            <div className="my-6 grid grid-cols-2 gap-4 bg-slate-950 p-4 rounded-xl border border-slate-850">
              <div className="text-center">
                <div className="text-[9px] uppercase font-bold text-slate-400 tracking-wider">Pontos XP</div>
                <div className="text-xl font-extrabold text-indigo-400 flex items-center justify-center gap-1 mt-0.5">
                  <Award size={16} /> +{activeLesson.xpReward}
                </div>
              </div>
              <div className="text-center">
                <div className="text-[9px] uppercase font-bold text-slate-400 tracking-wider">Moedas de Ouro</div>
                <div className="text-xl font-extrabold text-amber-400 flex items-center justify-center gap-1 mt-0.5">
                  <span>🪙</span> +{activeLesson.coinsReward}
                </div>
              </div>
            </div>

            {/* AI Advisor mock text / gamificado */}
            <div className="bg-slate-950 p-3 rounded-lg border border-slate-850 text-[11px] text-slate-300 leading-normal mb-6 text-left border-l-2 border-l-indigo-500">
              <span className="font-bold text-indigo-400 block mb-0.5">💬 Comentário do Mestre-Arquiteto:</span>
              "Excelente escrita estrutural! Seus seletores e lógicas estão limpos. A internet precisa de programadores com a sua precisão."
            </div>

            <div className="flex flex-col gap-2.5">
              {nextLesson && (
                <button
                  onClick={() => {
                    setSuccessMode(false);
                    onSelectLesson(nextLesson);
                  }}
                  className="w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-extrabold text-xs uppercase tracking-wider rounded-xl flex items-center justify-center gap-2 shadow-lg transition-all duration-300 transform hover:scale-[1.01] active:scale-[0.98] cursor-pointer"
                >
                  Ir para Próxima Lição <ArrowRight size={14} />
                </button>
              )}
              
              <button
                onClick={() => {
                  setSuccessMode(false);
                  onClose(); // Switch back to map
                }}
                className={`w-full py-3 text-white font-extrabold text-xs uppercase tracking-wider rounded-xl flex items-center justify-center gap-2 transition-all duration-300 transform hover:scale-[1.01] active:scale-[0.98] cursor-pointer ${
                  nextLesson 
                    ? 'bg-slate-800 hover:bg-slate-750 hover:text-slate-100 border border-slate-700' 
                    : 'bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 shadow-lg'
                }`}
              >
                {nextLesson ? 'Ver no Mapa da Jornada' : 'Reivindicar Prêmios & Continuar'} <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
