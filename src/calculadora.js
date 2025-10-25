class Calculadora {
  sumar(a, b) {
    this.guardarEnMemoria(a + b);
    return this.usarMemoria();
  }

  restar(a, b) {
    this.guardarEnMemoria(a - b);
    return this.usarMemoria();
  }

  multiplicar(a, b) {
    this.guardarEnMemoria(a * b);
    return this.usarMemoria();
  }

  dividir(a, b) {
    this.guardarEnMemoria(a / b);
    return this.usarMemoria();
  }

  promedio(arrayNumeros){
    if(!Array.isArray(arrayNumeros) || arrayNumeros.length === 0){
      return undefined;
    }
    
    let suma =0;
    for (let i = 0; i <arrayNumeros.length; i++ ){
      suma += arrayNumeros[i];
    }
    this.guardarEnMemoria(suma / arrayNumeros.length);
    return this.usarMemoria();
  }

  potencia(base, exponente) {
    this.guardarEnMemoria(base ** exponente);
    return this.usarMemoria();
  }

  raizCuadrada(numero) {
    this.guardarEnMemoria(Math.sqrt(numero));
    return this.usarMemoria();
  }

  resto(a, b) {
    this.guardarEnMemoria(a % b);
    return this.usarMemoria();
  }

  ln(numero) {
    this.guardarEnMemoria(Math.log(numero));
    return this.usarMemoria();
  }

  log(numero) {
    this.guardarEnMemoria(Math.log10(numero));
    return this.usarMemoria();
  }

  maximo(arrayNumeros){
    if(!Array.isArray(arrayNumeros) || arrayNumeros.length === 0){
      return undefined;
    }
    
    let numMax = arrayNumeros[0];
    for (let i =1; i< arrayNumeros.length; i++){
      if (numMax < arrayNumeros[i]){
        numMax = arrayNumeros[i];
      }
    }
    this.guardarEnMemoria(numMax);
    return numMax;
  }

  porcentaje(a, b) {
    if (b === 0) return undefined;
    this.guardarEnMemoria((a / b) * 100);
    return this.usarMemoria();
  }

  factorial(n) {
    if (n < 0) return undefined;
    if (n === 0 || n === 1) return 1;
    let resultado = 1;
    for (let i = 2; i <= n; i++) {
      resultado *= i;
    }
    this.guardarEnMemoria(resultado);
    return resultado;
  }

  // Añadir memoria: guardar resultado de la última operación y usarlo en la siguiente
  memoria = null;

  guardarEnMemoria(valor) {
    this.memoria = valor;
  }

  usarMemoria() {
    return this.memoria;
  }

}


// Exportar para usar en tests
if (typeof module !== 'undefined' && module.exports) {
  module.exports = Calculadora;
}

// Para usar en consola de Node.js
const calc = new Calculadora();

console.log('=== Calculadora Simple ===');
console.log('Ejemplo de uso:');
console.log('calc.sumar(5, 3):', calc.sumar(5, 3));
console.log('\nFunciones disponibles:');
console.log('- calc.sumar(a, b)');
console.log('- calc.restar(a, b)');
console.log('- calc.multiplicar(a, b)');
console.log('- calc.dividir(a, b)');
console.log('- calc.promedio(arrayNumeros)');
console.log('- calc.potencia(base, exponente)');
console.log('- calc.raizCuadrada(numero)');
console.log('- calc.resto(a, b)');
console.log('- calc.ln(numero)');
console.log('- calc.log(numero)');
console.log('- calc.maximo(arrayNumeros)');
console.log('- calc.porcentaje(a, b)');
console.log('- calc.factorial(n)');