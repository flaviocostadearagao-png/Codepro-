/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type TrackType = 'html' | 'css' | 'js';
export type LevelType = 'iniciante' | 'intermediario' | 'avancado';

export interface CodeTest {
  id: string;
  description: string;
  // Checker runs on code and returns true/false
  // Since functions can't be easily sent over JSON, we'll store test definitions as a combination of desc and regex/eval rule
  ruleType: 'contains' | 'not_contains' | 'regex' | 'js_eval';
  expected: string;
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  concept: string; // The short theory text (100% practical context)
  track: TrackType;
  difficulty: LevelType;
  task: string; // The user instructions
  initialCode: string;
  solutionExample: string;
  tests: CodeTest[];
  hint: string;
  coinsReward: number;
  xpReward: number;
  order: number;
  isTest?: boolean;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  trackRequirement?: TrackType;
  xpRequirement?: number;
  unlockedAt?: boolean;
}

export interface DailyMission {
  id: string;
  title: string;
  description: string;
  target: number;
  current: number;
  xpReward: number;
  coinsReward: number;
  completed: boolean;
}

export interface LeaderboardUser {
  rank: number;
  name: string;
  xp: number;
  level: number;
  avatar: string;
  isCurrentUser?: boolean;
}

export interface UserStats {
  xp: number;
  level: number;
  hearts: number;
  maxHearts: number;
  coins: number;
  streak: number;
  lastActiveDate: string; // ISO string
  completedLessons: string[]; // List of lesson IDs
  unlockedAchievements: string[]; // List of achievement IDs
  activeTrack: TrackType;
  dailyMissions: DailyMission[];
  userToken: string;
  avatar?: string;
  lastHeartRegenTime?: string;
  nickname?: string;
}
