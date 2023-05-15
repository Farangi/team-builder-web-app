FROM node:18-alpine

# The directory where we will be working
WORKDIR /app

# Copy package.json to our container
COPY package.json .
COPY package-lock.json .

# Run the app on 3001
RUN npm install
EXPOSE 3001
CMD [ "npm", "start" ]