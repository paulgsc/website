VERSION := $(shell /mnt/c/Program\ Files/nodejs/npm --version)
IMAGE := pgathondu/self-hosting-maishatu:$(VERSION)

.PHONY: release cleanup release-and-clean

release:
	@echo "Releasing Docker image with version $(VERSION)"
	@echo "Docker image tag: $(IMAGE)"
	docker build -t $(IMAGE) .
	docker push $(IMAGE)

cleanup:
	@echo "Cleaning up old Docker images"
	tags=$$(curl -s https://registry.hub.docker.com/v2/repositories/pgathondu/self-hosting-maishatu/tags?page_size=1024 | jq -r ".results[].name" | grep -P "^\d+\.\d+\.\d+$" | sort -V | head -n -5); \
	for tag in $$tags; do \
		docker rmi pgathondu/self-hosting-maishatu:$$tag; \
		docker push --delete pgathondu/self-hosting-maishatu:$$tag || true; \
	done

hub: release cleanup
