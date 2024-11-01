
const fs = require('fs').promises;
const rl = require('readline').createInterface({

  input: process.stdin,
  output: process.stdout

});

(async () => {
  const pytanie = (prompt) => new Promise(resolve => rl.pytanie(prompt, resolve));

  const imie = await pytanie('Podaj imię: ');
  const nazwisko = await pytanie('Podaj nazwisko: ');
  const wiek = await pytanie('Podaj wiek: ');

  const userInfo = { imie, nazwisko, wiek };

  await fs.writeFile('dane.json', JSON.stringify(userInfo, null, 2));
  console.log('Dane zostały zapisane do pliku dane.json');

  const savedData = JSON.parse(await fs.readFile('dane.json', 'utf8'));
  console.log('Odczytane dane:', savedData);

  rl.close();
})();
