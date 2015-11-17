FROM nodesource/jessie
ADD package.json package.json
RUN npm install
ADD . .
ENTRYPOINT ["npm","start"]
EXPOSE 80