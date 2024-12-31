FROM node:16.20.0-buster-slim as builder

COPY ./ /app
WORKDIR /app
RUN npm install
RUN npm run build

FROM nginx:1.24.0-alpine3.17

COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /app/dist/ /usr/share/nginx/html

EXPOSE 4200

CMD ["/bin/sh",  "-c",  "exec nginx -g 'daemon off;'"]

HEALTHCHECK --interval=30s --timeout=5s --start-period=30s --retries=3 CMD curl -f -s localhost:4200 || exit 1
