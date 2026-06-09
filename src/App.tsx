/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { UserStats, TrackType, Lesson, DailyMission } from './types';
import { SYLLABUS, INITIAL_MISSIONS } from './data/syllabus';
import HeaderBar from './components/HeaderBar';
import MapJourney from './components/MapJourney';
import CodeEditorArea from './components/CodeEditorArea';
import LeaderboardPanel from './components/LeaderboardPanel';
import ManualTabs from './components/ManualTabs';
import { Sparkles, Trophy, Award, Heart, HelpCircle, GraduationCap } from 'lucide-react';

// Firebase core integration imports
import { onAuthStateChanged, User as FirebaseUser, signInWithPopup, signOut } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db, googleProvider, handleFirestoreError, OperationType } from './firebase';

const LOCAL_STORAGE_KEY = 'codequest_user_stats_v2';

export default function App() {
  const [stats, setStats] = useState<UserStats>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Ensure missions array structure exists
        if (!parsed.dailyMissions || parsed.dailyMissions.length === 0) {
          parsed.dailyMissions = INITIAL_MISSIONS;
        }
        return parsed;
      } catch (e) {
        // use default if parse fails
      }
    }
    return {
      xp: 120,
      level: 1,
      hearts: 5,
      maxHearts: 5,
      coins: 150,
      streak: 5,
      lastActiveDate: new Date().toISOString(),
      completedLessons: [],
      unlockedAchievements: [],
      activeTrack: 'html',
      dailyMissions: INITIAL_MISSIONS
    };
  });

  const [activeTab, setActiveTab ] = useState<'map' | 'editor' | 'leaderboard' | 'gdd'>('map');
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
  const [levelUpMessage, setLevelUpMessage] = useState<string | null>(null);

  // Auth synchronization tracking states
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const isCurrentStateFromCloud = useRef(false);

  // Sync state changes to matching repository (localStorage fallback OR cloud Firestore)
  useEffect(() => {
    if (!user) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(stats));
      return;
    }

    if (isCurrentStateFromCloud.current) {
      isCurrentStateFromCloud.current = false;
      return; // prevent rewriting exact data just pulled from Firestore
    }

    // Write player stats strictly to Firestore
    const userDocRef = doc(db, 'users', user.uid);
    setDoc(userDocRef, stats)
      .catch((error) => {
        handleFirestoreError(error, OperationType.WRITE, `users/${user.uid}`);
      });
  }, [stats, user]);

  // Handle Firebase auth validation transitions
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        setAuthLoading(true);
        try {
          const userDocRef = doc(db, 'users', currentUser.uid);
          const docSnap = await getDoc(userDocRef);

          if (docSnap.exists()) {
            const cloudData = docSnap.data() as UserStats;
            // Build stable defaults mapping arrays and nested structures securely
            const mergedMissions = cloudData.dailyMissions || INITIAL_MISSIONS;
            const mergedData: UserStats = {
              ...cloudData,
              dailyMissions: mergedMissions,
              completedLessons: cloudData.completedLessons || [],
              unlockedAchievements: cloudData.unlockedAchievements || []
            };
            isCurrentStateFromCloud.current = true;
            setStats(mergedData);
          } else {
            // First time user registration: save current progress directly as cloud migration
            isCurrentStateFromCloud.current = true;
            await setDoc(userDocRef, stats);
          }
        } catch (error) {
          handleFirestoreError(error, OperationType.GET, `users/${currentUser.uid}`);
        } finally {
          setAuthLoading(false);
        }
      } else {
        // Fallback to local machine state if logged-out
        const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (saved) {
          try {
            const parsed = JSON.parse(saved);
            if (!parsed.dailyMissions || parsed.dailyMissions.length === 0) {
              parsed.dailyMissions = INITIAL_MISSIONS;
            }
            setStats(parsed);
          } catch (e) {}
        }
        setAuthLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error('Erro de login Google:', error);
    }
  };

  const handleSignOut = async () => {
    try {
      if (window.confirm('Deseja desconectar sua conta da nuvem? Seu progresso do computador atual continuará disponível localmente.')) {
        await signOut(auth);
      }
    } catch (error) {
      console.error('Erro de logout:', error);
    }
  };

  // Badge unlock helper
  const checkAchievements = (completed: string[], coins: number, streak: number): string[] => {
    const unlocked: string[] = [];
    if (completed.length >= 1) unlocked.push('badge_first');
    
    // check HTML track (Iniciante complete)
    const htmlLessons = SYLLABUS.filter((l) => l.track === 'html' && l.difficulty === 'iniciante').map((l) => l.id);
    if (htmlLessons.length > 0 && htmlLessons.every((id) => completed.includes(id))) {
      unlocked.push('badge_html_master');
    }

    // check CSS track (Iniciante complete)
    const cssLessons = SYLLABUS.filter((l) => l.track === 'css' && l.difficulty === 'iniciante').map((l) => l.id);
    if (cssLessons.length > 0 && cssLessons.every((id) => completed.includes(id))) {
      unlocked.push('badge_css_master');
    }

    // check JS track (Iniciante complete)
    const jsLessons = SYLLABUS.filter((l) => l.track === 'js' && l.difficulty === 'iniciante').map((l) => l.id);
    if (jsLessons.length > 0 && jsLessons.every((id) => completed.includes(id))) {
      unlocked.push('badge_js_master');
    }

    if (streak >= 3) unlocked.push('badge_streak_3');
    if (coins >= 150) unlocked.push('badge_hoarder');

    return unlocked;
  };

  // Select active technology track
  const handleSelectTrack = (track: TrackType) => {
    setStats((prev) => ({
      ...prev,
      activeTrack: track
    }));
    setActiveLesson(null);
  };

  // Player buys / unlocks hint
  const handleSpendCoins = (amount: number): boolean => {
    if (stats.coins < amount) return false;
    setStats((prev) => {
      const updatedMissions = prev.dailyMissions.map((m) => {
        if (m.id === 'm2') {
          return { ...m, current: Math.min(m.target, m.current + 1) };
        }
        return m;
      });
      return {
        ...prev,
        coins: prev.coins - amount,
        dailyMissions: updatedMissions
      };
    });
    return true;
  };

  const handleBuyHint = () => {
    // Registered by spendCoins, this callback triggers additional triggers if needed
  };

  // Restore hearts back to full
  const handleHeal = () => {
    if (stats.coins < 50) return;
    setStats((prev) => {
      const updatedMissions = prev.dailyMissions.map((m) => {
        if (m.id === 'm2') {
          return { ...m, current: Math.min(m.target, m.current + 1) };
        }
        return m;
      });
      return {
        ...prev,
        coins: prev.coins - 50,
        hearts: prev.maxHearts,
        dailyMissions: updatedMissions
      };
    });
  };

  // Process success validation
  const handleCodeSuccess = (xpReward: number, coinsReward: number, lessonId: string) => {
    setStats((prev) => {
      const isNewCompletion = !prev.completedLessons.includes(lessonId);
      const newCompleted = isNewCompletion
        ? [...prev.completedLessons, lessonId]
        : prev.completedLessons;

      let newXP = prev.xp + xpReward;
      let newLevel = prev.level;
      let leveledUp = false;

      // level-up formula loop
      let nextLvlXP = newLevel * 300 + 400;
      while (newXP >= nextLvlXP) {
        newXP -= nextLvlXP;
        newLevel += 1;
        nextLvlXP = newLevel * 300 + 400;
        leveledUp = true;
      }

      if (leveledUp) {
        setLevelUpMessage(`Parabéns! Você alcançou o Nível ${newLevel}! ✨`);
        setTimeout(() => setLevelUpMessage(null), 4000);
      }

      // Progress daily missions
      const updatedMissions = prev.dailyMissions.map((m) => {
        let current = m.current;
        if (m.id === 'm1' && isNewCompletion) {
          current = Math.min(m.target, m.current + 1);
        } else if (m.id === 'm3') {
          current = Math.min(m.target, m.current + 1);
        }
        return { ...m, current };
      });

      const newCoins = prev.coins + coinsReward;
      const checkedBadges = checkAchievements(newCompleted, newCoins, prev.streak);

      return {
        ...prev,
        xp: newXP,
        level: newLevel,
        coins: newCoins,
        completedLessons: newCompleted,
        unlockedAchievements: checkedBadges,
        dailyMissions: updatedMissions
      };
    });
  };

  // Process failed attempt (lose single heart)
  const handleCodeFailure = () => {
    setStats((prev) => ({
      ...prev,
      hearts: Math.max(0, prev.hearts - 1)
    }));
  };

  // Claim Daily Quest Reward
  const handleClaimMission = (missionId: string, xpReward: number, coinsReward: number) => {
    setStats((prev) => {
      let newXP = prev.xp + xpReward;
      let newLevel = prev.level;
      let levedUp = false;

      let nextLvlXP = newLevel * 300 + 400;
      while (newXP >= nextLvlXP) {
        newXP -= nextLvlXP;
        newLevel += 1;
        nextLvlXP = newLevel * 300 + 400;
        levedUp = true;
      }

      if (levedUp) {
        setLevelUpMessage(`Parabéns! Você alcançou o Nível ${newLevel}! ✨`);
        setTimeout(() => setLevelUpMessage(null), 4000);
      }

      const updatedMissions = prev.dailyMissions.map((m) => {
        if (m.id === missionId) {
          return { ...m, completed: true };
        }
        return m;
      });

      const newCoins = prev.coins + coinsReward;
      const checkedBadges = checkAchievements(prev.completedLessons, newCoins, prev.streak);

      return {
        ...prev,
        xp: newXP,
        level: newLevel,
        coins: newCoins,
        dailyMissions: updatedMissions,
        unlockedAchievements: checkedBadges
      };
    });
  };

  // Initiate lesson from Map Journey
  const handleStartLesson = (lesson: Lesson) => {
    setActiveLesson(lesson);
    setActiveTab('editor');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-3 md:p-6 pb-20 select-none relative overflow-x-hidden">
      
      {/* Background radial overlays */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-indigo-500/5 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-3xl -z-10 pointer-events-none" />

      {/* Primary Layout Frame */}
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Banner Announcement */}
        <div className="flex flex-col md:flex-row items-center justify-between p-4 bg-gradient-to-r from-slate-900 to-indigo-950/60 border border-indigo-500/10 rounded-2xl gap-3">
          <div className="flex items-center gap-3">
            <span className="text-2xl p-2 bg-indigo-500/10 text-indigo-400 rounded-xl border border-indigo-500/20">⚔️</span>
            <div>
              <h1 className="text-lg font-bold text-white flex items-center gap-1.5 font-sans leading-none">
                CodeQuest <span className="text-xs text-indigo-400 border border-indigo-500/20 px-2 py-0.5 rounded-full bg-indigo-500/5 font-semibold">Alfa Arena</span>
              </h1>
              <p className="text-slate-400 text-xs mt-1">Aprenda HTML, CSS e JavaScript praticando com desafios reais e progressão de RPG!</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                if(window.confirm('Deseja resetar todo o seu progresso? Seus níveis, moedas e conquistas voltarão a zero.')) {
                  localStorage.removeItem(LOCAL_STORAGE_KEY);
                  window.location.reload();
                }
              }}
              className="text-[10px] uppercase font-bold text-slate-500 hover:text-rose-400 py-1.5 px-3 rounded border border-slate-850 hover:border-rose-500/20 bg-slate-900 cursor-pointer transition-all"
            >
              Resetar Progresso
            </button>
          </div>
        </div>

        {/* Global Level Up Pop Notification */}
        {levelUpMessage && (
          <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-gradient-to-r from-amber-500 to-yellow-600 font-extrabold text-[#030712] px-6 py-3.5 rounded-full shadow-2xl flex items-center gap-2 text-sm border-2 border-white animate-bounce">
            <Sparkles size={18} className="animate-spin text-white" /> {levelUpMessage}
          </div>
        )}

        {/* Dynamic header widgets */}
        <HeaderBar
          stats={stats}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onHeal={handleHeal}
          onSelectTrack={handleSelectTrack}
          user={user}
          authLoading={authLoading}
          onSignIn={handleSignIn}
          onSignOut={handleSignOut}
        />

        {/* Tab display routing switcher */}
        <main className="min-h-[500px]">
          {activeTab === 'map' && (
            <MapJourney
              stats={stats}
              onStartLesson={handleStartLesson}
            />
          )}

          {activeTab === 'editor' && (
            <CodeEditorArea
              stats={stats}
              activeLesson={activeLesson}
              onCodeSuccess={handleCodeSuccess}
              onCodeFailure={handleCodeFailure}
              onSpendCoins={handleSpendCoins}
              onBuyHint={handleBuyHint}
              onClose={() => setActiveTab('map')}
            />
          )}

          {activeTab === 'leaderboard' && (
            <LeaderboardPanel
              stats={stats}
              onClaimMissionReward={handleClaimMission}
              onUnlockAchievement={(id) => {}}
            />
          )}

          {activeTab === 'gdd' && (
            <ManualTabs />
          )}
        </main>
      </div>

      {/* Global Minimal Footer */}
      <footer className="mt-12 text-center text-slate-600 text-xs border-t border-slate-900 pt-6 max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
        <p>CodeQuest © 2026. Todos os direitos reservados.</p>
        <div className="flex gap-4">
          <span className="hover:text-slate-400 cursor-pointer">Arquiteto de Software</span>
          <span>•</span>
          <span className="hover:text-slate-400 cursor-pointer">UI/UX Design</span>
          <span>•</span>
          <span className="hover:text-slate-400 cursor-pointer">Game Designer</span>
        </div>
      </footer>
    </div>
  );
}
