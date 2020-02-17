const { Sigmoid, discrete } = require("./ml-helperfunctions");

// function mergePerceptrons(perceptrons, log) {
//   return perceptrons.reduce(
//     (accu, model) => {
//       // const modelWeight = Sigmoid(model.modelWeight);
//       const modelWeight = model.modelWeight;
//       accu.weights = model.weights.map(
//         (weight, index) =>
//           (weight || 1) * modelWeight + (accu.weights[index] || 0)
//       );
//       accu.bias = accu.bias + model.bias * modelWeight;
//       log && console.log(model.bias);
//       return accu;
//     },
//     {
//       weights: [],
//       bias: 0
//     }
//   );
// }

// Let's see if you model actually works!
function validateResult(inputs, perceptrons, isFinal) {
  const combinedSum = perceptrons.reduce((sum, perceptron) => {
    sum += discrete(inputs, perceptron);
    return sum;
  }, 0);
  // console.log(combinedSum);

  isFinal &&
    console.log(
      "FINAL",
      Sigmoid(combinedSum) * 100,
      inputs,
      perceptrons,
      combinedSum
    );
  return combinedSum >= 0 ? 1 : 0;
}

module.exports = {
  validateResult
  // mergePerceptrons
};
