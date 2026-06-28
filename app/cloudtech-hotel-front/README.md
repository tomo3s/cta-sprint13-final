# CloudTechホテル フロントエンド

CloudTechホテル口コミシステムのフロントエンドです。

## 技術スタック

- HTML5
- CSS3
- JavaScript (ES6+)
- Jest (テスト)

## Docker単体での起動

```bash
cd cloudtech-hotel-front

# イメージをビルド
docker build -t cloudtech-hotel-front .

# コンテナを起動
docker run -d \
  --name cloudtech-hotel-front \
  -p 3000:3000 \
  cloudtech-hotel-front
```

http://localhost:3000 でアクセスできます。

## ローカル開発環境での起動

### 前提条件
- Node.js 18以上（http-server用）

### 1. 依存関係をインストール

```bash
npm install
```

### 2. サーバーを起動

```bash
npm start
```

http://localhost:3000 でアクセスできます。

### 別の方法：任意のHTTPサーバーを使用

```bash
# Python
python -m http.server 3000 --directory public

# npx
npx http-server public -p 3000

# PHP
php -S localhost:3000 -t public
```

## テストの実行

```bash
npm test
```

## 画面仕様

### 口コミ一覧画面（index.html）
- **URL**: /index.html または /
- **機能**: 投稿された口コミを一覧表示
- **操作**: 口コミカードをクリックすると詳細画面へ遷移

### 口コミ詳細画面（detail.html）
- **URL**: /detail.html?id={reviewId}
- **機能**: 選択した口コミの詳細を表示
- **操作**:
  - 「編集」ボタン: 編集画面へ遷移
  - 「削除」ボタン: 確認後、口コミを削除
  - 「一覧に戻る」ボタン: 一覧画面へ遷移

### 口コミ投稿画面（create.html）
- **URL**: /create.html
- **機能**: 新しい口コミを投稿
- **入力項目**:
  - 投稿者名（必須、最大50文字）
  - タイトル（必須、最大100文字）
  - 評価（必須、1-5の星評価）
  - 口コミ内容（必須）

### 口コミ編集画面（edit.html）
- **URL**: /edit.html?id={reviewId}
- **機能**: 既存の口コミを編集
- **入力項目**: 投稿画面と同じ

## ディレクトリ構成

```
cloudtech-hotel-front/
├── Dockerfile
├── README.md
├── package.json
├── jest.config.js
├── public/
│   ├── index.html      # 口コミ一覧画面
│   ├── detail.html     # 口コミ詳細画面
│   ├── create.html     # 口コミ投稿画面
│   ├── edit.html       # 口コミ編集画面
│   ├── css/
│   │   └── style.css   # スタイルシート
│   └── js/
│       └── app.js      # JavaScriptコード
└── __tests__/
    └── app.test.js     # テストコード
```

## デザイン

- **カラーテーマ**: オレンジ基調
  - プライマリカラー: #ff8c00, #ff6b00
  - 背景: #fff9f5
- **レスポンシブ対応**: モバイルでも利用可能
