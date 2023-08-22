# Development image
FROM node:alpine As development

# Setting the working directory where all the below actions will take place
WORKDIR /usr/src/app

# './' referres to /usr/src/app
COPY package.json ./
COPY yarn.lock ./

# Installing yarn using apk
RUN apk add --no-cache yarn


# Installing node_modules
RUN yarn

# Copying the entire project from here where we are to /usr/src/app
COPY . .

# Building the project using the package-json script
RUN yarn build

# Production image
FROM node:alpine As production

# Argument that can be overriden at build time
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package.json ./
COPY yarn.lock ./

RUN npm install -g yarn

# Without dev dependencies
RUN pnpm install --prod

# Copy from development above the dist folder to the current dist folder
COPY --from=development /usr/src/app/dist ./dist

# Execute the running container
CMD ["node","dist/apps/auth/main"]

# Create dockerignore to omit node_modules