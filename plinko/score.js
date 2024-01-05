const outputs = [];
const predicationPoint = 300;
const k = 4;

function onScoreUpdate(dropPosition, bounciness, size, bucketLabel) {
  // Ran every time a balls drops into a bucket
  outputs.push([dropPosition, bounciness, size, bucketLabel]);
}

function runAnalysis() {
  // Write code here to analyze stuff
  const bucket = _.chain(outputs)
    .map((row) => [distance(row[0]), row[3]])
    .sortBy((row) => row[0])
    .slice(0, k)
    .countBy((row) => row[1])
    .toPairs()
    .sortBy((row) => row[1])
    .last()
    .first()
    .parseInt()
    .value();

  console.log(
    `Wheh you drop the from ${predicationPoint} it most likly will fall into the bucket number ${bucket}.`
  );
}

function distance(point) {
  return Math.abs(point - predicationPoint);
}
