const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { dataRouter } = require('./routes/planData');

const app = express();
const PORT = 3000;

mongoose.connect('mongodb+srv://Nilay:NilayPassword@cluster0.jr8js.mongodb.net/PlanDatabase', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

app.use(bodyParser.json());


app.use('/v1/data', dataRouter);

app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
});
