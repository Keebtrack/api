const resolvers = {
  Query: {
    vendors(_, args, { domain: { Vendor } }) {
      return Vendor.all()
    }
  }
};

export default resolvers;