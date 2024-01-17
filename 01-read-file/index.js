const fs = require('fs');
const path = require('path');
const reader = fs.createReadStream(path.join(__dirname, 'text.txt'), {
  encoding: 'utf8',
});
reader.on('data', (text) => process.stdout._write(text));
