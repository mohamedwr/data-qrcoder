# Data Qrcoder

A simple service built with Node.js that assigns qrcodes to data records

#

## Idea of work

The service generates unique IDs to an array of object. These unique IDs can be unique across multiple different files, so a database can be sharded into multiple CSV files and the generated IDs are still unique across these CSV files. The service takes a model JSON file and a data CSV file and outputs a data JSON file and generated qrcodes from the assigned IDs.

#

## Documentation

- model JSON file is used to configure the service:
  - `csv`: path to data CSV file
  - `delimiter`: CSV delimiter (optional)
  - `id`: configuration of the generated IDs
    - format of the ID: `[prefix]-[a random unique number from 0 to max]`
    - `prefix`: prefix of the ID
    - `max`: max generated random number
    - `property`: name of the property in the object
  - `qrcodeBinary`: qrcode binary output (PNG|SVG)
  - `database`: other data JSON files outputed from other data CSV files to generated IDs that are unique across them (optional)
- this model is loaded as an argument in the terminal script, e.g. `node src/app.js path/to/model.json`
- `data/model.example.jsonc`: contains and example of what a model JSON file can be.

- `src/logger.js`: logger functions to log every action to the terminal
- `src/utils.js`: common used functions across the project
- `src/model.js`: model parser and validator
- `src/parser.js`: data CSV file parser
- `src/qrcoder.js`: ID and qrcoder generator

- `npm start`: run the service with a model file at `data/model.json`

#

## Features

- Qrcode generation to each record with the generated ID
- Configurable ID generation
- Supports data sharding
- Logs to the terminal with beautiful colors

#

## LICENSE

This project is under MIT license.  
Consider checking `LICENSE` file

#

### Written with :heart: by Mohamed Waleed
