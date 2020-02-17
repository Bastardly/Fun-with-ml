// Greatly inspired by the example from: https://karpathy.github.io/neuralnets/

function Unit(value, gradient = 0) {
  // value computed in the forward pass
  this.value = value;
  // the derivative of circuit output w.r.t this unit, computed in backward pass
  this.gradient = gradient;
}

function forward(u0, u1) {
  this.u0 = u0;
  this.u1 = u1; // store pointers to input units
  this.utop = new Unit(u0.value + u1.value, 0.0);
  return this.utop;
}

// --- Gate Functions ---
function addGate() {}
function multiplyGate() {}
function sigmoidGate() {
  this.sig = function(x) {
    return 1 / (1 + Math.exp(-x));
  };
}

// Let's add prototype methods, so each gate can handle state internally.
addGate.prototype = {
  forward,
  backward: function() {
    // add gate. derivative wrt both inputs is 1
    this.u0.gradient += 1 * this.utop.gradient;
    this.u1.gradient += 1 * this.utop.gradient;
  }
};

multiplyGate.prototype = {
  forward,
  backward: function() {
    // We take apply the chain rule, and "swap" gradients. gradient0 = gradient0 + value1 * forwardedGrad
    this.u0.gradient += this.u1.gradient * this.utop.gradient;
    this.u1.gradient += this.u0.gradient * this.utop.gradient;
  }
};

sigmoidGate.prototype = {
  forward: function(u0) {
    this.u0 = u0;
    this.utop = new Unit(this.sig(this.u0.value), 0.0);
    return this.utop;
  },
  backward: function() {
    var s = this.sig(this.u0.value);
    this.u0.gradient += s * (1 - s) * this.utop.gradient;
  }
};

function createGates(numberOfUnits) {
  const countArray = Array(numberOfUnits);
  return {
    multiply: countArray.slice().map(() => new multiplyGate()),
    add: countArray.slice().map(() => new addGate()),
    sigmoid: new sigmoidGate()
  };
}

// So far this is really simplified to f(x, y, a, b, c)
function cycle(gates, weights, perceptrons, biasUnit) {
  const step_size = 0.01; // So far this is fixed, but should incrementally get closer to zero

  // p.t. er der intet som opdateret weights eller perceptrons

  const sets = gates.multiply.map((gate, index) => {
    gate.forward(weights[index], perceptrons[index]); // weight * coordPoint
  });
  sets.push(biasUnit);

  /*
   forwardedAdditionList start out with first value in sets, and then add the second value - Remember we added bias to sets.
   Therefore, sets should always be one larger than forwardedAdditionList

   
  */
  const forwardedAdditionList = gates.add.reduce(
    (list, gate, index) => {
      list[index] = gate.forward(list[index], sets[index + 1]);
      return list;
    },
    [sets[index]]
  );

  // Please note - this is not completely generic ...yet - Right not it simply assume only two dimensions
  const s = gates.sigmoid.forward(forwardedAdditionList[1]); // sig(a*x + b*y + c) = 0.8808

  // Let's do some backpropagation

  s.gradient = 1.0; // When more adding more dimensions than two, this should be the last in the array. Currently it's not in an array
  gates.sigmoid.backward(); // writes gradient into last item in forwardedAdditionList
  // "Some say it's a blessing, some say it's a curse. I always drive in reverse" - Pat McCurdy
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

  // After everything has come back updated, and values are validated: Let's do an extra cycle with updated values.
  cycle(gates, weights, perceptrons, biasUnit);
}

// units = x, y, a, b, c
function startCycle(weights, perceptrons, bias) {
  const numberOfUnits = perceptrons.length;
  const weightUnits = weights.map(unit => new Unit(unit, 0));
  const perceptronUnits = perceptrons.map(unit => new Unit(unit, 0));
  const gates = createGates(numberOfUnits);
  const biasUnit = new Unit(bias);
  cycle(gates, weightUnits, perceptronUnits, biasUnit);
}
