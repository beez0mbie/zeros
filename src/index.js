module.exports = function zeros(expression) {
  
  partsOfExp = expression.split('*')

  singleFactorials = []
  doubleFactorials = []
  partsOfExp.forEach(parseFactorial)
  factorials = []
  let result = BigInt(1)
  
  function parseFactorial(item) {
    if (item.match(/\d+!!/g)) {
      doubleFactorials.push(Number(item.match(/\d+/g)))
    } else {
      singleFactorials.push(Number(item.match(/\d+/g)))
    }
  }

  for (let index = 0; index < singleFactorials.length; index++) {
    factorials.push(BigInt(doSingleFactorial(singleFactorials[index])))
  }

  for (let index = 0; index < doubleFactorials.length; index++) {
    factorials.push(BigInt(doDoubleFactorial(doubleFactorials[index])))
  }

  function doSingleFactorial(number){
    return (number != 1) ? number * doSingleFactorial(number - 1) : 1;
  }
  function doDoubleFactorial(number){
    if (number % 2 === 0) {
      return (number != 2) ? number * doDoubleFactorial(number - 2) : doSingleFactorial(2);
    } else {
      return (number != 1) ? number * doDoubleFactorial(number - 2) : 1;
    }
  }
  
  console.log(factorials)
  //multiply results 
  for (let index = 0; index < factorials.length; index++) {
    result *= BigInt(factorials[index])
  }
  console.log(result)
  if (String(result).match(/[0]+\b/g) === null) {
    return 0
  } else {
    return String(result).match(/[0]+\b/g)[0].length
  }
}
