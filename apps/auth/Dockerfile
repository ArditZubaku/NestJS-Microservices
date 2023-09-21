# Development image
FROM node:alpine As development

# Setting the working directory where all the below actions will take place
WORKDIR /usr/src/app

# './' referres to /usr/src/app
COPY package.json ./
COPY yarn.lock ./
COPY tsconfig.json tsconfig.json

# Installing yarn using apk
RUN apk add --no-cache yarn


# Installing node_modules
RUN yarn install

# Copying the entire project from here where we are to /usr/src/app
# COPY . .

# Copying only the auth project and its needs from here where we are to /usr/src/app
COPY apps/auth apps/auth
COPY libs libs

## Installing the node_modules needed only for auth
RUN cd apps/auth && yarn install

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

# Without dev dependencies
RUN yarn install --production

# Copy from development above the dist folder to the current dist folder
COPY --from=development /usr/src/app/dist ./dist

# Execute the running container
CMD ["node","dist/apps/auth/main"]

# Create dockerignore to omit node_modules