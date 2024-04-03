/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ExchangeListResponseDataItem } from './ExchangeListResponseDataItem';
export type ExchangeListResponse = {
  data?: Array<ExchangeListResponseDataItem>;
  meta?: {
    pagination?: {
      page?: number;
      pageSize?: number;
      pageCount?: number;
      total?: number;
    };
  };
};

