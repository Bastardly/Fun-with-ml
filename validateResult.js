const { Sigmoid } = require("./ml-helperfunctions");

// Let's see if you model actually works!
function validateResult(FinishedModel, perceptronTrainingPoints) {
  const result = FinishedModel.reduce((accu, model) => {
    const combinedWeights = model.weights.reduce(
      (combined, weight, index) =>
        combined + weight * perceptronTrainingPoints[index],
      0
    );
    accu = model.modelWeight * (combinedWeights + model.bias) + accu;
    return accu;
  }, 0);
  console.log(
    "training poinst is accepted: ",
    result >= 0,
    "by:",
    Sigmoid(result)
  );
}

module.exports = {
  validateResult
};
