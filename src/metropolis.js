var perturb = x => x + (Math.random() - 0.5)
var rosenbrock = (x, y) => Math.pow(1 - x, 2) + (100 * Math.pow(y - Math.pow(x, 2), 2));
import { curry } from "ramda";

export default function metropolisHastings() {
  var iterations = 3000;
  var i = 0;
  var current = [-1.8, -1.6];
  var chain = [current];
  var oldlik = rosenbrock(...current);

  for (i; i < iterations; i++) {
    var candidate = current.map(perturb);
    var newlik = rosenbrock(...candidate);
    var acceptProbability = Math.min(1, oldlik / newlik);
    oldlik = newlik;
    if (Math.random() < acceptProbability) {
      current = candidate;
    }
    chain.push(current);
  }
  return chain.filter((_, i) => i % 2 === 0);
};
