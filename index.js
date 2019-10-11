function simpleDiscrete(x1, x2, W1, W2, b) {
  // x og W kan køres helt op til n'th grad
  return W1 * x1 + W2 * x2 + b;
}

(function() {
  const set = [];
  const setSize = 500;
  const learningRate = 0.1;
  const maxCount = 1000;

  function getRandomNumber() {
    return Math.round(Math.random() * 20) - 10;
  }

  function generateSet(count) {
    let x = 0;
    for (x = 0; x < count; x++) {
      const x1 = getRandomNumber();
      set.push({
        x1,
        x2: getRandomNumber(),
        isAccepted: x1 > 0 // So this is really basic stuff our "neural network" should find out;
      });
    }
  }

  generateSet(setSize);

  let W1 = getRandomNumber(); // random starting Weight for x1
  let W2 = getRandomNumber(); // random starting Weight for x2
  let b = getRandomNumber() / 4; // random Bias for set

  function prediction(x1, x2, isAccepted) {
    const isNegative = simpleDiscrete(x1, x2, W1, W2, b) < 0;

    // If you are accepted and in the wrong area, modify line
    if (isNegative && isAccepted) {
      // ask line to come closer
      W1 = W1 + learningRate * x1;
      W2 = W2 + learningRate * x2;
      b = b + learningRate;
    } else if (!isNegative && !isAccepted) {
      // ask line to come closer
      W1 = W1 - learningRate * x1;
      W1 = W2 - learningRate * x2;
      b = b - learningRate;
    } else {
      return true;
    }
  }

  function logSuccessFulPredictions() {
    const successfulPredictions = set.filter(
      ({ successfulPrediction }) => successfulPrediction
    ).length;
    console.log("successfulPredictions", successfulPredictions);
  }

  function trainModel() {
    let count = 0;
    let continueLoop = true;
    while (continueLoop && count < maxCount) {
      continueLoop = set.some(
        ({ successfulPrediction }) => !successfulPrediction
      );
      console.log("continueLoop", continueLoop);
      if (continueLoop) {
        set.forEach(({ x1, x2, isAccepted }, index) => {
          set[index].successfulPrediction = prediction(x1, x2, isAccepted);
          count++;
          if (index && index % 100 === 0) {
            logSuccessFulPredictions();
          }
        });
      }
    }
    logSuccessFulPredictions();
    console.log("W1", W1);
    console.log("W2", W2);
    console.log("bias", b);
    console.log(`f(x) = ${W1 + W2}x` + b);
  }

  trainModel();
})();

//   if (successfulPredictions === 0) {
//     // reset - make new starting point
//     console.log("resetting");
//     W1 = getRandomNumber();
//     W2 = getRandomNumber();
//     b = getRandomNumber() / 4;
//   }
