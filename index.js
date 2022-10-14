const express = require('express');

const cors = require('cors');

const {logErrors, errorHandler, boomErrorHandler, ormErrorHandler} = require('./middlewares/error.handler')

const routerApi = require('./routes');


const app = express();
const port = 3002;

app.use(express.json());

const whitelist = ['http://localhost:3000']
const options = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin)) {
      callback(null, true);
    } else {
      console.log(origin);
      callback(new Error("not allowed"));
    }
  }
}
app.use(cors());
// app.use(cors(options));



app.get('/', (req, res) => {
  res.send("This is the backend api for SkyTradeLinks")
})

routerApi(app);
app.use(logErrors);
app.use(ormErrorHandler);
app.use(boomErrorHandler);
app.use(errorHandler);



app.listen(port, () => {
  console.log("Listening from port " + port +" ...");
});
