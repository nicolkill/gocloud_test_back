FROM node:carbon

WORKDIR /app
COPY . .

ADD docker-entrypoint.sh .
ENTRYPOINT ["./docker-entrypoint.sh"]

CMD ["start"]
