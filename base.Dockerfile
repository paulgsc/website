FROM node:alpine AS base

WORKDIR /app

COPY tsconfig.json ./

