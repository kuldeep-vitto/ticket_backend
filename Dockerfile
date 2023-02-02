FROM node:16

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
RUN npm install -g nodemon app/server
WORKDIR /app

COPY package*.json /app

RUN npm install 


COPY . /app

EXPOSE 5000

CMD ["npm","start"]
