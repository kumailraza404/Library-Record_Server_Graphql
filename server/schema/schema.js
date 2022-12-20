const graphql = require('graphql')
const _ = require("lodash")

const {GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt, GraphQLList} = graphql


const books = [
    {name: "name of", genre:"fantasy", id:"1", authorId:"1"},
    {name: "the final", genre:"fantasy", id:"2", authorId:"2"},
    { name: "the long", genre: "fantasy", id: "3", authorId: "3" },
    {name: "hero", genre:"ble", id:"4", authorId:"3"},
    { name: "color", genre: "ble", id: "4", authorId: "2" },
    {name: "dark", genre:"ble", id:"4", authorId:"1"},
    
    
]

const authors = [
    {name: "Patrick", age:44 ,id:"1"},
    {name: "Brandy", age:64 ,id:"2"},
    {name: "Terra", age:34 ,id:"3"}
]

const BookType = new GraphQLObjectType({
    name : 'Book',
    fields: () => ({
        id: {type : GraphQLID},
        name: {type : GraphQLString},
        genre: {type : GraphQLString},
        author: {
            type: AuthorType,
            resolve(parent, arg){
                return _.find(authors,{id: parent.authorId})
            }
        }
    })
})

const AuthorType = new GraphQLObjectType({
    name : 'Author',
    fields: () => ({
        id: {type : GraphQLID},
        name: {type : GraphQLString},
        age: { type: GraphQLInt },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                return _.filter(books, {authorId: parent.id})
            }
        }
    })
})


const RootQuery =new GraphQLObjectType({
    name: 'RootQueryType',
    fields:{
        book : {
            type: BookType,
            args: {id: { type: GraphQLID }},
            resolve(parent, args){
                //code to get data from database
                return _.find(books,{id: args.id})
            }
        },
        author : {
            type: AuthorType ,
            args: {id: { type: GraphQLID }},
            resolve(parent, args){
                //code to get data from database
                return _.find(authors,{id: args.id})
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery
})