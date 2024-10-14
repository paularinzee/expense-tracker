# Use an official Node.js runtime as a parent image
FROM node:18

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Copy the yarn.lock files to the container
COPY package*.json ./

# Install dependencies
RUN yarn install

# Copy the rest of the application code to the container
COPY . .

# Expose the port the app runs on
EXPOSE 3000

# Define the command to run your app
CMD ["npm", "start"]
