import fs from 'fs';
import path from 'path';
import { mergeSchemas, attachDirectiveResolvers, makeExecutableSchema } from 'graphql-tools';

import groupbuyTypeDefs from './GroupBuy/typeDefs.graphql';
import groupbuyResolvers from './GroupBuy/resolvers.js';

import vendorTypeDefs from './Vendor/typeDefs.graphql';
import vendorResolvers from './Vendor/resolvers.js';

const GroupBuySchema = makeExecutableSchema({
  typeDefs: groupbuyTypeDefs,
  resolvers: groupbuyResolvers,
});

const VendorSchema = makeExecutableSchema({
  typeDefs: vendorTypeDefs,
  resolvers: vendorResolvers,
});

export default mergeSchemas({ schemas: [ GroupBuySchema, VendorSchema ] });