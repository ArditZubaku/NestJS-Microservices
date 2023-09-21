# # Development image
# FROM node:alpine AS development

# # Setting the working directory where all the below actions will take place
# WORKDIR /usr/src/app

# # './' refers to /usr/src/app
# COPY package.json ./
# COPY yarn.lock ./
# COPY tsconfig.json tsconfig.json
# COPY nest-cli.json nest-cli.json

# # Installing yarn using apk
# RUN apk add --no-cache yarn

# # Installing node_modules
# # RUN yarn

# # Copying the entire project from here where we are to /usr/src/app
# # COPY . .

# # Copying only the reservations project and it's needs from here where we are to /usr/src/app
# COPY apps/reservations apps/reservations
# COPY libs libs

# RUN yarn install -r

# # Building the project using the package-json script
# RUN yarn build reservations

# # Production image
# FROM node:alpine AS production

# # Argument that can be overridden at build time
# ARG NODE_ENV=production
# ENV NODE_ENV=${NODE_ENV}

# WORKDIR /usr/src/app

# COPY package.json ./
# COPY yarn.lock ./

# # Without dev dependencies
# RUN yarn install --production

# # Copy from development above the dist folder to the current dist folder
# COPY --from=development /usr/src/app/dist ./dist

# # Execute the running container
# CMD ["node", "dist/apps/reservations/main"]

# # Create a .dockerignore file to omit node_modules


FROM node:alpine As development

WORKDIR /usr/src/app

COPY package.json ./
COPY pnpm-lock.yaml ./
COPY tsconfig.json tsconfig.json
COPY nest-cli.json nest-cli.json

RUN npm install -g pnpm

COPY apps/reservations apps/reservations
COPY libs libs

RUN pnpm install -r

RUN pnpm run build reservations

FROM node:alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package.json ./
COPY pnpm-lock.yaml ./

RUN npm install -g pnpm

RUN pnpm install --prod

COPY --from=development /usr/src/app/dist ./dist

CMD ["node", "dist/apps/reservations/main"]