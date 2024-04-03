/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CommonLinkComponent } from './CommonLinkComponent';
export type ExchangeRequest = {
  data: {
    name: string;
    slug: string;
    logo: (number | string);
    coins: any;
    website_link?: CommonLinkComponent;
    appstore_link?: CommonLinkComponent;
    playstore_link?: CommonLinkComponent;
    note_pros?: any;
    note_cons?: any;
  };
};

