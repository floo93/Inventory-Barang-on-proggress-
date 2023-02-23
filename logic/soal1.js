function printDigitValue(str) {
  // Menghapus titik dari string dan membalik urutannya
  const reversedStr = str.split('.').join('').split('').reverse().join('');

  // Menentukan jumlah digit pada string
  const n = reversedStr.length;

  // Loop melalui setiap digit dan menghitung nilai digit tergantung pada posisinya
  for (let i = n - 1; i >= 0; i--) {
    const digitValue = parseInt(reversedStr[i]) * Math.pow(10, i);
    console.log(digitValue);
  }
}

//Jalankan Fungsi
printDigitValue('9.327.421');
