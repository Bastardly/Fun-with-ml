const getModels = require("./getModels");
const { prediction } = require("./prediction");
const { generateCollection } = require("./utils");

(function() {
  const collection = [];
  const models = [];
  const numberOfPoints = 2000; // e.g. size of collection
  const learningRate = 0.1;
  const countLimit = 10000;
  const desiredNumberOfModels = 3;

  generateCollection(numberOfPoints, collection);
  getModels(collection, desiredNumberOfModels, models);

  function logSuccessFulPredictions() {
    const successfulPredictions = collection.filter(
      ({ successfulPrediction }) => successfulPrediction
    ).length;
    console.log("successfulPredictions", successfulPredictions);
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
        collection.forEach(({ coordSet, isAccepted }, index) => {
          const coordSetProbability = prediction(
            models,
            coordSet,
            isAccepted,
            learningRate
          );

          // console.log(Math.round(coordSetProbability * 100) / 100, isAccepted);

          // collection[index].successfulPrediction = coordSetProbability >= 0.5;

          collection[index].successfulPrediction = isAccepted
            ? coordSetProbability >= 0.5
            : coordSetProbability < 0.5;

          count++;
          if (index && index % 100 === 0) {
            logSuccessFulPredictions();
          }
        });
      }
    }
    logSuccessFulPredictions();
    console.log("count", count, models);
  }
  trainModels();
})();
