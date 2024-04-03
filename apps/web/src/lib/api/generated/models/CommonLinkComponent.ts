/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type CommonLinkComponent = {
  id?: number;
  title_en?: string;
  type?: CommonLinkComponent.type;
  external_url?: string;
  page?: {
    data?: {
      id?: number;
      attributes?: any;
    };
  };
  open_new_tab?: boolean;
};
export namespace CommonLinkComponent {
  export enum type {
    EXTERNAL = 'external',
    PAGE = 'page',
  }
}

