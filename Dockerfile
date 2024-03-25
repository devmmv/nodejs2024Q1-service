FROM node:20-alpine

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app
WORKDIR /home/node/app
COPY package*.json ./

USER node
RUN npm ci --no-audit --maxsockets 1 --loglevel=error

COPY --chown=node:node . .
EXPOSE 4000
ENTRYPOINT ["./entrypoint.sh"]
CMD ["npm", "run", "start:dev"]