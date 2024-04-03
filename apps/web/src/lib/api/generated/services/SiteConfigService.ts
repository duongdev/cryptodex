/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { SiteConfigRequest } from '../models/SiteConfigRequest';
import type { SiteConfigResponse } from '../models/SiteConfigResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class SiteConfigService {
  constructor(public readonly httpRequest: BaseHttpRequest) {}
  /**
   * @returns SiteConfigResponse OK
   * @throws ApiError
   */
  public getSiteConfig({
    sort,
    paginationWithCount,
    paginationPage,
    paginationPageSize,
    paginationStart,
    paginationLimit,
    fields,
    populate,
    filters,
    locale,
  }: {
    /**
     * Sort by attributes ascending (asc) or descending (desc)
     */
    sort?: string,
    /**
     * Return page/pageSize (default: true)
     */
    paginationWithCount?: boolean,
    /**
     * Page number (default: 0)
     */
    paginationPage?: number,
    /**
     * Page size (default: 25)
     */
    paginationPageSize?: number,
    /**
     * Offset value (default: 0)
     */
    paginationStart?: number,
    /**
     * Number of entities to return (default: 25)
     */
    paginationLimit?: number,
    /**
     * Fields to return (ex: title,author)
     */
    fields?: string,
    /**
     * Relations to return
     */
    populate?: string,
    /**
     * Filters to apply
     */
    filters?: Record<string, any>,
    /**
     * Locale to apply
     */
    locale?: string,
  }): CancelablePromise<SiteConfigResponse> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/site-config',
      query: {
        'sort': sort,
        'pagination[withCount]': paginationWithCount,
        'pagination[page]': paginationPage,
        'pagination[pageSize]': paginationPageSize,
        'pagination[start]': paginationStart,
        'pagination[limit]': paginationLimit,
        'fields': fields,
        'populate': populate,
        'filters': filters,
        'locale': locale,
      },
      errors: {
        400: `Bad Request`,
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
        500: `Internal Server Error`,
      },
    });
  }
  /**
   * @returns SiteConfigResponse OK
   * @throws ApiError
   */
  public putSiteConfig({
    requestBody,
  }: {
    requestBody: SiteConfigRequest,
  }): CancelablePromise<SiteConfigResponse> {
    return this.httpRequest.request({
      method: 'PUT',
      url: '/site-config',
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        400: `Bad Request`,
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
        500: `Internal Server Error`,
      },
    });
  }
  /**
   * @returns number OK
   * @throws ApiError
   */
  public deleteSiteConfig(): CancelablePromise<number> {
    return this.httpRequest.request({
      method: 'DELETE',
      url: '/site-config',
      errors: {
        400: `Bad Request`,
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
        500: `Internal Server Error`,
      },
    });
  }
}
