const getPerceptrons = require("./getPerceptrons");
const { prediction } = require("./prediction");
const { generateCollection } = require("./utils");
const { validateResult } = require("./validateResult");

(function() {
  const collection = [];
  const perceptrons = [];
  const numberOfPoints = 1000; // e.g. size of collection
  const learningRateBase = 0.1;
  const countLimit = 10000;
  const desiredNumberOfPerceptrons = 2;
  const dropoutChance = 0.3;
  const momentumBeta = 0.5; // Changes the size of learningRate - but not used yet
  const acceptedErrorRate = 0.00001;
  let finalPerceptrons;

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

  function roundNumber(number) {
    const desiredDidgets = 1 / acceptedErrorRate;
    return Math.round(number * desiredDidgets) / desiredDidgets;
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
        collection.every(({ coordSet, desiredValue }, index) => {
          const successfulPredictions = getSuccessfulPredictions();
          if (successfulPredictions !== numberOfPoints) {
            const learningRate =
              (learningRateBase * successfulPredictions) / numberOfPoints;
            const errorRate = prediction(
              perceptrons,
              coordSet,
              desiredValue,
              learningRate,
              dropoutChance
            );

            collection[index].successfulPrediction =
              errorRate <= acceptedErrorRate;

            count++;
            if (index % 100 === 0) {
              console.log(errorRate);
              console.log(roundNumber(errorRate));
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
    finalPerceptrons = perceptrons;
    logFinalResults();
    console.log("count:", count, "/", countLimit);
  }
  trainModel();
  const result = validateResult(finalPerceptrons, perceptronTrainingPoints);
  console.log(
    "training poinst is ",
    result >= 0.5 ? "accepted" : "rejected",
    "by:",
    roundNumber(result)
  );
})();
