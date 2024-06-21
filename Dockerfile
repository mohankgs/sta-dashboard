FROM node:21.7.1-alpine
ARG PATH=$PATH:/sta-dashboard/node_modules/next/dist/bin
WORKDIR /sta-dashboard/
COPY public/ /sta-dashboard/public
COPY components/ /sta-dashboard/components
COPY config/ /sta-dashboard/config
COPY helpers/ /sta-dashboard/helpers
COPY context/ /sta-dashboard/context
COPY pages/ /sta-dashboard/pages
COPY prisma/ /sta-dashboard/pages
COPY styles/ /sta-dashboard/styles
COPY jsconfig.json /sta-dashboard/jsconfig.json
COPY next.config.mjs /sta-dashboard/next.config.mjs
COPY package-lock.json /sta-dashboard/package-lock.json
COPY package.json /sta-dashboard/package.json
COPY .env /sta-dashboard/.env


RUN npm install
RUN next build

CMD ["npm", "start"]

