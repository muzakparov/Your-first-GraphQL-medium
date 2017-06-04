import { Schema } from './schema.js';
import graphqlHTTP from 'express-graphql';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();

app.use(cors());

app.get('/', function (req, res) {
  res.redirect('/graphql');
});

app.use('/graphql', bodyParser.json(), graphqlHTTP({
  schema: Schema,
  graphiql: true
}));

app.listen(process.env.PORT,function(){
  console.log(`Go to http://localhost:${process.env.PORT}/graphql to run queries!`);
});


