FROM node:18

COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN "API_URL=\"https://weather-backend-j0q9.onrender.com/\"" >> .env
RUN npm run build
RUN npm install -g serve
CMD ["serve", "-s", "build"] 