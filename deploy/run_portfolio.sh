#!/usr/bin/env bash
# takumi-Portfolio/deploy/run_portfolio.sh
# ── ポートフォリオ（Next.js 本番サーバ）を常駐起動する自己完結ランチャ。
#    PersonalCast とは独立。配信に必要なものはすべて takumi-Portfolio 内で完結する。
#
# 前提: `npm ci && npm run build` 済み（.next 生成済み）。Node は conda env "portfolio"（node 22）。
# 使い方:
#   bash deploy/run_portfolio.sh                  # フォアグラウンド起動
#   setsid nohup bash deploy/run_portfolio.sh >/dev/null 2>&1 </dev/null &   # 常駐（detached）
#   PORT=3000 HOST=127.0.0.1 bash deploy/run_portfolio.sh                    # ポート/ホスト上書き
set -o pipefail
DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"   # = takumi-Portfolio
NODE_BIN=/home/takumi0616/miniconda3/envs/portfolio/bin
PORT="${PORT:-3000}"
HOST="${HOST:-127.0.0.1}"
LOG="$DIR/deploy/portfolio_$(date +%Y%m%dT%H%M%S).log"
ln -sf "$LOG" "$DIR/deploy/portfolio_latest.log"
cd "$DIR" || exit 99
export PATH="$NODE_BIN:$PATH"
export NODE_ENV=production
echo "==== portfolio next start :$HOST:$PORT $(date --iso-8601=seconds) ====" | tee "$LOG"
"$NODE_BIN/node" node_modules/.bin/next start -p "$PORT" -H "$HOST" 2>&1 | tee -a "$LOG"
