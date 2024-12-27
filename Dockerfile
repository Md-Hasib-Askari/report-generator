# Use an official Node.js image as the base image
FROM node:18-alpine AS build

# Set working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire application source code to the container
COPY . .

# Build the application
RUN npm run build

# Use a lightweight web server to serve the built files
FROM nginx:1.23-alpine

# Copy built files from the build stage to the nginx web server
COPY --from=build /app/dist /usr/share/nginx/html

# Expose the default port nginx listens to
EXPOSE 80

# Start the nginx server
CMD ["nginx", "-g", "daemon off;"]
