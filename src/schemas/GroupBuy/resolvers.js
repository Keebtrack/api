import DateScalar from 'graphql-date';

const resolvers = {
  Date: DateScalar,
  Query: {
    groupbuy(_, { first = 1, after = null }, { domain: { GroupBuy } }) {
      return GroupBuy.all(first, after)
    },
    groupbuys(_, { id }, { domain: { GroupBuy } }) {
      return GroupBuy.get(id)
    }
  }
};

export default resolvers;