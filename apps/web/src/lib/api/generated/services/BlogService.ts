/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BlogListResponse } from '../models/BlogListResponse';
import type { BlogRequest } from '../models/BlogRequest';
import type { BlogResponse } from '../models/BlogResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class BlogService {
  constructor(public readonly httpRequest: BaseHttpRequest) {}
  /**
   * @returns BlogListResponse OK
   * @throws ApiError
   */
  public getBlogs({
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
  }): CancelablePromise<BlogListResponse> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/blogs',
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
   * @returns BlogResponse OK
   * @throws ApiError
   */
  public postBlogs({
    requestBody,
  }: {
    requestBody: BlogRequest,
  }): CancelablePromise<BlogResponse> {
    return this.httpRequest.request({
      method: 'POST',
      url: '/blogs',
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
   * @returns BlogResponse OK
   * @throws ApiError
   */
  public getBlogsId({
    id,
  }: {
    id: number,
  }): CancelablePromise<BlogResponse> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/blogs/{id}',
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
   * @returns BlogResponse OK
   * @throws ApiError
   */
  public putBlogsId({
    id,
    requestBody,
  }: {
    id: number,
    requestBody: BlogRequest,
  }): CancelablePromise<BlogResponse> {
    return this.httpRequest.request({
      method: 'PUT',
      url: '/blogs/{id}',
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
  public deleteBlogsId({
    id,
  }: {
    id: number,
  }): CancelablePromise<number> {
    return this.httpRequest.request({
      method: 'DELETE',
      url: '/blogs/{id}',
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
