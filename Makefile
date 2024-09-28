.PHONY: develop install lint lint-fix format build dev

develop: install lint lint-fix format build dev

install:
	npm install

lint:
	npm run lint

lint-fix:
	npm run lint:fix

format:
	npm run format

build:
	npm run build

dev:
	npm run dev
