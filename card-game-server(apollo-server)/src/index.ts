import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { DataSource } from './datasources.js';
// Here we import the automatically generated Book type, so we can use it in our
// context typing.
import resolvers from './resolvers/index.js';
import { readFileSync } from 'fs';

// Note: this only works locally because it relies on `npm` routing
// from the root directory of the project.
const typeDefs = readFileSync('./schema.graphql', { encoding: 'utf-8' });

export interface MyContext {
  dataSources: {
    cardAPI: DataSource;
  };
}

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer<MyContext>({
  typeDefs,
  resolvers,
});

const myDataSource = new DataSource();
const { url } = await startStandaloneServer(server, {
  
  context: async () => {
    return {
      dataSources: {
        cardAPI: myDataSource,
      },
    };
  },
});

console.log(`🚀 Server listening at: ${url}`);
