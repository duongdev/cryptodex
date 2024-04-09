/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type Blog = {
  title_en?: string;
  slug: string;
  content_en?: string;
  createdAt?: string;
  updatedAt?: string;
  publishedAt?: string;
  createdBy?: {
    data?: {
      id?: number;
      attributes?: {
        firstname?: string;
        lastname?: string;
        username?: string;
        email?: string;
        resetPasswordToken?: string;
        registrationToken?: string;
        isActive?: boolean;
        roles?: {
          data?: Array<{
            id?: number;
            attributes?: {
              name?: string;
              code?: string;
              description?: string;
              users?: {
                data?: Array<{
                  id?: number;
                  attributes?: any;
                }>;
              };
              permissions?: {
                data?: Array<{
                  id?: number;
                  attributes?: {
                    action?: string;
                    actionParameters?: any;
                    subject?: string;
                    properties?: any;
                    conditions?: any;
                    role?: {
                      data?: {
                        id?: number;
                        attributes?: any;
                      };
                    };
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
        blocked?: boolean;
        preferedLanguage?: string;
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
  updatedBy?: {
    data?: {
      id?: number;
      attributes?: any;
    };
  };
};

