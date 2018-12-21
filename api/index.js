const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const v1 = require('./src/routes/v1');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(bodyParser.json({ limit: '50mb', extended: true}));
app.use(cors());
app.use('/v1', v1);

app.listen(PORT, ()=> {
    console.log(`App running on ${PORT}`);
});