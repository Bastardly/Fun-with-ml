const { generateInputs, getPerceptrons } = require("./utils");
const { trainModel } = require("./trainModel");

function getNumberOfTrainingPoints() {
  // These are the numbers we pass in from the CLI to validate if our model is actually working!
  return process.argv.slice(2, process.argv.length).map(val => val);
}

(function() {
  const settings = {
    numberOfPoints: 100, // e.g. points or coordinates we have in our collection e.g. f(2,5,-3)
    learningRateBase: 0.1,
    countLimit: 1000, // How many times we max want to run our cycle
    desiredNumberOfPerceptrons: 2 // How many lines/fields we use to seperate  accepted/ unaccepted
  };

  // The numbers we pass from console. 5 2 5 will add and train model for three dimensions
  const numberOfDimensions = getNumberOfTrainingPoints();

  // Here we also generate the criteria that we aim to solve
  const inputCollection = generateInputs(
    settings.numberOfPoints,
    numberOfDimensions
  );

  // The weights and biases we will change in order to improve the model.
  const perceptrons = getPerceptrons(
    numberOfPoints,
    settings.desiredNumberOfPerceptrons
  );

  const finalPerceptrons = trainModel(inputCollection, perceptrons, settings);
  console.log(finalPerceptrons);
  // Create model: const model = createModel(finalPerceptrons)
  // Test model with the numbers we passed in from CLI: model(numberOfDimensions)
})();
