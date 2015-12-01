FROM richarvey/nginx-nodejs
ADD package.json package.json
RUN npm install
ADD . .
ADD public /usr/share/nginx/html
ENV MONGODB_INSTANCE_NAME YourDBName
ENV MONGODB_USERNAME YourDBUser
ENV MONGODB_PASSWORD YourDBPassword
CMD ["npm","start"]
EXPOSE 8080