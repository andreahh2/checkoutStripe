const express = require('express')
const app = express()
const cors = require('cors')


const stripe = require("stripe")("sk_test_51HfU8UJWSJMmQymclydFmCebaPMsMJXnA3FNjGQBlqscxIBFpNbarLr6Lixr75jLt8w6NkCz7W3WEVRIa734Jk2L00gtGv97qk");
app.use(express.static("."));
app.use(express.json());
app.use(cors());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.post('/create-checkout-session', async (req, res) => {
  const body = (req.body)
  const session = await stripe.checkout.sessions.create(body);
  res.status(200).json({ id: session.id });
});
app.get('/test', (req, res)=>res.status(200).json({ok: true}));


app.listen((process.env.PORT || 5000), () => console.log('Node server listening on port 3000!'));