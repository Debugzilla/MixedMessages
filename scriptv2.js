function generateRandomNumber(num) {
  // Cojemos un numero aleeatorio de 0 a -1 
  return Math.floor(Math.random() * num);
}

const collectiveWisdom = {
    signInfo: ['libra', 'virgo', 'tauro', 'cancer', 'aries'],
    fortuneOutput: ['terrible suerte 😔', 'mala suerte 😟', 'suerte 🙂', 'buena suerte 😀', 'muy afortunado 🌟'],
    advice: ['Vete a comer 🍽️', 'no leas esto 🚫', 'Juega más 🎮', 'Solo una vez más 🎲']
  };
  

// Mensaje especifico para cada tipo de signo zodiacal
const zodiacMessages = {
  libra: 'Hoy es un buen día para tomar decisiones equilibradas.',
  virgo: 'Presta atención a los detalles en tu trabajo.',
  tauro: 'Disfruta de las pequeñas cosas de la vida.',
  cancer: 'Dedica tiempo a tu familia y seres queridos.',
  aries: 'Es un gran momento para tomar la iniciativa.'
};

//funcion para coger la fecha actual y el tiempo
function getCurrentDateTime() {
  const now = new Date();
  return now.toLocaleDateString(); //Devuelve fecha y tiempo en un string
}

//funcion que devuelve la hora
function getCurrentTime() {
    const now = new Date();
    return now.toLocaleTimeString();
}

// Funcion para generar nuevos mensajes 
function generatePersonalWisdom() {
  // Guardar Wisdom en un array 
  let personalWisdom = [];

  //coger la fecha actual y el tiempo
  const dateTime = getCurrentDateTime();
  const time = getCurrentTime();
  
  // Iterar sobre el objeto 
  for (let prop in collectiveWisdom) {
    let optionIdx = generateRandomNumber(collectiveWisdom[prop].length);
    let message;

    // Usar las propiedades de los objetos para personalizar el mensaje que se ha añadido a personalWisdom   
    switch (prop) {
      case 'signInfo':
        const sign = collectiveWisdom[prop][optionIdx];
        message = `Tu signo del zodiaco es: "${sign}".`;
        // Añadir un mensaje especifico en funcion del signo del zodiaco 
        if (zodiacMessages[sign]) {
          message += ` ${zodiacMessages[sign]}`;
        }
        break;
      case 'fortuneOutput':
        message = `Tu tienes: "${collectiveWisdom[prop][optionIdx]}".`;
        break;
      case 'advice':
        message = `Tu debes: "${collectiveWisdom[prop][optionIdx]}".`;
        break;
      default:
        message = 'No tengo suficiente información.';
    }
    
    personalWisdom.push(`[${dateTime}]  ${message} `);
  }
  
  return personalWisdom;
}

function formatWisdom(wisdom) {
  // Añadir ASCII o emojis si es oportuno
  const formatted = wisdom.join('\n');
  console.log(formatted);
}

// Generar y formar nuevos mensajes 
const wisdom = generatePersonalWisdom();
formatWisdom(wisdom);
