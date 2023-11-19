# Use Node.js as the build stage
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:stable
# Copy custom nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf
# Copy the production build files from the build stage
COPY --from=build /app/dist/budget-planner /usr/share/nginx/html/
# Expose port 8000
EXPOSE 80