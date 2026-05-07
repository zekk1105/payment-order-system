@AGENTS.md

## 引き継ぎルール改修
- 各チャット終了時、完了した変更・未解決の問題をこのファイルの「作業ログ」に追記すること
- 新しいチャット開始時、まずこのファイルを読んで状況を把握すること
- 詳細な引き継ぎ資料・環境変数・バグ修正履歴は `docs/handover.md` を参照

## エージェント役割分担

| エージェント | 役割 |
|------------|------|
| Cowork（デスクトップアプリ版Claude） | 実装の方向性の確認・設計・Claude Code向け指示文章の作成に留める。コードの直接編集は行わない |
| Claude Code（CLI版） | 実際のコード実装・ファイル編集・テスト実行・Git操作を担当 |

---

## プロジェクト概要

法律の素人でも質問に答えるだけで支払督促の申立書（裁判所提出用PDF）を作成できるWebアプリ。  
非弁行為リスク回避のため「書類作成の補助ツール」に徹する。

- **サービス名**：支払督促かんたん作成
- **本番URL**：https://payment-order-system.vercel.app
- **GitHub**：https://github.com/zekk1105/payment-order-system
- **ローカルパス**：~/Documents/合同会社Zekk/shiharaitokusoku/payment-order-system

---

## 技術スタック

| 領域 | 採用技術 |
|------|---------|
| フロントエンド | Next.js 14（App Router）+ TypeScript |
| スタイリング | Tailwind CSS + shadcn/ui |
| データベース | Supabase（PostgreSQL）|
| 認証 | Supabase Auth（メール認証）|
| PDF生成 | @react-pdf/renderer（ブラウザ側で生成）|
| 決済 | Stripe（テスト環境）|
| メール送信 | Resend |
| テスト | Vitest + Testing Library |
| デプロイ | Vercel（Hobbyプラン）|

---

## Supabase テーブル構成

**テーブル名：applications**

| カラム名 | 型 | 説明 |
|---------|---|------|
| id | UUID | 主キー（自動生成）|
| user_id | UUID | Supabase AuthのユーザーID（外部キー）|
| session_id | TEXT | セッションID（UNIQUE制約あり）|
| data | JSONB | 申立書データ全体をJSON保存 |
| status | TEXT | draft / completed |
| current_step | INTEGER | 現在のSTEP番号（1〜8）|
| debtor_name | TEXT | 債務者名（マイページ表示用）|
| claim_amount | INTEGER | 請求金額（マイページ表示用）|
| payment_status | TEXT | unpaid / paid |
| pdf_url | TEXT | PDF保存URL（将来用）|
| created_at | TIMESTAMPTZ | 作成日時 |
| updated_at | TIMESTAMPTZ | 更新日時 |

**RLS ポリシー（適用済み）**
- INSERT：`auth.uid() = user_id`
- UPDATE：`auth.uid() = user_id`
- SELECT：`auth.uid() = user_id`

---

## 重要な設計方針

### 非弁行為リスク回避（最重要）
- UIのどこにも「勝てます」「○○円もらえます」等の断定表現を使わない
- テンプレート文章は「事実の記載」のみ。法的評価の文言を入れない
- 利率は「参考表示」と明記し断定しない
- 全ページのフッターに免責表示を固定表示

> 免責表示：「本サービスは書類作成の補助ツールです。法的助言を行うものではありません。」

### セキュリティ
- 個人情報はSupabaseに保存（RLS適用）
- ゲストデータは30日後に自動削除
- ログには氏名・住所をマスキングして記録

---

## 未解決事項

- [x] **UI更新遅延**：2026-04-29 通しテストで問題なし。追加修正不要と判断
- [x] **本番フロー全体テスト**：2026-04-29 STEP1〜8 → 決済 → マイページ表示を新規ユーザーで確認済み（「続きから作成する」フローも確認済み）
- [ ] **Supabase確認用SQL**：`SELECT id, debtor_name, session_id, payment_status, updated_at FROM applications ORDER BY updated_at DESC LIMIT 10;`
- [x] **管轄裁判所の判定が不正確**：2026-05-07 修正完了。`lib/court-data.ts` を全国303件で完全再構築・本番反映済み
- [ ] **決済済みのPDF再ダウンロード不可**：2026-05-07 発覚。決済済みの申立書をマイページから開くと、PDF DLではなく再決済フローが始まってしまう。`payment_status = 'paid'` の場合はSTEP8でPDFダウンロード画面を直接表示するよう修正が必要

---

## 次のアクション

| 優先度 | タスク | 詳細 |
|--------|--------|------|
| 高 | UI更新遅延の調査 | 🔄ボタンで解消するか確認。しない場合は `lib/supabase/client.ts` のキャッシュを調査 |
| 高 | 本番フロー全体テスト | STEP1〜8 → 決済 → マイページ表示を新規ユーザーでテスト |
| 高 | Stripe本番環境への切り替え | リリース直前に `pk_live_` / `sk_live_` に変更・Webhook更新 |
| 高 | 決済済みPDF再ダウンロードバグ修正 | マイページ「続きから」で `payment_status = 'paid'` のとき再決済が始まる。STEP8で `paid` 判定時はPDFダウンロード画面を直接表示するよう修正 |
| 中 | 管理者ダッシュボード実装 | ✅ 2026-04-29 実装済み（申立書一覧・ユーザー管理・売上サマリー）|
| 中 | PDF書式精緻化 | 弁護士監修後に対応 |
| 中 | Google認証の追加 | Supabase Auth でメール認証の後に追加予定 |
| 低 | 全国裁判所対応 | ✅ 2026-04-30 実装・2026-05-07 修正済み。全47都道府県・303庁収録（非実在裁判所名を修正） |
| ✅完了 | 管轄裁判所の判定バグ修正 | 2026-05-07 `lib/court-data.ts` を全国303件で再構築・本番反映済み |

---

## 作業ログ

### 2026-05-07（方針整理・Google認証設計・バグ記録）

#### エージェント役割分担をCLAUDE.mdに追記
- Cowork（デスクトップアプリ）：設計・指示文章作成のみ。コード直接編集は行わない
- Claude Code（CLI）：実際のコード実装・テスト・Git操作を担当

#### Google認証（OAuth）の実装設計【Claude Code向け指示文章作成済み】
- 実装方針：Supabase Auth の `signInWithOAuth` を使用。既存のコールバック（`/auth/callback/route.ts`）をそのまま流用
- 変更対象ファイル：`app/auth/login/page.tsx`・`app/auth/register/page.tsx`・`app/auth/callback/route.ts`
- 事前に必要な手動設定：Google Cloud Console（OAuthクライアントID作成）・Supabase Dashboard（Googleプロバイダー有効化）
- 注意点：callback でのウェルカムメール送信を「新規ユーザーのみ（作成から10秒以内）」に制限する修正が必要
- 実装はClaude Codeに上記指示文章を渡して行う（別チャット）

#### 決済済みPDF再ダウンロードバグを記録
- 症状：マイページから「続きから作成」で開くと、決済済みでも再決済フローが始まる
- 未解決事項・次のアクション（高優先度）に追記済み
- 修正は別チャットでClaude Codeに依頼予定

---

### 2026-05-07（管轄裁判所判定バグ修正・本番反映）

#### 管轄裁判所データ完全再構築【修正済み・本番反映済み】
- **変更ファイル**：`lib/court-data.ts`（全面書き換え）
- **作業ディレクトリ**：`~/Documents/合同会社Zekk/shiharaitokusoku/payment-order-system`
- **問題**：元データがAIによる「[市名]+簡易裁判所」パターン生成で実在確認なし。守口簡易裁判所など実在しない裁判所名が全国に混在
- **対応**：WebSearch で courts.go.jp の実在URLを確認しながら全国データを再構築（298件 → 303件）
- **主な修正内容**：
  - 大阪府：守口簡易裁判所（非実在）削除 → 守口市を大阪簡易裁判所に再配置
  - 大阪府：池田簡易裁判所 → 大阪池田簡易裁判所に改名（公式名称に修正）
  - 大阪府：豊中・枚方・羽曳野・吹田・茨木の各簡易裁判所を追加（8件 → 12件）
  - 神奈川県：神奈川簡易裁判所エントリを追加（横浜市神奈川区対応）
  - 高知県：中村簡易裁判所（四万十市管轄）を正確な県に配置
- **動作確認**：18テストケース全通過（守口市・豊中市・池田市・横浜市神奈川区・四万十市 等）
- **デプロイ**：git commit & push → Vercel自動デプロイ完了
  - 備考：Vercelデプロイ時に「Git author must have access」エラー → `git commit --amend --reset-author` で解消

#### CLAUDE.md を gitignore に追加
- `CLAUDE.md` を `.gitignore` に追記しコミット済み

---

### 2026-04-30（step2郵便番号自動入力・管轄裁判所バグ発見）

#### step2（申立人）に郵便番号自動入力を追加【実装済み・本番反映済み】
- **変更ファイル**：`app/apply/step2/page.tsx`
- **概要**：step3（相手方）と同様に、郵便番号7桁入力で住所を自動補完
- **動作**：ZipCloud API で `都道府県+市区町村+町域` を取得し `address` フィールドに自動入力。入力後「番地・建物名を追加してください」と案内表示
- **UI**：入力中スピナー（Loader2）・補完完了チェックマーク・エラーメッセージを追加

#### 管轄裁判所の誤判定バグ発見【未修正・次チャット対応】
- **症状**：「大阪府・守口市」と入力すると「守口簡易裁判所」と表示されるが、守口簡易裁判所は実在しない
- **原因**：`lib/court-data.ts` に作成時に誤ったデータ（実在しない裁判所名）を収録してしまった
- **影響範囲**：大阪府のみならず、他府県にも同様の誤データが存在する可能性あり
- **対応方針**：最高裁判所ウェブサイト（https://www.courts.go.jp）で全裁判所を実在確認しながら `lib/court-data.ts` を修正

#### docs/handover.md 更新
- 管理者ダッシュボードを「⬜ 未実装」→「✅ 完了」に修正（最終更新日も4月30日に更新）
- 4月30日実施の実装内容（管理者ダッシュボード・Next.js 16対応バグ修正）を追記

---

### 2026-04-30（管理者ダッシュボード・全国裁判所対応・郵便番号自動入力）

#### 全国簡易裁判所対応【実装済み】
- **変更ファイル**：`lib/court-data.ts`（全面書き換え）、`lib/postal-code.ts`（新規）、`app/apply/step3/page.tsx`（更新）
- **概要**：13庁 → 全47都道府県・298庁に拡張
- **郵便番号自動入力**：ZipCloud API（無料・APIキー不要）で7桁入力時に都道府県・市区町村を自動補完
- **マッチングロジック**：完全一致 → 前方一致（「横浜市西区」→「横浜市」）→ 逆前方一致（「豊岡」→「豊岡市」）→ 都道府県フォールバックの4段階
- **郵券額の注記**：「参考値・申立前に裁判所へご確認ください」と明記
- **注記**：最高裁判所ウェブサイト（https://www.courts.go.jp）で全438庁を個別確認・更新することで精度をさらに向上可能

---

### 2026-04-30（管理者ダッシュボード実装・ログイン画面・バグ修正）

#### 管理者ダッシュボード【実装済み・本番反映済み】
- **アクセス方法**：`/admin/login` から `zekk.inc1105@gmail.com` でログイン
- **認証**：`proxy.ts`（Next.js 16 のミドルウェア）でメールアドレス判定・未認証は `/admin/login` へリダイレクト
- **作成ファイル**：
  - `lib/supabase/admin.ts` — Service Roleクライアント（RLS迂回）
  - `app/admin/(dashboard)/layout.tsx` — 管理者共通レイアウト（サイドバー）
  - `app/admin/(dashboard)/AdminSidebar.tsx` — サイドバー（ログアウト・現在ページハイライト・メール表示）
  - `app/admin/(dashboard)/page.tsx` — ダッシュボード（売上・決済率・月別グラフ）
  - `app/admin/(dashboard)/applications/page.tsx` — 申立書一覧（検索・フィルター・CSVエクスポート）
  - `app/admin/(dashboard)/users/page.tsx` — ユーザー管理（一覧・申立書数・決済件数）
  - `app/admin/login/page.tsx` — 管理者専用ログイン画面
  - `app/api/admin/stats/route.ts` — 統計API
  - `app/api/admin/applications/route.ts` — 申立書API（CSV対応）
  - `app/api/admin/users/route.ts` — ユーザーAPI（Supabase Admin Auth使用）
- **単価設定**：`app/api/admin/stats/route.ts` の `PRICE_PER_APPLICATION = 9800` で変更可
- **管理者メール追加**：`proxy.ts` と各 API route の `ADMIN_EMAILS` 配列に追記

#### Next.js 16 対応バグ修正【修正済み】
- **原因**：Next.js 16 でミドルウェアが `middleware.ts` → `proxy.ts` に改名。既存の `proxy.ts` と新規作成した `middleware.ts` が競合し全リクエストが固まっていた
- **修正**：`middleware.ts` を削除し、admin保護ロジックを既存の `proxy.ts` に統合

---

### 2026-04-29

#### Supabaseへのデータ保存（400エラー）【修正済み】
- RLSポリシーの設定不備（INSERT/UPDATE/SELECTポリシーが未設定）を修正
- `save-application.ts` のエラーハンドリング強化、`payment_status` の初期値に `unpaid` を追加

#### STEPフォームで戻るボタンを押すと入力内容が消える【修正済み】
- `step4/page.tsx` の `calcInterest useEffect` が `loaded=false` 状態で初期値でlocalStorageを上書きしていた
- `if (!loaded) return` を追加し、`loaded` を依存配列に追加

#### STEP8で「必要な情報が不足しています」エラー【修正済み】
- step4と同根。step5の自動生成テキストが `claimReason` に保存されていなかったため修正

#### Stripe決済後に payment_status が更新されない【修正済み】
- `step8/page.tsx` で `sessionId: ""` がハードコードされていた → `getOrCreateSessionId()` を使用するよう修正
- `webhook/route.ts` の `createClient` に `{ auth: { persistSession: false, autoRefreshToken: false } }` を追加
- `SUPABASE_SERVICE_ROLE_KEY` をVercel本番環境変数に追加・手動再デプロイ

#### 続きから作成で間違ったsessionIdが使われる【修正済み】
- `mypage/page.tsx` の `handleContinue` で `app.session_id` を `localStorage` に保存するよう修正

#### 決済後のpayment_status上書きバグ【修正済み】
- **変更ファイル**：`lib/save-application.ts`
- `upsert` が常に `payment_status: 'unpaid'` を書き込んでいた
- UPDATE → なければ INSERT の2ステップに変更。既存レコードUPDATE時は `payment_status` を変更しない

#### マイページ機能改善【実装済み】
- 申立書の作成履歴を最大5件表示（`.limit(5)` 追加）
- 🔄 リフレッシュボタンを追加（Webhookによるステータス更新を反映するため）
- 「＋ 新規作成」ボタンを追加（localStorageを消去してから /apply/step1 へ遷移）
- `handleContinue` で `app.data` と `app.session_id` をlocalStorageに正しく復元

#### 本番フロー全体テスト【完了】
- STEP1〜8 → Stripe決済（テストカード）→ マイページ表示を新規ユーザーで通しテスト実施
- 「続きから作成する」フローも確認済み
- 決済後にマイページをリロードすると `payment_status` が「決済済み ✅」に正しく反映されることを確認（UI更新遅延バグは解消済み、追加修正不要）
- 高優先度タスク①②はいずれも問題なし
