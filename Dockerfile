FROM node:latest as build-step
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:latest as prod-stage
COPY --from=build-step /app/dist/bucketExercise /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

