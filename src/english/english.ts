function isVowel(char: string) {
  return ['a', 'e', 'i', 'o', 'u'].indexOf(char) > -1;
}
console.log(isVowel('a'));

export { isVowel };
