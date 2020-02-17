function Sigmoid(x) {
  // Sigmoid function - Returns a number between 0 og 1, where 0.5 is 50% probability;
  return 1 / (1 + Math.exp(-x));
}

function getErrorRate(desiredValue, chanceOfBeingAccepted) {
  return Math.pow(desiredValue - chanceOfBeingAccepted, 2) / 2;
}

function discrete(inputs, perceptron) {
  return inputs.reduce(
    (sum, axesValue, index) => sum + axesValue * perceptron.weights[index],
    perceptron.bias
  );
}

function modifyPerceptron(inputs, perceptron, learningRate, desiredOutput) {
  const sum = discrete(inputs, perceptron);
  // const perceptronOutput = sum >= 0 ? 1 : 0; // use this if sigmoid fails
  const error = desiredOutput - Sigmoid(sum);
  return {
    ...perceptron,
    weights: perceptron.weights.map(
      weight => weight + error * weight * learningRate
    )

    // bias?
  };
}

/* 
  Gates!
  - The purpose of these are not only functionality, but also to indicate where in the network we are. Hence the really simple gates.
*/

// Forward gates
function forwardMultiplyGate(a, b) {
  return a * b;
}

function forwardAddGate(a, b) {
  return a + b;
}

// Circuit

function forwardCircuit(a, b, c) {
  const sum = forwardAddGate(a, b);
  return forwardMultiplyGate(sum, c);
}

module.exports = {
  modifyPerceptron,
  getErrorRate,
  discrete,
  Sigmoid
};
