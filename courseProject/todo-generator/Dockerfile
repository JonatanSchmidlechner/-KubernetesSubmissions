# Use official Node.js LTS version as base
FROM node:alpine3.22

# Set working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json if they exist
COPY package*.json ./
RUN npm install

# Copy the rest of your app
COPY . .

# Run the app
CMD ["npm", "run", "build"]
