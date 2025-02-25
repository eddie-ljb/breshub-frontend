# 1. Stufe: Build Angular App
FROM node:18 AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build --configuration=production

# 2. Stufe: Bereitstellen ohne nginx
FROM node:18

WORKDIR /app
COPY --from=build /app/dist/breshub-frontend /app

RUN npm install -g http-server  # Installiere http-server, um die Anwendung zu starten

EXPOSE 4200  # Port für den Angular-Server
CMD ["http-server", "/app", "-p", "4200"]  # Starte den Server auf Port 4200
