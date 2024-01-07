const outputs = [];
const k = 10;
const features = ['drop Position', 'bounciness', 'ball size'];

function onScoreUpdate(dropPosition, bounciness, size, bucketLabel) {
  // Ran every time a balls drops into a bucket
  outputs.push([dropPosition, bounciness, size, bucketLabel]);
}

function runAnalysis() {
  const testSetSize = 200;

  _.range(0, 3).forEach((feature) => {
    // range(0, 3) ==> [0, 1, 2]

    const data = _.map(outputs, (row) => [row[feature], _.last(row)]);

    const [testSet, trainingSet] = splitDataset(minMax(data, 1), testSetSize);

    const accuracy = _.chain(testSet)
      .filter(
        (testPint) =>
          knn(trainingSet, _.initial(testPint), k) === _.last(testPint)
      )
      .size()
      .divide(testSetSize)
      .value();

    console.log(`For ${features[feature]}, the accuracy is: ${accuracy}`);
  });
}

function knn(data, point, k) {
  // point has 3 values!!!
  return _.chain(data)
    .map((row) => {
      return [distance(_.initial(row), point), _.last(row)];
    })
    .sortBy((row) => row[0])
    .slice(0, k)
    .countBy((row) => row[1])
    .toPairs()
    .sortBy((row) => row[1])
    .last()
    .first()
    .parseInt()
    .value();
}

function distance(pointA, pointB) {
  return (
    _.chain(pointA)
      .zip(pointB)
      .map(([a, b]) => (a - b) ** 2)
      .sum()
      .value() ** 0.5
  );
}

function splitDataset(data, testCount) {
  const shuffled = _.shuffle(data);
  const testSet = _.slice(shuffled, 0, testCount);
  const trainingSet = _.slice(shuffled, testCount);

  return [testSet, trainingSet];
}

function minMax(data, fetureCount) {
  const clonedData = _.cloneDeep(data);

  for (let i = 0; i < fetureCount; i++) {
    const column = clonedData.map((row) => row[i]);

    const min = _.min(column);
    const max = _.max(column);

    for (let j = 0; j < clonedData.length; j++) {
      clonedData[j][i] = (clonedData[j][i] - min) / (max - min);
    }
  }

  return clonedData;
}
