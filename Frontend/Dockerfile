FROM node:21.7.3-alpine3.18
LABEL version='2.0.0'
LABEL description="Backend Server's Image"
LABEL mantenier='Einar Jhordany Serna Valdivia<eserna@guanajuato.gob.mx>'
WORKDIR /usr/src/Frontend
COPY . /usr/src/Frontend/
RUN yarn install --inmutable 


ENV NODE_ENV=production
ENV VITE_API_URL_DEV='http://172.31.103.38:5000/api/v2'
ENV VITE_API_URL_PROD='http://172.31.113.151:5000/api/v2'
ENV REACT_APP_DEV_API_URL=http://localhost:56733/api/v1/
ENV REACT_APP_PROD_API_URL=http://172.31.113.151:56733/api/v1/

EXPOSE 3000 3001
CMD [ "yarn","start"]