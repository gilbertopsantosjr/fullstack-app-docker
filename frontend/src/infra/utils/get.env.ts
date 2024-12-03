export const getEnv = () => {
  return process.env.ENVIRONMENT && process.env.ENVIRONMENT === 'production'
    ? 'http://127.0.0.1:9000'
    : 'http://127.0.0.1:5000'
}
