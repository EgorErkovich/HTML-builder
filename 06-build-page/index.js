const fs = require('fs');
const path = require('path');

(function createDir() {
  fs.rm(
    path.join(__dirname, 'project-dist'),
    { recursive: true, force: true },
    (err) => {
      if (err) {
        return console.error(err);
      } else {
        fs.mkdir(
          path.join(__dirname, 'project-dist'),
          { recursive: true },
          (err) => {
            if (err) {
              return console.error(err);
            }
            console.log('Directory "project-dist" created successfully!');
            copyDir(
              path.join(__dirname, 'assets'),
              path.join(__dirname, 'project-dist', 'assets'),
            );
            createStyleCSS(
              path.join(__dirname, 'styles'),
              path.join(__dirname, 'project-dist', 'style.css'),
            );
            createIndexHTML(
              path.join(__dirname, 'template.html'),
              path.join(__dirname, 'project-dist', 'index.html'),
            );
          },
        );
      }
    },
  );
})();

function copyDir(source, target) {
  fs.mkdir(path.join(target), { recursive: true }, (err) => {
    if (err) {
      return console.error(err);
    }

    fs.readdir(path.join(source), { withFileTypes: true }, (err, files) => {
      files.forEach((file) => {
        let curSource = path.join(source, file.name);
        let curTarget = path.join(target, file.name);
        if (file.isDirectory()) {
          copyDir(curSource, curTarget);
        } else {
          fs.copyFile(curSource, curTarget, (err) => {
            if (err) {
              return console.error(err);
            }
          });
        }
      });
    });
  });
}

function createStyleCSS(source, target) {
  const output = fs.createWriteStream(target);
  fs.readdir(source, (err, files) => {
    files.forEach((file) => {
      if (path.extname(file) === '.css') {
        const reader = fs.createReadStream(path.join(source, file), {
          encoding: 'utf8',
        });
        reader.on('data', (text) => output.write(text));
        reader.on('data', () => output.write('\n'));
      }
    });
  });
}

function createIndexHTML(source, target) {
  const readerTemplate = fs.createReadStream(source, {
    encoding: 'utf8',
  });
  readerTemplate.on('data', (text) => {
    let temp = text;
    let tags = text.match(/{{[a-z]+}}/gi);
    tags = tags.map((tag) => tag.match(/\w+/gi)[0]);
    fs.readdir(
      path.join(__dirname, 'components'),
      { withFileTypes: true },
      (err, files) => {
        files.forEach((file) => {
          if (tags.includes(file.name.replace('.html', ''))) {
            const readerFileHTML = fs.createReadStream(
              path.join(__dirname, 'components', file.name),
              {
                encoding: 'utf8',
              },
            );
            readerFileHTML.on('data', (text) => {
              temp = temp.replace(
                '{{' + file.name.replace('.html', '') + '}}',
                `\n${text}\n`,
              );
              const output = fs.createWriteStream(target);
              output.write(temp);
            });
          }
        });
      },
    );
  });
}
