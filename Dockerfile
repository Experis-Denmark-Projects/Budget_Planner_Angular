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
# Expose port 4200 (the port your Angular app is running on)
EXPOSE 4200
# Command to run the Nginx server with the configuration
CMD ["nginx", "-g", "daemon off;"]