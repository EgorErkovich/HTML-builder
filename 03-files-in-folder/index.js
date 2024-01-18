const fs = require('fs');
const path = require('path');
fs.readdir(
  path.join(__dirname, 'secret-folder'),
  { withFileTypes: true },
  (err, files) => {
    files.forEach((file) => {
      if (!file.isDirectory()) {
        const filePath = path.join(file.path, file.name);
        fs.stat(filePath, (err, stats) => {
          console.log(
            path.basename(filePath, path.extname(filePath)) +
              ' - ' +
              path.extname(filePath).replace('.', '') +
              ' - ' +
              Math.round((stats.size / 1024) * 1000) / 1000 +
              'kb',
          );
        });
      }
    });
  },
);
