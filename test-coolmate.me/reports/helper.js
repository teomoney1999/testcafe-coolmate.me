import { read, readFileSync, readSync } from "fs";

export const percentagesCalc = (num) => {
  return `${(num * 100).toFixed(2)}%`;
};

export const getArgv = (argv, key1 = "--feature", key2 = "--report") => {
  let feature, reportDir;
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === key1) {
      feature = argv[i + 1];
    }
    if (argv[i] === key2) {
      reportDir = argv[i + 1];
    }
  }
  return {
    feature,
    reportDir,
  };
};

export const readJson = (filename) => {
  if (!filename) {
    // console.log("File of name is undefined!");
    return;
  }
  const rawData = readFileSync(filename);
  const jsonData = JSON.parse(rawData);
  return jsonData;
};
