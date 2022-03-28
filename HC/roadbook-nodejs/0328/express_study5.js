const express = require('express');
const app = express();

app.use(function (err,req,res,next){
    console.log(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(3000);
