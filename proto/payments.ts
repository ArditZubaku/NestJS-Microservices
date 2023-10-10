/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "payments";

export interface CreateChargeMessage {
  email: string;
  amount: number;
  card: CardMessage | undefined;
}

/** Can't use underscores */
export interface CardMessage {
  cvc: string;
  expMonth: number;
  expYear: number;
  number: string;
}

export interface CreateChargeResponse {
  id: string;
}

export const PAYMENTS_PACKAGE_NAME = "payments";

export interface PaymentsServiceClient {
  /** Which method to export */

  createCharge(request: CreateChargeMessage): Observable<CreateChargeResponse>;
}

export interface PaymentsServiceController {
  /** Which method to export */

  createCharge(
    request: CreateChargeMessage,
  ): Promise<CreateChargeResponse> | Observable<CreateChargeResponse> | CreateChargeResponse;
}

export function PaymentsServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["createCharge"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("PaymentsService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("PaymentsService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const PAYMENTS_SERVICE_NAME = "PaymentsService";
