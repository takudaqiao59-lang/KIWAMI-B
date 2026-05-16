import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'KIWAMI — 体を、極める。',
  description: '筋トレコーチとビギナーをつなぐマッチングプラットフォーム。フォームチェック、メニュー作成、1on1チャット。',
  keywords: '筋トレ, パーソナルコーチ, マッチング, フォームチェック, トレーニング',
  openGraph: {
    title: 'KIWAMI',
    description: '体を、極める。筋トレコーチとビギナーのマッチングプラットフォーム。',
    type: 'website',
  },
  icons: [{ rel: 'icon', url: '/logo.svg' }],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  )
}
