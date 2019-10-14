const { getRandomNumber } = require("./utils");
// This is hugely simplified for now.
function getModels(collection, desiredNumberOfModels, models) {
  for (let i = 0; i < desiredNumberOfModels; i++) {
    models.push({
      weights: collection[0].coordSet.map(() => getRandomNumber()), // Just a random number/weight for each axesValue
      bias: getRandomNumber(),
      modelWeight: 1
    });
  }
}

module.exports = getModels;
