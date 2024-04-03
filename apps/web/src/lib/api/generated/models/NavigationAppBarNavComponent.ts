/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type NavigationAppBarNavComponent = {
  id?: number;
  label_en?: string;
  link?: {
    id?: number;
    title_en?: string;
    type?: NavigationAppBarNavComponent.type;
    external_url?: string;
    page?: {
      data?: {
        id?: number;
        attributes?: any;
      };
    };
    open_new_tab?: boolean;
  };
};
export namespace NavigationAppBarNavComponent {
  export enum type {
    EXTERNAL = 'external',
    PAGE = 'page',
  }
}

