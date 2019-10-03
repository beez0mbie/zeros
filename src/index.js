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
    factorials.push(doSingleFactorial(singleFactorials[index]))
  }

  for (let index = 0; index < doubleFactorials.length; index++) {
    factorials.push(doDoubleFactorial(doubleFactorials[index]))
  }

  function doSingleFactorial(number){
    return (BigInt(number) != BigInt(1)) ? BigInt(number) * doSingleFactorial(BigInt(number) - BigInt(1)) : BigInt(1);
  }
  function doDoubleFactorial(number){
    if (BigInt(number) % BigInt(2) === BigInt(0)) {
      return (BigInt(number) != BigInt(2)) ? BigInt(number) * doDoubleFactorial(BigInt(number) - BigInt(2)) : doSingleFactorial(BigInt(2));
    } else {
      return (BigInt(number) != BigInt(1)) ? BigInt(number) * doDoubleFactorial(BigInt(number) - BigInt(2)) : BigInt(1);
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
