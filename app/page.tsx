import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import { Video, MessageCircle, UserCheck, Target, Calendar, Star, ArrowRight } from 'lucide-react'

export default function HomePage() {
  return (
    <div>
      <Navbar />

      {/* HERO */}
      <section style={{
        background: '#0a0a0a', padding: '96px 24px 72px', textAlign: 'center',
        borderBottom: '0.5px solid #222', position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: '#D02020',
        }} />
        <div style={{
          display: 'inline-block', fontSize: 11, letterSpacing: 3, color: '#D02020',
          border: '0.5px solid #D02020', padding: '4px 16px', borderRadius: 2, marginBottom: 32,
        }}>
          COACH × BEGINNER MATCHING
        </div>
        <h1 style={{
          fontSize: 56, fontWeight: 500, letterSpacing: -2, lineHeight: 1.1,
          marginBottom: 20, color: '#fff',
        }}>
          体を、<span style={{ color: '#D02020' }}>極める</span>。
        </h1>
        <p style={{
          fontSize: 16, color: 'rgba(255,255,255,0.5)', maxWidth: 480, margin: '0 auto 40px',
          lineHeight: 1.8,
        }}>
          フォームチェック、メニュー作成、1on1チャット。本気で変わりたい人と、気軽に教えたいコーチをつなぐプラットフォーム。
        </p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/coaches">
            <button className="btn-red" style={{ fontSize: 15, padding: '12px 28px' }}>
              コーチを探す <ArrowRight size={16} />
            </button>
          </Link>
          <Link href="/auth/register?role=coach">
            <button className="btn-ghost" style={{ fontSize: 15, padding: '12px 28px' }}>
              コーチとして登録
            </button>
          </Link>
        </div>
      </section>

      {/* STATS */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)' }}>
        {[
          { num: '60+', label: 'アクティブコーチ' },
          { num: '300+', label: '受講者' },
          { num: '4.9', label: '平均評価' },
        ].map((s, i) => (
          <div key={i} style={{
            padding: '32px 24px', textAlign: 'center',
            borderRight: i < 2 ? '0.5px solid #e5e5e5' : 'none',
            borderBottom: '0.5px solid #e5e5e5',
          }}>
            <div style={{ fontSize: 40, fontWeight: 500, letterSpacing: -1.5, color: '#D02020' }}>{s.num}</div>
            <div style={{ fontSize: 12, color: '#999', marginTop: 4 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* FEATURES */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)' }}>
        {[
          { icon: <Video size={20} />, title: 'フォームチェック', desc: '動画・画像をアップするだけ。プロコーチが丁寧にフィードバック。' },
          { icon: <MessageCircle size={20} />, title: '1on1チャット', desc: 'メニュー・スケジュールをチャットで共有。いつでも相談できる。' },
          { icon: <UserCheck size={20} />, title: '匿名OK', desc: 'ニックネームで始められる。顔出し不要、気軽にスタート。' },
          { icon: <Target size={20} />, title: '目標マッチング', desc: '目標・予算・レベルに合ったコーチをレコメンド。' },
          { icon: <Calendar size={20} />, title: '柔軟なプラン', desc: '単発2,000円〜。月4回・月8回の定期プランも選べる。' },
          { icon: <Star size={20} />, title: 'レビュー・評価', desc: '★5評価とコメントで安心してコーチを選べる。' },
        ].map((f, i) => (
          <div key={i} style={{
            padding: '28px 24px',
            borderRight: i % 3 !== 2 ? '0.5px solid #e5e5e5' : 'none',
            borderBottom: '0.5px solid #e5e5e5',
          }}>
            <div style={{ color: '#D02020', marginBottom: 12 }}>{f.icon}</div>
            <div style={{ fontSize: 14, fontWeight: 500, marginBottom: 6 }}>{f.title}</div>
            <div style={{ fontSize: 12, color: '#888', lineHeight: 1.7 }}>{f.desc}</div>
          </div>
        ))}
      </div>

      {/* PLANS */}
      <section style={{ padding: '56px 24px' }}>
        <h2 style={{ fontSize: 22, fontWeight: 500, marginBottom: 28, letterSpacing: -0.5 }}>料金プラン</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
          <PlanCard
            name="SINGLE"
            price="¥2,000〜"
            sub="1回あたり"
            features={['単発レッスン', 'フォームチェック1回', 'チャットサポート']}
          />
          <PlanCard
            name="MONTHLY 4"
            price="¥10,000〜"
            sub="月4回 / 月額"
            features={['月4回レッスン', 'フォームチェック無制限', 'メニュー作成込み']}
            featured
          />
          <PlanCard
            name="MONTHLY 8"
            price="¥18,000〜"
            sub="月8回 / 月額"
            features={['月8回レッスン', '週次スケジュール管理', '優先サポート']}
          />
        </div>
      </section>

      {/* CTA FOOTER */}
      <section style={{
        background: '#0a0a0a', padding: '64px 24px', textAlign: 'center',
        borderTop: '0.5px solid #222',
      }}>
        <h2 style={{ fontSize: 32, fontWeight: 500, color: '#fff', letterSpacing: -1, marginBottom: 16 }}>
          今日から、<span style={{ color: '#D02020' }}>極める</span>。
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.5)', marginBottom: 32, fontSize: 15 }}>
          無料登録でコーチを探せます。単発から始めてOK。
        </p>
        <Link href="/auth/register">
          <button className="btn-red" style={{ fontSize: 15, padding: '14px 36px' }}>
            無料で始める <ArrowRight size={16} />
          </button>
        </Link>
      </section>

      {/* FOOTER */}
      <footer style={{
        padding: '24px', borderTop: '0.5px solid #e5e5e5',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        fontSize: 12, color: '#999',
      }}>
        <span>KIWAMI<span style={{ color: '#D02020' }}>.</span></span>
        <span>© 2025 KIWAMI. All rights reserved.</span>
        <div style={{ display: 'flex', gap: 16 }}>
          <Link href="/terms" style={{ color: '#999', textDecoration: 'none' }}>利用規約</Link>
          <Link href="/privacy" style={{ color: '#999', textDecoration: 'none' }}>プライバシー</Link>
        </div>
      </footer>
    </div>
  )
}

function PlanCard({ name, price, sub, features, featured }: {
  name: string; price: string; sub: string; features: string[]; featured?: boolean
}) {
  return (
    <div style={{
      border: featured ? '2px solid #D02020' : '0.5px solid #e5e5e5',
      borderRadius: 12, padding: 24,
    }}>
      {featured && (
        <div className="badge-red" style={{ marginBottom: 10 }}>人気 No.1</div>
      )}
      <div style={{ fontSize: 11, color: '#999', letterSpacing: 1, marginBottom: 8 }}>{name}</div>
      <div style={{ fontSize: 30, fontWeight: 500, letterSpacing: -1 }}>{price}</div>
      <div style={{ fontSize: 12, color: '#999', marginTop: 4, marginBottom: 20 }}>{sub}</div>
      {features.map((f, i) => (
        <div key={i} style={{
          fontSize: 12, color: '#666', padding: '6px 0',
          borderTop: '0.5px solid #f0f0f0',
          display: 'flex', alignItems: 'center', gap: 8,
        }}>
          <span style={{ color: '#D02020', fontSize: 14 }}>✓</span> {f}
        </div>
      ))}
      <Link href="/auth/register">
        <button
          className={featured ? 'btn-red' : 'btn-outline'}
          style={{ width: '100%', marginTop: 20, justifyContent: 'center' }}
        >
          始める
        </button>
      </Link>
    </div>
  )
}
