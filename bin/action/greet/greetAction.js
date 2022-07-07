const { promisify } = require("util");
const figlet = promisify(require("figlet"));
const clear = require("clear");
const getRandomWord = require("./greetWords");

module.exports = async () => {
  clear();

  figlet.text(getRandomWord(), { font: "Bulbhead", whitespaceBreak: true }, (err, data) => {
    if (err) {
      console.log("(っ °Д °;)っ好像出问题了...");
      console.dir(err);
      return;
    }
    console.log(data);
  });
};
