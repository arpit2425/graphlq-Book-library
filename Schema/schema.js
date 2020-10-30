const graphql = require('graphql');
const { GraphQLInt,
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,

} = graphql;
const BookType = new GraphQLObjectType({
    name: 'books',
    fields: () => ({
        id: { type: GraphQLString },
        name: { type: GraphQLString },
    })
});
const RootQuery = new GraphQLObjectType({
    name: 'root',
    fields: () => ({
        book: {
            type: BookType,
            args: {
                id: { type: GraphQLString }
            },
            resolve: (parent, args) => {
                
            }
        }
    })
});
module.exports = new GraphQLSchema({
    query:RootQuery,
})