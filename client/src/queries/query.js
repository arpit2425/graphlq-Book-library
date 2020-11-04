import { gql } from 'apollo-boost';
const booksQuery = gql`
{
    books{
        id,
        title,
        price,
    }
}
`;
const getAuthors = gql`
{
    authors{
        name,
        id,
    }
}`;
const addBookMutation = gql`
mutation{
    addBook(title:"",price:"",authorId:""){
        title,
        price,
        authorId,

    }
}
`;
export { booksQuery,getAuthors, addBookMutation };