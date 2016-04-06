const perturb = x => x + (Math.random() - 0.5)
const rosenbrock = (x, y) => Math.pow(1 - x, 2) + (100 * Math.pow(y - Math.pow(x, 2), 2));

export default function metropolisHastings(iterations) {
  var i = 0;
  var current = [-1.8, -1.6];
  var chain = [current];
  var oldlik = rosenbrock(...current);

  for (i; i < iterations; i++) {
    var candidate = current.map(perturb);
    var newlik = rosenbrock(...candidate);
    var acceptProbability = oldlik / newlik;
    oldlik = newlik;
    if ((Math.random()) < Math.min(1,acceptProbability)) {
      current = candidate;
    }
    chain.push(current);
  }
  return chain;
};
