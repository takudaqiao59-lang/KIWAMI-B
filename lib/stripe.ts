import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-04-10',
})

export const STRIPE_PLANS = {
  single:     { price: 200000, name: '単発レッスン' },   // ¥2,000 base (coach sets actual)
  monthly_4:  { price: 1000000, name: 'Monthly 4' },    // ¥10,000 base
  monthly_8:  { price: 1800000, name: 'Monthly 8' },    // ¥18,000 base
} as const

// Platform fee rates by session count
export function getPlatformFeeRate(sessionCount: number): number {
  if (sessionCount >= 100) return 0.15
  if (sessionCount >= 11)  return 0.20
  return 0.29
}
