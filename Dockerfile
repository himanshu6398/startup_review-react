FROM node:alpine
WORKDIR '/app'
COPY package.json .
RUN npm install
COPY . .
#RUN npm build
EXPOSE 3000
CMD ["npm","start"]


#"proxy": "http://startupreview-spring:8081/",