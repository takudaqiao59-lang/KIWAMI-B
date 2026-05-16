'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'

export default function Navbar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <nav style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '14px 24px', borderBottom: '0.5px solid #e5e5e5',
      background: '#fff', position: 'sticky', top: 0, zIndex: 50,
    }}>
      <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10 }}>
        <Image src="/logo.svg" alt="KIWAMI logo" width={120} height={24} priority />
      </Link>

      {/* Desktop */}
      <div style={{ display: 'flex', gap: 24, alignItems: 'center' }} className="desktop-nav">
        <NavLink href="/coaches" active={pathname.startsWith('/coaches')}>コーチを探す</NavLink>
        <NavLink href="/dashboard" active={pathname.startsWith('/dashboard')}>ダッシュボード</NavLink>
        <NavLink href="/chat" active={pathname.startsWith('/chat')}>チャット</NavLink>
        <Link href="/auth/login" style={{ textDecoration: 'none' }}>
          <button className="btn-outline" style={{ padding: '8px 16px', fontSize: 13 }}>ログイン</button>
        </Link>
        <Link href="/auth/register" style={{ textDecoration: 'none' }}>
          <button className="btn-red" style={{ padding: '8px 16px', fontSize: 13 }}>はじめる</button>
        </Link>
      </div>

      {/* Mobile hamburger */}
      <button
        onClick={() => setOpen(!open)}
        style={{ display: 'none', background: 'none', border: 'none', cursor: 'pointer' }}
        className="mobile-menu-btn"
        aria-label="メニュー"
      >
        {open ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Mobile drawer */}
      {open && (
        <div style={{
          position: 'absolute', top: '100%', left: 0, right: 0,
          background: '#fff', borderBottom: '0.5px solid #e5e5e5',
          padding: '16px 24px', display: 'flex', flexDirection: 'column', gap: 16,
          zIndex: 50,
        }}>
          <Link href="/coaches" style={{ fontSize: 14, color: '#111', textDecoration: 'none' }}>コーチを探す</Link>
          <Link href="/dashboard" style={{ fontSize: 14, color: '#111', textDecoration: 'none' }}>ダッシュボード</Link>
          <Link href="/chat" style={{ fontSize: 14, color: '#111', textDecoration: 'none' }}>チャット</Link>
          <Link href="/auth/login"><button className="btn-outline" style={{ width: '100%' }}>ログイン</button></Link>
          <Link href="/auth/register"><button className="btn-red" style={{ width: '100%' }}>はじめる</button></Link>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: block !important; }
        }
      `}</style>
    </nav>
  )
}

function NavLink({ href, active, children }: { href: string; active: boolean; children: React.ReactNode }) {
  return (
    <Link href={href} style={{
      fontSize: 13, color: active ? '#D02020' : '#666',
      textDecoration: 'none', fontWeight: active ? 500 : 400,
    }}>
      {children}
    </Link>
  )
}
