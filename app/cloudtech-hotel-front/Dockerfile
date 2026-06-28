FROM node:20-alpine

WORKDIR /app

# Install http-server globally
RUN npm install -g http-server

# Copy public files
COPY public/ ./public/

EXPOSE 3000

CMD ["http-server", "public", "-p", "3000", "-c-1", "--cors"]
