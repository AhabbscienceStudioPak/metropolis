var perturb = x => x + (Math.random() - 0.5)
var rosenbrock = (x, y) => Math.pow(1 - x, 2) + (100 * Math.pow(y - Math.pow(x, 2), 2));

export default function metropolisHastings() {
  var iterations = 10000;
  var i = 0;
  var chain = [];
  var current = [1, 3];
  var oldlik = rosenbrock(current[0],current[1]);

  for (i; i < iterations; i++) {
    var candidate = current.map(perturb);
    var newlik = rosenbrock(candidate[0],candidate[1]);
    var acceptProbability = Math.min(1, oldlik / newlik);
    oldlik = newlik;
    if (Math.random() < acceptProbability) {
      current = candidate;
    }
    chain.push(current);
  }
  return chain.filter((_, i) => i % 5 === 0);
};
