// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  keywords: [{
    name: 'Brandmeldealarm',
    isFire: true
  },
  {
    name: 'Verkehrsunfall Aufräumarbeiten',
    isFire: false
  },
  {
    name: 'Türöffnung',
    isFire: false
  }],
  functions: [{
    name: 'Maschinist',
    abbreviation: 'MA'
  },
  {
    name: 'Fahrzeugkommandant',
    abbreviation: 'FK'
  },
  {
    name: 'Mann',
    abbreviation: 'M'
  },
  {
    name: 'Reserve',
    abbreviation: 'R'
  },
  {
    name: 'Zentralist',
    abbreviation: 'F'
  },
  {
    name: 'Atemschutzträger',
    abbreviation: 'AS'
  },
  {
    name: 'Vollschutzträger',
    abbreviation: 'VS'
  },
  {
    name: 'FMD',
    abbreviation: 'FMD'
  },
  {
    name: 'Einsatzleiter',
    abbreviation: 'EL'
  },
  ]
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
