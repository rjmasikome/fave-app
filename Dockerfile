FROM node

WORKDIR /usr/src/app
COPY . /usr/src/app/

RUN yarn

ENV STAGE=prod
RUN yarn build

CMD ["yarn", "start:prod"]