/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseHttpRequest } from './core/BaseHttpRequest';
import type { OpenAPIConfig } from './core/OpenAPI';
import { AxiosHttpRequest } from './core/AxiosHttpRequest';
import { BlogService } from './services/BlogService';
import { ExchangeService } from './services/ExchangeService';
import { PageService } from './services/PageService';
import { SiteConfigService } from './services/SiteConfigService';
type HttpRequestConstructor = new (config: OpenAPIConfig) => BaseHttpRequest;
export class Strapi {
  public readonly blog: BlogService;
  public readonly exchange: ExchangeService;
  public readonly page: PageService;
  public readonly siteConfig: SiteConfigService;
  public readonly request: BaseHttpRequest;
  constructor(config?: Partial<OpenAPIConfig>, HttpRequest: HttpRequestConstructor = AxiosHttpRequest) {
    this.request = new HttpRequest({
      BASE: config?.BASE ?? 'http://localhost:1337/api',
      VERSION: config?.VERSION ?? '1.0.0',
      WITH_CREDENTIALS: config?.WITH_CREDENTIALS ?? false,
      CREDENTIALS: config?.CREDENTIALS ?? 'include',
      TOKEN: config?.TOKEN,
      USERNAME: config?.USERNAME,
      PASSWORD: config?.PASSWORD,
      HEADERS: config?.HEADERS,
      ENCODE_PATH: config?.ENCODE_PATH,
    });
    this.blog = new BlogService(this.request);
    this.exchange = new ExchangeService(this.request);
    this.page = new PageService(this.request);
    this.siteConfig = new SiteConfigService(this.request);
  }
}

