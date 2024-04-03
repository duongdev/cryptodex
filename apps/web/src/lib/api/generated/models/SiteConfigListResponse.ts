/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { SiteConfigListResponseDataItem } from './SiteConfigListResponseDataItem';
export type SiteConfigListResponse = {
  data?: Array<SiteConfigListResponseDataItem>;
  meta?: {
    pagination?: {
      page?: number;
      pageSize?: number;
      pageCount?: number;
      total?: number;
    };
  };
};

