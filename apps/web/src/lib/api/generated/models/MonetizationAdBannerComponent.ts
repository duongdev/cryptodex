/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type MonetizationAdBannerComponent = {
  id?: number;
  title_en?: string;
  medium?: {
    data?: {
      id?: number;
      attributes?: {
        name?: string;
        alternativeText?: string;
        caption?: string;
        width?: number;
        height?: number;
        formats?: any;
        hash?: string;
        ext?: string;
        mime?: string;
        size?: number;
        url?: string;
        previewUrl?: string;
        provider?: string;
        provider_metadata?: any;
        related?: {
          data?: Array<{
            id?: number;
            attributes?: any;
          }>;
        };
        folder?: {
          data?: {
            id?: number;
            attributes?: {
              name?: string;
              pathId?: number;
              parent?: {
                data?: {
                  id?: number;
                  attributes?: any;
                };
              };
              children?: {
                data?: Array<{
                  id?: number;
                  attributes?: any;
                }>;
              };
              files?: {
                data?: Array<{
                  id?: number;
                  attributes?: {
                    name?: string;
                    alternativeText?: string;
                    caption?: string;
                    width?: number;
                    height?: number;
                    formats?: any;
                    hash?: string;
                    ext?: string;
                    mime?: string;
                    size?: number;
                    url?: string;
                    previewUrl?: string;
                    provider?: string;
                    provider_metadata?: any;
                    related?: {
                      data?: Array<{
                        id?: number;
                        attributes?: any;
                      }>;
                    };
                    folder?: {
                      data?: {
                        id?: number;
                        attributes?: any;
                      };
                    };
                    folderPath?: string;
                    createdAt?: string;
                    updatedAt?: string;
                    createdBy?: {
                      data?: {
                        id?: number;
                        attributes?: any;
                      };
                    };
                    updatedBy?: {
                      data?: {
                        id?: number;
                        attributes?: any;
                      };
                    };
                  };
                }>;
              };
              path?: string;
              createdAt?: string;
              updatedAt?: string;
              createdBy?: {
                data?: {
                  id?: number;
                  attributes?: any;
                };
              };
              updatedBy?: {
                data?: {
                  id?: number;
                  attributes?: any;
                };
              };
            };
          };
        };
        folderPath?: string;
        createdAt?: string;
        updatedAt?: string;
        createdBy?: {
          data?: {
            id?: number;
            attributes?: any;
          };
        };
        updatedBy?: {
          data?: {
            id?: number;
            attributes?: any;
          };
        };
      };
    };
  };
  link?: {
    id?: number;
    title_en?: string;
    type?: MonetizationAdBannerComponent.type;
    external_url?: string;
    page?: {
      data?: {
        id?: number;
        attributes?: any;
      };
    };
    open_new_tab?: boolean;
  };
  placement?: MonetizationAdBannerComponent.placement;
};
export namespace MonetizationAdBannerComponent {
  export enum type {
    EXTERNAL = 'external',
    PAGE = 'page',
  }
  export enum placement {
    BUBBLE = 'bubble',
    BELOW_BUBBLE = 'below_bubble',
    FLOATING_LEFT = 'floating_left',
    FLOATING_RIGHT = 'floating_right',
  }
}

