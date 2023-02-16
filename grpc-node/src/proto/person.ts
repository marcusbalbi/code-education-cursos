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

export const protobufPackage = "";

export interface Person {
  name: string;
  id: number;
  email: string;
}

function createBasePerson(): Person {
  return { name: "", id: 0, email: "" };
}

export const Person = {
  encode(message: Person, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    if (message.id !== 0) {
      writer.uint32(16).int32(message.id);
    }
    if (message.email !== "") {
      writer.uint32(26).string(message.email);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Person {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePerson();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.name = reader.string();
          break;
        case 2:
          message.id = reader.int32();
          break;
        case 3:
          message.email = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Person {
    return {
      name: isSet(object.name) ? String(object.name) : "",
      id: isSet(object.id) ? Number(object.id) : 0,
      email: isSet(object.email) ? String(object.email) : "",
    };
  },

  toJSON(message: Person): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    message.id !== undefined && (obj.id = Math.round(message.id));
    message.email !== undefined && (obj.email = message.email);
    return obj;
  },

  create<I extends Exact<DeepPartial<Person>, I>>(base?: I): Person {
    return Person.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<Person>, I>>(object: I): Person {
    const message = createBasePerson();
    message.name = object.name ?? "";
    message.id = object.id ?? 0;
    message.email = object.email ?? "";
    return message;
  },
};

export type NewPersonService = typeof NewPersonService;
export const NewPersonService = {
  newPerson: {
    path: "/NewPerson/NewPerson",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: Person) => Buffer.from(Person.encode(value).finish()),
    requestDeserialize: (value: Buffer) => Person.decode(value),
    responseSerialize: (value: Person) => Buffer.from(Person.encode(value).finish()),
    responseDeserialize: (value: Buffer) => Person.decode(value),
  },
} as const;

export interface NewPersonServer extends UntypedServiceImplementation {
  newPerson: handleUnaryCall<Person, Person>;
}

export interface NewPersonClient extends Client {
  newPerson(request: Person, callback: (error: ServiceError | null, response: Person) => void): ClientUnaryCall;
  newPerson(
    request: Person,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: Person) => void,
  ): ClientUnaryCall;
  newPerson(
    request: Person,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: Person) => void,
  ): ClientUnaryCall;
}

export const NewPersonClient = makeGenericClientConstructor(NewPersonService, "NewPerson") as unknown as {
  new (address: string, credentials: ChannelCredentials, options?: Partial<ClientOptions>): NewPersonClient;
  service: typeof NewPersonService;
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
