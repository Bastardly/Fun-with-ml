function simpleDiscrete(x1, x2, W1, W2, b) {
  // x og W kan køres helt op til n'th grad
  return W1 * x1 + W2 * x2 + b;
}

function discrete(sets, b) {
  const sum = sets.reduce((s, set) => s + set.W * set.x, 0);
  return sum + b;
}

function Sigmoid(x) {
  // Sigmoid function - Returns a number between 0 og 1, where 0.5 is 50% probability;
  return 1 / (1 + Math.pow(Math.E, -x));
}

module.exports = {
  simpleDiscrete,
  discrete,
  Sigmoid
};
