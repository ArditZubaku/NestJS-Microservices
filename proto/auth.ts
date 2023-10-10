/* eslint-d isable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "auth";

export interface Authentication {
  Authentication: string;
}

export interface UserMessage {
  id: string;
  email: string;
  password: string;
  /** Array */
  roles: string[];
}

export const AUTH_PACKAGE_NAME = "auth";

/** Kinda like controller */

export interface AuthServiceClient {
  authenticate(request: Authentication): Observable<UserMessage>;
}

/** Kinda like controller */

export interface AuthServiceController {
  authenticate(request: Authentication): Promise<UserMessage> | Observable<UserMessage> | UserMessage;
}

export function AuthServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["authenticate"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("AuthService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("AuthService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const AUTH_SERVICE_NAME = "AuthService";
