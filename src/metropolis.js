function normalRandom(mean, variance, acceptFunc) {
  if (mean == undefined)
    mean = 0.0;
  if (variance == undefined)
    variance = 1.0;
  var V1, V2, S;
  do {
    var U1 = Math.random();
    var U2 = Math.random();
    V1 = 2 * U1 - 1;
    V2 = 2 * U2 - 1;
    S = V1 * V1 + V2 * V2;
  } while (S > 1);
 
  var X = Math.sqrt(-2 * Math.log(S) / S) * V1;
  X = mean + Math.sqrt(variance) * X;
  return X;
}

const rosenbrock = (x, y) => Math.pow(1 - x, 2) + (100 * Math.pow(y - Math.pow(x, 2), 2));

export default function metropolisHastings(iterations, variance, acceptFunc) {
  var i = 0;
  var current = [0, 7];
  var chain = [current];
  var oldlik = rosenbrock(...current);
  const perturb = x => x + (normalRandom(0,variance));

  var accepted = 0;
  for (i; i < iterations; i++) {
    var candidate = current.map(perturb);
    var newlik = rosenbrock(...candidate);
    var acceptProbability = oldlik/newlik;

    if (Math.random() < acceptProbability) {
      oldlik = newlik;
      current = candidate;
      accepted += 1;
    }
    chain.push(current);
  }
  if (acceptFunc) acceptFunc(accepted/iterations*100);
  return chain;
};
