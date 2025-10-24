const Calculadora = require('./calculadora');

// Mini framework de testing
let testsPasados = 0;
let testsFallados = 0;

function test(nombre, callback) {
  try {
    callback();
    console.log(`✓ ${nombre}`);
    testsPasados++;
  } catch (error) {
    console.log(`✗ ${nombre}`);
    console.log(`  Error: ${error.message}`);
    testsFallados++;
  }
}

function expect(valor) {
  return {
    toBe(esperado) {
      if (valor !== esperado) {
        throw new Error(`Esperado ${esperado}, pero recibió ${valor}`);
      }
    },
    toBeCloseTo(esperado, precision = 2) {
      const diff = Math.abs(valor - esperado);
      const margen = Math.pow(10, -precision);
      if (diff > margen) {
        throw new Error(`Esperado ~${esperado}, pero recibió ${valor}`);
      }
    },
    toBeNaN() {
      if (!isNaN(valor)) {
        throw new Error(`Esperado NaN, pero recibió ${valor}`);
      }
    },
    toBeUndefined() {
      if (valor !== undefined) {
        throw new Error(`Esperado undefined, pero recibió ${valor}`);
      }
    }
  };
}

// Crear instancia de calculadora
const calc = new Calculadora();

console.log('=== Tests de Calculadora ===\n');

// Tests de Suma
console.log('Tests de suma:');
test('sumar dos números positivos', () => {
  expect(calc.sumar(2, 3)).toBe(5);
});

test('sumar números negativos', () => {
  expect(calc.sumar(-5, -3)).toBe(-8);
});

test('sumar número positivo y negativo', () => {
  expect(calc.sumar(10, -4)).toBe(6);
});

test('sumar con cero', () => {
  expect(calc.sumar(5, 0)).toBe(5);
});

// Tests de Resta
console.log('\nTests de resta:');
test('restar dos números positivos', () => {
  expect(calc.restar(5, 3)).toBe(2);
});

test('restar números negativos', () => {
  expect(calc.restar(-5, -3)).toBe(-2);
});

test('restar número menor de mayor', () => {
  expect(calc.restar(3, 5)).toBe(-2);
});

test('restar con cero', () => {
  expect(calc.restar(5, 0)).toBe(5);
});

// Tests de Multiplicación
console.log('\nTests de multiplicación:');
test('multiplicar dos números positivos', () => {
  expect(calc.multiplicar(4, 5)).toBe(20);
});

test('multiplicar números negativos', () => {
  expect(calc.multiplicar(-3, -4)).toBe(12);
});

test('multiplicar por cero', () => {
  expect(calc.multiplicar(5, 0)).toBe(0);
});

test('multiplicar por uno', () => {
  expect(calc.multiplicar(7, 1)).toBe(7);
});

// Tests de División
console.log('\nTests de división:');
test('dividir dos números positivos', () => {
  expect(calc.dividir(10, 2)).toBe(5);
});

test('dividir números negativos', () => {
  expect(calc.dividir(-10, -2)).toBe(5);
});

test('dividir por uno', () => {
  expect(calc.dividir(7, 1)).toBe(7);
});

test('dividir por cero debe retornar Infinity', () => {
  expect(calc.dividir(5, 0)).toBe(Infinity);
});

test('división con resultado decimal', () => {
  expect(calc.dividir(7, 2)).toBe(3.5);
});

// Tests de Potencia
console.log('\nTests de potencia:');
test('elevar número positivo a exponente positivo', () => {
  expect(calc.potencia(2, 3)).toBe(8);
});

test('elevar a exponente cero', () => {
  expect(calc.potencia(5, 0)).toBe(1);
});

test('elevar a exponente uno', () => {
  expect(calc.potencia(7, 1)).toBe(7);
});

test('elevar a exponente negativo', () => {
  expect(calc.potencia(2, -2)).toBe(0.25);
});

test('elevar número negativo a exponente par', () => {
  expect(calc.potencia(-2, 2)).toBe(4);
});

// Tests de Raíz Cuadrada
console.log('\nTests de raíz cuadrada:');
test('raíz cuadrada de número positivo', () => {
  expect(calc.raizCuadrada(9)).toBe(3);
});

test('raíz cuadrada de cero', () => {
  expect(calc.raizCuadrada(0)).toBe(0);
});

test('raíz cuadrada de uno', () => {
  expect(calc.raizCuadrada(1)).toBe(1);
});

test('raíz cuadrada de número decimal', () => {
  expect(calc.raizCuadrada(2)).toBeCloseTo(1.41, 2);
});

test('raíz cuadrada de número negativo debe retornar NaN', () => {
  expect(calc.raizCuadrada(-4)).toBeNaN();
});

// Test de Resto
console.log('\nTests de resto:');
test('resto de dos números positivos', () => {
  expect(calc.resto(10, 2)).toBe(0);
});

test('resto de números negativos', () => {
  expect(calc.resto(-10, -2)).toBe(0);
});

test('resto de numero impar', () => {
  expect(calc.resto(7, 2)).toBe(1);
});

// Test de Logaritmo Base 10 
console.log('\nTests de logaritmo base 10:');
test('log10 de 1 igual a 0', () => {
  expect(calc.log(1)).toBe(0);
});

test('log10 de 10 igual a 1', () => {
  expect(calc.log(10)).toBe(1);
});

test('log10 de 1000 igual a 3', () => {
  expect(calc.log(1000)).toBe(3);
});

test('log10 de 0.1 igual a -1', () => {
  expect(calc.log(0.1)).toBe(-1);
});

test('log10 de -10 igual a NaN', () => {
  expect(calc.log(-10)).toBe(NaN);
});

// Test de Logaritmo Natural 
console.log('\nTests de logaritmo natural:');
test('ln de 1 igual a 0', () => {
  expect(calc.ln(1)).toBe(0);
});

test('ln de e igual a 1', () => {
  expect(calc.ln(Math.E)).toBe(1);
});

test('ln de -1 igual a NaN', () => {
  expect(calc.ln(-1)).toBe(NaN);
});

// Resumen
console.log('\n=== Resumen ===');
console.log(`Tests pasados: ${testsPasados}`);
console.log(`Tests fallados: ${testsFallados}`);
console.log(`Total: ${testsPasados + testsFallados}`);

if (testsFallados === 0) {
  console.log('\n¡Todos los tests pasaron! 🎉');
} else {
  console.log('\n⚠️  Hay tests que necesitan implementación');
}