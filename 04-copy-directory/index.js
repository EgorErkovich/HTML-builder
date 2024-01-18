const fs = require('fs');
const path = require('path');

(function copyDir() {
  fs.rm(
    path.join(__dirname, 'files-copy'),
    { recursive: true, force: true },
    (err) => {
      if (err) {
        return console.error(err);
      } else {
        fs.mkdir(
          path.join(__dirname, 'files-copy'),
          { recursive: true },
          (err) => {
            if (err) {
              return console.error(err);
            }
            console.log('Directory created successfully!');

            fs.readdir(path.join(__dirname, 'files'), (err, files) => {
              files.forEach((file) => {
                fs.copyFile(
                  path.join(__dirname, 'files', file),
                  path.join(__dirname, 'files-copy', file),
                  (err) => {
                    if (err) {
                      return console.error(err);
                    }
                  },
                );
              });
            });
          },
        );
      }
    },
  );
})();
