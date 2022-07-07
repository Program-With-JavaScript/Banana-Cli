const { prompt } = require("inquirer");
const chalk = require("chalk");
const clear = require("clear");
const question = require("./question");
const { download, installDev } = require("./download");

module.exports = async () => {
  clear();
  console.log(chalk.redBright("创建 vite + vue3 + ts 项目"));
  let name = process.argv.slice(2)[1];
  if (!name) {
    // 人机交互
    name = (await prompt(question)).name;
    if (!name) {
      return;
    }
  }

  const downloadResult = await download("https://github.com/liiiiiiiiiiiir/basic-vite-vue-ts-template.git", name);
  if (downloadResult === "success") {
    installDev(name);
  } else {
    console.log(chalk.red("下载出错了"));
  }
};
