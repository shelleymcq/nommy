FROM node:16-alpine
#RUN apk add py3-bcrypt

# Set the working directory to /app inside the container
WORKDIR /app

# ==== BUILD =====
# Install dependencies (npm ci makes sure the exact versions in the lockfile gets installed)
COPY . .
RUN npm install

# Build the app
RUN npm run install
RUN npm run build

# ==== RUN =======
# Set the env to "production"
ENV NODE_ENV production
# Expose the port on which the app will be running (3000 is the default that `serve` uses)
EXPOSE 3000
# Start the app
CMD [ "npm", "run", "start" ]

