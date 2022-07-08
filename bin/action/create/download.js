const { join } = require("path");
const fs = require("fs");
const fse = require("fs-extra");
const { clone } = require("isomorphic-git");
const http = require("isomorphic-git/http/node");
const ora = require("ora");
const { cwd } = require("process");

exports.download = async function (repo, name) {
  const process = ora({ spinner: "dots" });
  process.info("准备中...");
  process.start("模板下载中...");
  try {
    const dir = join(cwd(), name);
    await clone({ fs, http, dir, url: repo });
    process.succeed("下载成功");
    console.log("git success");
    return "success";
  } catch (err) {
    const copyResult = await useLocalTem(name);
    if (copyResult === "success") {
      process.succeed("下载成功");
      console.log("local success");
      return copyResult;
    }
    process.fail("下载失败");
    console.log(err);
    return copyResult;
  }
};

// 使用本地模板
const useLocalTem = async (name) => {
  try {
    await fse.copy("bin/template", join(cwd(), name));
    return "success";
  } catch(err) {
    console.log(err);
    return "fail";
  }
};
