#!/bin/sh
if [ SOURCE_MAPS = "true" ]; then
  webpack -p -d --config webpack.production.config.js
else
  webpack -p --config webpack.production.config.js
fi
