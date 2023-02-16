import { CategoryServiceClient } from "./proto/category";

const { load } = require("@grpc/proto-loader");
const grpc = require("@grpc/grpc-js");

async function main() {
  const packageDef = await load("./src/proto/category.proto");
  const categoryProto = grpc.loadPackageDefinition(packageDef);

  const client: CategoryServiceClient = new categoryProto.pb.CategoryService(
    "localhost:50051",
    grpc.credentials.createInsecure()
  );
  client.createCategory({ name: 'Movie', description: 'with ts' }, function (a, b) {
    console.log(b,'===================')
    if (!b || !b.category) return;
    client.updateCategory({ id: b.category.id, name: 'updated', description: 'now updated!' }, function (a, updated) {
      console.log(a, "updated.....", updated);
    })
  });


}
main();
