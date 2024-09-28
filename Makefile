.PHONY: run
run:
	npm run dev

.PHONY: build
build:
	npm run install
	npm run build
	npm run dev

.PHONY: rebuild
rebuild:
	rm -rf node_modules
	npm install
	npm run build
	npm run dev

.PHONY: format
format:
	npm run lint
	npm run lint:fix
	npm run format
