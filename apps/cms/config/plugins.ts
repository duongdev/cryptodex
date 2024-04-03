export default ({ env }) => ({
  upload: {
    config: {
      provider: '@schornio/strapi-provider-upload-vercel-blob',
      providerOptions: {
        token: env('BLOB_READ_WRITE_TOKEN'),
      },
    },
  },
  documentation: {
    enabled: true,
    config: {
      openapi: '3.1.0',
      info: {
        version: '1.0.0',
        title: 'DOCUMENTATION',
        description: '',
        termsOfService: 'YOUR_TERMS_OF_SERVICE_URL',
        contact: {
          name: 'TEAM',
          email: 'contact-email@something.io',
          url: 'mywebsite.io'
        },
        license: {
          name: 'Apache 2.0',
          url: 'https://www.apache.org/licenses/LICENSE-2.0.html'
        },
      },
      'x-strapi-config': {
        // Leave empty to ignore plugins during generation
        plugins: [],
        path: '/documentation',
      },
      servers: [{ url: 'http://localhost:1337/api', description: 'Development server' }],
      externalDocs: {
        description: 'Find out more',
        url: 'https://docs.strapi.io/developer-docs/latest/getting-started/introduction.html'
      },
      security: [ { bearerAuth: [] } ]
    }
  },
  'strapi-plugin-populate-deep': {
    config: {
      defaultDepth: 5
    }
  },
});
