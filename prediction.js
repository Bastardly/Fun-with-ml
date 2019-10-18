const { discrete, Sigmoid } = require("./ml-helperfunctions");

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

function mergePerceptrons(perceptrons) {
  return perceptrons.reduce(
    (accu, model) => {
      accu.weights = model.weights.map(
        (weight, index) => (weight || 0) + (accu.weights[index] || 0)
      );
      accu.bias = accu.bias + model.bias;
      return accu;
    },
    {
      weights: [],
      bias: 0
    }
  );
}

function prediction(
  perceptrons,
  coordSet,
  isAccepted,
  learningRate,
  dropoutChance
) {
  perceptrons.forEach(({ bias, weights }, index) => {
    // We randomly turn off our epocs, to make sure that no epoc tries to dominate the others
    if (Math.random() > dropoutChance) {
      const chanceOfBeingAccepted = Sigmoid(discrete(coordSet, bias, weights));
      const desiredValue = isAccepted ? 1 : 0;
      const direction = (desiredValue - chanceOfBeingAccepted) * learningRate;
      const weightDirection =
        (Math.pow(desiredValue - chanceOfBeingAccepted, 2) / 2) * learningRate;

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

  return Sigmoid(combinedX);
}

module.exports = {
  prediction
};
