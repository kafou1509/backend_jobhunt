const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const path = require('path')

//Appel des routes
const User = require('./model/user.model')
const route = require('./routes/users.routes');
const aut = require('./routes/Aut.routes');
const offer=require('./routes/offer.routes')

require("dotenv").config({
 path: path.join(__dirname, "../.env")
})

const app = express();

const PORT = process.env.PORT || 3000;

mongoose.connect('mongodb://localhost:27017/Application',{ useUnifiedTopology: true , useNewUrlParser: true })
 .then(() => {
  console.log('Connected to the Database successfully');
 });

app.use(bodyParser.urlencoded({ extended: true }));


//token verification
app.use(async (req, res, next) => {
 if (req.headers["x-access-token"]) {
  const accessToken = req.headers["x-access-token"];// le middleware recupére le token du header x-acess-token
  const { userId, exp } = await jwt.verify(accessToken, process.env.JWT_SECRET);

  // puis il vas use la clef secrete utilisée pour signer le jeton pour vérifier que le jeton n'a pas été compromis.

  // Check if token has expired
  if (exp < Date.now().valueOf() / 1000) {
   return res.status(401).json({ error: "JWT token has expired, please login to obtain a new one" });
  }

  res.locals.loggedInUser = await User.findById(userId);
  next();
 } else {
  next();
 }
});


app.use('/user', route);
app.use('/Aut', aut);
app.use('/api', offer);



app.listen(PORT, () => {
  console.log('Server is listening on Port:', PORT)
});
