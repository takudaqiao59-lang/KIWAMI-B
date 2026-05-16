export type UserRole = 'beginner' | 'coach'
export type PlanType = 'single' | 'monthly_4' | 'monthly_8'
export type LessonStatus = 'scheduled' | 'completed' | 'cancelled'
export type MessageType = 'text' | 'image' | 'video'

export interface Profile {
  id: string
  role: UserRole
  nickname: string
  avatar_url: string | null
  bio: string | null
  goals: string[] | null
  created_at: string
}

export interface CoachProfile {
  id: string
  user_id: string
  experience_years: number
  coaching_years: number
  categories: string[]
  price_single: number
  price_monthly_4: number
  price_monthly_8: number
  portfolio_url: string | null
  rating: number
  review_count: number
  profiles: Profile
}

export interface Lesson {
  id: string
  coach_id: string
  beginner_id: string
  plan: PlanType
  status: LessonStatus
  scheduled_at: string
  completed_at: string | null
  price: number
  notes: string | null
}

export interface Message {
  id: string
  conversation_id: string
  sender_id: string
  type: MessageType
  content: string
  file_url: string | null
  created_at: string
}

export interface Review {
  id: string
  coach_id: string
  beginner_id: string
  lesson_id: string
  rating: number
  comment: string | null
  created_at: string
}

export type Database = {
  public: {
    Tables: {
      profiles: { Row: Profile; Insert: Omit<Profile, 'created_at'>; Update: Partial<Profile> }
      coach_profiles: { Row: CoachProfile; Insert: Omit<CoachProfile, 'rating' | 'review_count'>; Update: Partial<CoachProfile> }
      lessons: { Row: Lesson; Insert: Omit<Lesson, 'id' | 'completed_at'>; Update: Partial<Lesson> }
      messages: { Row: Message; Insert: Omit<Message, 'id' | 'created_at'>; Update: Partial<Message> }
      reviews: { Row: Review; Insert: Omit<Review, 'id' | 'created_at'>; Update: Partial<Review> }
    }
  }
}
