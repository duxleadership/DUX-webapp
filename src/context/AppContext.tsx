import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import confetti from 'canvas-confetti';
import {
  UserProfile,
  DirectionType,
  DailyAnswer,
  Challenge,
  Achievement,
  Story,
  CommunityPost,
  LabIdea,
  EventItem,
  StoreProduct,
  CartItem,
  NotificationItem,
  RewardItem,
  MapStage
} from '../types';
import {
  INITIAL_CHALLENGES,
  INITIAL_ACHIEVEMENTS,
  INITIAL_STORIES,
  INITIAL_POSTS,
  INITIAL_LAB_IDEAS,
  INITIAL_EVENTS,
  INITIAL_PRODUCTS,
  INITIAL_REWARDS,
  INITIAL_NOTIFICATIONS,
  DUX_MAP_STAGES,
  DIRECTION_ARCHETYPES
} from '../data/mockData';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

export interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'reward';
  title: string;
  message?: string;
}

interface AppContextType {
  // Auth & Profile
  user: UserProfile | null;
  isAuthenticated: boolean;
  login: (email: string, pass: string) => Promise<boolean>;
  signup: (name: string, username: string, email: string, pass: string) => Promise<boolean>;
  logout: () => void;
  updateProfile: (updates: Partial<UserProfile>) => void;
  completeOnboarding: (data: { intentions: string[]; archetype: string; focusAreas: string[] }) => void;
  
  // Direction Quiz
  saveDirectionResult: (archetype: DirectionType) => void;

  // Daily DUX
  dailyAnswers: DailyAnswer[];
  saveDailyAnswer: (question: string, answer: string, isPrivate: boolean) => void;

  // Challenges
  challenges: Challenge[];
  startChallenge: (challengeId: string) => void;
  completeChallengeDay: (challengeId: string, dayNumber: number) => void;
  claimChallengeAchievement: (challengeId: string) => void;

  // Map & Progress
  mapStages: MapStage[];

  // Achievements
  achievements: Achievement[];
  unlockAchievement: (achievementId: string) => void;

  // Rewards
  rewards: RewardItem[];
  redeemReward: (rewardId: string) => boolean;

  // Community
  posts: CommunityPost[];
  createPost: (content: string, category: CommunityPost['category']) => void;
  toggleLikePost: (postId: string) => void;
  toggleSavePost: (postId: string) => void;
  addCommentToPost: (postId: string, commentText: string) => void;

  // DUX Lab
  ideas: LabIdea[];
  submitIdea: (title: string, description: string, category: LabIdea['category'], tags: string[]) => void;
  toggleUpvoteIdea: (ideaId: string) => void;

  // Stories
  stories: Story[];
  toggleLikeStory: (storyId: string) => void;
  toggleSaveStory: (storyId: string) => void;

  // Events
  events: EventItem[];
  toggleRsvpEvent: (eventId: string) => void;

  // Store & Cart
  products: StoreProduct[];
  cart: CartItem[];
  addToCart: (product: StoreProduct, quantity?: number, selectedSize?: string) => void;
  removeFromCart: (productId: string, size?: string) => void;
  updateCartQuantity: (productId: string, quantity: number, size?: string) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;

  // Notifications
  notifications: NotificationItem[];
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsAsRead: () => void;

  // Search
  searchQuery: string;
  setSearchQuery: (query: string) => void;

  // Toast UI
  toasts: ToastMessage[];
  showToast: (toast: Omit<ToastMessage, 'id'>) => void;
  removeToast: (id: string) => void;

  // Admin capabilities
  adminStats: {
    totalUsers: number;
    activeUsers: number;
    totalPosts: number;
    totalStories: number;
    activeChallenges: number;
    eventsCount: number;
  };
  createAdminChallenge: (newChallenge: Omit<Challenge, 'id' | 'enrolled' | 'currentDay' | 'completed' | 'days'>, daysCount: number) => void;
  deleteAdminChallenge: (id: string) => void;
  publishAdminStory: (newStory: Omit<Story, 'id' | 'publishedAt' | 'likesCount' | 'isLiked' | 'isSaved'>) => void;
  deleteAdminPost: (postId: string) => void;
}

const DEFAULT_USER: UserProfile = {
  id: 'usr_demo_101',
  name: 'Alex Vance',
  username: 'alexvance',
  email: 'alex.vance@dux.community',
  bio: 'Turning scattered curiosities into focused momentum. On a journey to build tools that last.',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
  direction: 'THE BUILDER',
  directionVirtue: 'DETERMINATION',
  directionMantra: 'You turn ideas into action.',
  directionDiscoveredAt: '2026-09-20',
  onboardingCompleted: true,
  onboardingData: {
    intentions: ['Build something', 'Find inspiration'],
    archetype: 'Builder',
    focusAreas: ['Confidence', 'Personal Growth']
  },
  streak: 4,
  points: 850,
  challengesCompletedCount: 7,
  achievementsCount: 5,
  isAdmin: true
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Load state from localStorage or initialize with mocks
  const [user, setUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('dux_user');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return DEFAULT_USER;
  });

  const [dailyAnswers, setDailyAnswers] = useState<DailyAnswer[]>(() => {
    const saved = localStorage.getItem('dux_daily_answers');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return [
      {
        id: 'ans_1',
        date: 'Yesterday',
        question: 'What is one thing you want to become better at this month?',
        answer: 'Unapologetic focus. Saying no to half-interesting meetings so I have uninterrupted blocks for deep craft.',
        isPrivate: false,
        createdAt: '2026-09-23T14:30:00Z'
      }
    ];
  });

  const [challenges, setChallenges] = useState<Challenge[]>(() => {
    const saved = localStorage.getItem('dux_challenges');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return INITIAL_CHALLENGES;
  });

  const [achievements, setAchievements] = useState<Achievement[]>(() => {
    const saved = localStorage.getItem('dux_achievements');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return INITIAL_ACHIEVEMENTS;
  });

  const [mapStages, setMapStages] = useState<MapStage[]>(() => {
    const saved = localStorage.getItem('dux_map_stages');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return DUX_MAP_STAGES;
  });

  const [rewards, setRewards] = useState<RewardItem[]>(() => {
    const saved = localStorage.getItem('dux_rewards');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return INITIAL_REWARDS;
  });

  const [posts, setPosts] = useState<CommunityPost[]>(() => {
    const saved = localStorage.getItem('dux_posts');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return INITIAL_POSTS;
  });

  const [ideas, setIdeas] = useState<LabIdea[]>(() => {
    const saved = localStorage.getItem('dux_ideas');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return INITIAL_LAB_IDEAS;
  });

  const [stories, setStories] = useState<Story[]>(() => {
    const saved = localStorage.getItem('dux_stories');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return INITIAL_STORIES;
  });

  const [events, setEvents] = useState<EventItem[]>(() => {
    const saved = localStorage.getItem('dux_events');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return INITIAL_EVENTS;
  });

  const [products] = useState<StoreProduct[]>(INITIAL_PRODUCTS);

  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('dux_cart');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return [
      {
        product: INITIAL_PRODUCTS[0],
        quantity: 1,
        selectedSize: 'L'
      }
    ];
  });

  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    const saved = localStorage.getItem('dux_notifications');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return INITIAL_NOTIFICATIONS;
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Persistent storage sync
  useEffect(() => {
    if (user) {
      localStorage.setItem('dux_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('dux_user');
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('dux_daily_answers', JSON.stringify(dailyAnswers));
  }, [dailyAnswers]);

  useEffect(() => {
    localStorage.setItem('dux_challenges', JSON.stringify(challenges));
  }, [challenges]);

  useEffect(() => {
    localStorage.setItem('dux_achievements', JSON.stringify(achievements));
  }, [achievements]);

  useEffect(() => {
    localStorage.setItem('dux_map_stages', JSON.stringify(mapStages));
  }, [mapStages]);

  useEffect(() => {
    localStorage.setItem('dux_rewards', JSON.stringify(rewards));
  }, [rewards]);

  useEffect(() => {
    localStorage.setItem('dux_posts', JSON.stringify(posts));
  }, [posts]);

  useEffect(() => {
    localStorage.setItem('dux_ideas', JSON.stringify(ideas));
  }, [ideas]);

  useEffect(() => {
    localStorage.setItem('dux_stories', JSON.stringify(stories));
  }, [stories]);

  useEffect(() => {
    localStorage.setItem('dux_events', JSON.stringify(events));
  }, [events]);

  useEffect(() => {
    localStorage.setItem('dux_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('dux_notifications', JSON.stringify(notifications));
  }, [notifications]);

  // Toast Helper
  const showToast = (toast: Omit<ToastMessage, 'id'>) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { ...toast, id }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Auth operations
  const login = async (email: string, pass: string): Promise<boolean> => {
    if (!email || !pass) return false;
    
    // If Supabase configured, attempt remote auth
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password: pass });
        if (error) {
          // Fall back gracefully to local login for demo if credentials mismatch
          console.warn('Supabase auth fallback:', error.message);
        }
      } catch (err) {
        console.warn('Supabase login error:', err);
      }
    }

    // Default logged-in profile
    const existing = DEFAULT_USER;
    const updated = {
      ...existing,
      email,
      name: email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
    };
    setUser(updated);
    showToast({
      type: 'success',
      title: 'Welcome back to DUX',
      message: `Signed in as ${updated.name}`
    });
    return true;
  };

  const signup = async (name: string, username: string, email: string, pass: string): Promise<boolean> => {
    if (!name || !username || !email || !pass) return false;

    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.auth.signUp({
          email,
          password: pass,
          options: {
            data: { full_name: name, username }
          }
        });
      } catch (err) {
        console.warn('Supabase signup fallback:', err);
      }
    }

    const newUser: UserProfile = {
      id: `usr_${Date.now()}`,
      name,
      username: username.replace('@', '').toLowerCase(),
      email,
      bio: 'New explorer finding my direction on DUX.',
      avatarUrl: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(name)}&backgroundColor=111111&textColor=ffd400`,
      onboardingCompleted: false,
      streak: 1,
      points: 100, // starting welcome points
      challengesCompletedCount: 0,
      achievementsCount: 1,
      isAdmin: false
    };

    setUser(newUser);
    showToast({
      type: 'reward',
      title: 'Account Created (+100 PTS)',
      message: 'Welcome to DUX! Let’s discover what drives you.'
    });
    return true;
  };

  const logout = () => {
    if (isSupabaseConfigured && supabase) {
      supabase.auth.signOut().catch(() => {});
    }
    setUser(null);
    showToast({
      type: 'info',
      title: 'Signed Out',
      message: 'Your progress is securely preserved.'
    });
  };

  const updateProfile = (updates: Partial<UserProfile>) => {
    if (!user) return;
    setUser((prev) => (prev ? { ...prev, ...updates } : null));
    showToast({
      type: 'success',
      title: 'Profile Updated',
      message: 'Changes have been saved successfully.'
    });
  };

  const completeOnboarding = (data: { intentions: string[]; archetype: string; focusAreas: string[] }) => {
    if (!user) return;
    const updatedUser: UserProfile = {
      ...user,
      onboardingCompleted: true,
      onboardingData: data,
      points: user.points + 50
    };
    setUser(updatedUser);

    // Add notification
    addNotification({
      title: 'Onboarding Completed',
      message: 'You have taken your first step into DUX. Explore your dashboard now!',
      type: 'system',
      link: '/dashboard'
    });

    showToast({
      type: 'reward',
      title: 'Onboarding Complete (+50 PTS)',
      message: 'Your personal compass is calibrated.'
    });
  };

  const addNotification = (item: Omit<NotificationItem, 'id' | 'time' | 'read'>) => {
    const newNotif: NotificationItem = {
      ...item,
      id: `notif_${Date.now()}`,
      time: 'Just now',
      read: false
    };
    setNotifications((prev) => [newNotif, ...prev]);
  };

  const unlockAchievement = (achievementId: string) => {
    setAchievements((prev) =>
      prev.map((ach) => {
        if (ach.id === achievementId && !ach.unlocked) {
          const unlockedAch = { ...ach, unlocked: true, unlockedAt: new Date().toISOString().split('T')[0] };
          
          // Award points
          setUser((u) => u ? { ...u, points: u.points + ach.points, achievementsCount: u.achievementsCount + 1 } : null);

          // Add notification
          addNotification({
            title: `Achievement Unlocked: ${ach.title}`,
            message: `${ach.description} (+${ach.points} PTS)`,
            type: 'achievement',
            link: '/achievements'
          });

          showToast({
            type: 'reward',
            title: `BADGE UNLOCKED: ${ach.title}`,
            message: `+${ach.points} DUX Points added to your balance!`
          });

          try {
            confetti({
              particleCount: 80,
              spread: 60,
              origin: { y: 0.7 }
            });
          } catch (e) { /* ignore */ }

          return unlockedAch;
        }
        return ach;
      })
    );
  };

  // Connected Action: Direction Quiz Result
  const saveDirectionResult = (archetype: DirectionType) => {
    const details = DIRECTION_ARCHETYPES[archetype];
    if (!details) return;

    setUser((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        direction: archetype,
        directionVirtue: details.virtue,
        directionMantra: details.quote,
        directionDiscoveredAt: new Date().toISOString().split('T')[0],
        points: prev.points + 150
      };
    });

    // Update DUX Map: DISCOVER stage completed
    setMapStages((prev) =>
      prev.map((stage) => {
        if (stage.id === 'discover') {
          return { ...stage, status: 'completed', progress: 100 };
        }
        if (stage.id === 'create' && stage.status === 'locked') {
          return { ...stage, status: 'in-progress' };
        }
        return stage;
      })
    );

    // Unlock achievement
    unlockAchievement('found-my-direction');

    addNotification({
      title: `Direction Discovered: ${archetype}`,
      message: `${details.quote} Your dashboard and profile have been updated.`,
      type: 'achievement',
      link: '/direction'
    });

    showToast({
      type: 'reward',
      title: `${archetype} Discovered! (+150 PTS)`,
      message: 'Your personal compass is calibrated. Dashboard updated.'
    });

    try {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 }
      });
    } catch (e) { /* ignore */ }
  };

  // Connected Action: Daily DUX
  const saveDailyAnswer = (question: string, answer: string, isPrivate: boolean) => {
    const newAnswer: DailyAnswer = {
      id: `ans_${Date.now()}`,
      date: 'Today',
      question,
      answer,
      isPrivate,
      createdAt: new Date().toISOString()
    };

    setDailyAnswers((prev) => [newAnswer, ...prev]);

    // Points & Streak update
    setUser((prev) => {
      if (!prev) return null;
      const newStreak = prev.streak + 1;
      return {
        ...prev,
        streak: newStreak,
        points: prev.points + 20
      };
    });

    // DUX map update: GROW stage progress
    setMapStages((prev) =>
      prev.map((stage) => {
        if (stage.id === 'grow') {
          return { ...stage, progress: Math.min(100, stage.progress + 20) };
        }
        return stage;
      })
    );

    // If answer is shared publicly, optionally post to community
    if (!isPrivate) {
      createPost(`[Daily DUX Reflection] "${question}" — ${answer}`, 'INSPIRATION');
    }

    showToast({
      type: 'reward',
      title: 'Daily Reflection Saved (+20 PTS)',
      message: 'Streak maintained! One step forward today.'
    });
  };

  // Connected Action: Challenge flow
  const startChallenge = (challengeId: string) => {
    setChallenges((prev) =>
      prev.map((ch) => (ch.id === challengeId ? { ...ch, enrolled: true } : ch))
    );
    showToast({
      type: 'info',
      title: 'Challenge Started',
      message: 'Day 1 is now active. Time to take action!'
    });
  };

  const completeChallengeDay = (challengeId: string, dayNumber: number) => {
    setChallenges((prev) =>
      prev.map((ch) => {
        if (ch.id === challengeId) {
          const updatedDays = ch.days.map((d) =>
            d.day === dayNumber ? { ...d, completed: true, completedAt: new Date().toISOString() } : d
          );
          const nextDay = Math.min(ch.durationDays, dayNumber + 1);
          const allCompleted = updatedDays.every((d) => d.completed);

          return {
            ...ch,
            currentDay: nextDay,
            days: updatedDays,
            completed: allCompleted
          };
        }
        return ch;
      })
    );

    // Connected state adjustments
    setUser((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        points: prev.points + 25
      };
    });

    // Update Map progress
    setMapStages((prev) =>
      prev.map((stage) => {
        if (stage.id === 'create') {
          return { ...stage, progress: Math.min(100, stage.progress + 15) };
        }
        return stage;
      })
    );

    showToast({
      type: 'reward',
      title: `Day ${dayNumber} Complete! (+25 PTS)`,
      message: `Moving forward! Keep up the momentum.`
    });
  };

  const claimChallengeAchievement = (challengeId: string) => {
    const ch = challenges.find((c) => c.id === challengeId);
    if (!ch) return;

    setUser((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        points: prev.points + ch.rewardPoints,
        challengesCompletedCount: prev.challengesCompletedCount + 1
      };
    });

    unlockAchievement(ch.badgeId);

    // Complete Map "CREATE" stage
    setMapStages((prev) =>
      prev.map((stage) => {
        if (stage.id === 'create') {
          return { ...stage, progress: 100, status: 'completed' };
        }
        if (stage.id === 'connect') {
          return { ...stage, progress: Math.max(30, stage.progress) };
        }
        return stage;
      })
    );

    showToast({
      type: 'reward',
      title: `CHALLENGE COMPLETED! (+${ch.rewardPoints} PTS)`,
      message: 'You took 7 steps forward. Direction becomes habit.'
    });

    try {
      confetti({
        particleCount: 150,
        spread: 90,
        origin: { y: 0.5 }
      });
    } catch (e) { /* ignore */ }
  };

  // Connected Action: Redeem Reward
  const redeemReward = (rewardId: string): boolean => {
    const target = rewards.find((r) => r.id === rewardId);
    if (!target || !user) return false;

    if (user.points < target.pointsCost) {
      showToast({
        type: 'info',
        title: 'Insufficient DUX Points',
        message: `You need ${target.pointsCost - user.points} more points to redeem this.`
      });
      return false;
    }

    // Deduct points
    setUser((prev) => (prev ? { ...prev, points: prev.points - target.pointsCost } : null));

    // Mark reward unlocked
    setRewards((prev) =>
      prev.map((r) => (r.id === rewardId ? { ...r, unlocked: true } : r))
    );

    addNotification({
      title: `Reward Redeemed: ${target.title}`,
      message: `Use code ${target.rewardCode || 'CLAIMED'} to access your reward.`,
      type: 'achievement',
      link: '/rewards'
    });

    showToast({
      type: 'success',
      title: 'Reward Redeemed!',
      message: `Access granted for ${target.title}`
    });

    return true;
  };

  // Community Actions
  const createPost = (content: string, category: CommunityPost['category']) => {
    if (!content.trim()) return;
    const newPost: CommunityPost = {
      id: `post_${Date.now()}`,
      author: {
        name: user?.name || 'Anonymous Explorer',
        username: user?.username || 'anonymous',
        avatar: user?.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        direction: user?.direction || 'THE BUILDER'
      },
      category,
      content,
      createdAt: 'Just now',
      likesCount: 1,
      isLiked: true,
      isSaved: false,
      comments: []
    };

    setPosts((prev) => [newPost, ...prev]);

    // Give user points
    setUser((prev) => (prev ? { ...prev, points: prev.points + 15 } : null));

    showToast({
      type: 'reward',
      title: 'Post Published (+15 PTS)',
      message: 'Your thought is live in the DUX community.'
    });
  };

  const toggleLikePost = (postId: string) => {
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          const isLiked = !p.isLiked;
          return {
            ...p,
            isLiked,
            likesCount: isLiked ? p.likesCount + 1 : Math.max(0, p.likesCount - 1)
          };
        }
        return p;
      })
    );
  };

  const toggleSavePost = (postId: string) => {
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          const isSaved = !p.isSaved;
          showToast({
            type: 'info',
            title: isSaved ? 'Post Saved' : 'Removed from Saved',
            message: isSaved ? 'View anytime from your profile.' : undefined
          });
          return { ...p, isSaved };
        }
        return p;
      })
    );
  };

  const addCommentToPost = (postId: string, commentText: string) => {
    if (!commentText.trim()) return;
    const newComment = {
      id: `c_${Date.now()}`,
      author: {
        name: user?.name || 'Anonymous Explorer',
        username: user?.username || 'anonymous',
        avatar: user?.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        direction: user?.direction
      },
      content: commentText,
      createdAt: 'Just now'
    };

    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          return { ...p, comments: [...p.comments, newComment] };
        }
        return p;
      })
    );

    // Award points
    setUser((prev) => (prev ? { ...prev, points: prev.points + 10 } : null));

    showToast({
      type: 'reward',
      title: 'Comment Added (+10 PTS)',
      message: 'Thanks for contributing to the conversation.'
    });
  };

  // DUX Lab Actions
  const submitIdea = (title: string, description: string, category: LabIdea['category'], tags: string[]) => {
    const newIdea: LabIdea = {
      id: `idea_${Date.now()}`,
      title,
      description,
      category,
      tags: tags.length ? tags : ['Innovation'],
      author: {
        name: user?.name || 'Explorer',
        username: user?.username || 'explorer',
        avatar: user?.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
      },
      upvotesCount: 1,
      isUpvoted: true,
      createdAt: 'Just now',
      status: 'In Discussion'
    };

    setIdeas((prev) => [newIdea, ...prev]);

    // Connected: Award 50 points & check IDEA MACHINE achievement
    setUser((prev) => (prev ? { ...prev, points: prev.points + 50 } : null));
    unlockAchievement('idea-machine');

    showToast({
      type: 'reward',
      title: 'Idea Submitted (+50 PTS)',
      message: 'Your experiment is posted in the DUX Lab.'
    });
  };

  const toggleUpvoteIdea = (ideaId: string) => {
    setIdeas((prev) =>
      prev.map((idea) => {
        if (idea.id === ideaId) {
          const isUpvoted = !idea.isUpvoted;
          return {
            ...idea,
            isUpvoted,
            upvotesCount: isUpvoted ? idea.upvotesCount + 1 : Math.max(0, idea.upvotesCount - 1)
          };
        }
        return idea;
      })
    );
  };

  // Stories
  const toggleLikeStory = (storyId: string) => {
    setStories((prev) =>
      prev.map((s) => {
        if (s.id === storyId) {
          const isLiked = !s.isLiked;
          return {
            ...s,
            isLiked,
            likesCount: isLiked ? s.likesCount + 1 : Math.max(0, s.likesCount - 1)
          };
        }
        return s;
      })
    );
  };

  const toggleSaveStory = (storyId: string) => {
    setStories((prev) =>
      prev.map((s) => {
        if (s.id === storyId) {
          const isSaved = !s.isSaved;
          showToast({
            type: 'info',
            title: isSaved ? 'Story Bookmarked' : 'Bookmark Removed',
            message: isSaved ? 'Saved to your profile library.' : undefined
          });
          return { ...s, isSaved };
        }
        return s;
      })
    );
  };

  // Events & RSVP
  const toggleRsvpEvent = (eventId: string) => {
    let wasRsvpd = false;
    setEvents((prev) =>
      prev.map((e) => {
        if (e.id === eventId) {
          wasRsvpd = e.isRsvpd;
          const nextRsvp = !e.isRsvpd;
          return {
            ...e,
            isRsvpd: nextRsvp,
            attendeesCount: nextRsvp ? e.attendeesCount + 1 : Math.max(0, e.attendeesCount - 1)
          };
        }
        return e;
      })
    );

    if (!wasRsvpd) {
      setUser((prev) => (prev ? { ...prev, points: prev.points + 100 } : null));
      unlockAchievement('connector');

      addNotification({
        title: "You're Going to the Event!",
        message: 'Your spot is saved. We sent reminders to your dashboard.',
        type: 'event',
        link: `/events/${eventId}`
      });

      showToast({
        type: 'reward',
        title: "RSVP Confirmed (+100 PTS)",
        message: "You're officially on the guestlist!"
      });
    } else {
      showToast({
        type: 'info',
        title: 'RSVP Cancelled',
        message: 'Your reservation was updated.'
      });
    }
  };

  // Store & Cart
  const addToCart = (product: StoreProduct, quantity = 1, selectedSize = 'M') => {
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.product.id === product.id && item.selectedSize === selectedSize
      );
      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex].quantity += quantity;
        return next;
      }
      return [...prev, { product, quantity, selectedSize }];
    });

    setIsCartOpen(true);

    showToast({
      type: 'success',
      title: 'Added to Cart',
      message: `${quantity}x ${product.name} (${selectedSize})`
    });
  };

  const removeFromCart = (productId: string, size?: string) => {
    setCart((prev) =>
      prev.filter((item) => !(item.product.id === productId && (!size || item.selectedSize === size)))
    );
  };

  const updateCartQuantity = (productId: string, quantity: number, size?: string) => {
    if (quantity <= 0) {
      removeFromCart(productId, size);
      return;
    }
    setCart((prev) =>
      prev.map((item) => {
        if (item.product.id === productId && (!size || item.selectedSize === size)) {
          return { ...item, quantity };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  // Notifications
  const markNotificationAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllNotificationsAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    showToast({
      type: 'info',
      title: 'Notifications Cleared',
      message: 'All notifications marked as read.'
    });
  };

  // Admin stats & helpers
  const adminStats = {
    totalUsers: 1420,
    activeUsers: 890,
    totalPosts: posts.length + 180,
    totalStories: stories.length,
    activeChallenges: challenges.length,
    eventsCount: events.length
  };

  const createAdminChallenge = (newChallenge: Omit<Challenge, 'id' | 'enrolled' | 'currentDay' | 'completed' | 'days'>, daysCount: number) => {
    const days: Challenge['days'] = Array.from({ length: daysCount }).map((_, i) => ({
      day: i + 1,
      title: `DAY ${i + 1} FOCUS`,
      task: `Daily micro-mission for Day ${i + 1}.`,
      completed: false
    }));

    const fullChallenge: Challenge = {
      ...newChallenge,
      id: `ch_${Date.now()}`,
      enrolled: false,
      currentDay: 1,
      completed: false,
      days
    };

    setChallenges((prev) => [...prev, fullChallenge]);
    showToast({
      type: 'success',
      title: 'Challenge Created',
      message: `"${fullChallenge.title}" is now published.`
    });
  };

  const deleteAdminChallenge = (id: string) => {
    setChallenges((prev) => prev.filter((c) => c.id !== id));
    showToast({
      type: 'info',
      title: 'Challenge Deleted',
      message: 'Removed from active curriculum.'
    });
  };

  const publishAdminStory = (newStory: Omit<Story, 'id' | 'publishedAt' | 'likesCount' | 'isLiked' | 'isSaved'>) => {
    const story: Story = {
      ...newStory,
      id: `story_${Date.now()}`,
      publishedAt: 'Just now',
      likesCount: 0,
      isLiked: false,
      isSaved: false
    };

    setStories((prev) => [story, ...prev]);
    showToast({
      type: 'success',
      title: 'Story Published',
      message: `"${story.title}" is live on DUX Stories.`
    });
  };

  const deleteAdminPost = (postId: string) => {
    setPosts((prev) => prev.filter((p) => p.id !== postId));
    showToast({
      type: 'info',
      title: 'Post Removed',
      message: 'Admin moderated post.'
    });
  };

  return (
    <AppContext.Provider
      value={{
        user,
        isAuthenticated: Boolean(user),
        login,
        signup,
        logout,
        updateProfile,
        completeOnboarding,
        saveDirectionResult,
        dailyAnswers,
        saveDailyAnswer,
        challenges,
        startChallenge,
        completeChallengeDay,
        claimChallengeAchievement,
        mapStages,
        achievements,
        unlockAchievement,
        rewards,
        redeemReward,
        posts,
        createPost,
        toggleLikePost,
        toggleSavePost,
        addCommentToPost,
        ideas,
        submitIdea,
        toggleUpvoteIdea,
        stories,
        toggleLikeStory,
        toggleSaveStory,
        events,
        toggleRsvpEvent,
        products,
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        notifications,
        markNotificationAsRead,
        markAllNotificationsAsRead,
        searchQuery,
        setSearchQuery,
        toasts,
        showToast,
        removeToast,
        adminStats,
        createAdminChallenge,
        deleteAdminChallenge,
        publishAdminStory,
        deleteAdminPost
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
