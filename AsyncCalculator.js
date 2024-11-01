
const rl = require('readline').createInterface({

  input: process.stdin,
  output: process.stdout

});

const oblicz = (pierwszaLiczba, drugaLiczba, operation, callback) => {

  setTimeout(() => {

    const wynik = operation === 'dodawanie' ? pierwszaLiczba + drugaLiczba : pierwszaLiczba * drugaLiczba;
    callback(wynik);
    
  }, 1000);
};

const main = async () => {
  const question = (q) => new Promise(resolve => rl.question(q, resolve));

  const pierwszaLiczba = parseFloat(await question('Podaj pierwszą liczbę: '));
  const drugaLiczba = parseFloat(await question('Podaj drugą liczbę: '));
  const operation = await question('Wybierz rodzaj operacji (dodawanie, mnożenie): ');
  const method = await question('Wybierz metodę obliczeń (callback, promise): ');

  if (method === 'callback') {

    oblicz(pierwszaLiczba, drugaLiczba, operation, (wynik) => {

      console.log(`Wynik (callback): ${wynik}`);
      rl.close();

    });

  } else if (method === 'promise') {

    const obliczPromise = (pierwszaLiczba, drugaLiczba, operation) =>
      new Promise(resolve =>
        oblicz(pierwszaLiczba, drugaLiczba, operation, resolve));
    const wynik = await obliczPromise(pierwszaLiczba, drugaLiczba, operation);
    console.log(`Wynik (promise): ${wynik}`);

    rl.close();
  }
};

main();
