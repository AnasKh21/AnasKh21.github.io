# =========================================================
# STAGE 1: ETAPE DE CONSTRUCTION (BUILDER)
# Utilise une image Node.js pour installer les dépendances et compiler le code.
FROM node:20 AS builder

# Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Copier les fichiers de définition des dépendances
COPY package.json package-lock.json ./

# Installer les dépendances
# Note: npm ci est plus rapide et plus fiable que npm install dans les builds
RUN npm ci

# Copier le reste du code source
COPY . .

# Compiler l'application (Vite utilise généralement la commande 'build')
RUN npm run build

# =========================================================
# STAGE 2: ETAPE D'EXECUTION (FINAL)
# Utilise un serveur web ultra-léger (Nginx) pour servir le contenu statique
FROM nginx:alpine

# Copier le contenu statique FINAL (dossier 'dist') du stage 'builder'
# vers le répertoire de service par défaut de Nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Le conteneur Nginx écoute par défaut sur le port 80
EXPOSE 80

# La commande de démarrage par défaut de Nginx est conservée (CMD ["nginx", "-g", "daemon off;"])
