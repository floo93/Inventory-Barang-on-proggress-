function bilGanjil(n) {
  const angka = [];

  for (let i = 1; i < n; i += 2) {
    angka.push(i);
  }
  return angka;
}

console.log(bilGanjil(7));
console.log(bilGanjil(15));
