/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { UserStats, TrackType } from '../types';
import { Flame, Heart, Award, Sparkles, Swords, RefreshCw, RotateCcw, Download, Upload } from 'lucide-react';
import { SYLLABUS } from '../data/syllabus';

interface HeaderBarProps {
  stats: UserStats;
  activeTab: 'map' | 'editor' | 'leaderboard' | 'gdd';
  setActiveTab: (tab: 'map' | 'editor' | 'leaderboard' | 'gdd') => void;
  onHeal: () => void;
  onSelectTrack: (track: TrackType) => void;
  onResetStats: () => void;
  onUpdateStats?: (newStats: Partial<UserStats>) => void;
}

const AVAILABLE_RPG_AVATARS = [
  { emoji: '🥷', label: 'Ninja do Código' },
  { emoji: '🧙‍♂️', label: 'Alquimista React' },
  { emoji: '⚔️', label: 'Bárbaro Div' },
  { emoji: '🐲', label: 'Dragão Divisor' },
  { emoji: '🦄', label: 'Místico Flexbox' },
  { emoji: '🤖', label: 'Autômato Dev' },
  { emoji: '🦊', label: 'Raposa da Api' },
  { emoji: '🧑‍🚀', label: 'Cosmonauta Git' },
  { emoji: '🦁', label: 'Líder de Squad' },
  { emoji: '🦉', label: 'Coruja Sábia' }
];

export default function HeaderBar({
  stats,
  activeTab,
  setActiveTab,
  onHeal,
  onSelectTrack,
  onResetStats,
  onUpdateStats
}: HeaderBarProps) {
  const [healingFeedback, setHealingFeedback] = useState(false);
  const [copiedFeedback, setCopiedFeedback] = useState(false);

  const [showCustomizer, setShowCustomizer] = useState(false);
  const [tempNickname, setTempNickname] = useState(stats.nickname || 'Recruta do Código');
  const [countdownText, setCountdownText] = useState('');

  // Keep temporary nickname input state in sync with stats updates (e.g. from Cloud sync load)
  React.useEffect(() => {
    if (stats.nickname) {
      setTempNickname(stats.nickname);
    }
  }, [stats.nickname]);

  // Compute countdown timer state for health point regeneration
  React.useEffect(() => {
    if (stats.hearts >= stats.maxHearts || !stats.lastHeartRegenTime) {
      setCountdownText('');
      return;
    }

    const updateCountdown = () => {
      const lastRegen = new Date(stats.lastHeartRegenTime!);
      const nextRegen = new Date(lastRegen.getTime() + 1000 * 60 * 60); // 1 hour later
      const diffMs = nextRegen.getTime() - Date.now();

      if (diffMs <= 0) {
        setCountdownText('Adicionando...');
      } else {
        const mins = Math.floor(diffMs / (1000 * 60));
        const secs = Math.floor((diffMs % (1000 * 60)) / 1000);
        setCountdownText(`${mins}:${secs < 10 ? '0' : ''}${secs}`);
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [stats.hearts, stats.maxHearts, stats.lastHeartRegenTime]);

  const handleSelectAvatar = (emoji: string) => {
    if (onUpdateStats) {
      onUpdateStats({ avatar: emoji });
    }
  };

  const handleSaveProfile = () => {
    if (onUpdateStats && tempNickname.trim()) {
      onUpdateStats({ nickname: tempNickname.trim() });
      setShowCustomizer(false);
    }
  };

  // Experience threshold for next level: lvl * 300 + 400
  const nextLevelXP = stats.level * 300 + 400;
  const xpPercentage = Math.min(100, Math.floor((stats.xp / nextLevelXP) * 100));

  // Course progression calculations
  const totalLessons = SYLLABUS ? SYLLABUS.length : 0;
  const completedLessonsCount = stats.completedLessons ? stats.completedLessons.length : 0;
  const courseProgressPercentage = totalLessons > 0 ? Math.round((completedLessonsCount / totalLessons) * 100) : 0;

  // Determine course division/rank: Iniciante (0-34%), Intermediário (35-74%), Avançado (75-100%)
  let courseDifficultyRank = 'Iniciante 🟢';
  let courseRankColor = 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30';
  let rankProgressBarColor = 'from-emerald-500 via-teal-500 to-emerald-400';
  
  if (courseProgressPercentage >= 35 && courseProgressPercentage < 75) {
    courseDifficultyRank = 'Intermediário 🔵';
    courseRankColor = 'text-sky-400 bg-sky-500/10 border-sky-500/30';
    rankProgressBarColor = 'from-sky-500 via-blue-500 to-indigo-500';
  } else if (courseProgressPercentage >= 75) {
    courseDifficultyRank = 'Avançado 🟣';
    courseRankColor = 'text-purple-400 bg-purple-500/10 border-purple-500/30';
    rankProgressBarColor = 'from-purple-500 via-fuchsia-600 to-pink-500';
  }

  const handleHealClick = () => {
    if (stats.hearts >= stats.maxHearts) return;
    if (stats.coins < 50 && stats.hearts > 0) return;
    onHeal();
    setHealingFeedback(true);
    setTimeout(() => {
      setHealingFeedback(false);
    }, 1500);
  };

  const getTrackDetails = (track: TrackType) => {
    switch (track) {
      case 'html':
        return { name: '🌐 HTML5', color: 'border-rose-500/30 text-rose-400 bg-rose-500/5 hover:bg-rose-500/10' };
      case 'css':
        return { name: '🎨 CSS3', color: 'border-blue-500/30 text-blue-400 bg-blue-500/5 hover:bg-blue-500/10' };
      case 'js':
        return { name: '⚡ JavaScript', color: 'border-amber-500/30 text-amber-400 bg-amber-500/5 hover:bg-amber-500/10' };
    }
  };

  return (
    <header className="bg-slate-900 border border-slate-800 rounded-2xl p-4 md:p-6 text-slate-100 shadow-xl mb-6">
      {/* Top statistics panel */}
      <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-6 pb-6 border-b border-slate-800">
        
        {/* User Brand & XP */}
        <div className="flex items-center gap-4 w-full xl:w-auto">
          <button
            onClick={() => setShowCustomizer(!showCustomizer)}
            className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-600 to-indigo-800 hover:from-indigo-500 hover:to-indigo-700 flex items-center justify-center shadow-lg border border-indigo-550 relative shrink-0 transition-all hover:scale-105 active:scale-95 cursor-pointer focus:outline-none"
            title="Clique para personalizar seu herói!"
          >
            <span className="text-3xl select-none leading-none mt-[-2px]">{stats.avatar || '🥷'}</span>
            <div className="absolute -bottom-1.5 px-2 py-0.5 bg-slate-950 text-[10px] text-indigo-400 rounded-full font-bold border border-indigo-500/30 uppercase tracking-widest leading-none whitespace-nowrap shadow-md">
              Lvl {stats.level}
            </div>
          </button>
          <div className="flex-1 xl:flex-initial min-w-[240px]">
            <div className="flex flex-col mb-1.5">
              <div className="flex justify-between items-center text-xs font-semibold mb-0.5">
                <span className="text-slate-200 flex items-center gap-1.5 hover:text-indigo-400 transition-colors cursor-pointer" onClick={() => setShowCustomizer(!showCustomizer)}>
                  <span className="font-extrabold text-white text-base tracking-wide flex items-center gap-1.5">
                    {stats.nickname || 'Recruta do Código'}
                    <span className="text-[10px] text-indigo-400 font-normal opacity-60">✏️</span>
                  </span>
                </span>
                <span className="text-slate-400 text-[10px] font-mono">{stats.xp} / {nextLevelXP} XP</span>
              </div>
              
              <div className="flex items-center justify-between gap-2">
                <button
                  onClick={() => setShowCustomizer(!showCustomizer)}
                  className="text-[9px] text-indigo-400 hover:text-indigo-300 font-bold uppercase tracking-wider flex items-center gap-1 cursor-pointer select-none transition-all active:scale-95"
                >
                  ⚔️ Personalizar Herói
                </button>
              </div>
            </div>

            <div className="w-full bg-slate-950 h-3 rounded-full overflow-hidden border border-slate-800/80 p-0.5">
              <div
                className="bg-gradient-to-r from-indigo-500 to-purple-500 h-full rounded-full transition-all duration-500 shadow-[0_0_8px_rgba(99,102,241,0.5)]"
                style={{ width: `${xpPercentage}%` }}
              />
            </div>
          </div>
        </div>

        {/* Dynamic Status Badges (Streak, Hearts, Gold) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:flex xl:flex-row items-stretch gap-3.5 w-full xl:w-auto shrink-0 justify-end">
          
          {/* STREAK */}
          <div 
            className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl border transition-all duration-300 hover:scale-[1.02] select-none ${
              stats.streak > 0 
                ? 'bg-amber-500/5 border-amber-500/30 shadow-[0_0_12px_rgba(245,158,11,0.08)]' 
                : 'bg-slate-950/80 border-slate-800/80'
            }`}
            title="Sua sequência de dias consecutivos estudando! Resolva exercícios diariamente para não zerar!"
          >
            <div className="relative shrink-0 flex items-center justify-center w-8 h-8 rounded-lg bg-slate-900/90 border border-slate-800">
              <Flame size={18} className={`${stats.streak > 0 ? 'text-amber-500 animate-pulse' : 'text-slate-600'}`} />
              {stats.streak > 0 && <span className="absolute -top-1 -right-1 flex h-2 w-2"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span><span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span></span>}
            </div>
            <div>
              <div className="text-[9px] text-slate-400 uppercase font-extrabold tracking-widest leading-none mb-1">Ofensiva</div>
              <div className={`text-sm font-extrabold leading-none ${stats.streak > 0 ? 'text-amber-400 font-extrabold' : 'text-slate-400'}`}>
                {stats.streak} {stats.streak === 1 ? 'Dia' : 'Dias'}
              </div>
            </div>
          </div>

          {/* HEARTS */}
          <div 
            className="flex flex-col sm:flex-row items-center gap-3 px-3.5 py-2 rounded-xl bg-rose-500/5 border border-rose-500/20 hover:border-rose-450/30 hover:shadow-[0_0_12px_rgba(244,63,94,0.06)] transition-all duration-300 hover:scale-[1.02] select-none"
            title="Sua energia para resolver desafios! Se esgotar, use ouro para se curar ou aguarde recarga."
          >
            <div className="flex items-center gap-3.5 w-full sm:w-auto justify-between sm:justify-start">
              {/* Hearts Icons */}
              <div className="flex items-center gap-1 shrink-0">
                {Array.from({ length: stats.maxHearts }).map((_, i) => (
                  <Heart
                    key={i}
                    size={16}
                    className={`transition-all duration-300 ${
                      i < stats.hearts
                        ? 'fill-rose-500 text-rose-500 scale-100 filter drop-shadow-[0_0_4px_rgba(244,63,94,0.4)] animate-pulse'
                        : 'text-slate-700 fill-slate-800/40 scale-90'
                    }`}
                  />
                ))}
              </div>
              
              {/* Regen Timer */}
              {stats.hearts < stats.maxHearts && countdownText && (
                <div className="flex items-center gap-1 text-[9px] font-extrabold text-rose-400 bg-rose-500/10 border border-rose-500/25 px-2 py-0.5 rounded-md shadow-sm select-none shrink-0" title="Tempo restante até recuperar próxima vida">
                  <span className="animate-ping w-1 h-1 rounded-full bg-rose-400 shrink-0 inline-block mr-0.5" />
                  +❤️ em {countdownText}
                </div>
              )}
            </div>
            
            {/* Heal Button */}
            {stats.hearts < stats.maxHearts && (
              <button
                onClick={handleHealClick}
                disabled={stats.coins < 50 && stats.hearts > 0}
                className={`py-1 px-3 rounded-lg text-[9px] font-black uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all cursor-pointer h-7 w-full sm:w-auto shrink-0 ${
                  stats.coins >= 50 || stats.hearts === 0
                    ? 'bg-rose-600 hover:bg-rose-500 text-white border border-rose-500 shadow-md shadow-rose-600/15 active:scale-95'
                    : 'bg-slate-900 text-slate-500 border border-slate-800 cursor-not-allowed opacity-50'
                }`}
                title={stats.hearts === 0 && stats.coins < 50 ? "Bênção de Vida Gratuita para continuar programando!" : "Curar corações por 50 moedas"}
              >
                {healingFeedback ? (
                  <RefreshCw size={10} className="animate-spin text-white" />
                ) : stats.hearts === 0 && stats.coins < 50 ? (
                  '⚡ Bênção Grátis!'
                ) : (
                  'Curar (50🪙)'
                )}
              </button>
            )}
          </div>

          {/* COINS (GOLD) */}
          <div 
            className="flex items-center gap-3 px-3.5 py-2.5 bg-yellow-500/5 rounded-xl border border-yellow-500/20 hover:border-yellow-400/40 hover:shadow-[0_0_12px_rgba(234,179,8,0.06)] transition-all duration-300 hover:scale-[1.02] select-none"
            title="Moedas obtidas ao acertar exercícios e missões cotidianas. Use para comprar dicas!"
          >
            <div className="shrink-0 flex items-center justify-center w-8 h-8 rounded-lg bg-slate-900/90 border border-slate-800">
              <span className="text-lg transition-transform duration-300 hover:rotate-12 hover:scale-110">🪙</span>
            </div>
            <div>
              <div className="text-[9px] text-slate-400 uppercase font-extrabold tracking-widest leading-none mb-1">Moedas</div>
              <div className="text-sm font-extrabold text-amber-400 font-extrabold leading-none flex items-center gap-1">
                {stats.coins}
                <span className="text-[10px] text-amber-500/60 font-semibold uppercase tracking-wider">Gold</span>
              </div>
            </div>
          </div>

          {/* LOCAL SAVE ACTIVE STATUS */}
          <div className="flex items-center gap-2 shrink-0 border-t sm:border-t-0 md:border-l border-slate-800 pt-2 sm:pt-0 md:pl-3 md:ml-1 h-9 w-full sm:w-auto justify-end">
            <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-1 px-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              <span className="text-[10px] text-emerald-450 font-extrabold uppercase tracking-widest select-none leading-none">Salvo no Navegador</span>
            </div>
          </div>

        </div>
      </div>

      {/* Profile Customizer Section */}
      {showCustomizer && (
        <div className="mt-4 p-4 bg-slate-950/90 rounded-xl border border-slate-850 shadow-inner grid grid-cols-1 md:grid-cols-2 gap-5 animate-scale-in text-xs mb-4">
          <div className="space-y-3">
            <label className="block text-[11px] uppercase font-extrabold tracking-wider text-indigo-400">
              🏷️ Nome do Seu Personagem RPG
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                maxLength={20}
                value={tempNickname}
                onChange={(e) => setTempNickname(e.target.value)}
                placeholder="Ex: Nome Heroico..."
                className="flex-1 p-2 bg-slate-905 border border-slate-800 rounded-lg text-white font-semibold focus:outline-none focus:border-indigo-500 h-10 text-xs"
              />
              <button
                onClick={handleSaveProfile}
                className="py-2 px-4 bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold rounded-lg uppercase tracking-wider transition-all select-none cursor-pointer h-10 text-xs flex items-center justify-center shrink-0 shadow-lg shadow-indigo-600/10 active:scale-95"
              >
                Salvar Nome
              </button>
            </div>
            <p className="text-[10px] text-slate-500 leading-normal">
              Escolha seu apelido de desenvolvimento e mude quando quiser! O nome será sincronizado em tempo real.
            </p>
          </div>

          <div>
            <label className="block text-[11px] uppercase font-extrabold tracking-wider text-indigo-400 mb-2">
              🎭 Escolha Seu Avatar Gamificado ({stats.avatar || '🥷'})
            </label>
            <div className="grid grid-cols-5 gap-2">
              {AVAILABLE_RPG_AVATARS.map((av) => {
                const isSelected = stats.avatar === av.emoji;
                return (
                  <button
                    key={av.emoji}
                    onClick={() => handleSelectAvatar(av.emoji)}
                    className={`p-2 py-2.5 rounded-xl text-center flex flex-col items-center justify-center border transition-all cursor-pointer select-none hover:scale-105 active:scale-95 ${
                      isSelected
                        ? 'border-indigo-500 bg-indigo-500/20 shadow-md shadow-indigo-500/10 font-bold scale-105'
                        : 'border-slate-800 bg-slate-900/50 hover:bg-slate-900'
                    }`}
                    title={av.label}
                  >
                    <span className="text-2xl leading-none mb-1">{av.emoji}</span>
                    <span className="text-[8px] text-slate-405 font-semibold truncate max-w-full leading-none">{av.label.split(' ')[0]}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* COURSE PROGRESSION CONTROLLER & MILESTONE INDICATORS */}
      <div className="mt-4 p-4 bg-slate-950/80 rounded-xl border border-slate-800/80">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-sm text-slate-200">🎓 Progresso Geral do Curso:</span>
              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wide border ${courseRankColor}`}>
                Rank: {courseDifficultyRank}
              </span>
            </div>
            <p className="text-slate-400 text-xs mt-1">
              Complete lições para avançar no curso. Você já concluiu <span className="text-indigo-400 font-bold">{completedLessonsCount}</span> de <span className="text-slate-300 font-bold">{totalLessons}</span> lições disponíveis ({courseProgressPercentage}%).
            </p>
          </div>
        </div>

        {/* Progress bar track with markers */}
        <div className="relative w-full bg-slate-900 h-4 rounded-full border border-slate-800/80 p-0.5 mt-2 select-none">
          <div
            className={`bg-gradient-to-r ${rankProgressBarColor} h-full rounded-full transition-all duration-700 shadow-[0_0_10px_rgba(129,140,248,0.3)]`}
            style={{ width: `${courseProgressPercentage}%` }}
          />
          
          {/* Milestone markers on track */}
          {/* 35% Marker */}
          <div className="absolute top-0 bottom-0 left-[35%] w-0.5 bg-slate-950" title="Milestone: Intermediário (35%)" />
          {/* 75% Marker */}
          <div className="absolute top-0 bottom-0 left-[75%] w-0.5 bg-slate-950" title="Milestone: Avançado (75%)" />
        </div>

        {/* Labels for landmarks */}
        <div className="flex justify-between text-[10px] font-bold text-slate-500 mt-1.5 px-1">
          <span className={courseProgressPercentage < 35 ? "text-emerald-400 font-extrabold" : ""}>Iniciante (0%)</span>
          <span className={(courseProgressPercentage >= 35 && courseProgressPercentage < 75) ? "text-sky-400 font-extrabold" : ""}>Intermediário (35%)</span>
          <span className={courseProgressPercentage >= 75 ? "text-purple-400 font-extrabold" : ""}>Avançado (75%)</span>
        </div>
      </div>

      {/* LOCAL BACKUP & RESTORE TOOLS */}
      <div className="mt-4 p-3 bg-slate-950 rounded-xl border border-slate-855 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <div className="flex flex-wrap items-center gap-2 text-slate-300">
          <span className="font-extrabold text-indigo-400 flex items-center gap-1">💾 Backup do Guerreiro:</span>
          <span className="text-slate-405">Exporte seu arquivo de salvamento para guardar sua jornada ou jogar em outro computador!</span>
        </div>
        
        <div className="flex items-center gap-2.5 self-end sm:self-auto shrink-0">
          <button
            onClick={() => {
              try {
                const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(stats, null, 2));
                const downloadAnchor = document.createElement('a');
                downloadAnchor.setAttribute("href", dataStr);
                downloadAnchor.setAttribute("download", `codequest-backup-Lvl${stats.level}-${(stats.nickname || 'viking').replace(/\s+/g, '-').toLowerCase()}.json`);
                document.body.appendChild(downloadAnchor);
                downloadAnchor.click();
                downloadAnchor.remove();
              } catch (e) {
                alert("Erro ao exportar backup.");
              }
            }}
            className="p-2 px-3.5 bg-indigo-650 hover:bg-indigo-600 border border-indigo-500/20 text-white rounded-lg text-[10px] font-black uppercase tracking-wider flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer shadow-md"
            title="Download do arquivo JSON com todo seu progresso"
          >
            <Download size={12} /> Exportar Progresso
          </button>
          
          <label
            className="p-2 px-3.5 bg-slate-850 hover:bg-slate-800 border border-slate-750 text-slate-300 rounded-lg text-[10px] font-black uppercase tracking-wider flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer shadow-md select-none"
            title="Carregar arquivo JSON exportado anteriormente"
          >
            <Upload size={12} /> Importar Progresso
            <input
              type="file"
              accept=".json"
              className="hidden"
              onChange={(e) => {
                const fileReader = new FileReader();
                if (e.target.files && e.target.files[0]) {
                  fileReader.readAsText(e.target.files[0], "UTF-8");
                  fileReader.onload = (event) => {
                    try {
                      const parsed = JSON.parse(event.target?.result as string);
                      if (parsed && typeof parsed === 'object' && ('xp' in parsed || 'level' in parsed)) {
                        if (onUpdateStats) {
                          onUpdateStats(parsed);
                          alert("Jornada restaurada com sucesso! Seu guerreiro foi carregado. 🧙‍♂️");
                        }
                      } else {
                        alert("Arquivo inválido. Certifique-se de que é um arquivo de salvamento válido da CodeQuest.");
                      }
                    } catch (error) {
                      alert("Erro ao decodificar o arquivo de salvamento.");
                    }
                  };
                }
              }}
            />
          </label>
        </div>
      </div>

      {/* Main Tab Navigator & Track Selector */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mt-6">
        
        {/* Navigation Tabs */}
        <div className="flex bg-slate-950/60 p-1 rounded-xl border border-slate-800 gap-1 overflow-x-auto shrink-0">
          <button
            onClick={() => setActiveTab('map')}
            className={`py-2 px-4 rounded-lg font-bold text-xs uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'map'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            🗺️ Jornada Map
          </button>
          <button
            onClick={() => setActiveTab('editor')}
            className={`py-2 px-4 rounded-lg font-bold text-xs uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'editor'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            💻 Editor de Código
          </button>
          <button
            onClick={() => setActiveTab('leaderboard')}
            className={`py-2 px-4 rounded-lg font-bold text-xs uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'leaderboard'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            🏆 Conquistas & Ranking
          </button>
          <button
            onClick={() => setActiveTab('gdd')}
            className={`py-2 px-4 rounded-lg font-bold text-xs uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'gdd'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            📚 Manual de Escopo
          </button>
        </div>

        {/* Track switch buttons */}
        <div className="flex items-center gap-2">
          <span className="text-[10px] uppercase font-bold text-slate-400 tracking-widest hidden sm:inline">Trilha Ativa:</span>
          <div className="flex bg-slate-950 p-1 rounded-lg border border-slate-800 gap-1.5 w-full md:w-auto">
            {(['html', 'css', 'js'] as TrackType[]).map((t) => {
              const info = getTrackDetails(t);
              const isActive = stats.activeTrack === t;
              return (
                <button
                  key={t}
                  onClick={() => onSelectTrack(t)}
                  className={`flex-1 md:flex-initial py-1.5 px-3 rounded text-xs font-bold transition-all relative ${
                    isActive
                      ? 'bg-indigo-500/20 text-white border border-indigo-500/50'
                      : 'text-slate-400 hover:text-slate-200 cursor-pointer'
                  }`}
                >
                  {t === 'html' ? 'HTML5' : t === 'css' ? 'CSS3' : 'JS'}
                  {isActive && (
                    <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </header>
  );
}
