const graphql = require('graphql');
const _ = require('lodash');
const Book = require('../models/book');
const Author = require('../models/author');
// const books = [
//     { title: "Harry Potter", id: "1" ,authorId:"1"},
//     { title: "Invisible Man. Ralph Ellison. ... ", id: "2" ,authorId:"2"},
//     { title: "Beloved", id: "3",authorId:"3" },
//     { title: "A Passage to India. E.M. Forster. ... ", id: "4" ,authorId:"2"},
//     { title: "One Hundred Years of Solitude. ... ", id: "5",authorId:"1" },
// ];
// const author = [
//     { id: '1', name: 'Sam wills', age: 32 },
//     { id: '2', name: 'John Sadan', age: 40 },
//     { id: '3', name: 'Rock maxwill', age: 45 }
// ];

const { GraphQLInt,
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLList,

} = graphql;
const BookType = new GraphQLObjectType({
    name: 'books',
    fields: () => ({
        id: { type: GraphQLID },
        title: { type: GraphQLString },
        author: {
            type: AuthorType,
            resolve: (parent, args) => {
                return _.find(author, { id: parent.authorId });
            }
        }
    })
});
const AuthorType = new GraphQLObjectType({
    name: 'Authors',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        books: {
            type: GraphQLList(BookType),
            resolve: (parent, args) => {
               return _.filter(books,{authorId:parent.id})
            }
        }
        
    })
});
const RootQuery = new GraphQLObjectType({
    name: 'root',
    fields: () => ({
        book: {
            type: BookType,
            args: {
                id: { type: GraphQLID }
            },
            resolve: (parent, args) => {
                return _.find(books, { id: args.id });
                
            }
        },
        author: {
            name: 'Author',
            type: AuthorType,
            args: {
                id: { type: GraphQLID },
                
            },
            resolve: (parent, args) => {
                return _.find(author, { id: args.id });
            }
        },
        books: {
            name:'Books',
            type: GraphQLList(BookType),
            resolve: (parent, args) => {
                return books;
                
            }            
        },
        authors: {
            type: GraphQLList(AuthorType),
            name: "List of authors",
            resolve(parent, args) {
                return author;
                
            }
            
        }

    })
});
module.exports = new GraphQLSchema({
    query:RootQuery,
})