const { discrete, Sigmoid } = require("./ml-helperfunctions");

function backwardCycdle(weights, perceptrons) {
  gates.add.reverse().forEach(gate => gate.backward());
  gates.multiply.reverse().forEach(gate => gate.backward());

  // now, let´s update those values and get ready for another run;
  weights.forEach((weight, index) => {
    weights[index].value += step_size * weight.gradient;
  });
  perceptrons.forEach((perceptron, index) => {
    perceptrons[index].value += step_size * perceptron.gradient;
  });
  biasUnit.value += step_size * biasUnit.gradient;
}

function createUnit(value, gradient) {
  return {
    value,
    gradient
  };
}

const forwardCycle = (unitPyramid, index) => {
  const currentLevel = unitPyramid[index];

  if (currentLevel.length === 1) {
    // We are done with forward cycle!
    return {
      sum: currentLevel[0].value, // The sum of the entire pyramid
      unitPyramid: unitPyramid.reverse() // When we run the backwards cycle, we need to do it in reverse;
    };
  }

  /*
  Now, we need to create new units for each pair we add together, and keep track of them.
  So the more dimensions we add together, the higher the pyramid.
  In the forwardCycle, we only update unit.value. The unit.gradient will happen in the backwards cycle
  */

  const nextLevel = unitPyramid[index + 1];
  unitPyramid[index + 1] = nextLevel || []; // We need to make sure it's not undefined, before we can add more.

  const findGradient = targetLevelIndex => {
    const unit = nextLevel && nextLevel[targetLevelIndex];
    return unit.gradient || 0;
  };

  const addToNextLevel = (targetLevelIndex, unit) => {
    unitPyramid[index + 1][targetLevelIndex] = unit;
  };

  currentLevel.forEach((current, levelIndex) => {
    if (levelIndex === 0) {
      addToNextLevel(0, {
        value: current[0].value + current[1].value, // Here we also take care of levelIndex 1
        gradient: findGradient(0) // Either one already exist on next level, or we simply return 0
      });
    } else if (levelIndex !== 1) {
      const targetLevelIndex = levelIndex - 1; // We skipped levelIndex 1, so we'll need to remedy that
      addToNextLevel(targetLevelIndex, {
        value: current[levelIndex].value + nextLevel[levelIndex - 2].value, // levelIndex 2, needs levelIndex 0 on next level, since we skipped levelIndex 1 and we are one ahead
        gradient: findGradient(targetLevelIndex)
      });
    }
  });
  forwardCycle(unitPyramid, index++);
};

function trainModel(inputCollection, perceptrons, numberOfInputs) {
  const cycle = units => {
    const unitPyramid = [units]; // First level in the array, are the base units. We will add addition units on the following leves
    return backwardCycle(forwardCycle(unitPyramid, 0));
  };
  // Udvælg x antal points fra inputCollection, som vi vil køre cycle på.
  // Lav units, og kør cycle
  // cycle returnere units med opdaterede gradients.
  // Når vi har kørt alle points igennem, opdaterer vi perceptrons
  // Så tester vi fejlmargin
  // Er den ok, returnerer vi modellen
  // Ellers kører vi trainmodel igen, med de opdaterede værdier, og med nye tilfældige points

  const collectionIndex = 0;
  const units = []; // FIX IT!
  gradients = cycle(inputCollection, perceptrons, collectionIndex);
  // Update perceptrons
  gradients = baseGradients; // After the cycles are done, we reset out gradients;
  let pull = 0;

  // validate
  // if no good, run train model igen
}

module.exports = {
  trainModel,
  createUnit
};
