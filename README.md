頑張るぞ


## 目次
1. [プロジェクトの起動方法](#プロジェクトの起動方法)
2. [ディレクトリ構成](#ディレクトリ構成)


## プロジェクトの起動方法

プロジェクトのパッケージをインストールするには、`pnpm i` を実行してください。

```bash
pnpm i
```

その後、`pnpm dev`を実行して開発サーバーを起動します。

```bash
pnpm dev
```


## ディレクトリ構成

```

progatehack/
├── app/
│　（フロントエンド）
│   ├── layout.tsx          // 全体の共通レイアウト（ヘッダー、フッター、認証チェックなど）
│   ├── page.tsx            // ダッシュボード（トップページ）
│   ├── globals.css         // 全体の共通css
│   ├── auth/
│   │   ├── login/
│   │   │   └── page.tsx    // ログインページ
│   │   ├── register/
│   │   │   └── page.tsx    // ユーザー登録ページ
│   ├── ingredients/
│   │   ├── layout.tsx      // 食材管理専用のレイアウト（食材一覧や追加・編集機能に共通のUI）
│   │   ├── page.tsx        // 食材一覧ページ：登録済みの食材を一覧表示し、期限切れ警告なども表示
│   │   └── add/
│   │       └── page.tsx    // 食材追加ページ
│   ├── recipes/
│   │   └── page.tsx        // レシピ提案ページ：現在の食材情報に基づき、AIがレシピを提案
│   │
│　（バックエンド）
│   └── api/
│       ├── auth/
│       │   ├── register/
│       │   │   └── route.ts    // POST /api/auth/register
│       │   ├── login/
│       │   │   └── route.ts    // POST /api/auth/login
│       │   ├── me/
│       │   │   └── route.ts    // GET /api/auth/me
│       │   └── logout/
│       │       └── route.ts    // POST /api/auth/logout
│       ├── ingredients/
│       │   ├── route.ts        // GET (一覧取得) / POST (新規追加)
│       │   ├── catalog/
│       │   │   └── route.ts    // GET /api/ingredients/catalog で、追加可能な食材リストを取得するエンドポイント
│       │   └── [ingredientId]/
│       │       └── route.ts    // GET / PUT / DELETE 各食材の個別操作
│       └── recipes/
│           ├── route.ts        // GET /api/recipes（レシピ提案一覧）
│           └── [recipeId]/
│               └── route.ts    // GET /api/recipes/:recipeId（個別レシピ詳細）
│
│　（他の）
├── public/
│   ├── fonts/              // すべてのフォント
│   │   └── xx.ttf
│   ├── icons/              // アイコンファイル
│   │   └── ui/
│   │       └── xx.png
│   └── images/             // すべてのイメージ画像
│       ├── food/           // 食材のイメージ
│       │   └── xx.png
│       └── users/          // ユーザーのイメージ
│           └── xx.png
│
├── types/
│   ├── index.ts            // 共通のデータ型
│   ├── ingredients.ts      // 食材データ型
│   └── recipes.ts          // レシピデータ型
│
├── .env                    // 環境変数設定ファイル（AWS 環境変数）
└── package.json            // Node.jsのパッケージ設定


```