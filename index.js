require('dotenv').config();
const express = require('express');

const {connectmongoDB} = require('./connection')
const {logreqres} = require('./middlewares')
const UserRouter = require('./routes/user')


const app = express();
const PORT = process.env.PORT || 6001;
connectmongoDB('mongodb://localhost:27017/tournament-x1')
.then(
  () => console.log("Connected to MongoDB")
).catch(
  (err) => console.log(err)
)

app.use(express.urlencoded(
  { extended: false }
));

app.use(logreqres("log.txt"))

app.use((req, res, next) => {
  console.log("A new request received at " + new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }));
  next();
})

app.get('/', (req, res) => {
  const html = `
  <h1>Welcome to the Users API</h1>
  <p>
    <a href="/api/users">Users</a>
  </p>
  <p>
    <a href="/user">Users</a>
  </p>
  `
  return res.send(html)
})

app.use("/api/user", UserRouter)

app.listen(PORT, () => console.log(`Server started at Port: ${PORT}`))