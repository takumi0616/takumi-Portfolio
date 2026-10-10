# takumi-Portfolio で作業するとき

- 見た目を足す・直す前に `docs/DESIGN.md` を読む。値（色・角丸・影・面）は文書の中から選び、増やさない。
- 変えないもの：背景のグラデーション・3D の立方体と粒・書体（Zen Kurenaido）。
- 会社ページの「図面」の書式は持ち込まない（別のサイト・別の体系）。
- 日本語と英語の翻訳は同じ構造にそろえる。
- 検査はリポジトリ全体で：`npm run lint`／`npx prettier --check "**/*.{js,jsx,ts,tsx}"`／`npx tsc --noEmit`。
- このリポジトリは公開。秘密・内部の運用情報・非公開のやり取りの中身は書かない（`docs/DESIGN.md` §6）。
