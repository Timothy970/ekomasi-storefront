# --- Build stage ---
ARG NODE_VERSION=24
FROM node:${NODE_VERSION}-alpine AS build
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci

# Copy app source
COPY . .

# Build Next.js app
ENV NODE_ENV=production
RUN npm run build

# --- Production stage ---
FROM node:${NODE_VERSION}-alpine AS runner
WORKDIR /app

# Copy only necessary files
COPY --from=build /app/package*.json ./
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/.next ./.next
COPY --from=build /app/public ./public

# Expose port
EXPOSE 3000

# Start Next.js server
CMD ["npm", "start"]
