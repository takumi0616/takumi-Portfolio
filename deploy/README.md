# deploy — ポートフォリオ自己完結配信（このサーバーで Next.js を本番配信）

このディレクトリだけで、ポートフォリオ（Next.js）を**このサーバー上で常時配信**するための一式が揃う。
**PersonalCast とは完全に独立**（別プロセス・別ポート 3000・別 cloudflared トンネル）。

## 構成
| ファイル | 役割 |
|---|---|
| `run_portfolio.sh` | `next start -p 3000` を conda env `portfolio`(node 22) で常駐起動するランチャ |
| `portfolio.service` | Next サーバを常駐させる systemd テンプレート |
| `setup_tunnel.sh <DOMAIN>` | ポートフォリオ専用 cloudflared トンネルを作成し取得ドメインを :3000 へ公開 |
| `cloudflared-config.example.yml` | トンネル設定の雛形（setup_tunnel.sh が `config.yml` を自動生成） |
| `portfolio-tunnel.service` | cloudflared トンネルを常駐させる systemd テンプレート |

## 前提（Node）
Node は **conda env `portfolio`（node 22）**。導入済み。再作成する場合:
```
conda create -y -n portfolio -c conda-forge 'nodejs=22'
```

## 手順
### 1. ビルド（依存導入 → 本番ビルド）
```
conda run -n portfolio --cwd /home/takumi0616/takumi-Portfolio npm ci
conda run -n portfolio --cwd /home/takumi0616/takumi-Portfolio npm run build
```

### 2. 常駐起動（Next サーバ・:3000）
手動（detached）:
```
setsid nohup bash deploy/run_portfolio.sh >/dev/null 2>&1 </dev/null &
curl -I http://127.0.0.1:3000/ja      # 200 を確認
```
または systemd:
```
sudo cp deploy/portfolio.service /etc/systemd/system/ && sudo systemctl enable --now portfolio
```

### 3. 取得ドメインで公開（cloudflared 専用トンネル）
前提: `cloudflared` 認証済み（`~/.cloudflared/cert.pem`）・ドメインが Cloudflare 管理ゾーン。
```
bash deploy/setup_tunnel.sh <あなたのドメイン>      # 例: takumi.dev
# テスト起動:
/home/takumi0616/bin/cloudflared tunnel --config deploy/config.yml run
# 常駐:
sudo cp deploy/portfolio-tunnel.service /etc/systemd/system/ && sudo systemctl enable --now portfolio-tunnel
```

### 4. ドメイン確定後の URL 更新（推奨）
Vercel 用の URL が残っているので、本番ドメインへ更新する:
- `app/sitemap.ts` … `baseUrl`
- `app/robots.ts` … `sitemap`
- メタデータの `metadataBase`（`app/layout.tsx` 等にあれば）

## セキュリティ / git
- トンネル認証情報（`deploy/*.json`）・ログ（`deploy/*.log`）・生成 `config.yml` は **gitignore 済み**（コミットしない）。
- スクリプト/テンプレート（`*.sh` / `*.service` / `*.example.yml` / 本 README）は追跡対象。

## 運用メモ
- 再ビルド後はサーバ再起動が必要: `pkill -f 'next start' ; setsid nohup bash deploy/run_portfolio.sh ...`（または `systemctl restart portfolio`）。
- ポート変更: `PORT=3001 bash deploy/run_portfolio.sh`（systemd/トンネル側の :3000 も合わせること）。
