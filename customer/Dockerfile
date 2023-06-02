FROM node:lts-alpine AS builder
WORKDIR /usr/src/app
# copy config files and install to reuse cache
COPY package.json yarn.lock ./
COPY prisma ./prisma/
COPY .env ./
COPY tsconfig.json ./

RUN yarn install
RUN yarn generate
# copy the rest of the project, that may change
COPY . .
RUN yarn build

FROM node:lts-alpine
WORKDIR /usr/src/app
COPY --from=builder /usr/src/app/ ./

EXPOSE 3333
CMD [ "yarn", "start" ]
