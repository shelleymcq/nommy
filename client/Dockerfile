# development environment
FROM node:16-alpine as build
RUN apk add yq

WORKDIR /app

COPY package.json package-lock.json .
RUN npm install
COPY . .
RUN npm run build

RUN yq -iP '.proxy="http://server:3001"' package.json -o json

ENV NODE_ENV production
EXPOSE 3000
CMD [ "npm", "run", "start" ]

# production environment
FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
