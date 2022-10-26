#!/bin/bash

help: ## Show this help message
	@echo 'usage: make [target]'
	@echo
	@echo 'targets:'
	@egrep '^(.+)\:\ ##\ (.+)' ${MAKEFILE_LIST} | column -t -c 2 -s ':#'

start: ## Start the containers
	docker network create calendar-network || true
	cp -n docker-compose.yml.dist docker-compose.yml || true
	cp -n .env.example .env || true
	docker-compose up -d

stop: ## Stop the containers
	docker-compose stop

restart: ## Restart the containers
	$(MAKE) stop && $(MAKE) start

build: ## Rebuilds all the containers
	docker network create calendar-network || true
	cp -n docker-compose.yml.dist docker-compose.yml || true
	cp -n .env.example .env || true
	docker-compose build
