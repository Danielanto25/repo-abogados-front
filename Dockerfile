#Primera Etapa
FROM node:16.10 as build-step

RUN mkdir -p /app

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . /app

RUN npm run build --prod
#Segunda Etapa
FROM nginx:1.17.1
	#Si estas utilizando otra aplicacion cambia PokeApp por el nombre de tu app
COPY --from=build-step /app/dist/abogados-front /usr/share/nginx/html