<h1 align="center" id="title">takumi-Portfolio</h1>

<p align="center" style="align: center;">
  <img src="https://img.shields.io/badge/-Next.js-000000.svg?logo=next.js&style=popout">
  <img src="https://img.shields.io/badge/-React-000000.svg?logo=react&style=popout">
  <img src="https://img.shields.io/badge/-TypeScript-000000.svg?logo=typescript&style=popout">
  <img src="https://img.shields.io/badge/-Figma-000000.svg?logo=figma&style=popout">
</p>

<p id="description"></p>

<p>デザインの決まり（色・角丸・影・部品）は <a href="docs/DESIGN.md">docs/DESIGN.md</a> にまとめています。</p>

<h2>🚀 Deploy URL</h2>

[https://takumi-portfolio.vercel.app/](https://takumi-portfolio.vercel.app/)

<h2>Project Screenshots:</h2>

<img src="/public/screenshot.png" alt="project-image">

<h2>🛠️ Installation and Running</h2>

<p>1. 初期起動</p>

```
make run
```

<p>2. 起動</p>

```
make build
```

<p>3. 再ビルド</p>

```
make rebuild
```

<p>4. 文法チェック・修正</p>

```
make format
```

<h2>🍰 Contribution Guidelines:</h2>

#### branch の命名規則

- main ブランチ
  - 本番用ブランチ
- feat/[NAME]/[ISUEE_NUM]/[TITLE]
  - 機能の追加や変更などを行うブランチ，develop ブランチから派生
  - ex) feat/takumi0616/1-create-view-env
- fix/[NAME]/[ISUEE_NUM]/[TITLE]
  - バグの修正などを行うブランチ，develop ブランチから派生
  - ex) fix/takumi0616/2-fix-view-env

#### コミットの命名規則

- コミットメッセージは issue 番号を載せる
- コミットメッセージは行った開発を端的にわかりやすく書く（長すぎないように注意する）
- コミットメッセージラベルを付ける
  - [feat] file or directory の追加
  - [fix] file or directory のバグや軽微な修正
- ex)
  - `git commit -m "[feat] model group"`
  - `git commit -m "[fix] login page"`
