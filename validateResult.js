const { Sigmoid } = require("./ml-helperfunctions");

function mergePerceptrons(perceptrons, log) {
  return perceptrons.reduce(
    (accu, model) => {
      const modelWeight = Sigmoid(model.modelWeight);
      //  const modelWeight = model.modelWeight;
      accu.weights = model.weights.map(
        (weight, index) =>
          (weight || 1) * modelWeight + (accu.weights[index] || 0)
      );
      accu.bias = accu.bias + model.bias * modelWeight;
      log && console.log(model.bias);
      return accu;
    },
    {
      weights: [],
      bias: 0
    }
  );
}

// Let's see if you model actually works!
function validateResult(finalPerceptrons, perceptronTrainingPoints) {
  const result2 = finalPerceptrons.reduce((accu, model) => {
    const combinedWeights = model.weights.reduce(
      (combined, weight, index) =>
        combined + weight * perceptronTrainingPoints[index],
      0
    );
    accu = model.modelWeight * (combinedWeights + model.bias) + accu;
    return accu;
  }, 0);
  const combinedModel = mergePerceptrons(finalPerceptrons, true);
  console.log("________________________", combinedModel);
  const result =
    combinedModel.weights.reduce((accu, weight, index) => {
      return accu + weight * perceptronTrainingPoints[index];
    }, 0) + combinedModel.bias;
  console.log("________________________", result);
  console.log("________________________", result2);
  return Sigmoid(result);
}

module.exports = {
  validateResult,
  mergePerceptrons
};
