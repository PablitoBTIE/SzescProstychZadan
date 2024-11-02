const fs = require('fs').promises;

const rl = require('readline').createInterface({

  input: process.stdin,
  output: process.stdout

});

const question = (prompt) => new Promise(resolve => rl.question(prompt, resolve));

(async () => {
  const action = await question('Dodaj nowy obiekt (1) czy wyświetl dane (2)? ');
  const filePath = await question('Podaj ścieżkę do pliku JSON: ');

  if (action === '1') {

    const imie = await question('Podaj imię: ');
    const wiek = await question('Podaj wiek: ');
    const email = await question('Podaj email: ');

    const nowyObiekt = { imie, wiek, email };

    try {
      const data = JSON.parse(await fs.readFile(filePath, 'utf8'));
      data.push(nowyObiekt);
      await fs.writeFile(filePath, JSON.stringify(data, null, 2));
    } catch {
      await fs.writeFile(filePath, JSON.stringify([nowyObiekt], null, 2));
    }
    console.log('Obiekt dodany do pliku.');
  } else {

    try {
      console.log('Dane z pliku:', JSON.parse(await fs.readFile(filePath, 'utf8')));
    } catch {
      console.log('Plik nie istnieje.');
    }
  }
  rl.close();
})();
