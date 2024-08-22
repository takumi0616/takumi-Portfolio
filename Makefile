# Makefile

# PHONYターゲットの定義
.PHONY: develop install lint lint-fix format build dev

# developターゲット
develop: install lint lint-fix format build dev

install:
	npm install

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
