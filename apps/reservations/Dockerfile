# Development image
FROM node:alpine As development

# Setting the working directory where all the below actions will take place
WORKDIR /usr/src/app

# './' referres to /usr/src/app
COPY package.json ./
COPY pnpm-lock.yaml ./

# Installing npm in the linux machine
RUN npm install -g pnpm

# Installing node_modules
RUN pnpm install

# Copying the entire project from here where we are to /usr/src/app
COPY . .

# Building the project using the package-json script
RUN pnpm run build

# Production image
FROM node:alpine As production

# Argument that can be overriden at build time
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package.json ./
COPY pnpm-lock.yaml ./

RUN npm install -g pnpm

# Without dev dependencies
RUN pnpm install --prod

# Copy from development above the dist folder to the current dist folder
COPY --from=development /usr/src/app/dist ./dist

# Execute the running container
CMD ["node","dist/apps/reservations/main"]

# Create dockerignore to omit node_modules