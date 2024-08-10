export default () => ({
  appSecret: process.env.APP_SECRET,
  dbUrl: process.env.DB_URL,
  dbName: process.env.DB_NAME,
  link: process.env.LINK,
})