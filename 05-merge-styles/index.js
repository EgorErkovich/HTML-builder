const fs = require('fs');
const path = require('path');
const output = fs.createWriteStream(
  path.join(__dirname, 'project-dist', 'bundle.css'),
);
fs.readdir(path.join(__dirname, 'styles'), (err, files) => {
  files.forEach((file) => {
    if (path.extname(file) === '.css') {
      const reader = fs.createReadStream(path.join(__dirname, 'styles', file), {
        encoding: 'utf8',
      });
      reader.on('data', (text) => output.write(text));
      reader.on('data', () => output.write('\n'));
    }
  });
});
