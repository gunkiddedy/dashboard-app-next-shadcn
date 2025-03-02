const NodeCache = require("node-cache"),
  CACHED = new NodeCache();

const setCache = (key, data, ttl) =>
    CACHED.set(key, JSON.stringify({ d: data }), ttl || 604800),
  getCache = (key) => {
    const cachedData = CACHED.get(key);
    return cachedData ? JSON.parse(cachedData).d : null;
  },
  deleteCache = (key) => CACHED.del(key);

module.exports = { setCache, getCache, deleteCache };
