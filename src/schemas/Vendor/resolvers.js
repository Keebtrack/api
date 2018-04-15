const resolvers = {
  Query: {
    vendors(_, args, { domain: { Vendor } }) {
      console.log(Vendor)
      return Vendor.all()
    }
  }
};

export default resolvers;