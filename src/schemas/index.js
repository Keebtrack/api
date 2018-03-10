import fs from 'fs';
import path from 'path';
import { mergeSchemas, attachDirectiveResolvers, makeExecutableSchema } from 'graphql-tools';

import userTypeDefs from './User/TypeDefs.graphql';
import userResolvers from './User/resolvers.js';

const UserSchema = makeExecutableSchema({
  typeDefs: userTypeDefs,
  resolvers: userResolvers,
});

export default mergeSchemas({ schemas: [ UserSchema ] });