const { discrete, Sigmoid, getErrorRate } = require("./ml-helperfunctions");
const { mergePerceptrons } = require("./validateResult");

function modifyBiasAndWeights(perceptrons, i, direction, coordSet) {
  coordSet.forEach((axesValue, index) => {
    perceptrons[i].weights[index] =
      perceptrons[i].weights[index] + direction * axesValue;
  });
  perceptrons[i].bias = perceptrons[i].bias + direction;
}

function modifyModelWeight(perceptrons, index, direction) {
  perceptrons[index].modelWeight = perceptrons[index].modelWeight + direction;
}

function prediction(
  perceptrons,
  coordSet,
  isAccepted,
  learningRate,
  dropoutChance
) {
  const desiredValue = isAccepted ? 1 : 0;
  perceptrons.forEach(({ bias, weights }, index) => {
    // We randomly turn off our epocs, to make sure that no epoc tries to dominate the others
    if (Math.random() > dropoutChance) {
      const pointsChanceOfBeingAccepted = Sigmoid(
        discrete(coordSet, bias, weights)
      );
      const direction =
        (desiredValue - pointsChanceOfBeingAccepted) * learningRate;
      const weightDirection =
        getErrorRate(desiredValue, pointsChanceOfBeingAccepted) * learningRate;

      modifyBiasAndWeights(perceptrons, index, direction, coordSet);
      modifyModelWeight(perceptrons, index, weightDirection);
    }
  });

  const combinedModel = mergePerceptrons(perceptrons);
  const combinedX = discrete(
    coordSet,
    combinedModel.bias,
    combinedModel.weights
  );
  const pointsChanceOfBeingAccepted = Sigmoid(combinedX);

  return getErrorRate(desiredValue, pointsChanceOfBeingAccepted);
}

module.exports = {
  prediction
};
