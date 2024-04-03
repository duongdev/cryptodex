/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { UploadFile } from '../models/UploadFile';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class UploadFileService {
  constructor(public readonly httpRequest: BaseHttpRequest) {}
  /**
   * Upload files
   * @returns UploadFile response
   * @throws ApiError
   */
  public postUpload({
    formData,
  }: {
    /**
     * Upload files
     */
    formData: {
      /**
       * The folder where the file(s) will be uploaded to (only supported on strapi-provider-upload-aws-s3).
       */
      path?: string;
      /**
       * The ID of the entry which the file(s) will be linked to
       */
      refId?: string;
      /**
       * The unique ID (uid) of the model which the file(s) will be linked to (api::restaurant.restaurant).
       */
      ref?: string;
      /**
       * The field of the entry which the file(s) will be precisely linked to.
       */
      field?: string;
      files: Array<Blob>;
    },
  }): CancelablePromise<Array<UploadFile>> {
    return this.httpRequest.request({
      method: 'POST',
      url: '/upload',
      formData: formData,
      mediaType: 'multipart/form-data',
    });
  }
  /**
   * Upload file information
   * @returns UploadFile response
   * @throws ApiError
   */
  public postUpload_({
    id,
    formData,
  }: {
    /**
     * File id
     */
    id: string,
    /**
     * Upload files
     */
    formData: {
      fileInfo?: {
        name?: string;
        alternativeText?: string;
        caption?: string;
      };
      files?: Blob;
    },
  }): CancelablePromise<Array<UploadFile>> {
    return this.httpRequest.request({
      method: 'POST',
      url: '/upload?id={id}',
      query: {
        'id': id,
      },
      formData: formData,
      mediaType: 'multipart/form-data',
    });
  }
  /**
   * @returns UploadFile Get a list of files
   * @throws ApiError
   */
  public getUploadFiles(): CancelablePromise<Array<UploadFile>> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/upload/files',
    });
  }
  /**
   * @returns UploadFile Get a specific file
   * @throws ApiError
   */
  public getUploadFiles1({
    id,
  }: {
    id: string,
  }): CancelablePromise<UploadFile> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/upload/files/{id}',
      path: {
        'id': id,
      },
    });
  }
  /**
   * @returns UploadFile Delete a file
   * @throws ApiError
   */
  public deleteUploadFiles({
    id,
  }: {
    id: string,
  }): CancelablePromise<UploadFile> {
    return this.httpRequest.request({
      method: 'DELETE',
      url: '/upload/files/{id}',
      path: {
        'id': id,
      },
    });
  }
}
