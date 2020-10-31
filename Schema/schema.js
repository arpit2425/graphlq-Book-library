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
    GraphQLNonNull,

} = graphql;
const BookType = new GraphQLObjectType({
    name: 'books',
    fields: () => ({
        id: { type: GraphQLID },
        authorId: { type: GraphQLID },
        title: { type: GraphQLString },
        price: { type: GraphQLInt },
        author: {
            type: AuthorType,
            resolve: async (parent, args) => {
                const id= parent.authorId;
                const author = await Author.findById(id);
                return author;
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
            resolve:async (parent, args) => {
                const books = await Book.find({
                    authorId: parent.id
                });
                return books;
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
            resolve: async(parent, args) => {
                const id = args.id;
                const book = await Book.findById(id);
                   return book;
                
            }
        },
        author: {
            name: 'Author',
            type: AuthorType,
            args: {
                id: { type: GraphQLID },
                
            },
            resolve: async (parent, args) => {
                const id = args.id;
                const author = await Author.findById(id);
                return author;
            }
        },
        books: {
            name:'Books',
            type: GraphQLList(BookType),
            resolve: async (parent, args) => {
                const books = await Book.find();
                return books;
                
            }            
        },
        authors: {
            type: GraphQLList(AuthorType),
            name: "List of authors",
            resolve:async(parent, args)=> {
                const authors = await Author.find();
                return authors;
                
            }
            
        }

    })
});
const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: () => ({
        addAuthor: {
            type: AuthorType,
            args: {
                name: { type: GraphQLNonNull(GraphQLString) },
                age: { type: GraphQLNonNull(GraphQLInt) },
                
            },
            resolve: async (parent, args) => {
                const author = await Author.create({
                    name: args.name,
                    age: args.age,
                });
                return author;
            }

        },
        addBook: {
            type: BookType,
            args: {
                title: { type: GraphQLNonNull(GraphQLString) },
                price: { type: GraphQLNonNull(GraphQLInt) },
                authorId: { type: GraphQLNonNull(GraphQLID) },
                
            },
            resolve: async (parent, args) => {
                const book = await Book.create({
                    title: args.title,
                    price: args.price,
                    authorId: args.authorId,
                });
                return book;
                
            }
        }

    })
})
module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation:Mutation,
})