# 支払督促書類作成支援システム 詳細引き継ぎ資料

最終更新：2026年4月30日

---

## 環境変数一覧

`.env.local` と Vercel の環境変数（Production スコープ）に設定してください。

| 変数名 | 説明 |
|--------|------|
| NEXT_PUBLIC_SUPABASE_URL | SupabaseプロジェクトURL |
| NEXT_PUBLIC_SUPABASE_ANON_KEY | Supabase公開キー（`sb_publishable_...`）|
| SUPABASE_SERVICE_ROLE_KEY | Supabase Service Roleキー（Webhook用・Legacy APIキータブ）|
| RESEND_API_KEY | Resend APIキー（`re_...`）|
| NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY | Stripe公開キー（`pk_test_...`）|
| STRIPE_SECRET_KEY | Stripeシークレットキー（`sk_test_...`）|
| STRIPE_WEBHOOK_SECRET | Stripe Webhook署名シークレット（`whsec_...`）|
| NEXT_PUBLIC_BASE_URL | ベースURL（本番：https://payment-order-system.vercel.app）|

> ⚠️ `SUPABASE_SERVICE_ROLE_KEY` は Vercel の環境変数に「Production」スコープで必ず追加すること。環境変数を追加しただけでは反映されず、手動で再デプロイが必要。Supabase の「Legacy API Keys」タブで取得できる。

---

## 実装済み機能一覧

| 機能 | 状態 | 備考 |
|------|------|------|
| STEP1〜8フロー | ✅ 完了 | 状況確認→入力→PDF生成の全フロー |
| PDFダウンロード | ✅ 完了 | @react-pdf/rendererでブラウザ生成 |
| 請求の原因自動生成 | ✅ 完了 | テンプレート選択式（3種類）|
| 管轄裁判所自動判定 | ✅ 完了 | 主要都市のみ対応 |
| 収入印紙額自動計算 | ✅ 完了 | 調査資料の表に準拠 |
| 入力バリデーション | ✅ 完了 | 各STEP入力チェック |
| 戻るボタン保持 | ✅ 完了 | localStorageで入力値を保持（修正済み）|
| 法律用語ツールチップ | ✅ 完了 | 12用語対応 |
| 提出後ガイドページ | ✅ 完了 | /guide |
| 会員登録・ログイン | ✅ 完了 | Supabase Auth・メール認証 |
| 認証ガード | ✅ 完了 | middleware.tsで未ログインをリダイレクト |
| メール通知 | ✅ 完了 | Resend（登録完了・PDF完成）|
| Stripe決済 | ✅ 完了 | テスト環境・9,800円 |
| Stripe Webhook | ✅ 完了 | payment_status更新（修正済み）|
| 自動テスト | ✅ 完了 | Vitest 32件全パス |
| マイページ | ✅ 完了 | アカウント・履歴・決済履歴・リフレッシュボタン |
| Supabaseへのデータ保存 | ✅ 完了 | upsert修正・RLSポリシー修正済み |
| 管理者ダッシュボード | ✅ 完了 | 2026-04-30 実装済み（申立書一覧・ユーザー管理・売上サマリー）/admin/login からアクセス |
| 全国裁判所対応 | ⬜ 未実装 | 現在は主要都市のみ |
| PDF書式精緻化 | ⬜ 未実装 | 弁護士監修後に対応 |
| Google認証 | ⬜ 未実装 | メール認証の後に追加予定 |
| Stripe本番切り替え | ⬜ 未実装 | リリース直前に対応 |

---

## バグ修正履歴（2026年4月29日）

### ① Supabaseへのデータ保存（400エラー）

**症状**：STEP完了時にSupabaseへのupsertが400エラーで失敗する  
**原因**：RLSポリシーの設定不備（INSERT/UPDATE/SELECTポリシーが未設定）  
**対応**：SupabaseのSQL EditorでRLSポリシーを再作成。`save-application.ts` のエラーハンドリング強化、`payment_status` の初期値に `"unpaid"` を追加。

---

### ② STEPフォームで戻るボタンを押すと入力内容が消える

**症状**：STEP4で入力後 → 戻る → 再度次のステップへ進むと入力内容が消える  
**原因**：`app/apply/step4/page.tsx` の `calcInterest useEffect` が `loaded=false` の状態で実行され、初期値（0）でlocalStorageを上書きしていた  
**対応**：useEffect の先頭に `if (!loaded) return` を追加し、`loaded` を依存配列に追加

---

### ③ STEP8で「必要な情報が不足しています」エラー

**症状**：全項目入力済みなのにSTEP8でエラー表示になる  
**原因**：②と同じ（step4のuseEffectが値を上書き）+ step5で自動生成テキストが `claimReason` に保存されていなかった  
**対応**：step5のuseEffectでauto-generated textを `updateApplication({ claimReason: generated })` で保存するよう修正

---

### ④ Stripe決済後にpayment_statusが更新されない

**症状**：Stripe決済完了後もマイページで「作成中」のままになる

**原因（根本）**：checkout APIに渡すsessionIdが空文字（`""`）になっていた  
→ `app/apply/step8/page.tsx` で `sessionId: ""` がハードコードされていた  
**対応①**：`getOrCreateSessionId()` をインポートして正しいsessionIdを渡すよう修正

**原因（副次）**：Stripe WebhookのSupabaseクライアントに `persistSession: false` が設定されていなかった  
→ `app/api/stripe/webhook/route.ts` の `createClient` が認証セッションを維持しようとしてエラー  
**対応②**：`createClient` の第3引数に `{ auth: { persistSession: false, autoRefreshToken: false } }` を追加

**原因（副次）**：`SUPABASE_SERVICE_ROLE_KEY` がVercelの本番環境変数に未設定  
**対応③**：Supabase の「Legacy API Keys」タブからService Roleキーを取得してVercelに追加 → 手動で再デプロイ

---

### ⑤ 続きから作成で間違ったsessionIdが使われる

**症状**：マイページ「続きから作成する」→ Stripe決済 → 別のレコードの `payment_status` が更新される  
**原因**：`handleContinue` 関数がlocalStorageのsessionIdを元の申請のsessionIdに戻していなかった  
**対応**：`app/mypage/page.tsx` の `handleContinue` で `app.session_id` をlocalStorageに保存するよう修正

```js
localStorage.setItem('sessionId', app.session_id)
```

---

### ⑥ 決済後のpayment_status上書きバグ

**症状**：Webhookが `paid` を書いた後、`?success=true` ページで `unpaid` に戻される  
**原因**：`lib/save-application.ts` の `upsert` が `payment_status: 'unpaid'` を常に書き込んでいた  
**対応**：UPDATE → なければ INSERT の2ステップに変更。既存レコードのUPDATE時は `payment_status` を変更しない。初回INSERTのみ `payment_status: 'unpaid'` をセット。  
**変更ファイル**：`lib/save-application.ts`

---

## 作業ログ（2026年4月30日）

### 管理者ダッシュボード実装【完了・本番反映済み】

**アクセス方法**：`/admin/login` から `zekk.inc1105@gmail.com` でログイン  
**認証**：`proxy.ts`（Next.js 16 のミドルウェア）でメールアドレス判定・未認証は `/admin/login` へリダイレクト

**作成ファイル**：
- `lib/supabase/admin.ts` — Service Roleクライアント（RLS迂回）
- `app/admin/(dashboard)/layout.tsx` — 管理者共通レイアウト（サイドバー）
- `app/admin/(dashboard)/AdminSidebar.tsx` — サイドバー（ログアウト・現在ページハイライト・メール表示）
- `app/admin/(dashboard)/page.tsx` — ダッシュボード（売上・決済率・月別グラフ）
- `app/admin/(dashboard)/applications/page.tsx` — 申立書一覧（検索・フィルター・CSVエクスポート）
- `app/admin/(dashboard)/users/page.tsx` — ユーザー管理（一覧・申立書数・決済件数）
- `app/admin/login/page.tsx` — 管理者専用ログイン画面
- `app/api/admin/stats/route.ts` — 統計API（単価：`PRICE_PER_APPLICATION = 9800`）
- `app/api/admin/applications/route.ts` — 申立書API（CSV対応）
- `app/api/admin/users/route.ts` — ユーザーAPI（Supabase Admin Auth使用）

**設定変更方法**：
- 単価変更：`app/api/admin/stats/route.ts` の `PRICE_PER_APPLICATION`
- 管理者メール追加：`proxy.ts` と各 API route の `ADMIN_EMAILS` 配列に追記

---

### Next.js 16 対応バグ修正【修正済み】

**症状**：全リクエストが固まり、アプリが応答しなくなった  
**原因**：Next.js 16 でミドルウェアが `middleware.ts` → `proxy.ts` に改名。既存の `proxy.ts` と新規作成した `middleware.ts` が競合し全リクエストが処理されなくなった  
**対応**：`middleware.ts` を削除し、admin保護ロジックを既存の `proxy.ts` に統合  
**変更ファイル**：`proxy.ts`（admin保護ロジック統合）、`middleware.ts`（削除）
