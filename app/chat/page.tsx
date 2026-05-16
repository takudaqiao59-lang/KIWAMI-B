'use client'

import { useState, useRef, useEffect } from 'react'
import Navbar from '@/components/layout/Navbar'
import { Send, Phone, Video, Image, MoreHorizontal } from 'lucide-react'

const CONVERSATIONS = [
  { id: '1', initials: 'TK', name: '田中 健斗', preview: 'スクワット動画確認しました！', unread: 2, online: true },
  { id: '2', initials: 'AS', name: '青木 さくら', preview: '来週のメニューを送りますね', unread: 0, online: false },
  { id: '3', initials: 'MN', name: '松本 直樹', preview: 'ベンチプレス記録更新おめでとう', unread: 0, online: true },
]

const MESSAGES = [
  { id: '1', mine: false, text: 'お疲れ様でした！今日のセッションどうでしたか？スクワットの動画送ってもらえますか？', time: '14:03' },
  { id: '2', mine: true, text: 'ありがとうございます！思ったより脚に効いた気がします。今撮ってみます！', time: '14:10' },
  { id: '3', mine: true, text: '', time: '14:12', video: { name: 'squat_20250515.mp4', duration: '58秒', size: '24MB' } },
  { id: '4', mine: false, text: '確認しました！膝の向きがとても良くなってますね。股関節をもう少し意識してみてください。来週のメニューも送ります。', time: '14:28' },
  { id: '5', mine: false, text: '月: 脚 / 臀部\n水: 胸 / 三頭筋\n金: 背中 / 二頭筋\n土: 肩 / 体幹', time: '14:30' },
]

export default function ChatPage() {
  const [active, setActive] = useState('1')
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState(MESSAGES)
  const endRef = useRef<HTMLDivElement>(null)

  const conv = CONVERSATIONS.find(c => c.id === active)!

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [messages])

  const send = () => {
    if (!input.trim()) return
    setMessages(prev => [...prev, { id: String(Date.now()), mine: true, text: input, time: new Date().toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit' }) }])
    setInput('')
  }

  return (
    <div>
      <Navbar />
      <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', height: 'calc(100vh - 57px)' }}>

        {/* CONVERSATION LIST */}
        <aside style={{ borderRight: '0.5px solid #e5e5e5', display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: '14px 16px', borderBottom: '0.5px solid #e5e5e5', fontSize: 13, fontWeight: 500 }}>
            メッセージ
          </div>
          {CONVERSATIONS.map(c => (
            <div key={c.id} onClick={() => setActive(c.id)}
              style={{
                padding: '14px 16px', borderBottom: '0.5px solid #f5f5f5',
                cursor: 'pointer', display: 'flex', gap: 10, alignItems: 'flex-start',
                background: active === c.id ? '#fafafa' : 'transparent',
              }}
            >
              <div style={{
                width: 36, height: 36, borderRadius: '50%', flexShrink: 0,
                background: active === c.id ? '#D02020' : '#555',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#fff', fontSize: 11, fontWeight: 500,
              }}>{c.initials}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 500 }}>{c.name}</div>
                <div style={{ fontSize: 11, color: '#999', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', marginTop: 2 }}>{c.preview}</div>
              </div>
              {c.unread > 0 && (
                <div style={{ background: '#D02020', color: '#fff', borderRadius: 10, fontSize: 10, padding: '2px 6px', flexShrink: 0 }}>
                  {c.unread}
                </div>
              )}
            </div>
          ))}
        </aside>

        {/* CHAT MAIN */}
        <main style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          {/* Top bar */}
          <div style={{ padding: '14px 16px', borderBottom: '0.5px solid #e5e5e5', display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: 36, height: 36, borderRadius: '50%', background: '#D02020',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#fff', fontSize: 11, fontWeight: 500,
            }}>{conv.initials}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 500 }}>{conv.name}</div>
              <div style={{ fontSize: 12, color: '#999', display: 'flex', alignItems: 'center', gap: 4 }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: conv.online ? '#D02020' : '#ccc' }} />
                {conv.online ? 'オンライン' : 'オフライン'}
              </div>
            </div>
            <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#999', padding: 6 }} aria-label="電話">
              <Phone size={18} />
            </button>
            <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#999', padding: 6 }} aria-label="ビデオ">
              <Video size={18} />
            </button>
            <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#999', padding: 6 }} aria-label="その他">
              <MoreHorizontal size={18} />
            </button>
          </div>

          {/* Messages */}
          <div style={{ flex: 1, padding: 16, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 10 }}>
            {messages.map(msg => (
              <div key={msg.id} style={{ display: 'flex', justifyContent: msg.mine ? 'flex-end' : 'flex-start' }}>
                <div style={{ maxWidth: '75%' }}>
                  {msg.video ? (
                    <div style={{
                      border: '0.5px solid #e5e5e5', borderRadius: 8, padding: '10px 14px',
                      display: 'flex', alignItems: 'center', gap: 10, background: '#fafafa',
                    }}>
                      <Video size={20} color="#D02020" />
                      <div>
                        <div style={{ fontWeight: 500, fontSize: 13 }}>{msg.video.name}</div>
                        <div style={{ fontSize: 11, color: '#999' }}>{msg.video.duration} · {msg.video.size}</div>
                      </div>
                    </div>
                  ) : (
                    <div style={{
                      padding: '10px 14px', borderRadius: msg.mine ? '12px 12px 2px 12px' : '12px 12px 12px 2px',
                      background: msg.mine ? '#D02020' : '#f4f4f4',
                      color: msg.mine ? '#fff' : '#111',
                      fontSize: 13, lineHeight: 1.6, whiteSpace: 'pre-line',
                    }}>{msg.text}</div>
                  )}
                  <div style={{ fontSize: 10, color: '#bbb', marginTop: 3, textAlign: msg.mine ? 'right' : 'left' }}>
                    {msg.time}
                  </div>
                </div>
              </div>
            ))}
            <div ref={endRef} />
          </div>

          {/* Input bar */}
          <div style={{ padding: '12px 16px', borderTop: '0.5px solid #e5e5e5', display: 'flex', gap: 8, alignItems: 'center' }}>
            <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#bbb', padding: 6 }} aria-label="画像">
              <Image size={18} />
            </button>
            <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#bbb', padding: 6 }} aria-label="動画">
              <Video size={18} />
            </button>
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && send()}
              placeholder="メッセージを入力…"
              style={{ flex: 1, padding: '8px 14px', borderRadius: 20, border: '0.5px solid #e5e5e5', fontSize: 13 }}
            />
            <button onClick={send}
              style={{ background: '#D02020', border: 'none', borderRadius: '50%', width: 34, height: 34, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
              aria-label="送信"
            >
              <Send size={14} color="#fff" />
            </button>
          </div>
        </main>
      </div>
    </div>
  )
}
