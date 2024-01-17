const fs = require('fs');
const path = require('path');
const output = fs.createWriteStream(path.join(__dirname, 'text.txt'));
process.stdout.write('Good day, please enter the text:\n');
process.stdin.on('data', (text) => {
  if (text.toString().trim() === 'exit') {
    process.stdout._write('Thank you, have a nice day!\n');
    process.exit();
  } else {
    output.write(text);
  }
});
process.on('SIGINT', () => {
  process.stdout.write('Thank you, have a nice day!\n');
  process.exit();
});
