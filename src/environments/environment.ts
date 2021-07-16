// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  github_client_id: '0aa7cb47d9976c924494',
  github_redirect_uri: 'http://localhost:2000/auth/callback',
  github_secret_key: '01a14962c589c3cee8bf4fbebf8ba1ac1b220553',
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
