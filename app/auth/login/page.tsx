'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    // TODO: Supabase auth
    // const { error } = await supabase.auth.signInWithPassword({ email, password })
    // if (error) setError(error.message)
    // else router.push('/dashboard')
    setTimeout(() => setLoading(false), 1000)
  }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: '100vh' }}>
      {/* LEFT — dark */}
      <div style={{ background: '#0a0a0a', padding: 48, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', position: 'relative' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, width: 3, height: '100%', background: '#D02020' }} />
        <Link href="/" style={{ textDecoration: 'none' }}>
          <span style={{ fontSize: 16, fontWeight: 500, letterSpacing: 2, color: '#fff' }}>
            KIWAMI<span style={{ color: '#D02020' }}>.</span>
          </span>
        </Link>
        <div>
          <div style={{ fontSize: 28, fontWeight: 500, color: '#fff', lineHeight: 1.4, letterSpacing: -0.5 }}>
            "体を、<br /><span style={{ color: '#D02020' }}>極める</span>。"
          </div>
          <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', marginTop: 10 }}>— KIWAMI コーチ陣</div>
        </div>
        <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.2)' }}>© 2025 KIWAMI</div>
      </div>

      {/* RIGHT — form */}
      <div style={{ padding: 48, display: 'flex', flexDirection: 'column', justifyContent: 'center', maxWidth: 420, margin: '0 auto', width: '100%' }}>
        <h1 style={{ fontSize: 22, fontWeight: 500, marginBottom: 4 }}>ログイン</h1>
        <p style={{ fontSize: 13, color: '#999', marginBottom: 32 }}>
          アカウントをお持ちでない方は <Link href="/auth/register" style={{ color: '#D02020', textDecoration: 'none' }}>新規登録</Link>
        </p>

        {error && (
          <div style={{ background: '#fff0f0', border: '0.5px solid #ffcccc', borderRadius: 6, padding: '10px 14px', fontSize: 13, color: '#D02020', marginBottom: 16 }}>
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div>
            <label style={{ fontSize: 12, color: '#666', display: 'block', marginBottom: 6 }}>メールアドレス</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" required />
          </div>
          <div>
            <label style={{ fontSize: 12, color: '#666', display: 'block', marginBottom: 6 }}>パスワード</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" required />
          </div>
          <div style={{ textAlign: 'right' }}>
            <Link href="/auth/forgot-password" style={{ fontSize: 12, color: '#999', textDecoration: 'none' }}>パスワードを忘れた方</Link>
          </div>
          <button type="submit" className="btn-red" disabled={loading}
            style={{ justifyContent: 'center', padding: '12px', opacity: loading ? 0.7 : 1 }}
          >
            {loading ? 'ログイン中...' : 'ログイン'} {!loading && <ArrowRight size={15} />}
          </button>
        </form>

        <div style={{ textAlign: 'center', fontSize: 12, color: '#bbb', margin: '20px 0' }}>または</div>

        <button className="btn-outline" style={{ width: '100%', justifyContent: 'center', gap: 8, padding: '11px' }}>
          <GoogleIcon /> Googleでログイン
        </button>
      </div>
    </div>
  )
}

function GoogleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  )
}
