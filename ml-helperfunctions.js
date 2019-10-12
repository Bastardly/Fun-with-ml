// Simplified version of discrete shows what's happening with only two dimensions;
// function simpleDiscrete(x1, x2, W1, W2, b) {
//   // W and x can be run till n'th degree
//   return W1 * x1 + W2 * x2 + b;
// }

// As seen in the simplified example above, we get the sum of each weight and axesValue (for all dimensions)
function discrete(coordSet, bias, weights) {
  const productSum = coordSet.reduce(
    (sum, axesValue, index) => sum + axesValue * weights[index],
    0
  );
  return productSum + bias; // f(x) = Wx + b
}

function Sigmoid(x) {
  // Sigmoid function - Returns a number between 0 og 1, where 0.5 is 50% probability;
  return 1 / (1 + Math.pow(Math.E, -x));
}

module.exports = {
  // simpleDiscrete,
  discrete,
  Sigmoid
};
