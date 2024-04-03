/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ExchangeListResponse } from '../models/ExchangeListResponse';
import type { ExchangeRequest } from '../models/ExchangeRequest';
import type { ExchangeResponse } from '../models/ExchangeResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class ExchangeService {
  constructor(public readonly httpRequest: BaseHttpRequest) {}
  /**
   * @returns ExchangeListResponse OK
   * @throws ApiError
   */
  public getExchanges({
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
  }): CancelablePromise<ExchangeListResponse> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/exchanges',
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
   * @returns ExchangeResponse OK
   * @throws ApiError
   */
  public postExchanges({
    requestBody,
  }: {
    requestBody: ExchangeRequest,
  }): CancelablePromise<ExchangeResponse> {
    return this.httpRequest.request({
      method: 'POST',
      url: '/exchanges',
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
   * @returns ExchangeResponse OK
   * @throws ApiError
   */
  public getExchangesId({
    id,
  }: {
    id: number,
  }): CancelablePromise<ExchangeResponse> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/exchanges/{id}',
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
   * @returns ExchangeResponse OK
   * @throws ApiError
   */
  public putExchangesId({
    id,
    requestBody,
  }: {
    id: number,
    requestBody: ExchangeRequest,
  }): CancelablePromise<ExchangeResponse> {
    return this.httpRequest.request({
      method: 'PUT',
      url: '/exchanges/{id}',
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
  public deleteExchangesId({
    id,
  }: {
    id: number,
  }): CancelablePromise<number> {
    return this.httpRequest.request({
      method: 'DELETE',
      url: '/exchanges/{id}',
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
