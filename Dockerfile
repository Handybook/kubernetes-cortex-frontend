FROM nginx:stable

COPY build /u/apps/service/public
COPY default.conf /etc/nginx/conf.d/default.conf

CMD ["nginx"]
