FROM node:17.4

WORKDIR /app

# Copy Source File
COPY . .

# Install Files
RUN npm i --only=prod

ENV HOST 0.0.0.0
EXPOSE 80

CMD [ "npm", "start" ]
