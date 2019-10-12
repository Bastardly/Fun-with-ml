const { discrete, Sigmoid } = require("./ml-helperfunctions");
const { getRandomNumber, generateSet } = require("./utils");

(function() {
  const collection = [];
  const numberOfPoints = 1000; // e.g. size of collection
  const learningRate = 0.1;
  const maxCount = 1500;
  const desiredNumberOfModels = 3;

  generateSet(numberOfPoints, collection);
  const models = [];

  function getModel() {
    let weights = collection[0].coordSet.map(() => getRandomNumber()); // Just a random number/weight for each coordinate
    let bias = getRandomNumber() / 4;

    // ask line to come closer
    function modifyBiasAndWeights(isNegative, coordSet) {
      const multiplier = isNegative ? 1 : -1; // Should point towards zero, so we add when negative, and subtract when positive
      coordSet.forEach((axesValue, index) => {
        weights[index] = weights[index] + learningRate * axesValue * multiplier;
      });
      bias = bias + learningRate * multiplier;
    }

    function prediction(coordSet, isAccepted) {
      const isNegative = discrete(coordSet, bias, weights) < 0;

      // If coordset is in wrong area, modify line that seperates accepted/not-accepted
      if ((isNegative && isAccepted) || (!isNegative && !isAccepted)) {
        modifyBiasAndWeights(isNegative, coordSet);
      } else {
        return true;
      }
    }

    function logSuccessFulPredictions() {
      const successfulPredictions = collection.filter(
        ({ successfulPrediction }) => successfulPrediction
      ).length;
      console.log("successfulPredictions", successfulPredictions);
    }

    function trainModel() {
      let count = 0;
      let continueLoop = true;
      while (continueLoop && count < maxCount) {
        continueLoop = collection.some(
          ({ successfulPrediction }) => !successfulPrediction
        );

        if (continueLoop) {
          collection.forEach(({ coordSet, isAccepted }, index) => {
            collection[index].successfulPrediction = prediction(
              coordSet,
              isAccepted
            );
            count++;
            if (index && index % 100 === 0) {
              logSuccessFulPredictions();
            }
          });
        }
      }
      logSuccessFulPredictions();
      models.push({ bias, weights });
    }
    trainModel();
    if (models.length <= desiredNumberOfModels) {
      getModel();
    }
  }
  getModel();
  console.log(models);
})();
