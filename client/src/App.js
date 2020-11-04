import React from 'react'
import BookList from './components/BookList'
import ApolloClient from 'apollo-boost';
import {ApolloProvider} from 'react-apollo'
import  AddBook  from './components/AddBook';
const client = new ApolloClient({
  uri: 'http://localhost:5006/graphql'
});
function App() {
  return (
    <ApolloProvider client={client}>
    <div id="main"> 
      <h1>Reading List</h1>
        <BookList />
        <AddBook/>
      </div>
      </ApolloProvider>
  )
}

export default App
