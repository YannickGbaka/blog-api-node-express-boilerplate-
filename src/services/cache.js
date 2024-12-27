const redis = require("redis");

class CacheService {
  constructor() {
    this.client = redis.createClient();
  }

  async get(key) {
    const value = await this.client.get(key);
    return value ? JSON.parse(value) : null;
  }

  async set(key, value, ttl = 3600) {
    await this.client.set(key, JSON.stringify(value), { EX: ttl });
  }

  async del(key) {
    await this.client.del(key);
  }

  generateKey(prefix, indentifier) {
    return `${prefix}:${indentifier}`;
  }

  async connect() {
    if (!this.client.isOpen) {
      await this.client.connect();
    }
  }

  async disconnect() {
    if (this.client.isOpen) {
      await this.client.disconnect();
    }
  }
}

module.exports = new CacheService();
