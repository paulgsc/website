# Read version from package.json, fallback to 0.0.0
VERSION := $(shell /mnt/c/Program\ Files/nodejs/npm --version)
COMPOSE_FILE := compose.yml
DOCKER_REPO := pgathondu/self-hosting-maishatu

.PHONY: build push release cleanup hub

build:
	@echo "Building Docker image with version $(VERSION)"
	APP_VERSION=$(VERSION) docker-compose -f $(COMPOSE_FILE) build

push:
	@echo "Pushing image $(DOCKER_REPO):$(VERSION) to Docker Hub"
	APP_VERSION=$(VERSION) docker-compose -f $(COMPOSE_FILE) push

release: build push

cleanup:
	@echo "Cleaning up old Docker images"
	@tags=$$(curl -s https://registry.hub.docker.com/v2/repositories/$(DOCKER_REPO)/tags?page_size=1024 | jq -r ".results[].name" | grep -P "^\d+\.\d+\.\d+$$" | sort -V | head -n -5); \
	for tag in $$tags; do \
		echo "Removing tag $$tag..."; \
		docker rmi $(DOCKER_REPO):$$tag || true; \
		docker push --delete $(DOCKER_REPO):$$tag || true; \
	done

list-images:
	@echo "Available images:"
	@curl -s https://registry.hub.docker.com/v2/repositories/$(DOCKER_REPO)/tags?page_size=1024 | jq -r ".results[].name" | sort -V

hub: release cleanup

# Development commands
up:
	APP_VERSION=$(VERSION) docker-compose -f $(COMPOSE_FILE) up -d

down:
	docker-compose -f $(COMPOSE_FILE) down

logs:
	docker-compose -f $(COMPOSE_FILE) logs -f maishatu

shell:
	docker-compose -f $(COMPOSE_FILE) exec maishatu sh