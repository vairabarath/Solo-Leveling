<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" style="height:64px;margin-right:32px"/>

# Tasks:

✓ Finalize exact feature list (already done above)
✓ Create detailed component list
✓ Write database schema in detail
✓ Define all API endpoints with request/response formats
✓ Create project structure document

Perfect! Let me create the complete technical blueprint for your MVP. Here's everything organized and ready to copy-paste into documentation:

***

## ✅ **1. FINALIZED FEATURE LIST (MVP)**

### **Core Features**:

- ✅ User registration \& login (JWT authentication)
- ✅ 5-step onboarding with capability assessment
- ✅ Automatic stat calculation from assessment
- ✅ Personalized daily quest generation (4 quests)
- ✅ Quest completion with stat rewards
- ✅ Automatic stat progression (no manual allocation)
- ✅ Level-up system with XP thresholds
- ✅ 6-stat system (STR, AGI, VIT, INT, SENSE, LUCK)
- ✅ HP/MP/XP bars with Solo Leveling UI
- ✅ Title/achievement system
- ✅ Daily quest streak tracking
- ✅ Quest tier progression (beginner→intermediate→advanced→elite)
- ✅ Stats dashboard with growth tracking
- ✅ Quest history
- ✅ Profile with title gallery


### **Excluded from MVP**:

- ❌ Friends/Party system
- ❌ Photo/video verification
- ❌ GPS tracking
- ❌ Blockchain/tokenomics
- ❌ Payment/monetization
- ❌ Email verification
- ❌ Password reset

***

## ✅ **2. DETAILED COMPONENT LIST**

### **Backend Components** (Node.js/Express):

```
backend/
├── models/
│   ├── User.js                    // User schema with stats, assessment data
│   ├── Quest.js                   // Quest definitions with rewards
│   ├── CompletedQuest.js         // Quest completion history
│   ├── Title.js                   // Achievement titles
│   └── DailyQuestAssignment.js   // User's current daily quests
│
├── controllers/
│   ├── authController.js         // register, login, getMe
│   ├── onboardingController.js   // assessment submission, stat calculation
│   ├── questController.js        // getDailyQuests, getAvailable, completeQuest
│   ├── statsController.js        // getStats, getHistory, getBreakdown
│   ├── titleController.js        // getTitles, equipTitle, checkProgress
│   └── userController.js         // getProfile, updateProfile, getHistory
│
├── routes/
│   ├── auth.js                   // POST /register, /login, GET /me
│   ├── onboarding.js             // POST /physical, /mental, /lifestyle, /complete
│   ├── quests.js                 // GET /daily, /available, POST /:id/complete
│   ├── stats.js                  // GET /current, /history, /breakdown
│   ├── titles.js                 // GET /, /progress, POST /:id/equip
│   └── users.js                  // GET /profile, /history, PUT /profile
│
├── middleware/
│   ├── auth.js                   // JWT verification middleware
│   ├── validation.js             // Request body validation
│   └── errorHandler.js           // Global error handler
│
├── services/
│   ├── questGenerationService.js // Generate daily quests based on tier
│   ├── statCalculationService.js // Calculate stats from assessment
│   ├── levelUpService.js         // Check XP threshold, apply bonuses
│   ├── tierProgressionService.js // Check if user should upgrade tier
│   └── titleUnlockService.js     // Check if new titles unlocked
│
├── utils/
│   ├── statFormulas.js           // XP formulas, stat synergies
│   ├── questAlgorithms.js        // Quest matching logic
│   └── constants.js              // Quest tiers, title requirements
│
├── seeds/
│   ├── questsSeeder.js           // 30+ predefined quests
│   └── titlesSeeder.js           // 10+ titles with requirements
│
├── config/
│   ├── database.js               // MongoDB connection
│   └── env.js                    // Environment variables
│
├── .env                          // JWT_SECRET, MONGO_URI, PORT
├── server.js                     // Express app entry point
└── package.json
```


### **Frontend Components** (React/Vite):

```
frontend/
├── src/
│   ├── pages/
│   │   ├── Landing.jsx           // Marketing landing page
│   │   ├── Login.jsx             // Login form
│   │   ├── Register.jsx          // Registration form
│   │   ├── Onboarding/
│   │   │   ├── Welcome.jsx       // "System has chosen you"
│   │   │   ├── GoalSelection.jsx // Primary goals selection
│   │   │   ├── PhysicalAssessment.jsx  // Push-ups, squats, running
│   │   │   ├── MentalAssessment.jsx    // Focus, learning, coding
│   │   │   ├── LifestyleAssessment.jsx // Time, activity level
│   │   │   └── SystemActivation.jsx    // Show calculated stats
│   │   ├── Dashboard.jsx         // Main hub with daily quests
│   │   ├── AllQuests.jsx         // Browse all available quests
│   │   ├── QuestDetail.jsx       // Single quest view
│   │   ├── Stats.jsx             // Stats dashboard with charts
│   │   └── Profile.jsx           // User profile, titles, settings
│   │
│   ├── components/
│   │   ├── Layout/
│   │   │   ├── Navbar.jsx        // Top navigation
│   │   │   ├── BottomNav.jsx     // Mobile bottom nav (4 tabs)
│   │   │   └── Container.jsx     // Page wrapper
│   │   │
│   │   ├── Auth/
│   │   │   ├── LoginForm.jsx     // Login form component
│   │   │   ├── RegisterForm.jsx  // Register form component
│   │   │   └── ProtectedRoute.jsx // Auth guard
│   │   │
│   │   ├── Onboarding/
│   │   │   ├── ProgressBar.jsx   // 5-step progress indicator
│   │   │   ├── AssessmentRadio.jsx // Radio group for assessments
│   │   │   └── LoadingAnimation.jsx // Processing animation
│   │   │
│   │   ├── Quest/
│   │   │   ├── QuestCard.jsx     // Quest card component
│   │   │   ├── DailyQuestPanel.jsx // 4 daily quests display
│   │   │   ├── QuestList.jsx     // Filterable quest grid
│   │   │   ├── QuestCompleteModal.jsx // Completion confirmation
│   │   │   └── QuestRewardDisplay.jsx // Show stat rewards
│   │   │
│   │   ├── Stats/
│   │   │   ├── StatusWindow.jsx  // Main stats panel
│   │   │   ├── HPBar.jsx         // HP progress bar (red glow)
│   │   │   ├── MPBar.jsx         // MP progress bar (cyan glow)
│   │   │   ├── XPBar.jsx         // XP progress bar (yellow glow)
│   │   │   ├── StatBar.jsx       // Individual stat bar
│   │   │   ├── StatGrowthChart.jsx // Line chart for growth
│   │   │   └── StatBreakdown.jsx // Pie chart by category
│   │   │
│   │   ├── Profile/
│   │   │   ├── TitleGallery.jsx  // Grid of titles
│   │   │   ├── TitleCard.jsx     // Single title display
│   │   │   ├── AchievementBadge.jsx // Badge component
│   │   │   └── QuestHistory.jsx  // Completed quests list
│   │   │
│   │   ├── Animations/
│   │   │   ├── LevelUpModal.jsx  // Level up celebration
│   │   │   ├── RewardAnimation.jsx // Stat gain animation
│   │   │   ├── StreakFireEffect.jsx // Fire emoji pulse
│   │   │   └── GlowEffect.jsx    // Reusable glow wrapper
│   │   │
│   │   └── Common/
│   │       ├── Button.jsx        // Glowing button
│   │       ├── Input.jsx         // Form input
│   │       ├── Modal.jsx         // Generic modal
│   │       ├── Loader.jsx        // Loading spinner
│   │       └── Card.jsx          // Card wrapper
│   │
│   ├── context/
│   │   ├── AuthContext.jsx       // Auth state (user, token)
│   │   ├── QuestContext.jsx      // Quest state (daily, available)
│   │   └── StatsContext.jsx      // Stats state (current stats)
│   │
│   ├── services/
│   │   ├── api.js                // Axios instance with interceptors
│   │   ├── authService.js        // Auth API calls
│   │   ├── onboardingService.js  // Onboarding API calls
│   │   ├── questService.js       // Quest API calls
│   │   ├── statsService.js       // Stats API calls
│   │   └── userService.js        // User/profile API calls
│   │
│   ├── hooks/
│   │   ├── useAuth.js            // Auth hook
│   │   ├── useQuests.js          // Quest management hook
│   │   ├── useStats.js           // Stats management hook
│   │   ├── useTimer.js           // Quest timer hook
│   │   └── useLocalStorage.js    // Persist state
│   │
│   ├── styles/
│   │   ├── globals.css           // Global styles
│   │   ├── sololeveling.css      // Solo Leveling theme
│   │   └── animations.css        // Keyframe animations
│   │
│   ├── utils/
│   │   ├── statCalculations.js   // Client-side stat display logic
│   │   ├── dateHelpers.js        // Format dates, time remaining
│   │   └── validators.js         // Form validation
│   │
│   ├── App.jsx                   // Route definitions
│   └── main.jsx                  // React entry point
│
├── public/
│   └── assets/
│       └── icons/                // Stat icons, rank badges
│
├── index.html
├── vite.config.js
├── tailwind.config.js
└── package.json
```


***

## ✅ **3. DATABASE SCHEMAS (MongoDB)**

### **User Schema**:

```javascript
{
  _id: ObjectId,
  name: String,                    // Required, min 2 chars
  email: String,                   // Required, unique, lowercase
  password: String,                // Required, bcrypt hashed
  
  // Core Stats
  level: Number,                   // Default: 1
  currentXP: Number,               // Default: 0
  totalXP: Number,                 // Default: 0
  
  // Resource Bars
  currentHP: Number,               // Default: 100
  maxHP: Number,                   // Default: 100
  currentMP: Number,               // Default: 50
  maxMP: Number,                   // Default: 50
  
  // Six Stat System
  strength: Number,                // Default: 10
  agility: Number,                 // Default: 10
  vitality: Number,                // Default: 10
  intelligence: Number,            // Default: 10
  sense: Number,                   // Default: 10
  luck: Number,                    // Default: 5
  
  // Assessment Data (from onboarding)
  assessmentData: {
    pushUpCapacity: String,        // "0-10" | "11-30" | "31-50" | "51+"
    squatCapacity: String,         // "0-15" | "16-40" | "41-70" | "71+"
    runningCapacity: String,       // "<1km" | "1-3km" | "3-5km" | "5km+"
    plankCapacity: String,         // "<30s" | "31-60s" | "61-90s" | "90s+"
    focusCapacity: String,         // "15-30min" | "30-60min" | "1-2hr" | "2hr+"
    learningLevel: String,         // "beginner" | "occasional" | "regular" | "advanced"
    codingLevel: String,           // "none" | "basic" | "intermediate" | "advanced"
    dailyTimeAvailable: String,    // "15-30min" | "30-60min" | "1-2hr" | "2hr+"
    activityLevel: String,         // "sedentary" | "light" | "moderate" | "active"
    meditationLevel: String        // "never" | "tried" | "regular" | "advanced"
  },
  
  // Quest Tier Assignments
  questTiers: {
    strengthTier: String,          // "beginner" | "intermediate" | "advanced" | "elite"
    enduranceTier: String,         // Same options
    focusTier: String,             // Same options
    mindfulnessTier: String        // Same options
  },
  
  // Tier Progression Tracking
  questsCompletedAtTier: {
    strength: Number,              // Default: 0
    endurance: Number,
    focus: Number,
    mindfulness: Number
  },
  
  // Streak & Activity
  dailyQuestStreak: Number,        // Default: 0
  lastQuestDate: Date,             // Last daily quest completion date
  totalQuestsCompleted: Number,    // Default: 0
  
  // Titles & Achievements
  activeTitle: ObjectId,           // Reference to Title, nullable
  ownedTitles: [ObjectId],         // Array of Title references
  
  // Metadata
  createdAt: Date,                 // Auto-generated
  lastLoginAt: Date,               // Updated on login
  onboardingCompleted: Boolean     // Default: false
}

// Indexes
indexes: [
  { email: 1 }, // Unique
  { level: -1 }, // For leaderboards (future)
  { dailyQuestStreak: -1 } // For streak rankings (future)
]
```


### **Quest Schema**:

```javascript
{
  _id: ObjectId,
  title: String,                   // Required, "40 Push-ups"
  description: String,             // Optional, detailed instructions
  category: String,                // Required: "fitness" | "cardio" | "mental" | "wellness" | "career"
  difficulty: String,              // "beginner" | "intermediate" | "advanced" | "elite"
  tier: String,                    // Same as difficulty (for matching)
  
  // Stat Rewards (automatic allocation)
  strReward: Number,               // Default: 0
  agiReward: Number,               // Default: 0
  vitReward: Number,               // Default: 0
  intReward: Number,               // Default: 0
  senseReward: Number,             // Default: 0
  luckReward: Number,              // Default: 0
  xpReward: Number,                // Required
  
  // Quest Requirements
  requiredLevel: Number,           // Default: 1
  requiredStats: {
    minStrength: Number,           // Default: 0
    minAgility: Number,
    minIntelligence: Number
  },
  
  // Quest Properties
  questType: String,               // "daily" | "available" | "special"
  isRepeatable: Boolean,           // Default: true
  estimatedTime: String,           // "15-30 minutes"
  
  // Metadata
  createdAt: Date,
  isActive: Boolean                // Default: true
}

// Indexes
indexes: [
  { category: 1, tier: 1 },        // For filtering
  { questType: 1 },
  { isActive: 1 }
]
```


### **CompletedQuest Schema**:

```javascript
{
  _id: ObjectId,
  userId: ObjectId,                // Reference to User, required
  questId: ObjectId,               // Reference to Quest, required
  questTitle: String,              // Denormalized for history display
  
  // Completion Details
  completedAt: Date,               // Required
  wasDaily: Boolean,               // Was this part of daily quests?
  
  // Rewards Granted
  statsGained: {
    str: Number,                   // Default: 0
    agi: Number,
    vit: Number,
    int: Number,
    sense: Number,
    luck: Number
  },
  xpGained: Number,                // Required
  leveledUp: Boolean,              // Default: false
  newLevel: Number                 // If leveledUp: true
}

// Indexes
indexes: [
  { userId: 1, completedAt: -1 }, // For user history
  { userId: 1, wasDaily: 1 },     // For daily quest tracking
  { completedAt: -1 }              // For recent activity
]
```


### **Title Schema**:

```javascript
{
  _id: ObjectId,
  name: String,                    // Required, "Wolf Slayer"
  description: String,             // "Complete 50 strength quests"
  rarity: String,                  // "common" | "rare" | "epic" | "legendary"
  
  // Unlock Requirements
  requirementType: String,         // "questCount" | "streak" | "stat" | "level" | "category"
  requirementValue: Number,        // e.g., 50 for 50 quests
  requirementCategory: String,     // "fitness" | "all" | null
  
  // Stat Bonuses (applied when equipped)
  strBonus: Number,                // Default: 0
  agiBonus: Number,
  vitBonus: Number,
  intBonus: Number,
  senseBonus: Number,
  luckBonus: Number,
  
  // Display
  iconUrl: String,                 // Optional
  borderColor: String,             // Hex color for rarity
  
  // Metadata
  createdAt: Date,
  isActive: Boolean                // Default: true
}

// Indexes
indexes: [
  { rarity: 1 },
  { requirementType: 1 }
]
```


### **DailyQuestAssignment Schema**:

```javascript
{
  _id: ObjectId,
  userId: ObjectId,                // Reference to User, required
  assignedDate: Date,              // Date when assigned (midnight UTC)
  
  // 4 Daily Quests
  quests: [
    {
      questId: ObjectId,           // Reference to Quest
      isCompleted: Boolean,        // Default: false
      completedAt: Date            // Nullable
    }
  ],
  
  // Progress
  completedCount: Number,          // 0-4
  allCompleted: Boolean,           // Default: false
  bonusAwarded: Boolean            // +1 LUCK bonus given?
}

// Indexes
indexes: [
  { userId: 1, assignedDate: -1 }, // Find today's quests
  { userId: 1 }
]
```


***

## ✅ **4. API ENDPOINTS (Request/Response Formats)**

### **Base URL**: `http://localhost:5000/api`


***

### **Authentication Routes** (`/api/auth`)

#### **POST /api/auth/register**

Register new user

**Request**:

```json
{
  "name": "Jin Woo",
  "email": "jinwoo@example.com",
  "password": "password123"
}
```

**Response** (201):

```json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "_id": "67890abcdef",
      "name": "Jin Woo",
      "email": "jinwoo@example.com",
      "level": 1,
      "onboardingCompleted": false
    }
  }
}
```

**Errors**:

- 400: Email already exists
- 400: Validation error (missing fields)

***

#### **POST /api/auth/login**

Login user

**Request**:

```json
{
  "email": "jinwoo@example.com",
  "password": "password123"
}
```

**Response** (200):

```json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "_id": "67890abcdef",
      "name": "Jin Woo",
      "email": "jinwoo@example.com",
      "level": 15,
      "onboardingCompleted": true,
      "strength": 42,
      "agility": 35,
      "activeTitle": {
        "name": "Wolf Slayer",
        "rarity": "rare"
      }
    }
  }
}
```

**Errors**:

- 401: Invalid credentials
- 400: Validation error

***

#### **GET /api/auth/me**

Get current user (requires auth token)

**Headers**:

```
Authorization: Bearer <token>
```

**Response** (200):

```json
{
  "success": true,
  "data": {
    "_id": "67890abcdef",
    "name": "Jin Woo",
    "email": "jinwoo@example.com",
    "level": 15,
    "currentXP": 2450,
    "strength": 42,
    "agility": 35,
    "vitality": 38,
    "intelligence": 45,
    "sense": 28,
    "luck": 12,
    "dailyQuestStreak": 7,
    "onboardingCompleted": true
  }
}
```

**Errors**:

- 401: No token / invalid token

***

### **Onboarding Routes** (`/api/onboarding`)

#### **POST /api/onboarding/complete**

Submit all assessment data and calculate initial stats

**Headers**: `Authorization: Bearer <token>`

**Request**:

```json
{
  "assessmentData": {
    "pushUpCapacity": "11-30",
    "squatCapacity": "16-40",
    "runningCapacity": "1-3km",
    "plankCapacity": "31-60s",
    "focusCapacity": "30-60min",
    "learningLevel": "regular",
    "codingLevel": "intermediate",
    "dailyTimeAvailable": "1-2hr",
    "activityLevel": "moderate",
    "meditationLevel": "tried"
  }
}
```

**Response** (200):

```json
{
  "success": true,
  "data": {
    "user": {
      "_id": "67890abcdef",
      "onboardingCompleted": true,
      "strength": 15,
      "agility": 15,
      "vitality": 15,
      "intelligence": 18,
      "sense": 12,
      "luck": 5,
      "questTiers": {
        "strengthTier": "intermediate",
        "enduranceTier": "beginner",
        "focusTier": "intermediate",
        "mindfulnessTier": "beginner"
      }
    },
    "dailyQuests": [
      {
        "_id": "quest123",
        "title": "40 Push-ups",
        "strReward": 3,
        "vitReward": 1
      }
      // ... 3 more quests
    ]
  }
}
```

**Errors**:

- 400: Missing assessment data
- 401: Not authenticated

***

### **Quest Routes** (`/api/quests`)

#### **GET /api/quests/daily**

Get user's daily quests for today

**Headers**: `Authorization: Bearer <token>`

**Response** (200):

```json
{
  "success": true,
  "data": {
    "assignedDate": "2025-10-12T00:00:00.000Z",
    "quests": [
      {
        "questId": "quest123",
        "title": "40 Push-ups",
        "category": "fitness",
        "strReward": 3,
        "vitReward": 1,
        "xpReward": 25,
        "estimatedTime": "5-10 minutes",
        "isCompleted": false
      },
      {
        "questId": "quest124",
        "title": "Run 3km",
        "category": "cardio",
        "agiReward": 2,
        "vitReward": 2,
        "xpReward": 30,
        "estimatedTime": "20-30 minutes",
        "isCompleted": true,
        "completedAt": "2025-10-12T06:30:00.000Z"
      }
      // ... 2 more quests
    ],
    "completedCount": 1,
    "totalQuests": 4,
    "allCompleted": false,
    "streak": 7,
    "timeRemaining": "15h 23m"
  }
}
```


***

#### **GET /api/quests/available**

Get all available quests filtered by user's tier

**Headers**: `Authorization: Bearer <token>`

**Query Params**:

- `category` (optional): "fitness" | "cardio" | "mental" | "wellness" | "career"

**Example**: `GET /api/quests/available?category=fitness`

**Response** (200):

```json
{
  "success": true,
  "data": {
    "quests": [
      {
        "_id": "quest125",
        "title": "50 Push-ups",
        "description": "Complete 50 consecutive push-ups",
        "category": "fitness",
        "tier": "intermediate",
        "strReward": 3,
        "vitReward": 2,
        "xpReward": 35,
        "estimatedTime": "10-15 minutes",
        "requiredLevel": 1
      }
      // ... more quests
    ],
    "userTier": "intermediate",
    "totalCount": 12
  }
}
```


***

#### **GET /api/quests/:id**

Get single quest details

**Headers**: `Authorization: Bearer <token>`

**Response** (200):

```json
{
  "success": true,
  "data": {
    "_id": "quest123",
    "title": "40 Push-ups",
    "description": "Complete 40 push-ups in proper form. Take breaks if needed.",
    "category": "fitness",
    "tier": "intermediate",
    "strReward": 3,
    "vitReward": 1,
    "xpReward": 25,
    "estimatedTime": "5-10 minutes",
    "requiredLevel": 1,
    "difficulty": "★★☆☆☆"
  }
}
```


***

#### **POST /api/quests/:id/complete**

Mark quest as complete and award rewards

**Headers**: `Authorization: Bearer <token>`

**Request**:

```json
{
  "confirmed": true
}
```

**Response** (200):

```json
{
  "success": true,
  "data": {
    "quest": {
      "title": "40 Push-ups",
      "completedAt": "2025-10-12T10:15:00.000Z"
    },
    "rewards": {
      "statsGained": {
        "str": 3,
        "vit": 1
      },
      "xpGained": 25
    },
    "updatedUser": {
      "currentXP": 2475,
      "strength": 45,
      "vitality": 39,
      "currentHP": 850,
      "maxHP": 1000
    },
    "levelUp": false,
    "dailyQuestProgress": {
      "completed": 2,
      "total": 4
    },
    "message": "Quest completed! +3 STR, +1 VIT, +25 XP"
  }
}
```

**If Level Up**:

```json
{
  "success": true,
  "data": {
    "quest": { ... },
    "rewards": { ... },
    "updatedUser": {
      "level": 16,
      "currentXP": 75,
      "strength": 46,
      "agility": 36,
      "vitality": 40,
      "intelligence": 46,
      "sense": 29,
      "luck": 13
    },
    "levelUp": true,
    "newLevel": 16,
    "levelUpBonuses": {
      "allStats": 1
    },
    "message": "LEVEL UP! You are now level 16!"
  }
}
```

**Errors**:

- 404: Quest not found
- 400: Quest already completed today
- 401: Not authenticated

***

### **Stats Routes** (`/api/stats`)

#### **GET /api/stats/current**

Get current user stats

**Headers**: `Authorization: Bearer <token>`

**Response** (200):

```json
{
  "success": true,
  "data": {
    "level": 15,
    "currentXP": 2450,
    "nextLevelXP": 3000,
    "xpProgress": 81.67,
    "currentHP": 850,
    "maxHP": 1000,
    "hpProgress": 85,
    "currentMP": 420,
    "maxMP": 600,
    "mpProgress": 70,
    "strength": 42,
    "agility": 35,
    "vitality": 38,
    "intelligence": 45,
    "sense": 28,
    "luck": 12,
    "activeTitle": {
      "name": "Wolf Slayer",
      "bonuses": {
        "str": 5,
        "agi": 3
      }
    }
  }
}
```


***

#### **GET /api/stats/history**

Get stat growth history (last 7/30 days)

**Headers**: `Authorization: Bearer <token>`

**Query Params**:

- `days` (optional): 7 | 30, default: 7

**Response** (200):

```json
{
  "success": true,
  "data": {
    "period": "7days",
    "history": [
      {
        "date": "2025-10-06",
        "strength": 38,
        "agility": 33,
        "vitality": 36,
        "intelligence": 42,
        "sense": 26,
        "luck": 11
      },
      {
        "date": "2025-10-07",
        "strength": 39,
        "agility": 33,
        "vitality": 37,
        "intelligence": 43,
        "sense": 26,
        "luck": 11
      }
      // ... more days
    ],
    "totalGains": {
      "str": 4,
      "agi": 2,
      "vit": 2,
      "int": 3,
      "sense": 2,
      "luck": 1
    }
  }
}
```


***

#### **GET /api/stats/breakdown**

Get stat gains by quest category

**Headers**: `Authorization: Bearer <token>`

**Response** (200):

```json
{
  "success": true,
  "data": {
    "byCategory": {
      "fitness": {
        "questsCompleted": 45,
        "statsGained": {
          "str": 28,
          "vit": 12
        },
        "percentage": 42
      },
      "cardio": {
        "questsCompleted": 38,
        "statsGained": {
          "agi": 24,
          "vit": 15
        },
        "percentage": 35
      },
      "mental": {
        "questsCompleted": 25,
        "statsGained": {
          "int": 32,
          "sense": 10
        },
        "percentage": 23
      }
    },
    "totalQuests": 108
  }
}
```


***

### **Title Routes** (`/api/titles`)

#### **GET /api/titles**

Get all titles (locked/unlocked)

**Headers**: `Authorization: Bearer <token>`

**Response** (200):

```json
{
  "success": true,
  "data": {
    "owned": [
      {
        "_id": "title123",
        "name": "Wolf Slayer",
        "description": "Complete 50 strength-based quests",
        "rarity": "rare",
        "bonuses": {
          "str": 5,
          "agi": 3
        },
        "isEquipped": true,
        "unlockedAt": "2025-10-08T12:00:00.000Z"
      }
      // ... more owned titles
    ],
    "locked": [
      {
        "_id": "title124",
        "name": "Demon Hunter",
        "description": "Reach level 50",
        "rarity": "epic",
        "bonuses": {
          "str": 10,
          "agi": 10,
          "vit": 10
        },
        "progress": {
          "current": 15,
          "required": 50,
          "percentage": 30
        }
      }
      // ... more locked titles
    ]
  }
}
```


***

#### **POST /api/titles/:id/equip**

Equip a title

**Headers**: `Authorization: Bearer <token>`

**Response** (200):

```json
{
  "success": true,
  "data": {
    "activeTitle": {
      "_id": "title123",
      "name": "Wolf Slayer",
      "bonuses": {
        "str": 5,
        "agi": 3
      }
    },
    "updatedStats": {
      "strength": 47,
      "agility": 38
    },
    "message": "Title 'Wolf Slayer' equipped! +5 STR, +3 AGI"
  }
}
```

**Errors**:

- 404: Title not found
- 403: Title not unlocked

***

#### **GET /api/titles/progress**

Get progress toward locked titles

**Headers**: `Authorization: Bearer <token>`

**Response** (200):

```json
{
  "success": true,
  "data": [
    {
      "titleId": "title124",
      "name": "Demon Hunter",
      "requirementType": "level",
      "progress": {
        "current": 15,
        "required": 50,
        "percentage": 30
      }
    },
    {
      "titleId": "title125",
      "name": "Iron Body",
      "requirementType": "streak",
      "progress": {
        "current": 7,
        "required": 30,
        "percentage": 23
      }
    }
  ]
}
```


***

### **User Routes** (`/api/users`)

#### **GET /api/users/profile**

Get user profile

**Headers**: `Authorization: Bearer <token>`

**Response** (200):

```json
{
  "success": true,
  "data": {
    "name": "Jin Woo",
    "email": "jinwoo@example.com",
    "level": 15,
    "rank": "D-Rank Hunter",
    "activeTitle": {
      "name": "Wolf Slayer",
      "rarity": "rare"
    },
    "stats": {
      "totalQuestsCompleted": 108,
      "dailyQuestStreak": 7,
      "longestStreak": 12,
      "totalXPEarned": 15420,
      "successRate": 94,
      "memberSince": "2025-09-15T10:00:00.000Z"
    }
  }
}
```


***

#### **GET /api/users/history**

Get quest completion history

**Headers**: `Authorization: Bearer <token>`

**Query Params**:

- `limit` (optional): default 20
- `page` (optional): default 1

**Response** (200):

```json
{
  "success": true,
  "data": {
    "completedQuests": [
      {
        "questTitle": "40 Push-ups",
        "category": "fitness",
        "completedAt": "2025-10-12T10:15:00.000Z",
        "statsGained": {
          "str": 3,
          "vit": 1
        },
        "xpGained": 25
      }
      // ... more quests
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 6,
      "totalQuests": 108
    }
  }
}
```


***

## ✅ **5. PROJECT STRUCTURE DOCUMENT**

Save this as `PROJECT_STRUCTURE.md`:

```markdown
# Solo Leveling MVP - Project Structure

## Technology Stack
- **Frontend**: React 18 + Vite + Tailwind CSS
- **Backend**: Node.js + Express.js
- **Database**: MongoDB + Mongoose
- **Authentication**: JWT (jsonwebtoken + bcryptjs)
- **Deployment**: Vercel (frontend) + Railway (backend)

## Folder Structure

### Backend (`/backend`)
```

backend/
├── models/              \# Mongoose schemas
├── controllers/         \# Business logic
├── routes/             \# API route definitions
├── middleware/         \# Auth, validation, error handling
├── services/           \# Reusable business services
├── utils/              \# Helper functions
├── seeds/              \# Database seeders
├── config/             \# Configuration files
├── .env                \# Environment variables
└── server.js           \# Entry point

```

### Frontend (`/frontend`)
```

frontend/
├── src/
│   ├── pages/          \# Route components
│   ├── components/     \# Reusable UI components
│   ├── context/        \# React Context providers
│   ├── services/       \# API service layer
│   ├── hooks/          \# Custom React hooks
│   ├── styles/         \# CSS files
│   └── utils/          \# Helper functions
├── public/             \# Static assets
└── index.html          \# Entry HTML

```

## Development Workflow
1. Start MongoDB locally or use MongoDB Atlas
2. Backend: `cd backend && npm run dev` (port 5000)
3. Frontend: `cd frontend && npm run dev` (port 5173)
4. Access: http://localhost:5173

## Environment Variables

### Backend `.env`
```

PORT=5000
MONGO_URI=mongodb://localhost:27017/solo-leveling
JWT_SECRET=your_super_secret_key_here
NODE_ENV=development

```

### Frontend `.env`
```

VITE_API_URL=http://localhost:5000/api

```

## API Base URL
- Development: `http://localhost:5000/api`
- Production: `https://your-backend.railway.app/api`

## Database Collections
- users
- quests
- completedquests
- titles
- dailyquestassignments

## Authentication Flow
1. User registers → JWT token returned
2. Token stored in localStorage
3. All API requests include: `Authorization: Bearer <token>`
4. Backend middleware verifies token
5. If valid → proceed, if not → 401 error

## Key Features Implementation Order
1. ✅ Auth system (register/login)
2. ✅ Onboarding flow (5 steps)
3. ✅ Daily quest generation
4. ✅ Quest completion + stat rewards
5. ✅ Level-up system
6. ✅ Stats dashboard
7. ✅ Title system
8. ✅ Profile page

## Testing
- Manual testing via browser
- Use Postman/Thunder Client for API testing
- Test accounts created during seeding

## Deployment Steps
1. Push backend to GitHub
2. Connect Railway.app to repo
3. Add environment variables in Railway
4. Deploy backend
5. Update frontend API URL
6. Deploy frontend to Vercel
```


***

## 🎯 **YOU'RE READY TO START CODING**

**Current time: 9:46 AM IST**

All planning is DONE. You now have:
✅ Feature list
✅ Component breakdown
✅ Database schemas
✅ API specifications
✅ Project structure

**Your next message to me should be**:

"Give me the complete server.js file with MongoDB connection and basic Express setup"

Then we'll move through each file systematically. Let's build! 🚀

