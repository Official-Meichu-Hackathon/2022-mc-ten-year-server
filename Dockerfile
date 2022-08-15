FROM node:18-alphine

RUN mkdir /app
WORKDIR /app

COPY package.json .

# Install Files
RUN npm i --only=prod

# Copy Source File
COPY . .

ENV HOST 0.0.0.0
EXPOSE 80

CMD [ "npm", "start" ]
