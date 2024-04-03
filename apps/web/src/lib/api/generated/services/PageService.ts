/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PageListResponse } from '../models/PageListResponse';
import type { PageRequest } from '../models/PageRequest';
import type { PageResponse } from '../models/PageResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class PageService {
  constructor(public readonly httpRequest: BaseHttpRequest) {}
  /**
   * @returns PageListResponse OK
   * @throws ApiError
   */
  public getPages({
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
  }): CancelablePromise<PageListResponse> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/pages',
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
   * @returns PageResponse OK
   * @throws ApiError
   */
  public postPages({
    requestBody,
  }: {
    requestBody: PageRequest,
  }): CancelablePromise<PageResponse> {
    return this.httpRequest.request({
      method: 'POST',
      url: '/pages',
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
   * @returns PageResponse OK
   * @throws ApiError
   */
  public getPagesId({
    id,
  }: {
    id: number,
  }): CancelablePromise<PageResponse> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/pages/{id}',
      path: {
        'id': id,
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
   * @returns PageResponse OK
   * @throws ApiError
   */
  public putPagesId({
    id,
    requestBody,
  }: {
    id: number,
    requestBody: PageRequest,
  }): CancelablePromise<PageResponse> {
    return this.httpRequest.request({
      method: 'PUT',
      url: '/pages/{id}',
      path: {
        'id': id,
      },
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
  public deletePagesId({
    id,
  }: {
    id: number,
  }): CancelablePromise<number> {
    return this.httpRequest.request({
      method: 'DELETE',
      url: '/pages/{id}',
      path: {
        'id': id,
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
}
