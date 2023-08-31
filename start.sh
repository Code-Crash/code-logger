#!/bin/bash

# Kill any previouse port being used
kill -9 $(lsof -t -i :4000)
cd "$(dirname "$0")" # Change directory to current file's directory
npm start # Start the example as http server and lib as on watch mode, build will be redirect to example folder, which will be trited as library