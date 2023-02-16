/* eslint-disable */
import {
  CallOptions,
  ChannelCredentials,
  Client,
  ClientOptions,
  ClientUnaryCall,
  handleUnaryCall,
  makeGenericClientConstructor,
  Metadata,
  ServiceError,
  UntypedServiceImplementation,
} from "@grpc/grpc-js";
import * as _m0 from "protobufjs/minimal";

export const protobufPackage = "pb";

export interface blank {
}

export interface Category {
  id: string;
  name: string;
  description: string;
}

export interface CreateCategoryRequest {
  name: string;
  description: string;
}

export interface UpdateCategoryRequest {
  id: string;
  name: string;
  description: string;
}

export interface CategoryResponse {
  category: Category | undefined;
}

export interface CategoryList {
  category: Category[];
}

export interface GetCategoryRequest {
  id: string;
}

function createBaseblank(): blank {
  return {};
}

export const blank = {
  encode(_: blank, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): blank {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseblank();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): blank {
    return {};
  },

  toJSON(_: blank): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<blank>, I>>(base?: I): blank {
    return blank.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<blank>, I>>(_: I): blank {
    const message = createBaseblank();
    return message;
  },
};

function createBaseCategory(): Category {
  return { id: "", name: "", description: "" };
}

export const Category = {
  encode(message: Category, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.name !== "") {
      writer.uint32(18).string(message.name);
    }
    if (message.description !== "") {
      writer.uint32(26).string(message.description);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Category {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCategory();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.string();
          break;
        case 2:
          message.name = reader.string();
          break;
        case 3:
          message.description = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Category {
    return {
      id: isSet(object.id) ? String(object.id) : "",
      name: isSet(object.name) ? String(object.name) : "",
      description: isSet(object.description) ? String(object.description) : "",
    };
  },

  toJSON(message: Category): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.name !== undefined && (obj.name = message.name);
    message.description !== undefined && (obj.description = message.description);
    return obj;
  },

  create<I extends Exact<DeepPartial<Category>, I>>(base?: I): Category {
    return Category.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<Category>, I>>(object: I): Category {
    const message = createBaseCategory();
    message.id = object.id ?? "";
    message.name = object.name ?? "";
    message.description = object.description ?? "";
    return message;
  },
};

function createBaseCreateCategoryRequest(): CreateCategoryRequest {
  return { name: "", description: "" };
}

export const CreateCategoryRequest = {
  encode(message: CreateCategoryRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    if (message.description !== "") {
      writer.uint32(18).string(message.description);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CreateCategoryRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCreateCategoryRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.name = reader.string();
          break;
        case 2:
          message.description = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CreateCategoryRequest {
    return {
      name: isSet(object.name) ? String(object.name) : "",
      description: isSet(object.description) ? String(object.description) : "",
    };
  },

  toJSON(message: CreateCategoryRequest): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    message.description !== undefined && (obj.description = message.description);
    return obj;
  },

  create<I extends Exact<DeepPartial<CreateCategoryRequest>, I>>(base?: I): CreateCategoryRequest {
    return CreateCategoryRequest.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<CreateCategoryRequest>, I>>(object: I): CreateCategoryRequest {
    const message = createBaseCreateCategoryRequest();
    message.name = object.name ?? "";
    message.description = object.description ?? "";
    return message;
  },
};

function createBaseUpdateCategoryRequest(): UpdateCategoryRequest {
  return { id: "", name: "", description: "" };
}

export const UpdateCategoryRequest = {
  encode(message: UpdateCategoryRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.name !== "") {
      writer.uint32(18).string(message.name);
    }
    if (message.description !== "") {
      writer.uint32(26).string(message.description);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UpdateCategoryRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUpdateCategoryRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.string();
          break;
        case 2:
          message.name = reader.string();
          break;
        case 3:
          message.description = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): UpdateCategoryRequest {
    return {
      id: isSet(object.id) ? String(object.id) : "",
      name: isSet(object.name) ? String(object.name) : "",
      description: isSet(object.description) ? String(object.description) : "",
    };
  },

  toJSON(message: UpdateCategoryRequest): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.name !== undefined && (obj.name = message.name);
    message.description !== undefined && (obj.description = message.description);
    return obj;
  },

  create<I extends Exact<DeepPartial<UpdateCategoryRequest>, I>>(base?: I): UpdateCategoryRequest {
    return UpdateCategoryRequest.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<UpdateCategoryRequest>, I>>(object: I): UpdateCategoryRequest {
    const message = createBaseUpdateCategoryRequest();
    message.id = object.id ?? "";
    message.name = object.name ?? "";
    message.description = object.description ?? "";
    return message;
  },
};

function createBaseCategoryResponse(): CategoryResponse {
  return { category: undefined };
}

export const CategoryResponse = {
  encode(message: CategoryResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.category !== undefined) {
      Category.encode(message.category, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CategoryResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCategoryResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.category = Category.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CategoryResponse {
    return { category: isSet(object.category) ? Category.fromJSON(object.category) : undefined };
  },

  toJSON(message: CategoryResponse): unknown {
    const obj: any = {};
    message.category !== undefined && (obj.category = message.category ? Category.toJSON(message.category) : undefined);
    return obj;
  },

  create<I extends Exact<DeepPartial<CategoryResponse>, I>>(base?: I): CategoryResponse {
    return CategoryResponse.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<CategoryResponse>, I>>(object: I): CategoryResponse {
    const message = createBaseCategoryResponse();
    message.category = (object.category !== undefined && object.category !== null)
      ? Category.fromPartial(object.category)
      : undefined;
    return message;
  },
};

function createBaseCategoryList(): CategoryList {
  return { category: [] };
}

export const CategoryList = {
  encode(message: CategoryList, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.category) {
      Category.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CategoryList {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCategoryList();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.category.push(Category.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CategoryList {
    return { category: Array.isArray(object?.category) ? object.category.map((e: any) => Category.fromJSON(e)) : [] };
  },

  toJSON(message: CategoryList): unknown {
    const obj: any = {};
    if (message.category) {
      obj.category = message.category.map((e) => e ? Category.toJSON(e) : undefined);
    } else {
      obj.category = [];
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CategoryList>, I>>(base?: I): CategoryList {
    return CategoryList.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<CategoryList>, I>>(object: I): CategoryList {
    const message = createBaseCategoryList();
    message.category = object.category?.map((e) => Category.fromPartial(e)) || [];
    return message;
  },
};

function createBaseGetCategoryRequest(): GetCategoryRequest {
  return { id: "" };
}

export const GetCategoryRequest = {
  encode(message: GetCategoryRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetCategoryRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetCategoryRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetCategoryRequest {
    return { id: isSet(object.id) ? String(object.id) : "" };
  },

  toJSON(message: GetCategoryRequest): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    return obj;
  },

  create<I extends Exact<DeepPartial<GetCategoryRequest>, I>>(base?: I): GetCategoryRequest {
    return GetCategoryRequest.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<GetCategoryRequest>, I>>(object: I): GetCategoryRequest {
    const message = createBaseGetCategoryRequest();
    message.id = object.id ?? "";
    return message;
  },
};

export type CategoryServiceService = typeof CategoryServiceService;
export const CategoryServiceService = {
  createCategory: {
    path: "/pb.CategoryService/createCategory",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: CreateCategoryRequest) => Buffer.from(CreateCategoryRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => CreateCategoryRequest.decode(value),
    responseSerialize: (value: CategoryResponse) => Buffer.from(CategoryResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => CategoryResponse.decode(value),
  },
  updateCategory: {
    path: "/pb.CategoryService/updateCategory",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: UpdateCategoryRequest) => Buffer.from(UpdateCategoryRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => UpdateCategoryRequest.decode(value),
    responseSerialize: (value: CategoryResponse) => Buffer.from(CategoryResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => CategoryResponse.decode(value),
  },
  listCategories: {
    path: "/pb.CategoryService/listCategories",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: blank) => Buffer.from(blank.encode(value).finish()),
    requestDeserialize: (value: Buffer) => blank.decode(value),
    responseSerialize: (value: CategoryList) => Buffer.from(CategoryList.encode(value).finish()),
    responseDeserialize: (value: Buffer) => CategoryList.decode(value),
  },
  getCategory: {
    path: "/pb.CategoryService/getCategory",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: GetCategoryRequest) => Buffer.from(GetCategoryRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => GetCategoryRequest.decode(value),
    responseSerialize: (value: CategoryResponse) => Buffer.from(CategoryResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => CategoryResponse.decode(value),
  },
} as const;

export interface CategoryServiceServer extends UntypedServiceImplementation {
  createCategory: handleUnaryCall<CreateCategoryRequest, CategoryResponse>;
  updateCategory: handleUnaryCall<UpdateCategoryRequest, CategoryResponse>;
  listCategories: handleUnaryCall<blank, CategoryList>;
  getCategory: handleUnaryCall<GetCategoryRequest, CategoryResponse>;
}

export interface CategoryServiceClient extends Client {
  createCategory(
    request: CreateCategoryRequest,
    callback: (error: ServiceError | null, response: CategoryResponse) => void,
  ): ClientUnaryCall;
  createCategory(
    request: CreateCategoryRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: CategoryResponse) => void,
  ): ClientUnaryCall;
  createCategory(
    request: CreateCategoryRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: CategoryResponse) => void,
  ): ClientUnaryCall;
  updateCategory(
    request: UpdateCategoryRequest,
    callback: (error: ServiceError | null, response: CategoryResponse) => void,
  ): ClientUnaryCall;
  updateCategory(
    request: UpdateCategoryRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: CategoryResponse) => void,
  ): ClientUnaryCall;
  updateCategory(
    request: UpdateCategoryRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: CategoryResponse) => void,
  ): ClientUnaryCall;
  listCategories(
    request: blank,
    callback: (error: ServiceError | null, response: CategoryList) => void,
  ): ClientUnaryCall;
  listCategories(
    request: blank,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: CategoryList) => void,
  ): ClientUnaryCall;
  listCategories(
    request: blank,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: CategoryList) => void,
  ): ClientUnaryCall;
  getCategory(
    request: GetCategoryRequest,
    callback: (error: ServiceError | null, response: CategoryResponse) => void,
  ): ClientUnaryCall;
  getCategory(
    request: GetCategoryRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: CategoryResponse) => void,
  ): ClientUnaryCall;
  getCategory(
    request: GetCategoryRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: CategoryResponse) => void,
  ): ClientUnaryCall;
}

export const CategoryServiceClient = makeGenericClientConstructor(
  CategoryServiceService,
  "pb.CategoryService",
) as unknown as {
  new (address: string, credentials: ChannelCredentials, options?: Partial<ClientOptions>): CategoryServiceClient;
  service: typeof CategoryServiceService;
};

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
