
export default () => ({
  port: process.env.PORT,
  db:{
    url: process.env.DB_URL,
  },
  token:{
jwt_secret:process.env.JWT_SECRET,
  },
  cloud:{}
});