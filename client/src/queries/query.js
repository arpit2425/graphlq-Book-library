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
mutation($title:String!,$price:Int!,$authorId:ID!){
    addBook(title:$title,price:$price,authorId:$authorId){
        title,
        price,
        

    }
}
`;
export { booksQuery,getAuthors, addBookMutation };