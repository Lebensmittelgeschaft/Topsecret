const printSchema = require('graphql').printSchema;
const GraphqlSchema = require('../dist/schemas/schema').GraphqlSchema;
const fs = require('fs');

const printedSchema = printSchema(GraphqlSchema);
fs.writeFileSync(process.argv[2], printedSchema);
