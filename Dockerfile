FROM "node:20.13-slim"

WORKDIR /APP

COPY src/ ./src
COPY package.json .

# ENV PORT = 3001
# ENV MONGO_URI = "mongodb://localhost:27017"
# ENV MONGO_DB_NAME = "blog"
# ENV JWT_SECRET="49611c37f078335d5c336b7269ff1638066c89f3d5b4a28fc256f2a325461737"

RUN npm install