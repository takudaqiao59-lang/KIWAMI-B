'use client'

import { useState } from 'react'
import Navbar from '@/components/layout/Navbar'
import Link from 'next/link'
import { LayoutDashboard, Users, Calendar, LineChart, MessageCircle, User, Settings, ArrowRight } from 'lucide-react'

const SIDEBAR = [
  { icon: LayoutDashboard, label: 'ホーム', href: '/dashboard' },
  { icon: Users, label: 'コーチ', href: '/coaches' },
  { icon: Calendar, label: 'スケジュール', href: '/dashboard/schedule' },
  { icon: LineChart, label: '進捗', href: '/dashboard/progress' },
  { icon: MessageCircle, label: 'チャット', href: '/chat' },
]

const LESSONS = [
  { initials: 'TK', name: '田中 健斗', time: '5/15 · 脚トレ', status: 'done' },
  { initials: 'TK', name: '田中 健斗', time: '5/17 · 胸トレ', status: 'soon' },
  { initials: 'AS', name: '青木 さくら', time: '5/20 · ストレッチ', status: 'pending' },
]

const BARS = [40, 65, 10, 55, 75, 10, 45]
const DAYS = ['月', '火', '水', '木', '金', '土', '日']

const STATUS_STYLE: Record<string, React.CSSProperties> = {
  done: { background: '#111', color: '#fff', fontSize: 10, padding: '2px 8px', borderRadius: 3 },
  soon: { background: '#D02020', color: '#fff', fontSize: 10, padding: '2px 8px', borderRadius: 3 },
  pending: { background: 'transparent', color: '#999', fontSize: 10, padding: '2px 8px', borderRadius: 3, border: '0.5px solid #ddd' },
}
const STATUS_LABEL: Record<string, string> = { done: '完了', soon: '予定', pending: '調整中' }

export default function DashboardPage() {
  const [activeNav, setActiveNav] = useState('/dashboard')

  return (
    <div>
      <Navbar />
      <div style={{ display: 'grid', gridTemplateColumns: '180px 1fr', minHeight: 'calc(100vh - 57px)' }}>

        {/* SIDEBAR */}
        <aside style={{ borderRight: '0.5px solid #e5e5e5', padding: '16px 0' }}>
          <div style={{ padding: '0 16px 12px', fontSize: 11, color: '#bbb', letterSpacing: 0.5 }}>受講者</div>
          {SIDEBAR.map(item => {
            const Icon = item.icon
            const active = activeNav === item.href
            return (
              <div key={item.href} onClick={() => setActiveNav(item.href)}
                style={{
                  padding: '10px 16px', display: 'flex', alignItems: 'center', gap: 10,
                  fontSize: 13, cursor: 'pointer',
                  color: active ? '#D02020' : '#888',
                  fontWeight: active ? 500 : 400,
                  background: active ? '#fff8f8' : 'transparent',
                  borderLeft: active ? '2px solid #D02020' : '2px solid transparent',
                }}
              >
                <Icon size={15} /> {item.label}
              </div>
            )
          })}
          <div style={{ padding: '12px 16px 8px', fontSize: 11, color: '#bbb', letterSpacing: 0.5, marginTop: 8 }}>設定</div>
          {[{ icon: User, label: 'プロフィール' }, { icon: Settings, label: '設定' }].map(item => {
            const Icon = item.icon
            return (
              <div key={item.label}
                style={{ padding: '10px 16px', display: 'flex', alignItems: 'center', gap: 10, fontSize: 13, cursor: 'pointer', color: '#888' }}
              >
                <Icon size={15} /> {item.label}
              </div>
            )
          })}
        </aside>

        {/* MAIN */}
        <main style={{ padding: 28 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
            <div>
              <h1 style={{ fontSize: 20, fontWeight: 500 }}>おはようございます</h1>
              <p style={{ fontSize: 13, color: '#999', marginTop: 2 }}>今週も頑張りましょう</p>
            </div>
            <Link href="/coaches">
              <button className="btn-red" style={{ fontSize: 13, padding: '9px 16px' }}>
                コーチを探す <ArrowRight size={14} />
              </button>
            </Link>
          </div>

          {/* KPI GRID */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10, marginBottom: 24 }}>
            {[
              { label: '今月のレッスン', value: '6', delta: '↑ +2', pos: true },
              { label: 'フォームチェック', value: '12', delta: '↑ +5', pos: true },
              { label: '継続日数', value: '34日', delta: '自己記録', pos: true },
              { label: '今月の支出', value: '¥18,000', delta: '月額プラン', pos: false },
            ].map((k, i) => (
              <div key={i} style={{ background: '#f8f8f8', borderRadius: 8, padding: 14 }}>
                <div style={{ fontSize: 11, color: '#999', marginBottom: 6 }}>{k.label}</div>
                <div style={{ fontSize: 22, fontWeight: 500, letterSpacing: -0.5 }}>{k.value}</div>
                <div style={{ fontSize: 11, color: k.pos ? '#D02020' : '#999', marginTop: 2 }}>{k.delta}</div>
              </div>
            ))}
          </div>

          {/* SECTION ROW */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            {/* LESSONS */}
            <div className="card">
              <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 14 }}>直近のレッスン</div>
              {LESSONS.map((l, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0', borderTop: i > 0 ? '0.5px solid #f5f5f5' : 'none' }}>
                  <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#D02020', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 500, color: '#fff', flexShrink: 0 }}>
                    {l.initials}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 12, fontWeight: 500 }}>{l.name}</div>
                    <div style={{ fontSize: 11, color: '#999' }}>{l.time}</div>
                  </div>
                  <span style={STATUS_STYLE[l.status]}>{STATUS_LABEL[l.status]}</span>
                </div>
              ))}
            </div>

            {/* BAR CHART */}
            <div className="card">
              <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 16 }}>週間トレーニング</div>
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, height: 80 }}>
                {BARS.map((h, i) => (
                  <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                    <div style={{ width: '100%', height: h, background: h > 20 ? '#D02020' : '#f0f0f0', borderRadius: '2px 2px 0 0', minHeight: 4 }} />
                    <div style={{ fontSize: 10, color: '#bbb' }}>{DAYS[i]}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
