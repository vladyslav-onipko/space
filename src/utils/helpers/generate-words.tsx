const generateWords = (wordCount: number) => {
  const words = [
    'lorem',
    'ipsum',
    'dolor',
    'sit',
    'amet',
    'consectetur',
    'adipiscing',
    'elit',
    'sed',
    'do',
    'eiusmod',
    'tempor',
    'incididunt',
    'ut',
    'labore',
    'et',
    'dolore',
    'magna',
    'aliqua',
  ];

  let result = '';

  for (let i = 0; i < wordCount; i++) {
    const randomIndex = Math.floor(Math.random() * words.length);
    result += words[randomIndex] + ' ';
  }

  return result.trim();
};

export default generateWords;
