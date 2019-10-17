function getRandomNumber() {
  return Math.round(Math.random() * 20) - 10;
}

function generateCollection(count, collection) {
  let x = 0;
  for (x = 0; x < count; x++) {
    const x1 = getRandomNumber();
    const x2 = getRandomNumber();
    const x3 = getRandomNumber();
    const x4 = getRandomNumber();
    const x5 = getRandomNumber();
    collection.push({
      coordSet: [x1, x2, x3, x4, x5], // Now we are working in three dimensions - but it could be n dimensions
      // isAccepted: x1 > 0 && x2 < 0 && x3 < 5 // So this is the "stuff" our "neural network" should find out;
      isAccepted:
        x1 > 0 && x2 < 0 && x2 < 8 && x3 < -3 && x3 > -4 && x4 > x1 && x5 < x4 // So this is the "stuff" our "neural network" should find out;
    });
  }
}

module.exports = {
  getRandomNumber,
  generateCollection
};
