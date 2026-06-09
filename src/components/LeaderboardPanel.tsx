/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { UserStats, Achievement, DailyMission, LeaderboardUser } from '../types';
import { ACHIEVEMENTS, SIMULATED_LEADERBOARD } from '../data/syllabus';
import { Award, Flame, Star, Shield, HelpCircle, Trophy, Sparkles, CheckCircle2, RefreshCw } from 'lucide-react';

interface LeaderboardPanelProps {
  stats: UserStats;
  onClaimMissionReward: (missionId: string, xp: number, coins: number) => void;
  onUnlockAchievement: (badgeId: string) => void;
}

export default function LeaderboardPanel({
  stats,
  onClaimMissionReward,
  onUnlockAchievement
}: LeaderboardPanelProps) {
  const [boardUsers, setBoardUsers] = useState<LeaderboardUser[]>(SIMULATED_LEADERBOARD);
  const [simulatePulse, setSimulatePulse] = useState(false);

  // Sync current user's actual live stats inside the Leaderboard list
  const getSyncedLeaderboard = () => {
    return boardUsers.map(user => {
      if (user.isCurrentUser) {
        return {
          ...user,
          name: stats.nickname || user.name,
          avatar: stats.avatar || user.avatar,
          level: stats.level,
          xp: stats.xp + (stats.level - 1) * 1500 // simulate baseline XP for level comparisons
        };
      }
      return user;
    }).sort((a, b) => b.xp - a.xp).map((user, idx) => ({ ...user, rank: idx + 1 }));
  };

  const syncedList = getSyncedLeaderboard();

  // Handle simulated action button where other computer users "do challenges"
  // This changes ranks and XP, creating a real feel of a vibrant dynamic classroom!
  const handleSimulateCompetition = () => {
    setSimulatePulse(true);
    setBoardUsers(prev => {
      return prev.map(user => {
        if (user.isCurrentUser) return user;
        // add random incremental XP between 80 and 200
        const xpBoost = Math.floor(Math.random() * 150) + 50;
        const newXp = user.xp + xpBoost;
        const newLevel = Math.max(user.level, Math.floor(newXp / 800) + 1);
        return {
          ...user,
          xp: newXp,
          level: newLevel
        };
      });
    });

    setTimeout(() => {
      setSimulatePulse(false);
    }, 1200);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-fade-in text-slate-100">
      
      {/* 1. LEFT COLUMN: Global Arena Leaderboard */}
      <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col justify-between h-[650px]">
        <div>
          <div className="flex justify-between items-center border-b border-slate-800 pb-4 mb-4">
            <div>
              <h3 className="text-lg font-black tracking-wider uppercase flex items-center gap-2 text-white">
                <Trophy className="text-amber-400" size={18} /> Arena Leaderboard
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">Seu rank atualizado em tempo real frente aos oponentes.</p>
            </div>
            
            <button
              onClick={handleSimulateCompetition}
              className="p-1.5 px-3 rounded text-[10px] bg-slate-950 font-bold uppercase tracking-wider border border-slate-850 hover:bg-slate-800 text-indigo-400 cursor-pointer flex items-center gap-1 hover:border-indigo-500/20 active:scale-95 transition-all text-right"
              title="Acelerar o passo de treino de outros competidores"
            >
              <RefreshCw size={10} className={simulatePulse ? 'animate-spin' : ''} /> Simular IA
            </button>
          </div>

          <div className="space-y-2 overflow-y-auto max-h-[460px] pr-1">
            {syncedList.map((user) => {
              const userColor = user.isCurrentUser
                ? 'bg-indigo-600/15 border-indigo-500/50 text-indigo-200'
                : 'bg-slate-950 border-slate-850/60 text-slate-300';
              
              const getRankBadge = (rank: number) => {
                switch (rank) {
                  case 1: return '🥇';
                  case 2: return '🥈';
                  case 3: return '🥉';
                  default: return `#${rank}`;
                }
              };

              return (
                <div
                  key={user.name}
                  className={`flex items-center justify-between p-3 rounded-xl border transition-all ${userColor}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="font-extrabold text-sm w-6 text-center">{getRankBadge(user.rank)}</span>
                    <span className="text-lg w-8 h-8 rounded-full bg-slate-900 flex items-center justify-center border border-slate-800 shrink-0">
                      {user.avatar}
                    </span>
                    <div>
                      <span className="font-bold text-xs flex items-center gap-1 text-white">
                        {user.name}
                        {user.isCurrentUser && (
                          <span className="text-[8px] bg-indigo-500 text-white font-extrabold uppercase px-1 py-0.2 rounded">Você</span>
                        )}
                      </span>
                      <span className="text-[10px] text-slate-400">Level {user.level}</span>
                    </div>
                  </div>
                  <span className="text-xs font-black text-slate-100 font-mono tracking-wider">{user.xp} XP</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="p-3 bg-indigo-500/5 border border-indigo-500/10 rounded-xl text-[10px] leading-normal text-indigo-400 font-sans mt-4">
          💡 <strong>Regra do Jogo:</strong> Cada desafio concluído de primeira escalona o seu bônus, permitindo reter o primeiro lugar no ranking da CodeQuest!
        </div>
      </div>

      {/* 2. RIGHT COLUMN: Daily Quests and Achievements Grid */}
      <div className="lg:col-span-7 space-y-6">
        
        {/* DAILY QUESTS BAR */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl text-xs space-y-4">
          <h3 className="text-base font-black tracking-wider uppercase text-white flex items-center gap-2 border-b border-slate-800 pb-3">
            <Sparkles className="text-indigo-400" size={16} /> Missões Diárias (Daily Quests)
          </h3>

          <div className="space-y-3">
            {stats.dailyMissions.map((mission) => {
              const percent = Math.min(100, Math.floor((mission.current / mission.target) * 100));
              const isEligibleToClaim = mission.current >= mission.target && !mission.completed;

              return (
                <div
                  key={mission.id}
                  className={`p-4 bg-slate-950 rounded-xl border flex flex-col sm:flex-row justify-between sm:items-center gap-4 transition-all ${
                    mission.completed
                      ? 'border-emerald-500/20 bg-emerald-500/5 opacity-60'
                      : isEligibleToClaim
                      ? 'border-indigo-500 bg-indigo-500/5'
                      : 'border-slate-850'
                  }`}
                >
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-white text-xs">{mission.title}</span>
                      {mission.completed && (
                        <span className="px-1.5 py-0.2 uppercase text-[8px] font-extrabold rounded bg-emerald-500/20 text-emerald-400">Resgatado</span>
                      )}
                    </div>
                    <p className="text-slate-400 text-[11px] leading-relaxed">{mission.description}</p>
                    
                    {/* Progression bar indicator */}
                    <div className="flex items-center gap-2 pt-1.5">
                      <div className="flex-1 bg-slate-900 h-2 rounded-full overflow-hidden p-0.5 border border-slate-850">
                        <div
                          className="bg-indigo-500 h-full rounded-full transition-all"
                          style={{ width: `${percent}%` }}
                        />
                      </div>
                      <span className="text-[10px] font-bold text-slate-400 tracking-wider shrink-0">{mission.current} / {mission.target}</span>
                    </div>
                  </div>

                  <div className="flex sm:flex-col items-end gap-2 shrink-0">
                    <div className="flex items-center gap-1.5 text-[10px] text-slate-400">
                      <span>Prêmios:</span>
                      <span className="font-bold text-indigo-300">+{mission.xpReward} XP</span>
                      <span>•</span>
                      <span className="font-bold text-amber-300">{mission.coinsReward}🪙</span>
                    </div>

                    {isEligibleToClaim ? (
                      <button
                        onClick={() => onClaimMissionReward(mission.id, mission.xpReward, mission.coinsReward)}
                        className="py-1.5 px-3 rounded bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold text-[10px] uppercase tracking-wider transition-all duration-300 cursor-pointer active:scale-95 shadow-md flex items-center gap-1"
                      >
                        <CheckCircle2 size={12} /> Resgatar
                      </button>
                    ) : (
                      <button
                        disabled
                        className="py-1.5 px-3 rounded bg-slate-900 text-slate-600 font-bold text-[10px] uppercase tracking-wider border border-slate-850 cursor-not-allowed"
                      >
                        {mission.completed ? 'Resgatado' : 'Bloqueado'}
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* UNLOCKED BADGES CABINET */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl text-xs space-y-4">
          <h3 className="text-base font-black tracking-wider uppercase text-white flex items-center gap-2 border-b border-slate-800 pb-3">
            <Award className="text-amber-400" size={16} /> Armário de Conquistas (Badges)
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {ACHIEVEMENTS.map((badge) => {
              // Check if actual unlocked
              const isUnlocked = stats.unlockedAchievements.includes(badge.id);

              return (
                <div
                  key={badge.id}
                  className={`p-3 rounded-xl border flex items-center gap-3.5 transition-all ${
                    isUnlocked
                      ? 'bg-slate-950 border-indigo-500/30'
                      : 'bg-slate-950/40 border-slate-850 text-slate-500 opacity-50'
                  }`}
                >
                  <div className={`w-11 h-11 rounded-full flex items-center justify-center text-2xl select-none shrink-0 ${
                    isUnlocked
                      ? 'bg-indigo-500/10 border border-indigo-500/20 shadow'
                      : 'bg-slate-900 border border-slate-850 filter grayscale'
                  }`}>
                    {badge.icon}
                  </div>
                  <div className="space-y-0.5">
                    <span className={`font-extrabold text-xs block ${isUnlocked ? 'text-white' : 'text-slate-500'}`}>
                      {badge.title}
                    </span>
                    <p className={`text-[10px] leading-relaxed ${isUnlocked ? 'text-slate-400' : 'text-slate-600 font-normal'}`}>
                      {badge.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
