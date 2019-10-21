function getRandomNumber() {
  return Math.round(Math.random() * 20) - 10;
}

function generateCollection(count, collection, perceptronTrainingPoints) {
  let x = 0;
  for (x = 0; x < count; x++) {
    const x = perceptronTrainingPoints.map(() => getRandomNumber()); // Create a random numbers for each trainingpoint - This is used to train the model.
    collection.push({
      modelWeight: 1,
      coordSet: x,
      // desiredValue: x1 > 0 && x2 < 0 && x3 < 5 // So this is the "stuff" our "neural network" should find out;
      // desiredValue: x1 > 0 && x2 < 0 && x2 < 8 && x3 < -3 && x3 > -4 && x4 > x1 && x5 < x4 // So this is the "stuff" our "neural network" should find out;
      desiredValue: x[0] > 8 && x[1] > 8 ? 1 : 0 // 1(accepted)  or 0(rejected)
      // desiredValue: x[0] + x[1] + x[2] + x[3] > 10
    });
  }
}

module.exports = {
  getRandomNumber,
  generateCollection
};
