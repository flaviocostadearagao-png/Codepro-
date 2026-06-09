/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { UserStats, TrackType } from '../types';
import { Flame, Heart, Award, Sparkles, Swords, RefreshCw, Cloud, LogOut } from 'lucide-react';
import { User } from 'firebase/auth';

interface HeaderBarProps {
  stats: UserStats;
  activeTab: 'map' | 'editor' | 'leaderboard' | 'gdd';
  setActiveTab: (tab: 'map' | 'editor' | 'leaderboard' | 'gdd') => void;
  onHeal: () => void;
  onSelectTrack: (track: TrackType) => void;
  user: User | null;
  authLoading: boolean;
  onSignIn: () => void;
  onSignOut: () => void;
  onLoadToken: (token: string) => void;
}

export default function HeaderBar({
  stats,
  activeTab,
  setActiveTab,
  onHeal,
  onSelectTrack,
  user,
  authLoading,
  onSignIn,
  onSignOut,
  onLoadToken
}: HeaderBarProps) {
  const [healingFeedback, setHealingFeedback] = useState(false);
  const [copiedFeedback, setCopiedFeedback] = useState(false);
  const [inputToken, setInputToken] = useState('');

  // Experience threshold for next level: lvl * 300 + 400
  const nextLevelXP = stats.level * 300 + 400;
  const xpPercentage = Math.min(100, Math.floor((stats.xp / nextLevelXP) * 100));

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
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 pb-6 border-b border-slate-800">
        
        {/* User Brand & XP */}
        <div className="flex items-center gap-4 w-full lg:w-auto">
          <div className="w-14 h-14 rounded-2xl bg-indigo-600 flex items-center justify-center font-bold text-2xl text-white shadow-lg border border-indigo-500 relative shrink-0">
            {stats.level}
            <div className="absolute -bottom-1.5 px-2 py-0.5 bg-slate-950 text-[9px] text-indigo-400 rounded-full font-bold border border-indigo-500/30 uppercase tracking-widest">
              Lvl
            </div>
          </div>
          <div className="flex-1 lg:flex-initial min-w-[200px]">
            <div className="flex justify-between text-xs font-semibold mb-1">
              <span className="text-slate-200 flex items-center gap-1">
                <Sparkles size={12} className="text-amber-400" /> Aventureiro do Código
              </span>
              <span className="text-slate-400">{stats.xp} / {nextLevelXP} XP</span>
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
        <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto justify-end">
          
          {/* STREAK */}
          <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-950 rounded-xl border border-slate-800 shadow-sm">
            <Flame size={18} className={`${stats.streak > 0 ? 'text-amber-500 animate-pulse' : 'text-slate-500'}`} />
            <div>
              <div className="text-[10px] text-slate-400 uppercase font-bold tracking-wider leading-none">Ofensiva</div>
              <div className="text-sm font-extrabold text-white leading-relaxed">{stats.streak} {stats.streak === 1 ? 'Dia' : 'Dias'}</div>
            </div>
          </div>

          {/* HEARTS */}
          <div className="flex items-center gap-3 px-3 py-1.5 bg-slate-950 rounded-xl border border-slate-800 shadow-sm">
            <div className="flex items-center gap-1">
              {Array.from({ length: stats.maxHearts }).map((_, i) => (
                <Heart
                  key={i}
                  size={16}
                  className={`transition-all ${
                    i < stats.hearts
                      ? 'fill-rose-500 text-rose-500 scale-100'
                      : 'text-slate-700 fill-slate-800/50 scale-90'
                  }`}
                />
              ))}
            </div>
            
            {stats.hearts < stats.maxHearts && (
              <button
                onClick={handleHealClick}
                disabled={stats.coins < 50 && stats.hearts > 0}
                className={`py-1 px-2.5 rounded-lg text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 transition-all cursor-pointer ${
                  stats.coins >= 50 || stats.hearts === 0
                    ? 'bg-rose-500/10 text-rose-400 border border-rose-500/30 hover:bg-rose-500 hover:text-white animate-pulse'
                    : 'bg-slate-900 text-slate-500 border border-slate-800 cursor-not-allowed'
                }`}
                title={stats.hearts === 0 && stats.coins < 50 ? "Obter Bênção de Vida Gratuita" : "Curar corações por 50 moedas de ouro"}
              >
                {healingFeedback ? (
                  <RefreshCw size={10} className="animate-spin text-emerald-400" />
                ) : stats.hearts === 0 && stats.coins < 50 ? (
                  '❤️ Bênção (Grátis!)'
                ) : (
                  '+❤️ (50🪙)'
                )}
              </button>
            )}
          </div>

          {/* COINS (GOLD) */}
          <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-950 rounded-xl border border-slate-800 shadow-sm hover:border-amber-500/20 transition-all">
            <span className="text-lg">🪙</span>
            <div>
              <div className="text-[10px] text-slate-400 uppercase font-bold tracking-wider leading-none">Moedas</div>
              <div className="text-sm font-extrabold text-amber-400 leading-relaxed">{stats.coins}</div>
            </div>
          </div>

          {/* CLOUD SAVE AUTH */}
          <div className="flex items-center gap-2 shrink-0 border-t sm:border-t-0 md:border-l border-slate-800 pt-2 sm:pt-0 md:pl-3 md:ml-1 h-9 w-full sm:w-auto justify-end">
            {authLoading ? (
              <div className="flex items-center gap-2 text-xs text-slate-500 font-medium whitespace-nowrap">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-ping" />
                Sincronizando...
              </div>
            ) : user ? (
              <div className="flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/20 rounded-xl p-1 px-2.5">
                <img
                  src={user.photoURL || `https://api.dicebear.com/7.x/pixel-art/svg?seed=${user.displayName || 'player'}`}
                  className="w-6 h-6 rounded-full border border-indigo-500/40 shrink-0"
                  alt="Avatar"
                  referrerPolicy="no-referrer"
                />
                <div className="text-left hidden sm:block max-w-[100px]">
                  <p className="text-[10px] font-bold text-white truncate leading-none">{user.displayName || 'Mestre'}</p>
                  <p className="text-[8px] text-emerald-400 font-semibold leading-none mt-0.5">Nuvem ☁️</p>
                </div>
                <button
                  onClick={onSignOut}
                  className="p-1 hover:bg-rose-500/20 rounded-lg text-slate-400 hover:text-rose-400 cursor-pointer transition-all active:scale-95"
                  title="Desconectar do Cloud"
                >
                  <LogOut size={13} />
                </button>
              </div>
            ) : (
              <button
                onClick={onSignIn}
                className="p-1.5 px-3 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white rounded-lg text-[10px] font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer shadow-md active:scale-[0.98] transition-all border border-indigo-500/30 whitespace-nowrap animate-scale-in"
                title="Salve o seu progresso na nuvem usando a sua conta Google"
              >
                <Cloud size={11} className="animate-pulse text-indigo-200" /> Sincronizar Nuvem
              </button>
            )}
          </div>

        </div>
      </div>

      {/* UNIQUE USER TOKEN & AUTOMATIC SAVE STATUS BAR */}
      <div className="mt-4 p-3 bg-slate-950 rounded-xl border border-slate-800/80 flex flex-col md:flex-row items-center justify-between gap-3 text-xs">
        <div className="flex flex-wrap items-center gap-2 text-slate-300">
          <span className="font-bold text-amber-400">🔑 Token de Progresso Único:</span>
          <span className="font-mono bg-slate-900 border border-slate-800 px-2 py-0.5 rounded text-white font-extrabold select-all tracking-wider text-[11px]">
            {stats.userToken || 'Gerando...'}
          </span>
          <button
            onClick={() => {
              if (stats.userToken) {
                navigator.clipboard.writeText(stats.userToken);
                setCopiedFeedback(true);
                setTimeout(() => setCopiedFeedback(false), 2000);
              }
            }}
            className="p-1 px-2.5 bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-400 select-none hover:text-indigo-300 rounded border border-indigo-500/20 text-[10px] font-bold uppercase cursor-pointer transition-all active:scale-95"
          >
            {copiedFeedback ? 'Copiado! ✅' : 'Copiar'}
          </button>
          <span className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1 ml-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            Progresso Salvo Automaticamente na Nuvem ☁️
          </span>
        </div>

        {/* Load backup token form */}
        <div className="flex items-center gap-1.5 w-full md:w-auto">
          <input
            type="text"
            placeholder="Carregar Token (ex: CQ-XXXXXX)"
            value={inputToken}
            onChange={(e) => setInputToken(e.target.value)}
            className="p-1 px-2.5 text-[10px] font-mono rounded bg-slate-900 border border-slate-800 text-slate-200 placeholder-slate-500 uppercase tracking-widest focus:outline-none focus:border-indigo-500 w-full md:w-48 h-8"
          />
          <button
            onClick={() => {
              if (inputToken.trim()) {
                onLoadToken(inputToken);
                setInputToken('');
              }
            }}
            className="p-1 px-3 bg-slate-800 hover:bg-slate-755 text-white rounded text-[10px] font-bold uppercase border border-slate-700 cursor-pointer transition-all active:scale-95 shrink-0 h-8"
          >
            Carregar
          </button>
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
