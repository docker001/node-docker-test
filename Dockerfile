FROM node
ADD package.json package.json
RUN npm install
ADD . .
CMD ["npm","start"]
EXPOSE 80