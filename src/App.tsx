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

const generateUserToken = (): string => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = 'CQ-';
  for (let i = 0; i < 8; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

const validateLoadedStreak = (stats: UserStats): UserStats => {
  if (!stats) return stats;
  if (!stats.lastActiveDate) {
    return {
      ...stats,
      streak: 0,
      lastActiveDate: new Date().toISOString()
    };
  }
  try {
    const now = new Date();
    const lastActive = new Date(stats.lastActiveDate);

    // Calculate calendar day difference
    const tempNow = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const tempLast = new Date(lastActive.getFullYear(), lastActive.getMonth(), lastActive.getDate());
    
    const diffTime = tempNow.getTime() - tempLast.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays > 1) {
      // User missed the 1-day window, so they broke the daily chain. Reset streak to 0!
      return {
        ...stats,
        streak: 0
      };
    }
  } catch (e) {
    console.error('Error validating streak:', e);
  }
  return stats;
};

export default function App() {
  const [stats, setStats] = useState<UserStats>(() => {
    const defaultToken = generateUserToken();
    const defaultStats: UserStats = {
      xp: 0,
      level: 1,
      hearts: 5,
      maxHearts: 5,
      coins: 0,
      streak: 0,
      lastActiveDate: new Date().toISOString(),
      completedLessons: [],
      unlockedAchievements: [],
      activeTrack: 'html',
      dailyMissions: INITIAL_MISSIONS.map(m => ({ ...m, current: 0, completed: false })),
      userToken: defaultToken,
      avatar: '🥷',
      nickname: 'Recruta do Código',
      lastHeartRegenTime: new Date().toISOString()
    };

    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Ensure missions array structure exists
        if (!parsed.dailyMissions || parsed.dailyMissions.length === 0) {
          parsed.dailyMissions = INITIAL_MISSIONS;
        }
        // Ensure backward compatibility with older stored state
        if (!parsed.userToken) {
          parsed.userToken = defaultToken;
        }
        if (!parsed.avatar) {
          parsed.avatar = '🥷';
        }
        if (!parsed.nickname) {
          parsed.nickname = 'Recruta do Código';
        }
        if (!parsed.lastHeartRegenTime) {
          parsed.lastHeartRegenTime = new Date().toISOString();
        }
        return validateLoadedStreak(parsed);
      } catch (e) {
        // use default if parse fails
      }
    }
    return defaultStats;
  });

  const [activeTab, setActiveTab ] = useState<'map' | 'editor' | 'leaderboard' | 'gdd'>('map');
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
  const [levelUpMessage, setLevelUpMessage] = useState<string | null>(null);

  // Auth synchronization tracking states
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const isCurrentStateFromCloud = useRef(false);

  // Sync state changes to matching repository (localStorage fallback AND cloud Firestore)
  useEffect(() => {
    // Local copy is always updated as a safe fallback
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(stats));

    if (isCurrentStateFromCloud.current) {
      isCurrentStateFromCloud.current = false;
      return; // prevent rewriting exact data just pulled from Firestore
    }

    // Determine path ID to write to based on login state (Google UID or unique Guest token)
    const activeDocId = user ? user.uid : stats.userToken;

    if (activeDocId) {
      const userDocRef = doc(db, 'users', activeDocId);
      setDoc(userDocRef, stats)
        .catch((error) => {
          handleFirestoreError(error, OperationType.WRITE, `users/${activeDocId}`);
        });
    }
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
              unlockedAchievements: cloudData.unlockedAchievements || [],
              userToken: cloudData.userToken || stats.userToken,
              avatar: cloudData.avatar || '🥷',
              nickname: cloudData.nickname || 'Recruta do Código',
              lastHeartRegenTime: cloudData.lastHeartRegenTime || new Date().toISOString()
            };
            isCurrentStateFromCloud.current = true;
            setStats(validateLoadedStreak(mergedData));
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
            if (!parsed.userToken) {
              parsed.userToken = generateUserToken();
            }
            setStats(validateLoadedStreak(parsed));

            // Fetch latest guest cloud save if exists!
            const userDocRef = doc(db, 'users', parsed.userToken);
            const docSnap = await getDoc(userDocRef);
            if (docSnap.exists()) {
              const cloudData = docSnap.data() as UserStats;
              isCurrentStateFromCloud.current = true;
              setStats(validateLoadedStreak({
                ...cloudData,
                completedLessons: cloudData.completedLessons || [],
                unlockedAchievements: cloudData.unlockedAchievements || [],
                dailyMissions: cloudData.dailyMissions || INITIAL_MISSIONS,
                userToken: cloudData.userToken || parsed.userToken,
                avatar: cloudData.avatar || '🥷',
                nickname: cloudData.nickname || 'Recruta do Código',
                lastHeartRegenTime: cloudData.lastHeartRegenTime || new Date().toISOString()
              }));
            }
          } catch (e) {
            console.error('Error fetching guest data:', e);
          }
        } else {
          // completely fresh guest
          const defaultToken = generateUserToken();
          setStats((prev) => ({
            ...prev,
            userToken: defaultToken
          }));
        }
        setAuthLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  // Passive Heart Regeneration check (adds 1 heart every 1 hour)
  useEffect(() => {
    const checkRegen = () => {
      setStats((prev) => {
        // If already at cap, do nothing to avoid infinite loops and massive Firestore write operations
        if (prev.hearts >= prev.maxHearts) {
          return prev;
        }

        const now = new Date();
        const lastRegen = prev.lastHeartRegenTime ? new Date(prev.lastHeartRegenTime) : new Date(prev.lastActiveDate || now.toISOString());
        const diffMs = now.getTime() - lastRegen.getTime();
        const oneHourMs = 1000 * 60 * 60;

        if (diffMs >= oneHourMs) {
          const heartsToRegen = Math.floor(diffMs / oneHourMs);
          const restoredHearts = Math.min(prev.maxHearts, prev.hearts + heartsToRegen);
          // Only advance lastHeartRegenTime by the exact hours processed, maintaining precision for partial progress
          const newRegenTime = new Date(lastRegen.getTime() + heartsToRegen * oneHourMs).toISOString();

          return {
            ...prev,
            hearts: restoredHearts,
            lastHeartRegenTime: restoredHearts >= prev.maxHearts ? new Date().toISOString() : newRegenTime
          };
        }
        return prev;
      });
    };

    checkRegen(); // Run once on hook mount
    const interval = setInterval(checkRegen, 10000); // Verify every 10 seconds
    return () => clearInterval(interval);
  }, [stats.hearts, stats.maxHearts]);

  const loadProgressByToken = async (token: string) => {
    token = token.trim().toUpperCase();
    if (!token.startsWith('CQ-') || token.length < 5) {
      alert('Token inválido. O token deve começar com "CQ-"');
      return;
    }

    setAuthLoading(true);
    try {
      const userDocRef = doc(db, 'users', token);
      const docSnap = await getDoc(userDocRef);

      if (docSnap.exists()) {
        const cloudData = docSnap.data() as UserStats;
        const mergedMissions = cloudData.dailyMissions || INITIAL_MISSIONS;
        const mergedData: UserStats = {
          ...cloudData,
          dailyMissions: mergedMissions,
          completedLessons: cloudData.completedLessons || [],
          unlockedAchievements: cloudData.unlockedAchievements || [],
          userToken: cloudData.userToken || token,
          avatar: cloudData.avatar || '🥷',
          nickname: cloudData.nickname || 'Recruta do Código',
          lastHeartRegenTime: cloudData.lastHeartRegenTime || new Date().toISOString()
        };
        const validatedData = validateLoadedStreak(mergedData);
        isCurrentStateFromCloud.current = true;
        setStats(validatedData);
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(validatedData));
        alert('Progresso recuperado com sucesso da nuvem! ☁️');
      } else {
        alert('Nenhum cadastro encontrado na nuvem para este token de progressão.');
      }
    } catch (error) {
      console.error('Erro ao buscar token:', error);
      alert('Falha ao carregar progresso da nuvem. Verifique o seu console.');
    } finally {
      setAuthLoading(false);
    }
  };

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

  // Restore hearts back to full (or free blessing if completely broke)
  const handleHeal = () => {
    const isFreeEmergency = stats.coins < 50 && stats.hearts === 0;
    if (stats.coins < 50 && !isFreeEmergency) return;
    
    setStats((prev) => {
      const cost = isFreeEmergency ? 0 : 50;
      const updatedMissions = prev.dailyMissions.map((m) => {
        // Only count as spending mission if it was not free
        if (m.id === 'm2' && cost > 0) {
          return { ...m, current: Math.min(m.target, m.current + 1) };
        }
        return m;
      });
      return {
        ...prev,
        coins: Math.max(0, prev.coins - cost),
        hearts: prev.maxHearts,
        dailyMissions: updatedMissions
      };
    });
  };

  // Completely reset stats to let user start from scratch (começo do zero)
  const handleResetStats = () => {
    if (window.confirm('Aviso: Isso irá apagar todo o seu progresso local de nível, moedas, XP acumulado e lições completadas para que você possa recomeçar o curso do zero! Deseja continuar?')) {
      const defaultToken = generateUserToken();
      const freshStats: UserStats = {
        xp: 0,
        level: 1,
        hearts: 5,
        maxHearts: 5,
        coins: 0,
        streak: 0,
        lastActiveDate: new Date().toISOString(),
        completedLessons: [],
        unlockedAchievements: [],
        activeTrack: 'html',
        dailyMissions: INITIAL_MISSIONS.map(m => ({ ...m, current: 0, completed: false })),
        userToken: stats.userToken || defaultToken
      };
      setStats(freshStats);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(freshStats));
      alert('Seu progresso foi totalmente zerado! Comece a sua jornada de estudos agora do zero. 🚀');
    }
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

      // Calculate streak update:
      const now = new Date();
      let lastActiveIso = prev.lastActiveDate || now.toISOString();
      let newStreak = prev.streak || 0;

      try {
        const lastActive = new Date(lastActiveIso);
        const nowDateStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
        const lastActiveDateStr = `${lastActive.getFullYear()}-${String(lastActive.getMonth() + 1).padStart(2, '0')}-${String(lastActive.getDate()).padStart(2, '0')}`;

        if (nowDateStr !== lastActiveDateStr) {
          // First activity of today!
          const tempNow = new Date(now.getFullYear(), now.getMonth(), now.getDate());
          const tempLast = new Date(lastActive.getFullYear(), lastActive.getMonth(), lastActive.getDate());
          
          const diffTime = tempNow.getTime() - tempLast.getTime();
          const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

          if (diffDays === 1) {
            newStreak = (prev.streak || 0) + 1;
          } else {
            newStreak = 1; // fresh start or broke chain
          }
          lastActiveIso = now.toISOString();
        } else {
          // Ensure they have at least 1 if active today
          if (newStreak === 0) {
            newStreak = 1;
          }
        }
      } catch (e) {
        console.error('Error calculating streak:', e);
      }

      const newCoins = prev.coins + coinsReward;
      const checkedBadges = checkAchievements(newCompleted, newCoins, newStreak);

      return {
        ...prev,
        xp: newXP,
        level: newLevel,
        coins: newCoins,
        streak: newStreak,
        lastActiveDate: lastActiveIso,
        completedLessons: newCompleted,
        unlockedAchievements: checkedBadges,
        dailyMissions: updatedMissions
      };
    });
  };

  // Process failed attempt (lose single heart)
  const handleCodeFailure = () => {
    setStats((prev) => {
      const isFull = prev.hearts >= prev.maxHearts;
      return {
        ...prev,
        hearts: Math.max(0, prev.hearts - 1),
        // Start the hour countdown immediately if they were at full health
        lastHeartRegenTime: isFull ? new Date().toISOString() : prev.lastHeartRegenTime
      };
    });
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
          onLoadToken={loadProgressByToken}
          onResetStats={handleResetStats}
          onUpdateStats={(updatedFields) => setStats(prev => ({ ...prev, ...updatedFields }))}
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
              onSelectLesson={setActiveLesson}
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
