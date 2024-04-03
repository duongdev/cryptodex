/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PageListResponseDataItem } from './PageListResponseDataItem';
export type PageListResponse = {
  data?: Array<PageListResponseDataItem>;
  meta?: {
    pagination?: {
      page?: number;
      pageSize?: number;
      pageCount?: number;
      total?: number;
    };
  };
};

