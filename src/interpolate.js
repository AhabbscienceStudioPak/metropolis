export default function interpolate(n, min, max) {
  const step = (max - min) / n;
  let i = 0, curr = min, vals=[];

  for (i; i <= n; i++) {
    vals.push(curr);
    curr += step;
  }

  return vals;
}
