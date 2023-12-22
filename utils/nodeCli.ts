type CliArgsObject = {
  [key: string]: string | true;
};

/**
 * This method return CLI arguments passed to the node script
 *
 * @returns CliArgsObject This object has the arguments' name as key and their value
 * as value if available else true showing that the parameter/flag was passed
 */
function getArgs(): CliArgsObject {
  const args: CliArgsObject = {};
  process.argv.slice(2, process.argv.length).forEach((arg) => {
    // long arg
    if (arg.slice(0, 2) === '--') {
      const longArg = arg.split('=');
      const longArgFlag = longArg[0].slice(2, longArg[0].length);
      args[longArgFlag] = longArg.length > 1 ? longArg[1] : true;
    }
    // flags
    else if (arg[0] === '-') {
      const flags = arg.slice(1, arg.length).split('');
      flags.forEach((flag) => {
        args[flag] = true;
      });
    }
  });
  return args;
}

export { getArgs };
