function getRandomNumber() {
  return Math.round(Math.random() * 20) - 10;
}

function generateSet(count, collection) {
  let x = 0;
  for (x = 0; x < count; x++) {
    const x1 = getRandomNumber();
    collection.push({
      coordSet: [x1, getRandomNumber(), getRandomNumber()], // Now we are working in three dimensions - but it could be n dimensions
      isAccepted: x1 > 0 // So this is really basic stuff our "neural network" should find out;
    });
  }
}

module.exports = {
  getRandomNumber,
  generateSet
};
