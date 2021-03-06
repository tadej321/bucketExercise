// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  locationsApiUrl: 'http://api.lavbic.net/kraji',
  backendApiUrl: undefined,
  testBuckets: {
    _id: 'dsds6d7s676',
    name: 'testBucket',
    location: 'Kranj',
    content: [
      {
        _id: 'ds67d97s9d7',
        fileName: 'testFile',
        filePath: 'testPath',
        modified: new Date(),
        size: 340000
      }
    ]
  }

};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
