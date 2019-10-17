const getModels = require("./getModels");
const { prediction } = require("./prediction");
const { generateCollection } = require("./utils");

(function() {
  const collection = [];
  const models = [];
  const numberOfPoints = 1000; // e.g. size of collection
  const learningRateBase = 0.1;
  const countLimit = 1000000;
  const desiredNumberOfModels = 1;
  const dropoutChance = 0.3;
  const momentumBeta = 0.5; // Changes the size of learningRate - but not used yet

  generateCollection(numberOfPoints, collection);
  getModels(collection, desiredNumberOfModels, models);

  function getSuccessfulPredictions() {
    return collection.filter(({ successfulPrediction }) => successfulPrediction)
      .length;
  }

  function logSuccessfulPredictions(successfulPredictions) {
    console.log("successfulPredictions", successfulPredictions);
    console.log(
      "Procentage: ",
      Math.round((successfulPredictions / numberOfPoints) * 1000) / 10,
      "%"
    );
  }

  function logFinalResults() {
    const successfulPredictions = getSuccessfulPredictions();
    logSuccessfulPredictions(successfulPredictions);
  }

  function trainModels() {
    let count = 0;
    let continueLoop = true;
    while (continueLoop && count < countLimit) {
      continueLoop = collection.some(
        ({ successfulPrediction }) => !successfulPrediction
      );
      console.log("_______");
      if (continueLoop) {
        collection.every(({ coordSet, isAccepted }, index) => {
          const successfulPredictions = getSuccessfulPredictions();
          if (successfulPredictions !== numberOfPoints) {
            const learningRate =
              (learningRateBase * successfulPredictions) / numberOfPoints;
            const coordSetProbability = prediction(
              models,
              coordSet,
              isAccepted,
              learningRate,
              dropoutChance
            );

            collection[index].successfulPrediction = isAccepted
              ? coordSetProbability >= 0.5
              : coordSetProbability < 0.5;

            count++;
            if (index && index % 1000 === 0) {
              logSuccessfulPredictions(successfulPredictions);
            }
            return true;
          } else {
            continueLoop = false;
            return false;
          }
        });
      }
    }
    console.log("count", count, models);
    logFinalResults();
  }
  trainModels();
})();
