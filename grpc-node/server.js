const { load } = require('@grpc/proto-loader');
const grpc = require('@grpc/grpc-js');

let lastId = 0;

const newPerson = (call, callback) => {
  console.log('receive data', call.request)
  callback(null, { name: call.request.name, id: ++lastId });
}
async function main() {
  const packageDef = await load("person.proto");
  const personProto = grpc.loadPackageDefinition(packageDef);
  console.log(personProto);
  const server = new grpc.Server();
  server.addService(personProto.NewPerson.service, { newPerson });
  server.bindAsync(
    "0.0.0.0:50051",
    grpc.ServerCredentials.createInsecure(),
    () => {
      server.start();
    }
  );
}

main();