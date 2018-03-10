import DateScalar from 'graphql-date';

const resolvers = {
  Date: DateScalar,
  Query: {
    groupbuy(_, { id }, { domain: { GroupBuy } }) {
      return GroupBuy.get(id)
    },
    groupbuys(_, args, { domain: { GroupBuy } }) {
      return GroupBuy.all(args)
    }
  }
};

export default resolvers;