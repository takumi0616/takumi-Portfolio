#!/usr/bin/env bash
# takumi-Portfolio/deploy/setup_tunnel.sh <DOMAIN>
# ── ポートフォリオ専用の cloudflared 名前付きトンネルを作成し、取得ドメインを :3000 へ公開する。
#    PersonalCast の共有トンネルとは独立した自己完結トンネル（設定・認証情報は deploy/ 内に置く）。
#
# 前提:
#   - cloudflared インストール済み（例: /home/takumi0616/bin/cloudflared）
#   - ~/.cloudflared/cert.pem で Cloudflare アカウント認証済み（= 既存 PersonalCast と同じアカウント）
#       未認証なら: cloudflared tunnel login
#   - <DOMAIN> が Cloudflare 管理ゾーンであること（route dns に必要）
#
# 使い方:  bash deploy/setup_tunnel.sh takumi.dev
set -euo pipefail
DOMAIN="${1:?使い方: bash deploy/setup_tunnel.sh <ドメイン例 takumi.dev>}"
DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"   # = deploy/
NAME="takumi-portfolio"
CF="$(command -v cloudflared || echo /home/takumi0616/bin/cloudflared)"

echo "[1/4] トンネル作成（既存なら再利用）: $NAME"
"$CF" tunnel create "$NAME" 2>/dev/null || echo "  （既存トンネルを再利用）"
UUID="$("$CF" tunnel list --name "$NAME" --output json 2>/dev/null | grep -oP '"id":\s*"\K[0-9a-f-]+' | head -1)"
[ -n "$UUID" ] || { echo "トンネルUUID取得失敗。cloudflared 認証(cert.pem)を確認してください。"; exit 1; }
echo "  UUID=$UUID"

echo "[2/4] 認証情報を deploy/ 内へ複製（自己完結）"
cp -n "$HOME/.cloudflared/$UUID.json" "$DIR/$UUID.json" 2>/dev/null || true

echo "[3/4] config.yml 生成: $DIR/config.yml"
cat > "$DIR/config.yml" <<YAML
tunnel: $UUID
credentials-file: $DIR/$UUID.json
ingress:
  - hostname: $DOMAIN
    service: http://localhost:3000
    originRequest:
      # Next.js が公開ドメインを認識できるよう Host を公開名で渡す（middleware の
      # redirect Location が https://$DOMAIN/... になる）。
      httpHostHeader: $DOMAIN
  - service: http_status:404
YAML

echo "[4/4] DNS ルート: $DOMAIN → tunnel $UUID（UUID明示＋上書き・要 Cloudflare 管理ゾーン）"
# 注: 名前指定だと別トンネルへ誤ルートする事例があったため UUID を明示し、既存CNAMEは上書きする。
"$CF" tunnel route dns --overwrite-dns "$UUID" "$DOMAIN"

echo ""
echo "✅ 完了: https://$DOMAIN → tunnel $NAME ($UUID) → http://localhost:3000"
echo "   起動(テスト): $CF tunnel --config $DIR/config.yml run"
echo "   常駐         : deploy/portfolio-tunnel.service を systemd へ設置（deploy/README.md 参照）"
echo "   ※ sitemap/robots/metadataBase の URL も $DOMAIN に更新推奨（deploy/README.md 参照）"
