# KIWAMI — 体を、極める。

筋トレコーチ × ビギナー マッチングプラットフォーム

## 技術スタック

- **フロント**: Next.js 14 (App Router)
- **バックエンド**: Supabase (PostgreSQL + Auth + Storage)
- **決済**: Stripe
- **デプロイ**: Vercel

---

## セットアップ手順

### 1. リポジトリをクローン

```bash
git clone https://github.com/yourname/kiwami.git
cd kiwami
npm install
```

### 2. 環境変数を設定

`.env.local` を作成（`.env.example` をコピーして編集）:

```bash
cp .env.example .env.local
```

以下を埋める:
```
NEXT_PUBLIC_SUPABASE_URL=      # SupabaseプロジェクトURL
NEXT_PUBLIC_SUPABASE_ANON_KEY= # Supabase anon key
STRIPE_SECRET_KEY=             # Stripe secret key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY= # Stripe publishable key
STRIPE_WEBHOOK_SECRET=         # Stripe webhook secret
```

### 3. Supabase DBセットアップ

Supabase SQL Editorで以下を実行:

```sql
-- プロフィール
create table profiles (
  id uuid references auth.users on delete cascade primary key,
  role text check (role in ('beginner', 'coach')) not null,
  nickname text not null,
  avatar_url text,
  bio text,
  goals text[],
  created_at timestamptz default now()
);

-- コーチプロフィール
create table coach_profiles (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references profiles(id) on delete cascade,
  experience_years int not null default 0,
  coaching_years int not null default 0,
  categories text[] not null default '{}',
  price_single int not null default 2000,
  price_monthly_4 int not null default 10000,
  price_monthly_8 int not null default 18000,
  portfolio_url text,
  rating numeric(3,2) default 0,
  review_count int default 0
);

-- レッスン
create table lessons (
  id uuid default gen_random_uuid() primary key,
  coach_id uuid references profiles(id),
  beginner_id uuid references profiles(id),
  plan text check (plan in ('single', 'monthly_4', 'monthly_8')) not null,
  status text check (status in ('scheduled', 'completed', 'cancelled')) default 'scheduled',
  scheduled_at timestamptz not null,
  completed_at timestamptz,
  price int not null,
  notes text
);

-- メッセージ
create table messages (
  id uuid default gen_random_uuid() primary key,
  conversation_id uuid not null,
  sender_id uuid references profiles(id),
  type text check (type in ('text', 'image', 'video')) default 'text',
  content text not null,
  file_url text,
  created_at timestamptz default now()
);

-- レビュー
create table reviews (
  id uuid default gen_random_uuid() primary key,
  coach_id uuid references profiles(id),
  beginner_id uuid references profiles(id),
  lesson_id uuid references lessons(id),
  rating int check (rating between 1 and 5) not null,
  comment text,
  created_at timestamptz default now()
);

-- RLS有効化
alter table profiles enable row level security;
alter table coach_profiles enable row level security;
alter table lessons enable row level security;
alter table messages enable row level security;
alter table reviews enable row level security;

-- RLSポリシー（基本）
create policy "profiles are viewable by everyone" on profiles for select using (true);
create policy "users can update own profile" on profiles for update using (auth.uid() = id);
create policy "coach_profiles are viewable by everyone" on coach_profiles for select using (true);
```

### 4. ローカル起動

```bash
npm run dev
# http://localhost:3000
```

### 5. Vercelにデプロイ

```bash
# Vercel CLIをインストール
npm i -g vercel

# デプロイ
vercel

# 本番デプロイ
vercel --prod
```

Vercelダッシュボードで環境変数を設定するのを忘れずに！

---

## 画面構成

| パス | 説明 |
|------|------|
| `/` | トップページ（ランディング） |
| `/coaches` | コーチ一覧・マッチング |
| `/coaches/[id]` | コーチ詳細 |
| `/chat` | チャット |
| `/dashboard` | ダッシュボード（受講者） |
| `/auth/login` | ログイン |
| `/auth/register` | 新規登録 |

---

## 料金・手数料

| プラン | 金額 |
|--------|------|
| 単発 | ¥2,000〜 |
| 月4回 | ¥10,000〜 |
| 月8回 | ¥18,000〜 |

| 累計件数 | 手数料 |
|----------|--------|
| 1〜10回 | 29% |
| 11〜99回 | 20% |
| 100回〜 | 15% |

---

## 将来の拡張

- [ ] AIフォーム分析
- [ ] コーチランキング
- [ ] React Native アプリ化
- [ ] SNS連携
- [ ] コミュニティ（Discord）
