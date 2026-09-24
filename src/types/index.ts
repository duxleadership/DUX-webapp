export type DirectionType = 'THE BUILDER' | 'THE CREATOR' | 'THE CONNECTOR' | 'THE EVOLVER';

export interface UserProfile {
  id: string;
  name: string;
  username: string;
  email: string;
  bio: string;
  avatarUrl: string;
  direction?: DirectionType;
  directionVirtue?: string;
  directionMantra?: string;
  directionDiscoveredAt?: string;
  onboardingCompleted: boolean;
  onboardingData?: {
    intentions: string[];
    archetype: string;
    focusAreas: string[];
  };
  streak: number;
  points: number;
  challengesCompletedCount: number;
  achievementsCount: number;
  isAdmin?: boolean;
}

export interface QuizQuestion {
  id: number;
  question: string;
  subtitle: string;
  options: {
    label: string;
    description: string;
    archetype: DirectionType;
  }[];
}

export interface DirectionArchetypeDetails {
  type: DirectionType;
  virtue: string;
  quote: string;
  description: string;
  strengths: string[];
  growthArea: string;
  famousExamples: string[];
  color: string;
}

export interface DailyAnswer {
  id: string;
  date: string;
  question: string;
  answer: string;
  isPrivate: boolean;
  createdAt: string;
}

export interface ChallengeDay {
  day: number;
  title: string;
  task: string;
  reflectionPrompt?: string;
  completed: boolean;
  completedAt?: string;
}

export interface Challenge {
  id: string;
  title: string;
  category: 'Personal Growth' | 'Confidence' | 'Creativity' | 'Leadership' | 'Career';
  durationDays: number;
  difficulty: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
  shortDescription: string;
  description: string;
  rewardPoints: number;
  badgeId: string;
  enrolled: boolean;
  currentDay: number;
  days: ChallengeDay[];
  completed: boolean;
  completedAt?: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  unlocked: boolean;
  unlockedAt?: string;
  iconName: string;
  category: 'Direction' | 'Habits' | 'Community' | 'Creation';
  points: number;
}

export interface Story {
  id: string;
  title: string;
  author: {
    name: string;
    username: string;
    avatar: string;
    direction: DirectionType;
  };
  category: 'STARTING' | 'FAILING' | 'LEARNING' | 'LEADING' | 'GROWING';
  readTime: string;
  shortDescription: string;
  content: string;
  publishedAt: string;
  likesCount: number;
  isLiked?: boolean;
  isSaved?: boolean;
}

export interface PostComment {
  id: string;
  author: {
    name: string;
    username: string;
    avatar: string;
    direction?: DirectionType;
  };
  content: string;
  createdAt: string;
}

export interface CommunityPost {
  id: string;
  author: {
    name: string;
    username: string;
    avatar: string;
    direction?: DirectionType;
  };
  category: 'IDEAS' | 'QUESTIONS' | 'PROJECTS' | 'LEARNING' | 'INSPIRATION';
  content: string;
  createdAt: string;
  likesCount: number;
  isLiked?: boolean;
  isSaved?: boolean;
  comments: PostComment[];
}

export interface LabIdea {
  id: string;
  title: string;
  description: string;
  category: 'Ideas' | 'Projects' | 'Experiments' | 'Creative Work' | 'Startup Ideas';
  tags: string[];
  author: {
    name: string;
    username: string;
    avatar: string;
  };
  upvotesCount: number;
  isUpvoted?: boolean;
  createdAt: string;
  status: 'In Discussion' | 'Prototyping' | 'Launched';
}

export interface EventItem {
  id: string;
  title: string;
  category: string;
  date: string;
  time: string;
  location: string;
  isVirtual: boolean;
  description: string;
  host: string;
  capacity: number;
  attendeesCount: number;
  isRsvpd: boolean;
}

export interface StoreProduct {
  id: string;
  name: string;
  category: 'APPAREL' | 'ACCESSORIES' | 'STATIONERY' | 'LIFESTYLE' | 'LIMITED DROPS';
  price: number;
  image: string;
  description: string;
  details: string[];
  stock: number;
  inStock: boolean;
}

export interface CartItem {
  product: StoreProduct;
  quantity: number;
  selectedSize?: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'challenge' | 'achievement' | 'comment' | 'event' | 'streak' | 'system';
  link?: string;
}

export interface RewardItem {
  id: string;
  title: string;
  type: 'Digital Badge' | 'Wallpaper Pack' | 'Merchandise Discount' | 'Limited Digital';
  pointsCost: number;
  description: string;
  unlocked: boolean;
  rewardCode?: string;
}

export interface MapStage {
  id: string;
  number: number;
  name: string;
  title: string;
  description: string;
  status: 'completed' | 'in-progress' | 'locked';
  progress: number;
  targetRoute: string;
  actionLabel: string;
  icon: string;
  milestones: string[];
}
