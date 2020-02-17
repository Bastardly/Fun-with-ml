function modifyBiasAndWeights(perceptrons, i, direction, inputs) {
  inputs.forEach((axesValue, index) => {
    perceptrons[i].weights[index] =
      perceptrons[i].weights[index] + direction * axesValue;
  });
  perceptrons[i].bias = perceptrons[i].bias + direction;
}

function modifyModelWeight(perceptrons, index, direction) {
  perceptrons[index].modelWeight = perceptrons[index].modelWeight + direction;
}

function mergePerceptrons(perceptrons, log) {
  return perceptrons.reduce(
    (accu, model) => {
      // const modelWeight = Sigmoid(model.modelWeight);
      const modelWeight = model.modelWeight;
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

module.exports = {
  mergePerceptrons,
  modifyModelWeight,
  modifyBiasAndWeights
};
