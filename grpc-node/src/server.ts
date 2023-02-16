import dotenv from 'dotenv';
dotenv.config();
import repository from "./database/repository/category";
import { blank, CategoryList, CategoryResponse, CategoryServiceServer, CreateCategoryRequest, GetCategoryRequest, UpdateCategoryRequest } from './proto/category';

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
const createCategoryStream = (
  call: any,
  callback: (err: any) => void
) => {
  const categories: CategoryList = { category: [] };
  call.on('data', (d: CreateCategoryRequest) => {
    repository.createCategory(d).then((res) => {
      categories.category.push(res);
    })
  });
  call.on("end", function () {
    callback(categories);
  });
  call.on("error", function (e: any) {
    console.log("================STREAM ERROR====================");
    console.log(e);
    console.log("================STREAM ERROR====================");
  });
  call.on("status", function (status: any) {
    console.log("================STREAM STATUS====================");
    console.log(status);
    console.log("================STREAM STATUS====================");

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

const listCategories = (
  call: { request: blank },
  callback: (err: any, response: CategoryList) => void
) => {
  repository
    .listCategories()
    .then((res) => {
      callback(null, { category: res });
    })
    .catch((err) => {
      console.log(err);
      callback(err, { category: [] });
    });
};

const getCategory = (
  call: { request: GetCategoryRequest },
  callback: (err: any, response: CategoryResponse) => void
) => {
  repository
    .getCategory(call.request.id)
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
    listCategories,
    getCategory,
    createCategoryStream,
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