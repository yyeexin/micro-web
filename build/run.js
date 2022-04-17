const childProcess = require("child_process");
const path = require("path");

const filePath = {
  vue2: path.join(__dirname, "../vue2"),
  vue3: path.join(__dirname, "../vue3"),
  "react-app": path.join(__dirname, "../react-app"),
  "umi-app": path.join(__dirname, "../umi-app"),
};

function runChild() {
  Object.values(filePath).forEach((item) => {
    childProcess.spawn(`cd ${item} && npm start`, {
      stdio: "inherit",
      shell: true,
    });
  });
}

runChild();
