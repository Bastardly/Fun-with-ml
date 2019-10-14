const { discrete, Sigmoid } = require("./ml-helperfunctions");

function modifyBiasAndWeights(models, i, direction, coordSet) {
  coordSet.forEach((axesValue, index) => {
    models[i].weights[index] = models[i].weights[index] + direction * axesValue;
  });
  models[i].bias = models[i].bias + direction;
}

function modifyModelWeight(models, index, direction) {
  models[index].modelWeight = models[index].modelWeight + direction;
}

function mergeModels(models) {
  return models.reduce(
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

function prediction(models, coordSet, isAccepted, learningRate) {
  models.forEach(({ bias, weights }, index) => {
    const chanceOfBeingAccepted = Sigmoid(discrete(coordSet, bias, weights));
    const desiredValue = isAccepted ? 1 : 0;
    const direction = (desiredValue - chanceOfBeingAccepted) * learningRate;

    modifyBiasAndWeights(models, index, direction, coordSet);
    modifyModelWeight(models, index, direction);
  });

  const combinedModel = mergeModels(models);
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
