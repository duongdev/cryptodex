/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BlogListResponseDataItem } from './BlogListResponseDataItem';
export type BlogListResponse = {
  data?: Array<BlogListResponseDataItem>;
  meta?: {
    pagination?: {
      page?: number;
      pageSize?: number;
      pageCount?: number;
      total?: number;
    };
  };
};

