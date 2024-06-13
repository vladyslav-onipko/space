const generateNumber = () => {
  return Math.floor(Math.random() * (10000000 - 1 + 1)) + 1;
};

export default generateNumber;
