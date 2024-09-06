// URL de la API para obtener el clima
const weatherApiUrl = 'https://www.el-tiempo.net/api/json/v2/provincias/08/municipios/08019';

function generateRandomNumber(num) {
  return Math.floor(Math.random() * num);
}

// Mensajes de configuración para diferentes idiomas
const messages = {
  es: {
    signInfo: ['libra', 'virgo', 'tauro', 'cancer', 'aries'],
    fortuneOutput: ['tienes muy mala suerte 😔', 'tienes mala suerte 😟', 'tienes suerte 🙂', 'tienes buena suerte 😀', 'tienes muy buena suerte 🌟'],
    advice: ['Vete a comer 🍽️', 'no leas esto 🚫', 'Juega más 🎮', 'Solo una vez más 🎲']
  },
  en: {
    signInfo: ['libra', 'virgo', 'taurus', 'cancer', 'aries'],
    fortuneOutput: ['you have very bad luck 😔', 'you have bad luck 😟', 'you have luck 🙂', 'you have good luck 😀', 'you have very good luck 🌟'],
    advice: ['Go out and eat 🍽️', 'don\'t read this 🚫', 'Play more 🎮', 'Just one more time 🎲']
  },
  cat: {
    signInfo: ['lliura', 'virgo', 'tauro', 'cancer', 'aries'],
    fortuneOutput: ['tens molt mala sort 😔', 'tens mala sort 😟', 'tens sort 🙂', 'tens bona sort 😀', 'tens molt bona sort 🌟'],
    advice: ['Ves a menjar 🍽️', 'no llegeixis això 🚫', 'juga més 🎮', 'només una vegada més 🎲']
  },
  eus: {
    signInfo: ['libra', 'birge', 'tauro', 'minbizia', 'ardi'],
    fortuneOutput: ['Oso zorte txarra duzu 😔', 'Zorte txarra duzu 😟', 'Zortea duzu 🙂', 'Zorte ona duzu 😀', 'Oso zorte ona duzu 🌟'],
    advice: ['Joan bazkaltzera 🍽️', 'Ez irakurri hau 🚫', 'Jolastu gehiago 🎮', 'Aukera bat gehiago 🎲']
  }
};

//mensajes basados en el signo del zodiaco
const zodiacMessages = {
  es: {  
    libra: 'Hoy es un buen día para tomar decisiones equilibradas.',
    virgo: 'Presta atención a los detalles en tu trabajo.',
    tauro: 'Disfruta de las pequeñas cosas de la vida.',
    cancer: 'Dedica tiempo a tu familia y seres queridos.',
    aries: 'Es un gran momento para tomar la iniciativa.'},
  en: {
    libra: 'Today is a good day to make balanced decisions.',
    virgo: 'Pay attention to the details in your work.',
    taurus: 'Enjoy the little things in life.',
    cancer: 'Spend time with your family and loved ones.',
    aries: 'It’s a great time to take initiative.'},
  cat: { 
    libra: 'Avui és un bon dia per prendre decisions equilibrades.',
    virgo: 'Para atenció als detalls a la teva feina.',
    tauro: 'Gaudeix de les petites coses de la vida.',
    cancer: 'Dedica temps a la teva família i éssers estimats.',
    aries: 'És un gran moment per prendre la iniciativa.'},
  eus: { 
    libra: 'Gaur egungo eguna erabaki orekatutakoak hartzeko eguna da.',
    virgo: 'Arretaz jarraitu zure lanaren xehetasunei.',
    tauro: 'Bizitzako gauza txikiez gozatu.',
    cancer: 'Eskaini denbora zure familiari eta maite dituzunei.',
    aries: 'Momentu bikaina da ekintza hartu ahal izateko.'}
};

//mensajes basados en la hora del dia
const timeOfDayMessages = {
  es: { 
    morning: '¡Buenos días! Es un buen momento para empezar el día con energía positiva.',
    afternoon: '¡Buenas tardes! Aprovecha el resto del día para lograr tus objetivos.',
    evening: '¡Buenas noches! Relájate y disfruta de un merecido descanso.'},
  en: { 
    morning: 'Good morning! It’s a great time to start your day with positive energy.',
    afternoon: 'Good afternoon! Make the most of the rest of your day to achieve your goals.',
    evening: 'Good evening! Relax and enjoy a well-deserved rest.'},
  cat: { 
    morning: 'Bon dia! És un bon moment per començar el dia amb energia positiva.',
    afternoon: 'Bona tarda! Aprofita el que queda del dia per aconseguir els teus objectius.',
    evening: 'Bona nit! Relaxa´t i gaudeix d´un merescut descans.' },
  eus: {
    morning: 'Egun on! Eguna positiboki hasteko momentu egokia da.',
    afternoon: 'Arratsalde on! Egunaren gainerakoa aprobetxatu zure helburuak lortzeko.',
    evening: 'Gabon! Lasaitu zaitez eta gozatu merezitako atsedenaz.' }
};

async function getWeather() {
  try {
    const response = await fetch(weatherApiUrl);
    const data = await response.json();
    const temperature = data.temperatura_actual;
    const stateSkyDescription = data.stateSky.description;
    if (temperature) {
      return `En Barcelona, el estado del cielo está "${stateSkyDescription}" y la temperatura es de ${temperature}°C.`;
    } else {
      return 'No se encontró información del clima para Barcelona.';
    }
  } catch (error) {
    console.error('Error fetching weather data:', error);
    return 'No se pudo obtener la información del clima.';
  }
}

function getCurrentDateTime() {
  const now = new Date();
  return now.toLocaleString();
}

function getTimeOfDay() {
  const hour = new Date().getHours();
  if (hour < 12) return 'morning';
  if (hour < 20) return 'afternoon';
  return 'evening';
}

function generatePersonalWisdom(language = 'es', userSign = null) {
  let personalWisdom = [];
  const dateTime = getCurrentDateTime();
  const timeOfDay = getTimeOfDay();

  if (!messages[language]) {
    console.error('Language not supported.');
    return;
  }

  const collectiveWisdom = messages[language];
  const zodiacMessagesInLang = zodiacMessages[language];
  const timeOfDayMessagesInLang = timeOfDayMessages[language];

  const userSignLower = userSign ? userSign.toLowerCase() : '';
  const validSigns = collectiveWisdom.signInfo;
  const isValidSign = validSigns.includes(userSignLower);

  for (let prop in collectiveWisdom) {
    let optionIdx;
    let message;

    if (prop === 'signInfo') {
      message = `${timeOfDayMessagesInLang[timeOfDay]} `;
    }

    switch (prop) {
      case 'signInfo':
        if (userSignLower && isValidSign) {
            if(language === 'es') {
                message += `Tu signo del zodiaco es: "${userSignLower}". ${zodiacMessagesInLang[userSignLower] || 'No tengo información específica para tu signo.'}`;
                
            } else if(language === 'en') {
                message += `Your zodiac sign is: "${userSignLower}". ${zodiacMessagesInLang[userSignLower] || 'No tengo información específica para tu signo.'}`;
            } else if(language === 'cat') {
                message += `El teu signe de zodiac es: "${userSignLower}". ${zodiacMessagesInLang[userSignLower] || 'No tengo información específica para tu signo.'}`;
            } else if(language === 'eus') {
                message += `Zure zodiako zeinua da: "${userSignLower}". ${zodiacMessagesInLang[userSignLower] || 'No tengo información específica para tu signo.'}`;
            }
          
        } else {
          optionIdx = generateRandomNumber(collectiveWisdom[prop].length);
          const sign = collectiveWisdom[prop][optionIdx];
          if (language === 'es') {
            message += `Tu signo del zodiaco es: "${sign}".`;
          } else if (language === 'en') {
            message += `Your zodiac sign is: "${sign}".`;
          } else if (language === 'cat') {
            message += `El teu signe del zodiac es: "${sign}".`;
          } else if (language === 'eus') {
            message += `Zure zodiako zeinua da: "${sign}".`;
          }
        //damos la respuesta en función del idioma seleccionado
        
          if (zodiacMessagesInLang[sign]) {
            message += ` ${zodiacMessagesInLang[sign]}`;
          }
        }
        break;
      case 'fortuneOutput':
        optionIdx = generateRandomNumber(collectiveWisdom[prop].length);
        if (language === 'es') {
            message = `Parece que hoy ${collectiveWisdom[prop][optionIdx]}.`;
        } else if ( language === 'en') {
            message = `It seems like today ${collectiveWisdom[prop][optionIdx]}.`;
        } else if (language === 'cat') {
            message = `Sembla que avui ${collectiveWisdom[prop][optionIdx]}.`;
        } else if (language === 'eus') {
            message = `Itxura denez gaur ${collectiveWisdom[prop][optionIdx]}.`;
        }
     
        break;
      case 'advice':
        optionIdx = generateRandomNumber(collectiveWisdom[prop].length);
        if (language === 'es') {
            message = `Un buen consejo para ti sería: "${collectiveWisdom[prop][optionIdx]}".`;
        } else if (language === 'en') {
            message = `A good piece of advice for you is: "${collectiveWisdom[prop][optionIdx]}".`;
        } else if (language === 'cat') {
            message = `Un bon consell per a tu seria: "${collectiveWisdom[prop][optionIdx]}".`;
        } else if (language === 'eus') {
            message = `Zuretzat aholku on bat izango litzateke: "${collectiveWisdom[prop][optionIdx]}".`;
        }
        
        break;
      default:
        message = 'No tengo suficiente información.';
    }

    personalWisdom.push(`[${dateTime}] ${message}`);
  }

  return personalWisdom;
}

function formatWisdom(wisdom) {
  const results = document.getElementById('results');
  results.innerHTML = '';
  wisdom.forEach(message => {
    const paragraph = document.createElement('p');
    paragraph.className = 'message';
    paragraph.textContent = message;
    results.appendChild(paragraph);
  });
}

async function handleFormSubmit(event) {
  event.preventDefault();
  
  const language = document.getElementById('language').value;
  const sign = document.getElementById('sign').value;
  const weatherOption = document.getElementById('weather').value;

  const personalWisdom = generatePersonalWisdom(language, sign);

  if (weatherOption === 'yes') {
    const weatherMessage = await getWeather();
    personalWisdom.push(weatherMessage);
  }

  formatWisdom(personalWisdom);
}

const messageForm = document.getElementById('messageForm');
messageForm.addEventListener('submit', handleFormSubmit);

const compatibilityMessages = {
    amor: {
      libra: {
        virgo: 'Libra y Virgo tienen una relación equilibrada en el amor, aunque necesitan trabajar en la comunicación.',
        tauro: 'Libra y Tauro tienen una relación amorosa estable, aunque pueden chocar en sus prioridades.',
        cancer: 'Libra y Cáncer tienen una relación emocional profunda, pero a veces deben equilibrar sus diferencias.',
        libra: 'Libra y Libra pueden disfrutar de una relación armoniosa llena de comprensión mutua.'
      },
      virgo: {
        libra: 'Virgo y Libra pueden tener una relación amorosa interesante si logran equilibrar sus enfoques diferentes.',
        tauro: 'Virgo y Tauro tienen una relación amorosa práctica y estable.',
        cancer: 'Virgo y Cáncer tienen una conexión emocional profunda en el amor.',
        virgo: 'Virgo y Virgo pueden formar una pareja extremadamente detallista y comprometida.'
      },
      tauro: {
        libra: 'Tauro y Libra disfrutan de una relación estable, aunque deben aprender a ceder en ciertas áreas.',
        virgo: 'Tauro y Virgo forman una relación amorosa sólida y orientada al compromiso.',
        cancer: 'Tauro y Cáncer tienen una relación amorosa tierna y emocionalmente profunda.',
        tauro: 'Tauro y Tauro disfrutan de una relación basada en estabilidad y compromiso mutuo.'
      },
      cancer: {
        libra: 'Cáncer y Libra tienen una relación sentimental fuerte pero necesitan trabajar en su compatibilidad emocional.',
        virgo: 'Cáncer y Virgo disfrutan de una relación amorosa con una profunda conexión emocional.',
        tauro: 'Cáncer y Tauro tienen una relación amorosa nutrida por la lealtad y la comprensión.',
        cancer: 'Cáncer y Cáncer forman una relación emocionalmente intensa y nutritiva.'
      }
    },
    trabajo: {
      libra: {
        virgo: 'Libra y Virgo pueden trabajar bien juntos si logran equilibrar la creatividad con la estructura.',
        tauro: 'Libra y Tauro en el trabajo pueden ser una combinación potente si aprenden a respetar los ritmos de cada uno.',
        cancer: 'Libra y Cáncer pueden crear un ambiente de trabajo armónico si aprenden a valorar las diferencias.',
        libra: 'Libra y Libra forman un equipo diplomático y equilibrado, ideal para proyectos creativos.'
      },
      virgo: {
        libra: 'Virgo y Libra pueden ser un buen equipo si equilibran organización con creatividad.',
        tauro: 'Virgo y Tauro en el trabajo son extremadamente eficientes, logrando excelentes resultados.',
        cancer: 'Virgo y Cáncer pueden construir un ambiente de trabajo armonioso y organizado.',
        virgo: 'Virgo y Virgo en el trabajo son extremadamente meticulosos y productivos.'
      },
      tauro: {
        libra: 'Tauro y Libra pueden ser un equipo balanceado si logran respetar los tiempos y necesidades de cada uno.',
        virgo: 'Tauro y Virgo son un equipo de trabajo eficaz y organizado, orientado a la calidad.',
        cancer: 'Tauro y Cáncer en el trabajo se apoyan mutuamente para crear un ambiente estable.',
        tauro: 'Tauro y Tauro en el trabajo son constantes, prácticos y extremadamente enfocados.'
      },
      cancer: {
        libra: 'Cáncer y Libra en el trabajo pueden encontrar éxito si equilibran emociones con pragmatismo.',
        virgo: 'Cáncer y Virgo trabajan bien juntos, manteniendo un enfoque organizado y emocionalmente consciente.',
        tauro: 'Cáncer y Tauro son un equipo de trabajo sólido, caracterizado por la estabilidad y el apoyo.',
        cancer: 'Cáncer y Cáncer en el trabajo pueden crear un entorno acogedor y altamente colaborativo.'
      }
    },
    amistad: {
      libra: {
        virgo: 'Libra y Virgo tienen una amistad equilibrada, siempre apoyándose mutuamente.',
        tauro: 'Libra y Tauro disfrutan de una amistad duradera, aunque deben aceptar sus diferencias.',
        cancer: 'Libra y Cáncer pueden disfrutar de una amistad emocionalmente profunda y armónica.',
        libra: 'Libra y Libra disfrutan de una amistad llena de paz, comprensión y equilibrio.'
      },
      virgo: {
        libra: 'Virgo y Libra tienen una amistad que prospera si ambos valoran sus diferencias.',
        tauro: 'Virgo y Tauro disfrutan de una amistad muy confiable y duradera.',
        cancer: 'Virgo y Cáncer tienen una amistad basada en el apoyo emocional y la comprensión mutua.',
        virgo: 'Virgo y Virgo disfrutan de una amistad basada en la lealtad y el respeto mutuo.'
      },
      tauro: {
        libra: 'Tauro y Libra pueden tener una amistad sólida si aprenden a respetar sus diferencias.',
        virgo: 'Tauro y Virgo disfrutan de una amistad estable y mutuamente beneficiosa.',
        cancer: 'Tauro y Cáncer tienen una amistad emocionalmente profunda y llena de lealtad.',
        tauro: 'Tauro y Tauro disfrutan de una amistad que se basa en la confianza y la estabilidad.'
      },
      cancer: {
        libra: 'Cáncer y Libra disfrutan de una amistad equilibrada y emocionalmente rica.',
        virgo: 'Cáncer y Virgo disfrutan de una amistad sólida y emocionalmente enriquecedora.',
        tauro: 'Cáncer y Tauro son amigos leales que se apoyan mutuamente en todas las circunstancias.',
        cancer: 'Cáncer y Cáncer tienen una amistad muy emocional y nutritiva, llena de comprensión.'
      }
    }
  };
  
  
  function checkCompatibility() {
    const firstSign = document.getElementById('firstSign').value;
    const secondSign = document.getElementById('secondSign').value;
    const compatibilityType = document.getElementById('compatibilityType').value;
  
    let resultMessage = compatibilityMessages[compatibilityType][firstSign]?.[secondSign] || 'No tenemos suficiente información sobre esta combinación.';
  
    document.getElementById('compatibilityResult').textContent = resultMessage;
  }
  
  document.getElementById('checkCompatibility').addEventListener('click', checkCompatibility);
  