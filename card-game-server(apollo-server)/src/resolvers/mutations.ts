import { MutationResolvers } from '__generated__/resolvers-types';

// Use the generated `MutationResolvers` type to type check our mutations!
const mutations: MutationResolvers = {
  Mutation: {
    // Below, we mock adding a new book. Our data set is static for this
    // example, so we won't actually modify our data.
    reset: async (_, {}, { dataSources }) => {
      return await dataSources.cardAPI.reset();
    },
  },
};

export default mutations;
