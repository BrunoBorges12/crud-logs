FROM node:14

WORKDIR /app

COPY . ./

RUN npm install

RUN npm run dev

EXPOSE 8000

CMD ["npm", "run", 'dev']