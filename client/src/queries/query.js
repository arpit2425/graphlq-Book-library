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
const getBookQuery = gql`
query($id:ID!){
book(id:$id){
    title,
    price,
    author{
        name,
        age,
        books{
            title,
            price,
            id
        }
       
    }
}
}
`;
export { booksQuery,getAuthors, addBookMutation,getBookQuery };