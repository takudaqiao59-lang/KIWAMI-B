'use client'

import { useState } from 'react'
import Navbar from '@/components/layout/Navbar'
import Link from 'next/link'
import { Star, Filter } from 'lucide-react'

const COACHES = [
  { id: '1', initials: 'TK', name: '田中 健斗', exp: 8, coachExp: 2, tags: ['筋肥大', '初心者OK', '栄養指導'], bio: 'ゼロからでも大丈夫。一人ひとりに合わせたメニューで確実に成果を出します。', price: 3000, rating: 4.9, reviews: 38 },
  { id: '2', initials: 'AS', name: '青木 さくら', exp: 5, coachExp: 1, tags: ['ダイエット', '女性歓迎', 'ストレッチ'], bio: '無理なく楽しく続けられるトレーニングを提案します。食事指導も得意です。', price: 2500, rating: 4.8, reviews: 22 },
  { id: '3', initials: 'MN', name: '松本 直樹', exp: 12, coachExp: 5, tags: ['筋肥大', 'パワーリフト', '上級対応'], bio: '本気で記録を伸ばしたい人向け。科学的根拠に基づいたプログラムを組みます。', price: 5000, rating: 5.0, reviews: 61 },
  { id: '4', initials: 'RY', name: '渡辺 涼', exp: 4, coachExp: 1, tags: ['体力UP', '姿勢改善', '自重トレ'], bio: 'ジムなしでもOK。自宅でできるトレーニングで体質改善をサポートします。', price: 2000, rating: 4.7, reviews: 9 },
  { id: '5', initials: 'HK', name: '林 健一', exp: 10, coachExp: 3, tags: ['筋肥大', '有酸素', '栄養指導'], bio: '筋肉をつけながら脂肪を落とすリコンプに特化。結果にコミットします。', price: 4000, rating: 4.9, reviews: 45 },
  { id: '6', initials: 'YM', name: '山田 美咲', exp: 6, coachExp: 2, tags: ['ダイエット', '姿勢改善', '初心者OK'], bio: '産後ダイエット・姿勢改善が得意。女性の悩みに寄り添います。', price: 3000, rating: 4.8, reviews: 33 },
]

const GOALS = ['全て', '筋肥大', 'ダイエット', '体力UP', '姿勢改善']
const LEVELS = ['全て', '初心者', '中級', '上級']

export default function CoachesPage() {
  const [goal, setGoal] = useState('全て')
  const [level, setLevel] = useState('全て')
  const [budget, setBudget] = useState(20000)

  const filtered = COACHES.filter(c => {
    if (goal !== '全て' && !c.tags.some(t => t.includes(goal))) return false
    if (level === '初心者' && !c.tags.some(t => t.includes('初心者'))) return false
    if (level === '上級' && !c.tags.some(t => t.includes('上級'))) return false
    if (c.price > budget) return false
    return true
  })

  return (
    <div>
      <Navbar />
      <div style={{ display: 'grid', gridTemplateColumns: '240px 1fr', minHeight: 'calc(100vh - 57px)' }}>

        {/* FILTER PANEL */}
        <aside style={{ borderRight: '0.5px solid #e5e5e5', padding: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20, fontSize: 13, fontWeight: 500 }}>
            <Filter size={14} /> 絞り込み
          </div>

          <FilterGroup label="目標">
            {GOALS.map(g => (
              <Chip key={g} active={goal === g} onClick={() => setGoal(g)}>{g}</Chip>
            ))}
          </FilterGroup>

          <FilterGroup label="レベル">
            {LEVELS.map(l => (
              <Chip key={l} active={level === l} onClick={() => setLevel(l)}>{l}</Chip>
            ))}
          </FilterGroup>

          <FilterGroup label={`予算 / 回 〜¥${budget.toLocaleString()}`}>
            <input
              type="range" min={2000} max={20000} step={1000} value={budget}
              onChange={e => setBudget(Number(e.target.value))}
              style={{ width: '100%', marginTop: 8, accentColor: '#D02020' }}
            />
          </FilterGroup>

          <FilterGroup label="プラン">
            {['単発', '月額'].map(p => (
              <Chip key={p} active={false} onClick={() => {}}>{p}</Chip>
            ))}
          </FilterGroup>
        </aside>

        {/* COACH GRID */}
        <main style={{ padding: 24 }}>
          <div style={{ marginBottom: 16, fontSize: 13, color: '#999' }}>
            {filtered.length}人のコーチが見つかりました
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 14 }}>
            {filtered.map(coach => (
              <Link key={coach.id} href={`/coaches/${coach.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <div className="card" style={{ cursor: 'pointer', transition: 'border-color 0.15s' }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = '#D02020')}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = '#e5e5e5')}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                    <div style={{
                      width: 46, height: 46, borderRadius: '50%', background: '#D02020',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: '#fff', fontWeight: 500, fontSize: 13, flexShrink: 0,
                    }}>{coach.initials}</div>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 500 }}>{coach.name}</div>
                      <div style={{ fontSize: 12, color: '#999' }}>トレ歴{coach.exp}年 / 指導{coach.coachExp}年</div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginBottom: 10 }}>
                    {coach.tags.map(t => <span key={t} className="tag">{t}</span>)}
                  </div>
                  <p style={{ fontSize: 12, color: '#777', lineHeight: 1.6, marginBottom: 12 }}>{coach.bio}</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '0.5px solid #f0f0f0', paddingTop: 10 }}>
                    <span style={{ fontSize: 14, fontWeight: 500 }}>¥{coach.price.toLocaleString()} / 回</span>
                    <span style={{ fontSize: 12, color: '#999', display: 'flex', alignItems: 'center', gap: 4 }}>
                      <Star size={12} fill="#D02020" color="#D02020" /> {coach.rating} ({coach.reviews}件)
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </main>
      </div>
    </div>
  )
}

function FilterGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 24 }}>
      <div style={{ fontSize: 11, color: '#999', letterSpacing: 0.5, marginBottom: 10 }}>{label}</div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>{children}</div>
    </div>
  )
}

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button onClick={onClick} style={{
      padding: '5px 12px', borderRadius: 3, fontSize: 12, cursor: 'pointer',
      border: active ? 'none' : '0.5px solid #e5e5e5',
      background: active ? '#D02020' : 'transparent',
      color: active ? '#fff' : '#666',
      transition: 'all 0.15s',
    }}>{children}</button>
  )
}
