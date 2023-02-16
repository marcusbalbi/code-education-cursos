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
} as const;

export interface CategoryServiceServer extends UntypedServiceImplementation {
  createCategory: handleUnaryCall<CreateCategoryRequest, CategoryResponse>;
  updateCategory: handleUnaryCall<UpdateCategoryRequest, CategoryResponse>;
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
