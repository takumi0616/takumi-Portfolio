# Makefile

# PHONYターゲットの定義
.PHONY: develop lint lint-fix format build dev

# developターゲット
develop: lint lint-fix format build dev

# lintターゲット
lint:
	npm run lint

# lint:fixターゲット
lint-fix:
	npm run lint:fix

# formatターゲット
format:
	npm run format

# buildターゲット
build:
	npm run build

# devターゲット
dev:
	npm run dev
