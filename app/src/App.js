import ApolloClient, { createNetworkInterface } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import React, { Component } from 'react';
import './App.css';

const client = new ApolloClient({
  networkInterface: createNetworkInterface({
    uri: 'http://swapi-curiousnoob.c9users.io:8080/graphql',
  }),
  connectToDevTools: true,
});

const query = gql`
  {
		films{
      title
		}
  }
`;

const MovieContainer = graphql(query);

function Movie({ title }) {
  return (
    <option value={title}>{title}</option>
  );
}


let MovieList = function MovieList({ data }) {
  
  
  return (
      <select>
        <option value="select">SelectX</option>
        {
          data.loading ? (
            <option>Select</option>
          ) : (
            data.films.map((title,index)=>{
              return <Movie key={index} {...title} />
            })
          )
        }
      </select>
  );
};

MovieList = MovieContainer(MovieList);

class App extends Component {
  constructor(){
    super();
    this.state = {value:"Select"};
  }
  
  render() {
    console.log("render",this.state.value);
    return (
      <ApolloProvider client={client}>
        <div className="App">
          <div className="App-header">
            <h2>Star Wars API</h2>
          </div>
          <MovieList value={this.state.value}/>
        </div>
      </ApolloProvider>
    );
  }
}

export default App;