function angkaSegitiga() {
  for (let i = 1; i <= 9; i++) {
    let row = "";
    for (let j = i; j <= 9; j++) {
      row += j + " ";
    }
    console.log(row);
  }
}

angkaSegitiga();
