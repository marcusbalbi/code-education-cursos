const { load } = require("@grpc/proto-loader");
const grpc = require("@grpc/grpc-js");

async function main() {
  const packageDef = await load("person.proto");
  const personProto = grpc.loadPackageDefinition(packageDef);

  console.log(personProto);
  const client = new personProto.NewPerson(
    'localhost:50051',
    grpc.credentials.createInsecure()
  );
  
  client.newPerson({ name: 'Jonas', last_name: 'Doe' }, function (err, response) {
    console.log("New Person:", response);
  });

}

main();
