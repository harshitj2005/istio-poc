FROM node:12.16.1-slim

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install -g pm2
RUN npm install

# If you are building your code for production
# RUN npm install --only=production

# Bundle app source
COPY . .
EXPOSE 3001
CMD [ "pm2-runtime" , "start" , "pm2-ecosystem.json" ]

