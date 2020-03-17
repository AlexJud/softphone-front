FROM nginx:latest
ADD sph-ui*.tar.gz /var/www/
WORKDIR /var/www/
ENTRYPOINT nginx -g 'daemon off;'