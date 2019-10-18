const getPerceptrons = require("./getPerceptrons");
const { prediction } = require("./prediction");
const { generateCollection } = require("./utils");
const { validateResult } = require("./validateResult");

(function() {
  const collection = [];
  const perceptrons = [];
  const numberOfPoints = 1000; // e.g. size of collection
  const learningRateBase = 0.1;
  const countLimit = 100000;
  const desiredNumberOfPerceptrons = 10;
  const dropoutChance = 0.3;
  const momentumBeta = 0.5; // Changes the size of learningRate - but not used yet
  let FinishedModel;

  const perceptronTrainingPoints = [];
  process.argv.slice(2, process.argv.length).forEach(val => {
    perceptronTrainingPoints.push(val);
  });

  // Here we also generate the criteria that we aim to solve
  generateCollection(numberOfPoints, collection, perceptronTrainingPoints);
  getPerceptrons(collection, desiredNumberOfPerceptrons, perceptrons);

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

  function trainModel() {
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
              perceptrons,
              coordSet,
              isAccepted,
              learningRate,
              dropoutChance
            );

            collection[index].successfulPrediction = isAccepted
              ? coordSetProbability >= 0.99
              : coordSetProbability <= 0.01;

            count++;
            if (index && index % 1 === 0) {
              console.log(
                Math.round(coordSetProbability * 100) / 100,
                coordSet[0],
                coordSet[1]
              );
              // logSuccessfulPredictions(successfulPredictions);
            }
            return true;
          } else {
            continueLoop = false;
            return false;
          }
        });
      }
    }
    console.log("count", count, perceptrons);
    FinishedModel = perceptrons;
    logFinalResults();
  }
  trainModel();
  validateResult(FinishedModel, perceptronTrainingPoints);
})();
