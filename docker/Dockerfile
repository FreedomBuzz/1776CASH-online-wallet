FROM nginx:alpine
RUN apk add --update nodejs npm
WORKDIR /mpw
COPY . .
ARG CHAIN_PARAMS_FILE=chain_params.test.json
RUN cp "${CHAIN_PARAMS_FILE}" chain_params.json
RUN npm ci
RUN npm run build
RUN mv dist/* /usr/share/nginx/html/
EXPOSE 80
