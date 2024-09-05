function generateRandomNumber(num) {
    // Gets a random number from 0 to num - 1
    return Math.floor(Math.random() * num);
  }
  
  const messages = {
    es: {
      signInfo: ['libra', 'virgo', 'tauro', 'cancer', 'aries'],
      fortuneOutput: ['terrible suerte 😔', 'mala suerte 😟', 'suerte 🙂', 'buena suerte 😀', 'muy afortunado 🌟'],
      advice: ['Vete a comer 🍽️', 'no leas esto 🚫', 'Juega más 🎮', 'Solo una vez más 🎲']
    },
    en: {
      signInfo: ['libra', 'virgo', 'taurus', 'cancer', 'aries'],
      fortuneOutput: ['terrible luck 😔', 'bad luck 😟', 'ok luck 🙂', 'good luck 😀', 'very lucky 🌟'],
      advice: ['Go out and eat 🍽️', 'don\'t read this 🚫', 'Play more 🎮', 'Just one more time 🎲']
    }
  };
  
  // Messages specific to each zodiac sign
  const zodiacMessages = {
    es: {
      libra: 'Hoy es un buen día para tomar decisiones equilibradas.',
      virgo: 'Presta atención a los detalles en tu trabajo.',
      tauro: 'Disfruta de las pequeñas cosas de la vida.',
      cancer: 'Dedica tiempo a tu familia y seres queridos.',
      aries: 'Es un gran momento para tomar la iniciativa.'
    },
    en: {
      libra: 'Today is a good day to make balanced decisions.',
      virgo: 'Pay attention to the details in your work.',
      taurus: 'Enjoy the little things in life.',
      cancer: 'Spend time with your family and loved ones.',
      aries: 'It’s a great time to take initiative.'
    }
  };
  
  // Messages for different times of day
  const timeOfDayMessages = {
    es: {
      morning: '¡Buenos días! Es un buen momento para empezar el día con energía positiva.',
      afternoon: '¡Buenas tardes! Aprovecha el resto del día para lograr tus objetivos.',
      evening: '¡Buenas noches! Relájate y disfruta de un merecido descanso.'
    },
    en: {
      morning: 'Good morning! It’s a great time to start your day with positive energy.',
      afternoon: 'Good afternoon! Make the most of the rest of your day to achieve your goals.',
      evening: 'Good evening! Relax and enjoy a well-deserved rest.'
    }
  };
  
  // Function to get the current date and time
  function getCurrentDateTime() {
    const now = new Date();
    return now.toLocaleString(); // Returns date and time as a string
  }
  
  // Function to get the current time of day
  function getTimeOfDay() {
    const hour = new Date().getHours();
    if (hour < 12) return 'morning';
    if (hour < 18) return 'afternoon';
    return 'evening';
  }
  
  // Function to generate new messages
  function generatePersonalWisdom(language = 'es', userSign = null) {
    // Store the wisdom in an array
    let personalWisdom = [];
    
    // Get current date, time, and time of day
    const dateTime = getCurrentDateTime();
    const timeOfDay = getTimeOfDay();
    
    // Check if the selected language exists
    if (!messages[language]) {
      console.error('Language not supported.');
      return;
    }
    
    const collectiveWisdom = messages[language];
    const zodiacMessagesInLang = zodiacMessages[language];
    const timeOfDayMessagesInLang = timeOfDayMessages[language];
    
    // Validate and normalize user sign
    const userSignLower = userSign ? userSign.toLowerCase() : '';
    const validSigns = collectiveWisdom.signInfo;
    const isValidSign = validSigns.includes(userSignLower);
    
    // Generate messages for all categories
    for (let prop in collectiveWisdom) {
      let optionIdx;
      let message;
      
      // Add time of day specific message
      if (prop === 'signInfo') {
        message = `${timeOfDayMessagesInLang[timeOfDay]} `;
      }
  
      switch (prop) {
        case 'signInfo':
          if (userSignLower && isValidSign) {
            // Use user-provided sign and message
            message += `Tu signo del zodiaco es: "${userSignLower}". ${zodiacMessagesInLang[userSignLower] || 'No tengo información específica para tu signo.'}`;
          } else {
            // Randomly select a sign
            optionIdx = generateRandomNumber(collectiveWisdom[prop].length);
            const sign = collectiveWisdom[prop][optionIdx];
            message += `Tu signo del zodiaco es: "${sign}".`;
            if (zodiacMessagesInLang[sign]) {
              message += ` ${zodiacMessagesInLang[sign]}`;
            }
          }
          break;
        case 'fortuneOutput':
          // Randomly select fortune message
          optionIdx = generateRandomNumber(collectiveWisdom[prop].length);
          message = `Tu tienes: "${collectiveWisdom[prop][optionIdx]}".`;
          break;
        case 'advice':
          // Randomly select advice message
          optionIdx = generateRandomNumber(collectiveWisdom[prop].length);
          message = `Tu debes: "${collectiveWisdom[prop][optionIdx]}".`;
          break;
        default:
          message = 'No tengo suficiente información.';
      }
      
      personalWisdom.push(`[${dateTime}] ${message}`);
    }
    
    return personalWisdom;
  }
  
  function formatWisdom(wisdom) {
    // Add ASCII or emojis if desired
    const formatted = wisdom.join('\n');
    console.log(formatted);
  }
  
  // Function to save messages to localStorage
  function saveMessagesToLocalStorage(messages) {
    localStorage.setItem('savedMessages', JSON.stringify(messages));
  }
  
  // Function to retrieve messages from localStorage
  function getMessagesFromLocalStorage() {
    const savedMessages = localStorage.getItem('savedMessages');
    return savedMessages ? JSON.parse(savedMessages) : [];
  }
  
  // Example usage with user input
  const language = 'en'; // Change to 'en' for English
  const userSign = 'libra'; // User-provided zodiac sign (change as needed)
  const wisdom = generatePersonalWisdom(language, userSign);
  
  // Save the generated messages to localStorage
  saveMessagesToLocalStorage(wisdom);
  
  // Retrieve and display saved messages from localStorage
  const savedWisdom = getMessagesFromLocalStorage();
  formatWisdom(savedWisdom);
  