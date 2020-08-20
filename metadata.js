const fs = require('fs');
const paths = require('./paths');

exports.data = JSON.parse(fs.readFileSync(paths.METADATA_PATH));
