function generateRandomNumber(num) {
  // Gets a random number from 0 to num - 1
  return Math.floor(Math.random() * num);
}

const collectiveWisdom = {
  signInfo: ['star', 'moon', 'sun', 'comet'],
  fortuneOutput: ['terrible luck', 'bad luck', 'ok luck', 'good luck', 'great luck'],
  advice: ['go out and eat', 'not read this', 'play more', 'trust no one']
};

// Function to generate a new set of messages
function generatePersonalWisdom() {
  // Store the 'wisdom' in an array
  let personalWisdom = [];

  // Iterate over the object
  for (let prop in collectiveWisdom) {
    let optionIdx = generateRandomNumber(collectiveWisdom[prop].length);

    // Use the object's properties to customize the message being added to personalWisdom  
    switch (prop) {
      case 'signInfo':
        personalWisdom.push(`Your sign right now is a "${collectiveWisdom[prop][optionIdx]}".`);
        break;
      case 'fortuneOutput':
        personalWisdom.push(`You are having: "${collectiveWisdom[prop][optionIdx]}".`);
        break;
      case 'advice':
        personalWisdom.push(`You should: "${collectiveWisdom[prop][optionIdx]}".`);
        break;
      default:
        personalWisdom.push('There is not enough info.');
    }
  }
  
  return personalWisdom;
}

function formatWisdom(wisdom) {
  // Add ASCII or emojis if desired
  const formatted = wisdom.join('\n');
  console.log(formatted);
}

// Generate and format a new set of messages
const wisdom = generatePersonalWisdom();
formatWisdom(wisdom);
