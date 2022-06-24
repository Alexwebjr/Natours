const getFactorial = (num) => {
  return num == 1 ? 1 : num * getFactorial(num - 1);
};

const getCombinaciones = (n, k) => {
  let k2 = n - k;
  let resultado = 0;

  if (k === n) {
    return 1;
  }

  for (let i = n - 1; i >= 1; i--) {
    if (i != k && i != k2) {
      n = n * i;
    }
    if (i == k) {
      k2 = getFactorial(k2);
      resultado = n / k2;
      return resultado;
    } else if (i == k2) {
      k = getFactorial(k);
      resultado = n / k;
      return resultado;
    }
  }
};
console.log(getCombinaciones(567, 2));
// console.log(getCombinaciones(7, 2));
// console.log(getCombinaciones(545, 2));
// console.log(getCombinaciones(5, 5));
//console.log(getCombinaciones(567, 2));
