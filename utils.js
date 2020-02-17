function getRandomNumber() {
  return Math.round(Math.random() * 50) - 25;
}

function generateInputs(numberOfPoints, numberOfDimensions) {
  return Array(numberOfPoints).map(() => ({
    coords: numberOfDimensions.map(() => getRandomNumber()), // Inputs are constants
    desiredOutput: x[0] > 8 && x[1] > 8 ? 1 : -1 // 1(accepted)  or -1(rejected)
  }));
}

function getPerceptrons(numberOfPoints, desiredNumberOfPerceptrons) {
  return Array(desiredNumberOfPerceptrons).map(() => {
    return {
      weights: Array(numberOfPoints).map(getRandomNumber()), // Just a random number/weight for each dimension
      bias: getRandomNumber()
    };
  });
}

module.exports = {
  getRandomNumber,
  generateInputs,
  getPerceptrons
};
