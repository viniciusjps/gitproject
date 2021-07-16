// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  github_client_id: 'b9def7f2729d8bf7de48',
  github_redirect_uri: 'http://localhost:2000/auth/callback',
  github_secret_key: 'df1b035cb02ad6ae5129eafa5ac446ff94eaba29',
  API_ENDPOINT: 'http://localhost:3000/api',
  home_uri: 'http://localhost:2000',
  callback_uri: 'http://localhost:2000/auth/callback'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
