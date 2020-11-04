import React, { Component } from 'react'

import { graphql} from 'react-apollo';
import { booksQuery} from '../queries/query';

 class BookList extends Component {
     displayBooks() {
         const data = this.props.data;
         if (data.loading) {
             return (<li>Loading.....</li>)
         }
         else {
             return (data.books.map(book => {
                 return <li key={book.id}>{book.title}</li>
             }))
         }
}
     render() {
        
        return (
            <div>
                <ul id="book-list">
                    {this.displayBooks()}
                </ul>
            </div>
        )
    }
}

export default graphql(booksQuery)(BookList);
