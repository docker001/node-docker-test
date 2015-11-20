FROM node
ADD package.json package.json
RUN npm install
ADD . .
ENV MONGODB_INSTANCE_NAME YourDBName
ENV MONGODB_USERNAME YourDBUser
ENV MONGODB_PASSWORD YourDBPassword
CMD ["npm","start"]
EXPOSE 80