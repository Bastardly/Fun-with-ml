function logSuccessfulPredictions(successfulPredictions) {
  console.log("successfulPredictions", successfulPredictions);
  console.log(
    "Procentage: ",
    Math.round((successfulPredictions / numberOfPoints) * 1000) / 10,
    "%"
  );
}

module.exports = {
  logSuccessfulPredictions
};
