#!make
ENV_FILE = ./.env.development

up:
	docker compose --env-file $(ENV_FILE) up -d

down:
	docker compose --env-file $(ENV_FILE) down