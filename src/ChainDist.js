import { compose, path, forEach, prop, map, repeat, curry, find, last } from "ramda";
import interpolate from "./interpolate";

const findBucket = curry((propName, bucketList, num) => {
  var i = 0;
  for (i; i < bucketList.length - 1; i++) {
    const getVal = prop(propName),
          maxVal = getVal(last(bucketList));

    if (num > maxVal) break;

    const curr = bucketList[i],
          next = bucketList[i+1],
          currVal = getVal(curr),
          nextVal = getVal(next);

    if (num > currVal && num < nextVal) return curr;
  }
  return undefined;
});

const xBucketToYs = compose(
    map(prop("bucket")),
    prop("ys")
  );
const bucketsToPlotData = map(xBucketToYs);


export default function ChainDist(xDomain, yDomain, numPoints, chain) {
  const xPoints = interpolate(numPoints, ...xDomain),
        yPoints = interpolate(numPoints, ...yDomain);

  let buckets = map(x => ({
        x: x,
        ys: map(y => ({
          y: y, bucket: 0, xy: [x,y]
          }),
          yPoints)
      })
      ,xPoints
  );

  const findX = findBucket("x", buckets);
  const findYInBucket = findBucket("y");
  const twobuck = findX(3);

  forEach(xy => {
    const xBucket = findX(xy[0]);
    if (!xBucket) return;
    const xyBucket = findYInBucket(xBucket.ys, xy[1]);
    if (!xyBucket) return;
    xyBucket.bucket += 1;
  }, chain);

  return bucketsToPlotData(buckets);
}
