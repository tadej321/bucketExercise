# BucketExercise

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.1.3.\
With this app you can create buckets to which you can upload your files for storage.

## Test the app without backend connection

If not connected to a server, use:\
- username: test@test
- password: test\

Otherwise set your server url in the environment.ts file under "backendApiUrl" variable. 

## API

Navigate to /swagger-apis to see full API specification

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `docker-compose up` and navigate to `http://localhost:8000/`
## Running unit tests

Set the backendApiUrl environment\
Run `npm test` to execute the unit tests via [Karma](https://karma-runner.github.io).
