FROM oven/bun:1 

WORKDIR /usr/src/app

COPY package.json package.json
COPY package-lock.json package-lock.json
COPY ./packages ./packages
COPY turbo.json turbo.json
COPY bun.lock  bun.lock

COPY ./apps/ws-be ./apps/ws-be

RUN bun install
RUN bun run db:generate

EXPOSE 8081

CMD ["bun", "run", "start:ws"]