const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
dotenv.config({ path: `${__dirname}/.env` });

mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology:true,
}).then(()=>console.log('db connected'));

const { graphqlHTTP } = require('express-graphql');
const schema = require('./Schema/schema');
const app = express();
app.use(cors());
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql:true,
}))
app.listen(5006, () => {
    console.log('Listening');
})
