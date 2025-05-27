dev: ## Start local dev server
	npm run dev

build: ## Build site
	npm run build

preview: ## Preview built site locally
	npm run preview

deploy: ## Deploy to GitHub Pages
	npm run deploy

clean: ## Remove caches, checkpoints, and distribution artifacts
	npm run clean
	find . -name ".DS_Store" | xargs rm -rf
