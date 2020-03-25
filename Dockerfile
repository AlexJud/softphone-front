FROM nginx:latest
ADD sph-ui*.tar.gz /usr/share/nginx/html
WORKDIR /var/www/
ENTRYPOINT nginx -g 'daemon off;'