import multiply from '../../lib/multiply/multiply';

function mulBy2(num) {
  return multiply(2, num);
}
console.log(mulBy2(5));

export { mulBy2 };
