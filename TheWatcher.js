const fs = require('fs');

const monitorDir = 'SzescProstychZadan';

fs.watch(monitorDir, (changeType, changedFile) => {
  if (changedFile) {

    const message = `Plik ${changedFile} został ${changeType}`;
    console.log(message);

    fs.appendFile('file-changes.log', message + '\n', (error) => {
      if (error) throw error;
    });
  }
});

console.log(`Monitorowanie zmian w katalogu: ${monitorDir}`);
