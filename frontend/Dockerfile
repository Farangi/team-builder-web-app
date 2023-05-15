FROM node:14-alpine

# Set the working directory to /app
WORKDIR /app

# Copy the package.json and package-lock.json files to the working directory
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the remaining application files to the working directory
# COPY . .

# Build the production-ready React application
# RUN npm run build

# Set the environment variable for the server port
ENV PORT=3000

# Expose the server port
EXPOSE 3000

# Start the server
CMD ["npm", "run", "start"]