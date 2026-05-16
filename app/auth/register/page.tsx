'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

type Role = 'beginner' | 'coach'

export default function RegisterPage() {
  const [role, setRole] = useState<Role>('beginner')
  const [nickname, setNickname] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    // TODO: Supabase signUp + profile insert
    setTimeout(() => setLoading(false), 1000)
  }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: '100vh' }}>
      <div style={{ background: '#0a0a0a', padding: 48, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', position: 'relative' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, width: 3, height: '100%', background: '#D02020' }} />
        <Link href="/" style={{ textDecoration: 'none' }}>
          <span style={{ fontSize: 16, fontWeight: 500, letterSpacing: 2, color: '#fff' }}>
            KIWAMI<span style={{ color: '#D02020' }}>.</span>
          </span>
        </Link>
        <div>
          <div style={{ fontSize: 13, color: '#D02020', letterSpacing: 1, marginBottom: 12 }}>COACH × BEGINNER MATCHING</div>
          <div style={{ fontSize: 26, fontWeight: 500, color: '#fff', lineHeight: 1.5 }}>
            本気で変わりたい人と、<br />教えたいコーチをつなぐ。
          </div>
          <div style={{ marginTop: 24, display: 'flex', flexDirection: 'column', gap: 10 }}>
            {['フォームチェック動画送信', '1on1チャット', '単発から始められる', '匿名（ニックネーム）OK'].map(f => (
              <div key={f} style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ color: '#D02020' }}>✓</span> {f}
              </div>
            ))}
          </div>
        </div>
        <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.2)' }}>© 2025 KIWAMI</div>
      </div>

      <div style={{ padding: 48, display: 'flex', flexDirection: 'column', justifyContent: 'center', maxWidth: 420, margin: '0 auto', width: '100%' }}>
        <h1 style={{ fontSize: 22, fontWeight: 500, marginBottom: 4 }}>アカウント作成</h1>
        <p style={{ fontSize: 13, color: '#999', marginBottom: 24 }}>
          すでにお持ちの方は <Link href="/auth/login" style={{ color: '#D02020', textDecoration: 'none' }}>ログイン</Link>
        </p>

        {/* ROLE SWITCH */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 24 }}>
          {(['beginner', 'coach'] as Role[]).map(r => (
            <button key={r} onClick={() => setRole(r)}
              style={{
                padding: '10px', borderRadius: 6, fontSize: 13, cursor: 'pointer',
                border: role === r ? 'none' : '0.5px solid #e5e5e5',
                background: role === r ? '#D02020' : 'transparent',
                color: role === r ? '#fff' : '#888',
                fontWeight: role === r ? 500 : 400,
              }}
            >
              {r === 'beginner' ? '受講者として登録' : 'コーチとして登録'}
            </button>
          ))}
        </div>

        <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div>
            <label style={{ fontSize: 12, color: '#666', display: 'block', marginBottom: 6 }}>ニックネーム（匿名OK）</label>
            <input value={nickname} onChange={e => setNickname(e.target.value)} placeholder="例: テツ / sakura_fit" required />
          </div>
          <div>
            <label style={{ fontSize: 12, color: '#666', display: 'block', marginBottom: 6 }}>メールアドレス</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" required />
          </div>
          <div>
            <label style={{ fontSize: 12, color: '#666', display: 'block', marginBottom: 6 }}>パスワード</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="8文字以上" minLength={8} required />
          </div>
          <button type="submit" className="btn-red" disabled={loading}
            style={{ justifyContent: 'center', padding: 12, marginTop: 4, opacity: loading ? 0.7 : 1 }}
          >
            {loading ? '登録中...' : '無料で登録する'} {!loading && <ArrowRight size={15} />}
          </button>
        </form>

        <div style={{ textAlign: 'center', fontSize: 12, color: '#bbb', margin: '20px 0' }}>または</div>
        <button className="btn-outline" style={{ width: '100%', justifyContent: 'center', gap: 8, padding: '11px' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          Googleで登録
        </button>
        <p style={{ fontSize: 11, color: '#bbb', textAlign: 'center', marginTop: 20, lineHeight: 1.6 }}>
          登録することで<Link href="/terms" style={{ color: '#999' }}>利用規約</Link>および<Link href="/privacy" style={{ color: '#999' }}>プライバシーポリシー</Link>に同意したものとみなされます。
        </p>
      </div>
    </div>
  )
}
