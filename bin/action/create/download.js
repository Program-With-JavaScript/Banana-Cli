const { join } = require("path");
const fs = require("fs");
const { clone } = require("isomorphic-git");
const http = require("isomorphic-git/http/node");
const ora = require("ora");
const chalk = require("chalk");
const { spawn } = require("child_process");
const open = require("open");
const { cwd } = require("process");

exports.download = async function (repo, name) {
  const process = ora({ spinner: "dots" });
  process.info("准备中...");
  process.start("模板下载中...");
  try {
    const dir = join(cwd(), name);
    await clone({ fs, http, dir, url: repo });
    process.succeed("下载成功");
    return "success";
  } catch (err) {
    process.fail("下载失败");
    console.log(err);
    return "fail";
  }
};

exports.installDev = async (name) => {
  // 自动安装依赖- 使用子进程的方式去执行
  console.log(chalk.greenBright("=====安装依赖====="));
  await startSpawn("yarn", ["install"], { cwd: `./${name}`});
  openAndStart();
};

// 开启子进程
const startSpawn = async (...args) => {
  return new Promise(resolve => {
    const proc = spawn(...args);
    proc.stdout.pipe(process.stdout);
    proc.stderr.pipe(process.stderr);
    proc.on("close", () => {
      resolve();
    });
  });
};

// 开启服务
const openAndStart = async (name) => {
  // 自动打开浏览器
  open("http://localhost:8080");

  // 启动
  await startSpawn("yarn", ["dev"], { cwd: `./${name}`} );
};
