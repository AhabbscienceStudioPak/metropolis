import { drop, compose, path, forEach, prop, map, repeat, curry, find, last } from "ramda";
import interpolate from "./interpolate";


const findBucket = curry((propName, bucketList, num) => {
  const getVal = prop(propName),
        maxVal = getVal(last(bucketList)),
        minVal = getVal(bucketList[0]);

  if (num >= maxVal) return undefined;
  if (num <= minVal) return undefined;

  var length = bucketList.length;
  var curr = 0;
  var start = 0;
  var end = length;
  var middle = 0;

  while (true) {
    if (start > end) return undefined;
    middle = Math.round((start + end)/2);
    if (middle + 1 >= length) return undefined;
    const currVal = getVal(bucketList[middle]);
    const nextVal = getVal(bucketList[middle+1]);
    if (num >= currVal && num <= nextVal) {
      return bucketList[middle];
    }
    if (num < currVal)  end = middle - 1;
    if (num > currVal)  start = middle + 1;
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

  forEach(xy => {
    const xBucket = findX(xy[0]);
    if (!xBucket) return;
    const xyBucket = findYInBucket(xBucket.ys, xy[1]);
    if (!xyBucket) return;
    xyBucket.bucket += 1;
  }, drop(chain.length * 0.1, chain));

  return bucketsToPlotData(buckets);
}
