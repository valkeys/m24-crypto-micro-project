const { gql } = require('apollo-server')

const typeDefs = gql`
type Performance  {
    symbol:String!
    period:String!
    change:Float!    
}

type Performances{
    m5:Performance!
    m15:Performance!
    m30:Performance!
    h1:Performance!
    h2:Performance!
    h4:Performance!
    h6:Performance!
    h8:Performance!
    h12:Performance!
    h24:Performance!
}

type Query {
    symbolPerformance:[Performances!]!
}

type Subscription{
    symbolPerformance:[Performances!]!
}
`

module.exports = { typeDefs }