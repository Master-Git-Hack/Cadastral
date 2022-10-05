# Multi-stage
# 1) Node image for building frontend assets
# 2) nginx stage to serve frontend assets

# Name the node stage "builder" 
FROM node:16-alpine AS builder
LABEL version="1.0.0"
LABEL description="Cadastral Frontend Builder's Image"
LABEL mantenier="Einar Jhordany Serna Valdivia<eserna@guanajuato.gob.mx>"
WORKDIR /usr/src/Frontend
COPY . /usr/src/Frontend
# install node modules and build assets
RUN yarn install --inmutable && yarn build

# nginx state for serving content
FROM nginx:alpine
LABEL version="1.0.0"
LABEL description="Cadastral Frontend Server's Image"
LABEL mantenier="Einar Jhordany Serna Valdivia<eserna@guanajuato.gob.mx>"
WORKDIR /usr/share/nginx/html
# Remove default nginx static assets
RUN rm -rf ./*
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 81

COPY --from=builder /usr/src/Frontend/build /usr/share/nginx/html
# Containers run nginx with global directives and daemon off
#ENV REACT_APP_PROD_API_URL=http://$backend:56733/api/v1/
ENTRYPOINT ["nginx", "-g", "daemon off;"]