const readline = require('readline');
const Calculadora = require('./calculadora');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const calc = new Calculadora();

function mostrarMenu() {
  console.log('\n=================================');
  console.log('     CALCULADORA INTERACTIVA     ');
  console.log('=================================');
  console.log('1. Sumar');
  console.log('2. Restar');
  console.log('3. Multiplicar');
  console.log('4. Dividir');
  console.log('5. Potencia');
  console.log('6. Raíz Cuadrada');
  console.log('7. Resto');
  console.log('8. Logaritmo Natural');
  console.log('9. Logaritmo Base 10');
  console.log('10. Promedio de array');
  console.log('11. Maximo de array');
  console.log('0. Salir');
  console.log('=================================');
}

function pedirNumero(mensaje) {
  return new Promise((resolve) => {
    rl.question(mensaje, (respuesta) => {
      const numero = parseFloat(respuesta);
      resolve(numero);
    });
  });
}

async function operacionDosNumeros(operacion, nombreOperacion) {
  const num1 = await pedirNumero('Ingrese el primer número: ');
  const num2 = await pedirNumero('Ingrese el segundo número: ');
  
  const resultado = operacion(num1, num2);
  
  if (resultado === undefined) {
    console.log(`\n⚠️  La función ${nombreOperacion} aún no está implementada`);
  } else {
    console.log(`\n✓ Resultado: ${num1} ${getSimboloOperacion(nombreOperacion)} ${num2} = ${resultado}`);
  }
}

async function operacionUnNumero(operacion, nombreOperacion) {
  const num = await pedirNumero('Ingrese el número: ');
  
  const resultado = operacion(num);
  
  if (resultado === undefined) {
    console.log(`\n⚠️  La función ${nombreOperacion} aún no está implementada`);
  } else if (isNaN(resultado)) {
    console.log(`\n⚠️  Error: Operación inválida (resultado: NaN)`);
  } else {
    console.log(`\n✓ Resultado: √${num} = ${resultado}`);
  }
}

function getSimboloOperacion(nombre) {
  const simbolos = {
    'suma': '+',
    'resta': '-',
    'multiplicación': '×',
    'división': '÷',
    'potencia': '^',
    'resto': '%'
  };
  return simbolos[nombre] || '';
}

async function ejecutarOpcion(opcion) {
  switch(opcion) {
    case '1':
      await operacionDosNumeros(
        (a, b) => calc.sumar(a, b),
        'suma'
      );
      break;
    
    case '2':
      await operacionDosNumeros(
        (a, b) => calc.restar(a, b),
        'resta'
      );
      break;
    
    case '3':
      await operacionDosNumeros(
        (a, b) => calc.multiplicar(a, b),
        'multiplicación'
      );
      break;
    
    case '4':
      await operacionDosNumeros(
        (a, b) => calc.dividir(a, b),
        'división'
      );
      break;
    
    case '5':
      const base = await pedirNumero('Ingrese la base: ');
      const exponente = await pedirNumero('Ingrese el exponente: ');
      const resultadoPot = calc.potencia(base, exponente);
      
      if (resultadoPot === undefined) {
        console.log('\n⚠️  La función potencia aún no está implementada');
      } else {
        console.log(`\n✓ Resultado: ${base}^${exponente} = ${resultadoPot}`);
      }
      break;
    
    case '6':
      await operacionUnNumero(
        (num) => calc.raizCuadrada(num),
        'raíz cuadrada'
      );
      break;

    case '7':
      await operacionDosNumeros(
        (a, b) => calc.resto(a, b),
        'resto'
      );
      break;

    case '8':
      const numLn = await pedirNumero('Ingrese el numero: ');
      const resultadoLn = calc.ln(numLn);

      if (resultadoLn === undefined) {
        console.log('\n⚠️  La función logaritmo natural aún no está implementada');
      } else {
        console.log(`\n✓ Resultado: ln(${numLn}) = ${resultadoLn}`);
      }
    break;

    case '9':
      const numLog = await pedirNumero('Ingrese el numero: ');
      const resultadoLog = calc.log(numLog);

      if (resultadoLog === undefined) {
        console.log('\n⚠️  La función logaritmo base 10 aún no está implementada');
      } else {
        console.log(`\n✓ Resultado: log10(${numLn}) = ${resultadoLn}`);
      }
    break;

    case '10':
      const longPromedio = await pedirNumero('Ingresa la longitud del Array: ');
      let promedioArray = [];
      for (let i = 0; i< longPromedio; i ++){
        const numero = await pedirNumero('Ingresar numero: ');
        promedioArray.push(numero);
      }
      const resultadoPromedio = calc.promedio(promedioArray);
      console.log(`\n✓ Resultado: Promedio(${promedioArray}) = ${resultadoPromedio}`);
      break;
      

      case '11':
      const longMaximo = await pedirNumero('Ingresa la longitud del Array: ');
      let maximoArray = [];
      for (let i = 0; i< longMaximo; i ++){
        const numero = await pedirNumero('Ingresar numero: ');
        maximoArray.push(numero);
      }
      const resultadoMaximo = calc.promedio(maximoArray);
      console.log(`\n✓ Resultado: Maximo(${maximoArray}) = ${resultadoMaximo}`);
      break;
      
    case '0':
      console.log('\n¡Hasta luego! 👋');
      rl.close();
      return false;
    
    default:
      console.log('\n⚠️  Opción inválida. Por favor intente nuevamente.');
  }
  
  return true;
}

async function iniciar() {
  let continuar = true;
  
  while (continuar) {
    mostrarMenu();
    
    const opcion = await new Promise((resolve) => {
      rl.question('\nSeleccione una opción: ', resolve);
    });
    
    continuar = await ejecutarOpcion(opcion);
  }
}

// Iniciar el cliente
console.log('Bienvenido a la Calculadora Interactiva');
iniciar();