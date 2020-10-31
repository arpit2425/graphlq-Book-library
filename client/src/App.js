import React from 'react'
import BookList from './components/BookList'
import ApolloClient from 'apollo-boost';
import {ApolloProvider} from 'react-apollo'
const client = new ApolloClient({
  uri: 'http://localhost:5001/graphql'
});
function App() {
  return (
    <ApolloProvider client={client}>
    <div>
      <h1>Reading List</h1>
      <BookList/>
      </div>
      </ApolloProvider>
  )
}

export default App
