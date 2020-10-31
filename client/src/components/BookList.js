import React, { Component } from 'react'
import { gql } from 'apollo-boost';
import { graphql} from 'react-apollo';
const booksQuery = gql`
{
    books{
        id,
        title,
        price,
    }
}
`;

 class BookList extends Component {

     render() {
        console.log(this.props);
        return (
            <div>
                <ul id="book-list">
                    <li>Book 1</li>
                </ul>
            </div>
        )
    }
}

export default graphql(booksQuery)(BookList);
