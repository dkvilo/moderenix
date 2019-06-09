/**
 * @param   {string}   key
 * @param   {string}   defaultValue
 * @returns {string}
 */
let env = (key, defaultValue) => process.env[key] || defaultValue;

const config = {
  database: {
    name: env('DB_NAME', ''),
    user: env('DB_USER', ''),
    host: env('DB_HOST', ''),
    password: env('DB_PASSWORD', '')
  },
  redis: {
    url: env('REDIS_URL', ''),
    ttl: env('RDS_TTL', '')
  },
  server: {
    port: env('PORT', 80),
    storage: {
      path: env('STORAGE_PATH', 'upload'),
      image: env('IMAGE_STORAGE', 'images'),
    },
  },
  salt: {
    jwt: env('JWT_SALT', ''),
    session: env('SESSION_SALT', ''),
    password: env('USER_PASSWORD', '')
  },
  node: {
    env: env('NODE_ENV', '')
  },
  info: {
    title: env('TITLE', ''),
    version: env('VERSION', '')
  }
};

module.exports = config;