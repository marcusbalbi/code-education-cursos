import dotenv from 'dotenv';
dotenv.config();
import repository from "./database/repository/category";
import { CategoryResponse, CreateCategoryRequest, UpdateCategoryRequest } from './proto/category';

const { load } = require('@grpc/proto-loader');
const grpc = require('@grpc/grpc-js');

const createCategory = (
  call: { request: CreateCategoryRequest },
  callback: (err: any, response: CategoryResponse) => void
) => {
  console.log("receive data", call.request);
  repository
    .createCategory(call.request)
    .then((res) => {
      callback(null, { category: res });
    })
    .catch((err) => {
      console.log(err);
      callback(err, { category: undefined });
    });
};

const updateCategory = (
  call: { request: UpdateCategoryRequest },
  callback: (err: any, response: CategoryResponse) => void
) => {
  console.log("receive data", call.request);
  repository.updateCategory(call.request.id, call.request)
    .then((res) => {
      callback(null, { category: res });
    })
    .catch((err) => {
      console.log(err);
      callback(err, { category: undefined });
    });
};

async function main() {
  const packageDef = await load("./src/proto/category.proto");
  const categoryProto = grpc.loadPackageDefinition(packageDef);
  const server = new grpc.Server();
  server.addService(categoryProto.pb.CategoryService.service, {
    createCategory,
    updateCategory,
  });
  server.bindAsync(
    "0.0.0.0:50051",
    grpc.ServerCredentials.createInsecure(),
    () => {
      server.start();
      console.log('service running at 0.0.0.0:50051')
    }
  );
}

main();