import fs from 'fs';
import path from 'path';
import { mergeSchemas, attachDirectiveResolvers, makeExecutableSchema } from 'graphql-tools';

import groupbuyTypeDefs from './GroupBuy/TypeDefs.graphql';
import groupbuyResolvers from './GroupBuy/resolvers.js';

const GroupBuySchema = makeExecutableSchema({
  typeDefs: groupbuyTypeDefs,
  resolvers: groupbuyResolvers,
});

export default mergeSchemas({ schemas: [ GroupBuySchema ] });