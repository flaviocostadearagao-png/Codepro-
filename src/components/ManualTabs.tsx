/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { BookOpen, Shield, Sword, Compass, Grid, Sparkles, Award, Heart, Cpu } from 'lucide-react';

export default function ManualTabs() {
  const [activeSubTab, setActiveSubTab] = useState<'gamification' | 'syllabus' | 'ui_ux'>('gamification');

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-slate-100 shadow-2xl overflow-hidden animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-800 pb-6 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              Arquiteto, UI/UX & Game Design
            </span>
            <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              V1.2.0 - Completo
            </span>
          </div>
          <h2 className="text-2xl font-bold font-sans text-white flex items-center gap-2">
            <Cpu className="text-indigo-400" size={24} /> Documento de Especificação Técnica: CodeQuest
          </h2>
          <p className="text-slate-400 text-sm mt-1">
            Matriz estratégica detalhando o design de produto rítmico, trilha de conteúdo focado em prática e mecânicas de retenção.
          </p>
        </div>
      </div>

      {/* Sub tabs navigators */}
      <div className="flex border-b border-slate-800 gap-1 mb-6 p-1 bg-slate-950/65 rounded-xl">
        <button
          onClick={() => setActiveSubTab('gamification')}
          className={`flex-1 py-3 px-4 rounded-lg font-medium text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
            activeSubTab === 'gamification'
              ? 'bg-slate-800 text-white shadow-md font-semibold'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Award size={16} /> 1. Arquitetura de Gamificação
        </button>
        <button
          onClick={() => setActiveSubTab('syllabus')}
          className={`flex-1 py-3 px-4 rounded-lg font-medium text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
            activeSubTab === 'syllabus'
              ? 'bg-slate-800 text-white shadow-md font-semibold'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <BookOpen size={16} /> 2. Estrutura das Trilhas
        </button>
        <button
          onClick={() => setActiveSubTab('ui_ux')}
          className={`flex-1 py-3 px-4 rounded-lg font-medium text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
            activeSubTab === 'ui_ux'
              ? 'bg-slate-800 text-white shadow-md font-semibold'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Grid size={16} /> 3. UI/UX e Fluxo de Lição
        </button>
      </div>

      {/* CONTENT: GAMIFICATION */}
      {activeSubTab === 'gamification' && (
        <div className="space-y-6 text-slate-300">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-950/40 border border-slate-800/80 rounded-xl p-5">
              <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                <Compass className="text-emerald-400" size={18} /> Sistema de Progressão e XP
              </h3>
              <p className="text-sm leading-relaxed mb-3">
                A progressão no <strong className="text-indigo-400">CodeQuest</strong> funciona baseada em ciclos de XP. Cada lição prática concluída concede valores estipulados de experiência proporcional à sua dificuldade:
              </p>
              <ul className="space-y-2 text-xs">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  <strong>Nível Iniciante:</strong> 100 XP por lição prática resolvida.
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-400"></span>
                  <strong>Nível Intermediário:</strong> 150-190 XP por lição prática avançada.
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-400"></span>
                  <strong>Nível Avançado:</strong> 220-300 XP por projetos completos de portfólio.
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                  <strong>Cálculo de Level-Up:</strong> O limite de XP do nível atual evolui segundo a fórmula cúbica simples: <code>XP_Próximo = LV * 300 + 400</code>.
                </li>
              </ul>
            </div>

            <div className="bg-slate-950/40 border border-slate-800/80 rounded-xl p-5">
              <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                <Award className="text-indigo-400" size={18} /> Recompensas e Medalhas (Badges)
              </h3>
              <p className="text-sm leading-relaxed mb-3">
                Os jogadores de elite expressam seu status desbloqueando condecorações imutáveis integradas às suas carteiras de heróis:
              </p>
              <div className="grid grid-cols-2 gap-3 mt-2">
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 text-xs">
                  <div className="flex items-center gap-1.5 mb-1 text-white font-semibold">
                    <span>🏰</span> Rei do Marcador
                  </div>
                  <p className="text-slate-400 font-normal">Domina os desafios de HTML Iniciante.</p>
                </div>
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 text-xs">
                  <div className="flex items-center gap-1.5 mb-1 text-white font-semibold">
                    <span>🎨</span> Artista do Estilo
                  </div>
                  <p className="text-slate-400 font-normal">Conclui as diretrizes de CSS estilizador.</p>
                </div>
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 text-xs">
                  <div className="flex items-center gap-1.5 mb-1 text-white font-semibold">
                    <span>🧪</span> Alquimista Script
                  </div>
                  <p className="text-slate-400 font-normal">Consolida códigos lógicos em JavaScript.</p>
                </div>
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 text-xs">
                  <div className="flex items-center gap-1.5 mb-1 text-white font-semibold">
                    <span>🔥</span> Foco Lendário
                  </div>
                  <p className="text-slate-400 font-normal">Bate a meta de 3+ dias de Ofensiva consecutiva.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-950/40 border border-slate-800/80 rounded-xl p-5">
              <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                <Sparkles className="text-rose-400" size={18} /> Mecânicas de Engajamento Diário
              </h3>
              <p className="text-sm leading-relaxed mb-2">
                Para consolidar o hábito de codar rotineiramente, a arquitetura do aplicativo possui três vetores cruciais de engajamento diário:
              </p>
              <ul className="space-y-3 mt-3 text-xs">
                <li className="flex items-start gap-2.5">
                  <span className="p-1 rounded-md bg-amber-500/10 text-amber-500 font-mono text-xs">🔥</span>
                  <div>
                    <strong className="text-white">Ofensiva (Streak):</strong> Se o usuário submeter um desafio antes de completar 24 horas da última atividade, sua ofensiva cresce. Perder um dia limpa o streak a zero.
                  </div>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="p-1 rounded-md bg-indigo-500/10 text-indigo-400 font-mono text-xs">📅</span>
                  <div>
                    <strong className="text-white">Questões Diárias (Daily Quests):</strong> 3 missões de rolagem diária que fornecem ouros (Coins) e bônus de XP ao serem cumpridas (ex: "Acabe o código sem quebrar corações").
                  </div>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="p-1 rounded-md bg-emerald-500/10 text-emerald-400 font-mono text-xs">🏆</span>
                  <div>
                    <strong className="text-white">Leaderboard Interativo:</strong> Classificação em tempo real englobando heróis reais/simulados em divisões semanais baseadas em ganho de XP.
                  </div>
                </li>
              </ul>
            </div>

            <div className="bg-slate-950/40 border border-slate-800/80 rounded-xl p-5">
              <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                <Heart className="text-rose-500 animate-pulse" size={18} /> Loop de Feedback & Gestão de Vidas
              </h3>
              <p className="text-sm leading-relaxed mb-3">
                O erro de código é um convite inteligente à depuração racional. Para mitigar o comportamento de "adivinhação", o CodeQuest introduz barreiras de feedback:
              </p>
              <div className="space-y-2 text-xs">
                <div className="p-2.5 bg-slate-950 rounded border-l-2 border-rose-500 text-slate-300">
                  <strong className="text-white">❤️ Sistema de Vidas (Cinco Corações):</strong> Cada compilação ou checagem que falhar consome 1 Coração. Corações recarregam automaticamente a cada 4 horas ou podem ser consertados imediatamente negociando na Forja por moedas de ouro.
                </div>
                <div className="p-2.5 bg-slate-950 rounded border-l-2 border-amber-500 text-slate-300">
                  <strong className="text-white">💡 Dicas Progressivas (Hints):</strong> Comprar uma dica consome 10 moedas de ouro, abrindo orientações cirúrgicas e trechos lógicos simplificados para destravar o processo de raciocínio.
                </div>
                <div className="p-2.5 bg-slate-950 rounded border-l-2 border-indigo-500 text-slate-300">
                  <strong className="text-white">🤖 Compilação Assistida:</strong> O executor valida expressões via regex lendo o código digitado e destacando a inconsistência para evitar travamentos abstratos.
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CONTENT: SYLLABUS */}
      {activeSubTab === 'syllabus' && (
        <div className="space-y-6 text-slate-300">
          <div className="border border-slate-800 rounded-xl p-4 bg-slate-950/20">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <Shield className="text-red-400" size={18} /> Matriz Instrucional das 3 Tecnologias Primordiais
            </h3>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* HTML Track */}
              <div className="space-y-4">
                <div className="bg-rose-500/10 border border-rose-500/20 p-4 rounded-xl">
                  <h4 className="font-bold text-rose-400 text-base flex items-center gap-1.5">
                    <span>🌐</span> HTML: Estrutura & Semântica
                  </h4>
                  <p className="text-xs text-slate-400 mt-1">Conduzir heróis do esqueleto das tags primitivas até a forja de layouts inclusivos e estruturas adaptadas para mecanismos de busca.</p>
                </div>

                <div className="space-y-3">
                  <div className="p-3 bg-slate-950 rounded-lg text-xs border border-slate-800">
                    <span className="text-[10px] uppercase font-bold text-emerald-400 tracking-wider">Iniciante</span>
                    <strong className="block text-white mt-1">Nível 1 - A Fundação Humilde</strong>
                    <p className="text-slate-400 mt-1">Teoria base envolvendo tags h1-h6, p, e listas estruturadas (ul, li). Foco principal em aninhamento e escopo lógico de documentos estruturados.</p>
                  </div>
                  <div className="p-3 bg-slate-950 rounded-lg text-xs border border-slate-800">
                    <span className="text-[10px] uppercase font-bold text-indigo-400 tracking-wider">Intermediário</span>
                    <strong className="block text-white mt-1">Nível 2 - O Templo Semântico</strong>
                    <p className="text-slate-400 mt-1">Foco prioritário em semantic HTML, formulação interativa, tabelas e tags nativas de mídia como audio/video. Fim do abuso excessivo de divs sem propósito.</p>
                  </div>
                  <div className="p-3 bg-slate-950 rounded-lg text-xs border border-slate-800">
                    <span className="text-[10px] uppercase font-bold text-purple-400 tracking-wider">Avançado</span>
                    <strong className="block text-white mt-1">Nível 3 - Fortaleza Digital</strong>
                    <p className="text-slate-400 mt-1">Otimização de metadados para indexadores (SEO), inclusividade digital (acessibilidade via tags ARIA) e os novos grids de visualização de mapas canvas 2D.</p>
                  </div>
                </div>
              </div>

              {/* CSS Track */}
              <div className="space-y-4">
                <div className="bg-blue-500/10 border border-blue-500/20 p-4 rounded-xl">
                  <h4 className="font-bold text-blue-400 text-base flex items-center gap-1.5">
                    <span>🎨</span> CSS: Estilo & Responsividade
                  </h4>
                  <p className="text-xs text-slate-400 mt-1">Liderar heróis das regras básicas do box-model e cores, através da arquitetura de flexbox e grid, culminando em animações complexas.</p>
                </div>

                <div className="space-y-3">
                  <div className="p-3 bg-slate-950 rounded-lg text-xs border border-slate-800">
                    <span className="text-[10px] uppercase font-bold text-emerald-400 tracking-wider">Iniciante</span>
                    <strong className="block text-white mt-1">Nível 1 - Pintando o Reino</strong>
                    <p className="text-slate-400 mt-1">Consolidação do Box Model (margin, padding, border, content), controle de fontes externas e miras clássicas utilizando IDs e tags de classe.</p>
                  </div>
                  <div className="p-3 bg-slate-950 rounded-lg text-xs border border-slate-800">
                    <span className="text-[10px] uppercase font-bold text-indigo-400 tracking-wider">Intermediário</span>
                    <strong className="block text-white mt-1">Nível 2 - Disposição de Forças</strong>
                    <p className="text-slate-400 mt-1">Flexbox layouts, grades 2D com CSS Grid, posicionamento em múltiplos planos (relative/absolute) e barreiras responsivas adaptativas via media queries.</p>
                  </div>
                  <div className="p-3 bg-slate-950 rounded-lg text-xs border border-slate-800">
                    <span className="text-[10px] uppercase font-bold text-purple-400 tracking-wider">Avançado</span>
                    <strong className="block text-white mt-1">Nível 3 - Dimensão Rítmica</strong>
                    <p className="text-slate-400 mt-1">Duração de transições inteligentes, custom loops em keyframes, uso sistemático de variáveis CSS personalizadas e filtros gaussianos e giros no espaço Y.</p>
                  </div>
                </div>
              </div>

              {/* JS Track */}
              <div className="space-y-4">
                <div className="bg-amber-500/10 border border-amber-500/20 p-4 rounded-xl">
                  <h4 className="font-bold text-amber-400 text-base flex items-center gap-1.5">
                    <span>⚡</span> JavaScript: Lógica & Dinâmica
                  </h4>
                  <p className="text-xs text-slate-400 mt-1">Fomentar lógicas em sistemas interativos de controle de fluxo com variáveis, domar manipulações ao vivo do DOM e arquitetar requisições assíncronas.</p>
                </div>

                <div className="space-y-3">
                  <div className="p-3 bg-slate-950 rounded-lg text-xs border border-slate-800">
                    <span className="text-[10px] uppercase font-bold text-emerald-400 tracking-wider">Iniciante</span>
                    <strong className="block text-white mt-1">Nível 1 - Pergaminho da Lógica</strong>
                    <p className="text-slate-400 mt-1">Constantes e mutabilidade, bifurcações condicionais comparativas (if, else), forja e chamada reutilizável de funções matemáticas de combate básico.</p>
                  </div>
                  <div className="p-3 bg-slate-950 rounded-lg text-xs border border-slate-800">
                    <span className="text-[10px] uppercase font-bold text-indigo-400 tracking-wider">Intermediário</span>
                    <strong className="block text-white mt-1">Nível 2 - Mestre Automator</strong>
                    <p className="text-slate-400 mt-1">Laços indexados (loops), capturar e alterar nós gráficos do DOM com addEventListener, varreduras funcionais em arrays (.filter, .map) e spawn dinâmico de elementos.</p>
                  </div>
                  <div className="p-3 bg-slate-950 rounded-lg text-xs border border-slate-800">
                    <span className="text-[10px] uppercase font-bold text-purple-400 tracking-wider">Avançado</span>
                    <strong className="block text-white mt-1">Nível 3 - Evocador de Promessas</strong>
                    <p className="text-slate-400 mt-1">Controle de fluxo não-bloqueante usando Promises no tempo, aquisição AJAX assíncrona (Fetch API com async/await), serialização JSON e conexões permanentes LocalStorage.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CONTENT: UI UX */}
      {activeSubTab === 'ui_ux' && (
        <div className="space-y-6 text-slate-300">
          <div className="bg-slate-950/40 border border-slate-800/80 rounded-xl p-5">
            <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
              <Sword className="text-indigo-400" size={18} /> O Mapa da Jornada Espacial / RPG
            </h3>
            <p className="text-sm leading-relaxed mb-4">
              Cada tecnologia (HTML, CSS e JavaScript) opera como um continente temático independente. O usuário progride através de um mapa de encadeamento vertical e linear (estilo Duolingo ou árvore de RPG clássica), que maximiza a percepção de progresso e clareza de rota.
            </p>
            <div className="flex flex-col md:flex-row items-center gap-6 bg-slate-950 p-4 rounded-xl border border-slate-850">
              <div className="flex-1 space-y-2 text-xs">
                <div className="flex items-center gap-2">
                  <span className="p-1 px-1.5 rounded bg-emerald-500/20 text-emerald-400 font-mono font-bold text-[10px]">🟢 COMPLETO</span>
                  <span>O nó é pintado com a cor oficial da tecnologia, ostenta um checkmark e permite rejogar quantas vezes quiser para recapturar XP diminuído.</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="p-1 px-1.5 rounded bg-indigo-500/20 text-indigo-400 font-mono font-bold text-[10px] animate-pulse">🔵 JOGANDO AGORA</span>
                  <span>O nó ativo pulsa com anéis de luz coloridos, convidando o jogador ao centro de aprendizado atual da sua rota.</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="p-1 px-1.5 rounded bg-slate-800 text-slate-500 font-mono font-bold text-[10px]">⚫ LOCKED</span>
                  <span>O nó bloqueado permanece na cor cinza opaca, mostrando um selo com cadeado. Desbloqueia automaticamente ao completar o nível anterior.</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-slate-950/40 border border-slate-800/80 rounded-xl p-5">
            <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
              <Cpu className="text-purple-400" size={18} /> Anatomia da Arena do Editor de Código (IDE)
            </h3>
            <p className="text-sm leading-relaxed mb-4">
              A Arena de Combate Intelectual é uma área dividida em três colunas inteligentes focadas no fluxo limpo de trabalho e feedback instantâneo:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="p-4 bg-slate-950 rounded-lg border border-slate-850">
                <strong className="text-white block mb-2 font-semibold">Coluna 1: Lore & Teoria</strong>
                <p className="text-slate-400 leading-normal">
                  Instruções curtas detalhando o objetivo ("Lore"), notas compactas sobre o conceito primitivo utilizado ("Quest") e a lista de especificações funcionais e checagens ("Testes de Validação").
                </p>
              </div>
              <div className="p-4 bg-slate-950 rounded-lg border border-slate-850">
                <strong className="text-white block mb-2 font-semibold">Coluna 2: Forja do Editor</strong>
                <p className="text-slate-400 leading-normal">
                  Área de digitação de código com numeração precisa de linhas, botões de ação auxiliar (Limpar, resetar, e comprar dicas contextualizadas gastando as moedas ganhas no game).
                </p>
              </div>
              <div className="p-4 bg-slate-950 rounded-lg border border-slate-850">
                <strong className="text-white block mb-2 font-semibold">Coluna 3: Espelho Real IP</strong>
                <p className="text-slate-400 leading-normal">
                  Sandbox de visualização reativa ao vivo! Conduz o espelhamento exato do HTML/CSS digitado, e no caso dos desafios em JavaScript, expõe o painel do console simulado capturando comandos <code>console.log</code> e retornos funcionais!
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
