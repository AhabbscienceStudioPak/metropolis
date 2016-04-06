var perturb = x => x + (Math.random() - 0.5)
var rosenbrock = (x, y) => Math.pow(1 - x, 2) + (100 * Math.pow(y - Math.pow(x, 2), 2));
import { curry } from "ramda";

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
    if (Math.random() < acceptProbability) {
      current = candidate;
    }
    chain.push(current);
  }
  return chain;
};
