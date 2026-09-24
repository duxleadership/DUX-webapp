import {
  QuizQuestion,
  DirectionArchetypeDetails,
  Challenge,
  Achievement,
  Story,
  CommunityPost,
  LabIdea,
  EventItem,
  StoreProduct,
  RewardItem,
  NotificationItem,
  MapStage
} from '../types';

export const DIRECTION_ARCHETYPES: Record<string, DirectionArchetypeDetails> = {
  'THE BUILDER': {
    type: 'THE BUILDER',
    virtue: 'DETERMINATION',
    quote: 'You turn ideas into action.',
    description: 'You are energized by tangible progress. Where others analyze endlessly, you sketch prototypes, write the first line of code, and lay brick by brick. Your superpower is execution stamina and pragmatic focus.',
    strengths: ['Unshakable work ethic', 'Translating vision into roadmap', 'Relentless iteration', 'Operational clarity'],
    growthArea: 'Remember to pause and question if you are building the right thing, not just building things quickly.',
    famousExamples: ['Steve Wozniak', 'Katharine Graham', 'Yvon Chouinard'],
    color: '#FFD400'
  },
  'THE CREATOR': {
    type: 'THE CREATOR',
    virtue: 'EXCELLENCE',
    quote: 'You turn possibilities into ideas.',
    description: 'You see what could exist before anyone else glimpses it. You thrive at the intersection of imagination, beauty, and originality. Your superpower is synthesis—combining disparate disciplines into something unexpectedly magnetic.',
    strengths: ['Visionary thinking', 'Refined aesthetic instinct', 'Deep curiosity', 'Narrative framing'],
    growthArea: 'Commit to finishing before opening new doors. Ideas only change reality when brought to fruition.',
    famousExamples: ['Maya Angelou', 'Jony Ive', 'Hayao Miyazaki'],
    color: '#FFD400'
  },
  'THE CONNECTOR': {
    type: 'THE CONNECTOR',
    virtue: 'UNITY',
    quote: 'You turn people into a team.',
    description: 'You understand that every monumental achievement is fundamentally social. You notice people’s unspoken potential, bridge cultural divides, and build cultures where diverse minds do their most authentic work.',
    strengths: ['High emotional intelligence', 'Natural coalition builder', 'Empathetic listening', 'Culture architect'],
    growthArea: 'Protect your own energy and boundaries. You cannot pour into every cup while letting yours run dry.',
    famousExamples: ['Fred Rogers', 'Jacinda Ardern', 'Nelson Mandela'],
    color: '#FFD400'
  },
  'THE EVOLVER': {
    type: 'THE EVOLVER',
    virtue: 'EXCELLENCE',
    quote: 'You turn experience into progress.',
    description: 'You see life as a living laboratory. You do not fear failure because failure is just high-density feedback. You systematically deconstruct mistakes, optimize workflows, and adapt faster than the environment changes.',
    strengths: ['Radical adaptability', 'Systemic thinking', 'Resilience under ambiguity', 'Unfiltered self-awareness'],
    growthArea: 'Embrace stability when things are working well; not every system requires immediate redesign.',
    famousExamples: ['Marie Curie', 'Ray Dalio', 'Marcus Aurelius'],
    color: '#FFD400'
  }
};

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: "When you start your morning, what feeling pulls you forward?",
    subtitle: "Select the thought pattern that feels closest to your genuine instinct.",
    options: [
      {
        label: "The excitement of shipping something concrete today",
        description: "Checking off a critical milestone and seeing real tangible output.",
        archetype: 'THE BUILDER'
      },
      {
        label: "The urge to explore an intriguing concept or fresh idea",
        description: "Drafting, brainstorming, or sketching something that didn't exist yesterday.",
        archetype: 'THE CREATOR'
      },
      {
        label: "The opportunity to connect, support, or collaborate with people",
        description: "Bringing folks together to solve an obstacle or share mutual energy.",
        archetype: 'THE CONNECTOR'
      },
      {
        label: "The challenge of testing a new method or refining a system",
        description: "Optimizing how you think, perform, or understand a complex topic.",
        archetype: 'THE EVOLVER'
      }
    ]
  },
  {
    id: 2,
    question: "You run into a frustrating roadblock in a project. What is your immediate reaction?",
    subtitle: "Your instinctive default response under pressure.",
    options: [
      {
        label: "Roll up my sleeves and push through mechanically",
        description: "Try alternative direct actions until the wall yields.",
        archetype: 'THE BUILDER'
      },
      {
        label: "Step away and reframe the problem from an unusual angle",
        description: "Re-envision the entire context—is this roadblock actually an opportunity?",
        archetype: 'THE CREATOR'
      },
      {
        label: "Reach out to someone with experience or bounce thoughts with a peer",
        description: "Gather perspectives and assemble the right collective minds.",
        archetype: 'THE CONNECTOR'
      },
      {
        label: "Analyze what caused the breakdown and calibrate the process",
        description: "Diagnose root causes so this friction never happens again.",
        archetype: 'THE EVOLVER'
      }
    ]
  },
  {
    id: 3,
    question: "What compliment feels most deeply meaningful to you?",
    subtitle: "What you take the quietest pride in when recognized.",
    options: [
      {
        label: "\"You make things happen when others just talk.\"",
        description: "Recognition for execution, speed, and tangible results.",
        archetype: 'THE BUILDER'
      },
      {
        label: "\"I've never seen anyone think about this quite like you.\"",
        description: "Recognition for originality, aesthetic taste, and ingenuity.",
        archetype: 'THE CREATOR'
      },
      {
        label: "\"You brought this room together and made everyone feel heard.\"",
        description: "Recognition for empathy, leadership, and emotional resonance.",
        archetype: 'THE CONNECTOR'
      },
      {
        label: "\"The way you adapt and elevate yourself constantly is inspiring.\"",
        description: "Recognition for continuous mastery and conscious evolution.",
        archetype: 'THE EVOLVER'
      }
    ]
  },
  {
    id: 4,
    question: "If you were given 30 uninterrupted days with zero obligations, you would:",
    subtitle: "Your natural state of exploration.",
    options: [
      {
        label: "Build a product, tool, or physical craft from beginning to end",
        description: "Focus on bringing a prototype to full completion.",
        archetype: 'THE BUILDER'
      },
      {
        label: "Immerse in writing, composing, designing, or artistic expression",
        description: "Follow creative curiosity into uncharted aesthetic territory.",
        archetype: 'THE CREATOR'
      },
      {
        label: "Travel to meet extraordinary communities, mentors, and partners",
        description: "Converse, exchange ideas, and plant seeds for collaborative ventures.",
        archetype: 'THE CONNECTOR'
      },
      {
        label: "Run rigorous lifestyle experiments, learn a complex craft, and log data",
        description: "Level up your cognitive, physical, and mental models systematically.",
        archetype: 'THE EVOLVER'
      }
    ]
  },
  {
    id: 5,
    question: "What drains your motivation fastest?",
    subtitle: "Identify your primary friction source.",
    options: [
      {
        label: "Endless theoretical meetings where nothing actually gets decided or built",
        description: "Paralysis by analysis with zero concrete execution.",
        archetype: 'THE BUILDER'
      },
      {
        label: "Rigid constraints and cookie-cutter formulas with no room for novelty",
        description: "Being forced to reproduce monotonous, uninspired templates.",
        archetype: 'THE CREATOR'
      },
      {
        label: "Toxic competition, isolated silos, or indifferent group dynamics",
        description: "Lack of empathy, warmth, and shared collective purpose.",
        archetype: 'THE CONNECTOR'
      },
      {
        label: "Refusal to learn from blatant mistakes or stagnation without growth",
        description: "Doing things 'the way they've always been done' without curiosity.",
        archetype: 'THE EVOLVER'
      }
    ]
  },
  {
    id: 6,
    question: "How do you define your personal leadership style?",
    subtitle: "When people look to you for direction.",
    options: [
      {
        label: "Leadership by front-line action and tangible example",
        description: "Setting the pace through relentless drive and delivery.",
        archetype: 'THE BUILDER'
      },
      {
        label: "Leadership by visionary inspiration and provocative horizons",
        description: "Showing people what could be and expanding what they imagine.",
        archetype: 'THE CREATOR'
      },
      {
        label: "Leadership by listening, trust-building, and servant enablement",
        description: "Unlocking each person's unique contribution to the collective mission.",
        archetype: 'THE CONNECTOR'
      },
      {
        label: "Leadership by intellectual honesty, high standards, and feedback loops",
        description: "Fostering psychological safety paired with continuous elevation.",
        archetype: 'THE EVOLVER'
      }
    ]
  },
  {
    id: 7,
    question: "When evaluating an idea or opportunity, your primary filter is:",
    subtitle: "The ultimate metric you weigh decisions against.",
    options: [
      {
        label: "Feasibility and high-leverage execution potential",
        description: "Can we actually ship this and see immediate measurable impact?",
        archetype: 'THE BUILDER'
      },
      {
        label: "Originality and emotional or intellectual depth",
        description: "Does this disrupt conventional thinking and spark genuine wonder?",
        archetype: 'THE CREATOR'
      },
      {
        label: "Human impact and meaningful community value",
        description: "Does this bring people closer and enrich lives authentically?",
        archetype: 'THE CONNECTOR'
      },
      {
        label: "Long-term compounding capability and strategic growth",
        description: "Does this build resilient skills and scalable insight over time?",
        archetype: 'THE EVOLVER'
      }
    ]
  },
  {
    id: 8,
    question: "Complete this sentence: 'At the end of my life, I want to know that I...'",
    subtitle: "Your deepest north star.",
    options: [
      {
        label: "...left behind tangible creations that outlived my time.",
        description: "Things standing in the world that people touch, rely on, and use.",
        archetype: 'THE BUILDER'
      },
      {
        label: "...expressed my deepest truth and shifted how people see the world.",
        description: "Artifacts of imagination that illuminated human experience.",
        archetype: 'THE CREATOR'
      },
      {
        label: "...deeply loved, uplifted, and connected the people around me.",
        description: "A web of relationships grounded in warmth, safety, and empowerment.",
        archetype: 'THE CONNECTOR'
      },
      {
        label: "...continually pushed the boundary of my potential and helped others evolve.",
        description: "A continuous masterclass of curiosity, wisdom, and adaptation.",
        archetype: 'THE EVOLVER'
      }
    ]
  }
];

export const INITIAL_CHALLENGES: Challenge[] = [
  {
    id: '7-day-direction',
    title: '7 DAY DIRECTION CHALLENGE',
    category: 'Personal Growth',
    durationDays: 7,
    difficulty: 'BEGINNER',
    shortDescription: 'Discover one small direction every day.',
    description: 'A foundational one-week journey engineered to shatter inertia, uncover what truly pulls you forward, and build daily momentum through actionable mini-commitments.',
    rewardPoints: 100,
    badgeId: '7-day-streak',
    enrolled: true,
    currentDay: 1,
    completed: false,
    days: [
      {
        day: 1,
        title: 'START SMALL',
        task: 'Write down one thing you want to improve.',
        reflectionPrompt: 'What is a specific friction point or desire you have been tolerating? Be relentlessly honest.',
        completed: false
      },
      {
        day: 2,
        title: 'AUDIT YOUR ENERGY',
        task: 'List the 3 activities that gave you energy this week, and the 3 that drained you.',
        reflectionPrompt: 'Notice the difference between feeling exhausted vs feeling depleted.',
        completed: false
      },
      {
        day: 3,
        title: 'DEFINE YOUR ANCHORS',
        task: 'Write down your 3 non-negotiable core values in career and life.',
        reflectionPrompt: 'When was the last time you made a choice that directly honored one of these?',
        completed: false
      },
      {
        day: 4,
        title: 'ONE UNCOMFORTABLE ACTION',
        task: 'Take 10 minutes to tackle something you have been postponing for more than a week.',
        reflectionPrompt: 'How did the anticipation compare to the actual reality of doing it?',
        completed: false
      },
      {
        day: 5,
        title: 'CURIOUS REACHOUT',
        task: 'Send a genuine message of gratitude or curiosity to someone whose trajectory you admire.',
        reflectionPrompt: 'Connection is not networking; it is curious human alignment.',
        completed: false
      },
      {
        day: 6,
        title: 'DRAFT YOUR 90-DAY FOCUS',
        task: 'Choose ONE single priority for the upcoming quarter. Eliminate the top two distractions.',
        reflectionPrompt: 'What would happen if you became unapologetically focused on this alone?',
        completed: false
      },
      {
        day: 7,
        title: 'CELEBRATE & INTEGRATE',
        task: 'Review your 7 steps. Formulate your personal direction statement in one bold sentence.',
        reflectionPrompt: 'You do not need the entire roadmap; you just proved you can take the next step.',
        completed: false
      }
    ]
  },
  {
    id: 'creative-spark-sprint',
    title: 'CREATIVE SPARK SPRINT',
    category: 'Creativity',
    durationDays: 5,
    difficulty: 'BEGINNER',
    shortDescription: 'Unblock your creative instinct in 5 focused days.',
    description: 'Overcome self-censorship, exercise lateral thinking, and produce 5 raw creative experiments without worrying about perfection.',
    rewardPoints: 80,
    badgeId: 'idea-machine',
    enrolled: false,
    currentDay: 1,
    completed: false,
    days: [
      { day: 1, title: 'QUANTITY OVER QUALITY', task: 'Generate 15 terrible ideas for a new product, story, or project in 10 minutes.', completed: false },
      { day: 2, title: 'CROSS-POLLINATION', task: 'Combine two unrelated fields (e.g. origami + software engineering) into a concept.', completed: false },
      { day: 3, title: 'RESTRICTION AS FREEDOM', task: 'Create something using only 3 basic constraints (e.g. 50 words, or 1 tool).', completed: false },
      { day: 4, title: 'SHIP RAW', task: 'Publish or share a 60% finished thought with someone you trust.', completed: false },
      { day: 5, title: 'MUSEUM OF CURIOSITY', task: 'Compile a swipe file of 5 things in the real world that gave you goosebumps.', completed: false }
    ]
  },
  {
    id: 'confidence-catalyst',
    title: 'CONFIDENCE CATALYST',
    category: 'Confidence',
    durationDays: 5,
    difficulty: 'INTERMEDIATE',
    shortDescription: 'Build evidence-based self-trust through micro-bravery.',
    description: 'Confidence is not a personality trait; it is a muscle built through small exposures to uncertainty.',
    rewardPoints: 90,
    badgeId: 'first-step',
    enrolled: false,
    currentDay: 1,
    completed: false,
    days: [
      { day: 1, title: 'VOICE YOUR OPINION', task: 'Speak up first in a meeting, discussion, or group message.', completed: false },
      { day: 2, title: 'THE CLEAN NO', task: 'Politely decline an invite or request that misaligns with your focus.', completed: false },
      { day: 3, title: 'SEEK REJECTION', task: 'Ask for a small favor or discount where a \'no\' is likely. Experience surviving it.', completed: false },
      { day: 4, title: 'EVIDENCE LOG', task: 'List 5 hard things you previously overcame that once terrified you.', completed: false },
      { day: 5, title: 'STAND TALL', task: 'Commit to full eye contact and deliberate speech during all interactions today.', completed: false }
    ]
  },
  {
    id: 'leadership-foundations',
    title: 'LEADERSHIP FOUNDATIONS',
    category: 'Leadership',
    durationDays: 7,
    difficulty: 'ADVANCED',
    shortDescription: 'Master the art of servant alignment and team clarity.',
    description: 'Learn to lead without titles, communicate vision with crystalline clarity, and build an environment of radical safety.',
    rewardPoints: 120,
    badgeId: 'community-builder',
    enrolled: false,
    currentDay: 1,
    completed: false,
    days: [
      { day: 1, title: 'LISTEN TO LEARN', task: 'Conduct a conversation with zero advice-giving; only ask clarifying questions.', completed: false },
      { day: 2, title: 'CLARITY SPELL', task: 'Summarize a team or project goal into a 15-word mission test.', completed: false },
      { day: 3, title: 'RADICAL CANDOR', task: 'Deliver a piece of constructive feedback with direct care and high challenge.', completed: false },
      { day: 4, title: 'DELEGATE OWNERSHIP', task: 'Hand over an outcome completely, focusing on the result, not the micromanaged path.', completed: false },
      { day: 5, title: 'PUBLIC CREDIT', task: 'Publicly champion someone else’s behind-the-scenes contribution.', completed: false },
      { day: 6, title: 'SCENARIO WAR-GAMING', task: 'Map out the best and worst case for an upcoming pivotal decision.', completed: false },
      { day: 7, title: 'CULTURE MANIFESTO', task: 'Write down the 3 behaviors you will actively protect and celebrate in your team.', completed: false }
    ]
  }
];

export const INITIAL_ACHIEVEMENTS: Achievement[] = [
  {
    id: 'first-step',
    title: 'FIRST STEP',
    description: 'Completed your first DUX activity.',
    unlocked: true,
    unlockedAt: '2026-09-20',
    iconName: 'Footprints',
    category: 'Direction',
    points: 50
  },
  {
    id: 'found-my-direction',
    title: 'FOUND MY DIRECTION',
    description: 'Discovered your core DUX archetype through the direction quiz.',
    unlocked: true,
    unlockedAt: '2026-09-21',
    iconName: 'Compass',
    category: 'Direction',
    points: 100
  },
  {
    id: 'idea-machine',
    title: 'IDEA MACHINE',
    description: 'Share your first idea in the DUX Lab.',
    unlocked: false,
    iconName: 'Lightbulb',
    category: 'Creation',
    points: 75
  },
  {
    id: 'connector',
    title: 'CONNECTOR',
    description: 'Engage with 5 community posts or join a live DUX event.',
    unlocked: false,
    iconName: 'Users',
    category: 'Community',
    points: 80
  },
  {
    id: 'evolver',
    title: 'EVOLVER',
    description: 'Reflect in the Daily DUX for 5 consecutive days.',
    unlocked: false,
    iconName: 'TrendingUp',
    category: 'Habits',
    points: 90
  },
  {
    id: 'dux-explorer',
    title: 'DUX EXPLORER',
    description: 'Visit every milestone on your DUX journey map.',
    unlocked: false,
    iconName: 'MapPin',
    category: 'Direction',
    points: 100
  },
  {
    id: '7-day-streak',
    title: '7 DAY STREAK',
    description: 'Complete all 7 days of the foundational direction challenge.',
    unlocked: false,
    iconName: 'Flame',
    category: 'Habits',
    points: 150
  },
  {
    id: 'community-builder',
    title: 'COMMUNITY BUILDER',
    description: 'Create an insightful community discussion that sparks 10+ replies.',
    unlocked: false,
    iconName: 'Sparkles',
    category: 'Community',
    points: 120
  }
];

export const DUX_MAP_STAGES: MapStage[] = [
  {
    id: 'start',
    number: 1,
    name: 'START',
    title: 'The Baseline Call',
    description: 'Acknowledging where you stand right now with zero judgment. Stepping out of inertia.',
    status: 'completed',
    progress: 100,
    targetRoute: '/direction',
    actionLabel: 'Explore Baseline',
    icon: 'Flag',
    milestones: ['Create account', 'Complete onboarding', 'First step recorded']
  },
  {
    id: 'discover',
    number: 2,
    name: 'DISCOVER',
    title: 'The Direction Quiz',
    description: 'Uncovering your intrinsic archetype—Builder, Creator, Connector, or Evolver.',
    status: 'completed',
    progress: 100,
    targetRoute: '/direction',
    actionLabel: 'Retake / Review Quiz',
    icon: 'Compass',
    milestones: ['8-question compass', 'Discover archetype', 'Embrace core virtue']
  },
  {
    id: 'create',
    number: 3,
    name: 'CREATE',
    title: 'Momentum & Action',
    description: 'Turning internal clarity into tangible proof through focused challenges and laboratory ideas.',
    status: 'in-progress',
    progress: 40,
    targetRoute: '/challenges',
    actionLabel: 'Continue Challenges',
    icon: 'Hammer',
    milestones: ['Start 7-Day Challenge', 'Draft first lab experiment', 'Ship tangible output']
  },
  {
    id: 'connect',
    number: 4,
    name: 'CONNECT',
    title: 'Collective Elevation',
    description: 'Aligning with peers, sharing raw learnings, exchanging feedback, and attending live meetups.',
    status: 'in-progress',
    progress: 20,
    targetRoute: '/community',
    actionLabel: 'Visit Community',
    icon: 'Share2',
    milestones: ['Comment on discussions', 'Submit an event RSVP', 'Exchange wisdom']
  },
  {
    id: 'grow',
    number: 5,
    name: 'GROW',
    title: 'Daily Compounding',
    description: 'Solidifying self-trust through reflective Daily DUX habits and compounding rewards.',
    status: 'in-progress',
    progress: 10,
    targetRoute: '/daily',
    actionLabel: 'Answer Daily Question',
    icon: 'TrendingUp',
    milestones: ['5-day streak', 'Unlock reward tiers', 'Deepen personal focus']
  },
  {
    id: 'direction',
    number: 6,
    name: 'DIRECTION',
    title: 'Living On Purpose',
    description: 'Where direction ceases to be a theory and becomes how you move through life and work.',
    status: 'locked',
    progress: 0,
    targetRoute: '/profile',
    actionLabel: 'View Master Map',
    icon: 'Award',
    milestones: ['All 5 core badges unlocked', 'Complete roadmap blueprint', 'Mentor newcomer']
  }
];

export const INITIAL_STORIES: Story[] = [
  {
    id: 'leaving-safe-harbor',
    title: 'Leaving Safe Harbor: Why I Quit Corporate Law at 28 to Build Physical Furniture',
    author: {
      name: 'Marcus Vance',
      username: 'marcus_vance',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      direction: 'THE BUILDER'
    },
    category: 'STARTING',
    readTime: '6 min read',
    shortDescription: 'I had the prestige, the salary, and the quiet panic of building someone else\'s empire. Here is how I tested my first piece of timber.',
    content: `For four years, my world was measured in six-minute billing increments. On paper, it was the definition of success: prestigious corner desk in Canary Wharf, bespoke suits, and the reassuring nodding of relatives who thought I had made it.

Inside, I felt like a ghost haunting my own schedule.

The pivot didn't happen in a flash of lightning. It happened on a dreary Tuesday when I spent nine hours redlining indemnification clauses for a petrochemical conglomerate. I walked back to my flat and saw a wooden cutting board my grandfather had hand-carved in 1974. It was still solid. It still smelled like linseed oil. It had outlived him.

None of my emails would outlive next quarter.

I didn't quit the next morning—that would be romantic foolishness. Instead, I enrolled in night woodshop classes twice a week. I traded sleep for sawdust. For eight months, my hands were raw, and my heart was awake.

DUX taught me this: You don't need to burn the boat to start swimming. You just need to build a raft in the hours the world isn't watching.`,
    publishedAt: '2 days ago',
    likesCount: 142,
    isLiked: false,
    isSaved: false
  },
  {
    id: 'the-art-of-failing-well',
    title: 'Our Seed Round Evaporated in 48 Hours. Here is What We Did on Day 3.',
    author: {
      name: 'Elena Rostova',
      username: 'elena_evolve',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
      direction: 'THE EVOLVER'
    },
    category: 'FAILING',
    readTime: '8 min read',
    shortDescription: 'The lead investor walked away, payroll was due in two weeks, and our morale was subterranean. How feedback saved our sanity.',
    content: `When the term sheet was pulled, it felt like being punched in the solar plexus while standing in front of your six best friends who had trusted their careers to you.

The natural human instinct is blame or despair. For 24 hours, my cofounder and I cycled through both.

On Day 3, we implemented what we call the Radical Post-Mortem. We gathered the entire six-person team around a white table. No slides. No excuses. We wrote down every single warning signal we had seen in the last ninety days that we had brushed under the rug because "growth covered all sins."

We found four catastrophic blind spots in our unit economics. The investor didn't betray us; they simply noticed what we were too terrified to admit.

That failure wasn't the end of our company. It was the birth of our discipline. We restructured into a profitable agency model, bootstrapped the revised tool, and reached break-even seven months later.`,
    publishedAt: '5 days ago',
    likesCount: 289,
    isLiked: true,
    isSaved: true
  },
  {
    id: 'how-to-listen-when-leading',
    title: 'The Uncomfortable Quiet: What Running a 40-Person Remote Team Taught Me About Silence',
    author: {
      name: 'Kofi Mensah',
      username: 'kofi_connect',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      direction: 'THE CONNECTOR'
    },
    category: 'LEADING',
    readTime: '5 min read',
    shortDescription: 'Most managers fill pauses because silence makes them anxious. Here is why true leadership starts when you swallow your clever answer.',
    content: `In my early twenties, I thought being a leader meant being the person in the room with the most decisive, immediate answer. Whenever there was a lull in a conference call, I swooped in with an aphorism, a metric, or a directive.

Then an engineer named Sarah stayed behind on a call and told me: "Kofi, you ask us for our insights, but you only leave two seconds before answering yourself. You aren't asking questions; you're playing jeopardy."

It stung because it was 100% true.

I instituted the Five-Second Rule. When asking a question, I count to five in my head before speaking again. At first, it felt unbearable. But in seconds three, four, and five, the quietest people in the company started offering the most profound breakthroughs.

Leadership is not about speaking first. It is about creating a space where the truth has permission to arrive.`,
    publishedAt: '1 week ago',
    likesCount: 204,
    isLiked: false,
    isSaved: false
  },
  {
    id: 'learning-to-unlearn',
    title: 'Why I Spent a Year Unlearning Everything That Made Me a Straight-A Student',
    author: {
      name: 'Aria Chen',
      username: 'aria_creative',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
      direction: 'THE CREATOR'
    },
    category: 'LEARNING',
    readTime: '7 min read',
    shortDescription: 'School teaches you that every problem has a rubric and a single correct answer. Reality rewards the people who invent new questions.',
    content: `From kindergarten through graduate school, I was an academic marksman. Tell me the grading rubric, and I will deliver exactly 97.5%.

Then I entered the real world, and my perfectionism turned into crippling paralysis. In creative fields, there is no syllabus. There is no teacher waiting with a red pen to validate your safety.

I had to systematically train myself to make messy prototypes. To write terrible first drafts. To ship half-baked experiments and let strangers give me feedback.

You do not discover your direction by studying the map for another ten years. You discover your direction by walking into the fog and feeling the terrain beneath your boots.`,
    publishedAt: '2 weeks ago',
    likesCount: 318,
    isLiked: false,
    isSaved: false
  }
];

export const INITIAL_POSTS: CommunityPost[] = [
  {
    id: 'post-1',
    author: {
      name: 'David O\'Connor',
      username: 'doconnor',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
      direction: 'THE BUILDER'
    },
    category: 'PROJECTS',
    content: 'Just finished Day 4 of the 7-Day Direction Challenge. Tackled an email proposal I had postponed for 3 straight weeks. Took exactly 8 minutes to write. The fear in my head was a 10/10, but the reality was a 2/10. What are you postponing today that will take under 10 minutes?',
    createdAt: '3 hours ago',
    likesCount: 24,
    isLiked: false,
    isSaved: false,
    comments: [
      {
        id: 'c-1',
        author: {
          name: 'Sarah Lin',
          username: 'sarahlin',
          avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
          direction: 'THE EVOLVER'
        },
        content: 'Spot on! The anticipation tax is always 10x the execution cost.',
        createdAt: '2 hours ago'
      },
      {
        id: 'c-2',
        author: {
          name: 'Mateo Rossi',
          username: 'mrossi',
          avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
          direction: 'THE CREATOR'
        },
        content: 'Doing this right now with a client follow-up. Thank you for the nudge!',
        createdAt: '1 hour ago'
      }
    ]
  },
  {
    id: 'post-2',
    author: {
      name: 'Maya Patel',
      username: 'mayapatel',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      direction: 'THE CREATOR'
    },
    category: 'IDEAS',
    content: 'Question for the community: How do you balance having 5 different creative passions with the modern demand to "niche down" into a single personal brand? I love architecture, ambient music, and algorithmic design. How do you honor multifaceted interests without diluting focus?',
    createdAt: '6 hours ago',
    likesCount: 42,
    isLiked: true,
    isSaved: true,
    comments: [
      {
        id: 'c-3',
        author: {
          name: 'Kofi Mensah',
          username: 'kofi_connect',
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
          direction: 'THE CONNECTOR'
        },
        content: 'Your niche isn’t a single topic; your niche is the unique intersection of how those three speak to each other.',
        createdAt: '4 hours ago'
      }
    ]
  },
  {
    id: 'post-3',
    author: {
      name: 'Liam Zhang',
      username: 'liamz',
      avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80',
      direction: 'THE EVOLVER'
    },
    category: 'LEARNING',
    content: 'Took the DUX Direction Quiz yesterday and got "THE EVOLVER". The line "You turn experience into progress" hit me deep. For years I thought my inability to stay in one unchanging job was a flaw, but now I see it as an insatiable appetite for feedback and mastery.',
    createdAt: '12 hours ago',
    likesCount: 56,
    isLiked: false,
    isSaved: false,
    comments: []
  }
];

export const INITIAL_LAB_IDEAS: LabIdea[] = [
  {
    id: 'idea-1',
    title: 'Offline Direction Circles: Micro-Hubs in Local Coffee Shops',
    description: 'A physical meetup kit allowing 4-6 DUX members in any city to gather every second Sunday for a 60-minute structured accountability session without laptops or phones.',
    category: 'Creative Work',
    tags: ['Offline', 'Community', 'Accountability', 'Habits'],
    author: {
      name: 'Nadia Thorne',
      username: 'nadiat',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80'
    },
    upvotesCount: 38,
    isUpvoted: false,
    createdAt: '1 day ago',
    status: 'In Discussion'
  },
  {
    id: 'idea-2',
    title: 'The Anti-Resume: Proof of Direction Portfolio',
    description: 'A public digital showcase format that emphasizes what you survived, what you tested, and what direction you are walking towards rather than formal degrees or corporate titles.',
    category: 'Startup Ideas',
    tags: ['Future of Work', 'Identity', 'Portfolios', 'Hiring'],
    author: {
      name: 'Julian Vance',
      username: 'jvance',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80'
    },
    upvotesCount: 64,
    isUpvoted: true,
    createdAt: '3 days ago',
    status: 'Prototyping'
  },
  {
    id: 'idea-3',
    title: 'Daily Micro-Reflect Audio Notes',
    description: 'Allow members to record a 45-second voice reflection for the Daily DUX instead of typing, with instant local transcription for those who think better by speaking aloud.',
    category: 'Experiments',
    tags: ['Audio', 'Productivity', 'Accessibility'],
    author: {
      name: 'Aria Chen',
      username: 'aria_creative',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80'
    },
    upvotesCount: 45,
    isUpvoted: false,
    createdAt: '5 days ago',
    status: 'In Discussion'
  }
];

export const INITIAL_EVENTS: EventItem[] = [
  {
    id: 'dux-meetup-london',
    title: 'DUX MEETUP — GLOBAL DIRECTIONS',
    category: 'MEETUP',
    date: 'Saturday, Oct 12, 2026',
    time: '18:00 - 21:00 BST',
    location: 'Ace Hotel London / Hybrid Online',
    isVirtual: true,
    description: 'An evening of unfiltered founder stories, archetype speed-networking, and working through the 7-day challenge together.',
    host: 'DUX London Chapter',
    capacity: 120,
    attendeesCount: 84,
    isRsvpd: true
  },
  {
    id: 'creative-night-synthesis',
    title: 'CREATIVE NIGHT — TURNING CHAOS INTO CRAFT',
    category: 'WORKSHOP',
    date: 'Wednesday, Oct 16, 2026',
    time: '19:00 - 20:30 EST',
    location: 'Interactive Digital Studio (Zoom Stage)',
    isVirtual: true,
    description: 'A 90-minute live sprint led by master creators on how to turn fragmented notebook ideas into a singular launchable artifact.',
    host: 'Elena Rostova & Guest Designers',
    capacity: 250,
    attendeesCount: 167,
    isRsvpd: false
  },
  {
    id: 'leadership-session-candor',
    title: 'LEADERSHIP SESSION — EMBRACING RADICAL SILENCE',
    category: 'MASTERCLASS',
    date: 'Tuesday, Oct 22, 2026',
    time: '12:00 - 13:15 PST',
    location: 'DUX Live Forum Stage',
    isVirtual: true,
    description: 'How to facilitate high-stakes conversations where the outcome isn’t predetermined. Active simulation of 1-on-1 conflict resolution.',
    host: 'Kofi Mensah',
    capacity: 100,
    attendeesCount: 92,
    isRsvpd: false
  },
  {
    id: 'community-day-direction',
    title: 'COMMUNITY DAY — WHERE DIRECTION MEETS ACTION',
    category: 'COMMUNITY',
    date: 'Sunday, Nov 1, 2026',
    time: '10:00 - 16:00 Local Hubs',
    location: 'Worldwide Hubs & Discord Hangouts',
    isVirtual: true,
    description: 'A global 6-hour co-working marathon where hundreds of DUX members build, launch, and demo their challenge outcomes simultaneously.',
    host: 'DUX Core Team',
    capacity: 500,
    attendeesCount: 310,
    isRsvpd: false
  }
];

export const INITIAL_PRODUCTS: StoreProduct[] = [
  {
    id: 'dux-heavyweight-tee',
    name: 'DUX Heavyweight Tee',
    category: 'APPAREL',
    price: 48,
    image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=600&auto=format&fit=crop&q=80',
    description: 'Engineered from 280gsm organic ring-spun cotton. Minimalist yellow direction compass embroidered at the chest, tagline typography on rear neckline.',
    details: ['100% Organic heavyweight cotton', 'Pre-shrunk custom boxy silhouette', 'Embroidered geometric compass', 'Ethically manufactured in Portugal'],
    stock: 45,
    inStock: true
  },
  {
    id: 'dux-oversized-hoodie',
    name: 'DUX Oversized Hoodie',
    category: 'APPAREL',
    price: 98,
    image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=600&auto=format&fit=crop&q=80',
    description: 'Substantial 460gsm French terry hoodie in pitch black with contrast yellow drawstrings and hidden interior notebook pocket.',
    details: ['460gsm heavy French terry', 'Double-lined hood with structured drape', 'Interior phone & mini-notebook pocket', 'Tonal DUX typographic print on cuff'],
    stock: 28,
    inStock: true
  },
  {
    id: 'dux-insulated-bottle',
    name: 'DUX Thermal Bottle',
    category: 'ACCESSORIES',
    price: 36,
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=600&auto=format&fit=crop&q=80',
    description: 'Double-walled vacuum insulated stainless steel canteen. Keeps cold for 24 hours or piping hot for 12. Matte powder-coated finish with laser-etched compass.',
    details: ['750ml capacity', '18/8 food-grade stainless steel', 'Zero condensation sweat-free exterior', 'Leak-proof sports lid with carabiner loop'],
    stock: 60,
    inStock: true
  },
  {
    id: 'dux-ceramic-cup',
    name: 'DUX Ceramic Cup',
    category: 'LIFESTYLE',
    price: 24,
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600&auto=format&fit=crop&q=80',
    description: 'Hand-thrown stoneware mug glazed in matte off-white cream with raw iron speckles and an unglazed raw clay foot. Embossed: WHERE DIRECTION BEGINS.',
    details: ['350ml morning brew volume', 'Microwave and dishwasher safe', 'Individually stamped batch stamp', 'Ergonomic two-finger balance handle'],
    stock: 35,
    inStock: true
  },
  {
    id: 'dux-direction-notebook',
    name: 'DUX Direction Notebook',
    category: 'STATIONERY',
    price: 28,
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&auto=format&fit=crop&q=80',
    description: '192 numbered dot-grid pages of 120gsm fountain-pen friendly Japanese paper. Includes built-in 7-day direction challenge prompts and quarterly reviews.',
    details: ['120gsm bleed-proof ivory paper', 'Lie-flat Smyth sewn binding', 'Dual ribbon bookmarks in black and yellow', 'Rear expandable document pocket'],
    stock: 80,
    inStock: true
  },
  {
    id: 'dux-heavy-canvas-tote',
    name: 'DUX Heavy Canvas Tote',
    category: 'ACCESSORIES',
    price: 34,
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=600&auto=format&fit=crop&q=80',
    description: '16oz rugged organic cotton canvas utility tote with reinforced cross-stitched handles and interior brass key clip.',
    details: ['16oz heavy duck canvas', 'Reinforced base gusset', 'Internal zipped stash pocket', 'Brass key tether'],
    stock: 52,
    inStock: true
  },
  {
    id: 'dux-structured-cap',
    name: 'DUX Structured Cap',
    category: 'APPAREL',
    price: 32,
    image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=600&auto=format&fit=crop&q=80',
    description: 'Six-panel low-profile dad cap crafted from washed chino twill. Antiqued brass tri-glide buckle and custom interior tape.',
    details: ['100% Washed cotton twill', 'Curved brim with memory stay', 'Embroidered DUX icon at front center', 'Adjustable leather strapback'],
    stock: 40,
    inStock: true
  }
];

export const INITIAL_REWARDS: RewardItem[] = [
  {
    id: 'reward-badge-pioneer',
    title: 'DUX Pioneer Digital Badge',
    type: 'Digital Badge',
    pointsCost: 200,
    description: 'Special early-adopter emblem pinned to your public profile highlighting your foundational presence.',
    unlocked: true,
    rewardCode: 'DUX-PIONEER-2026'
  },
  {
    id: 'reward-wallpaper-pack',
    title: 'Minimalist Direction Wallpaper Pack',
    type: 'Wallpaper Pack',
    pointsCost: 400,
    description: 'High-res 4K & mobile 9:16 typographic wallpapers engineered to keep your daily focus pristine.',
    unlocked: true,
    rewardCode: 'WALLPAPERS-DUX-RETINA'
  },
  {
    id: 'reward-store-discount',
    title: '25% Off Any DUX Store Order',
    type: 'Merchandise Discount',
    pointsCost: 1000,
    description: 'Exclusive code applicable at checkout for all apparel and stationery gear.',
    unlocked: false,
    rewardCode: 'DIRECTION25-PROMO'
  },
  {
    id: 'reward-limited-call',
    title: '1-on-1 Direction Sprint Review with Founder',
    type: 'Limited Digital',
    pointsCost: 2500,
    description: 'A 30-minute deep dive reviewing your archetype, 90-day focus canvas, and strategic roadmap.',
    unlocked: false,
    rewardCode: 'VIP-SPRINT-FOUNDER'
  }
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    title: 'Your challenge is waiting',
    message: 'Day 1 of the 7 Day Direction Challenge is ready for your reflection.',
    time: '10m ago',
    read: false,
    type: 'challenge',
    link: '/challenges/7-day-direction'
  },
  {
    id: 'notif-2',
    title: 'You unlocked FIRST STEP',
    message: 'Welcome to DUX! Your first achievement badge is now active.',
    time: '2h ago',
    read: false,
    type: 'achievement',
    link: '/achievements'
  },
  {
    id: 'notif-3',
    title: 'Sarah Lin replied to your discussion',
    message: '"Spot on! The anticipation tax is always 10x the execution cost."',
    time: '4h ago',
    read: true,
    type: 'comment',
    link: '/community'
  },
  {
    id: 'notif-4',
    title: 'Your event starts this week',
    message: 'DUX MEETUP — GLOBAL DIRECTIONS is scheduled for Saturday at 18:00 BST.',
    time: '1d ago',
    read: true,
    type: 'event',
    link: '/events/dux-meetup-london'
  },
  {
    id: 'notif-5',
    title: 'You reached a 4-day streak',
    message: 'Keep going! 3 more days to unlock the legendary 7-DAY STREAK achievement.',
    time: '1d ago',
    read: true,
    type: 'streak',
    link: '/daily'
  }
];
