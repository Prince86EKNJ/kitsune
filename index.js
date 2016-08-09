#!/usr/bin/env node
let Logger = require("js-logger");
global.Logger = Logger;
Logger.useDefaults();

let core = require("kitsune/core.js");
let saveData = require("kitsune/save-data.js");

let opt = require("node-getopt").create([
    ['h', 'help', 'display this help']
])
        .bindHelp()
        .parseSystem();

// LOGGING //
let debugLogger = Logger.get("debug");
debugLogger.setLevel(Logger.OFF);
/////////////

let { systems } = core();

let op = opt.argv[0];
if(op == "mkid") {
    let hashRandom = systems("bf565ae1309f425b0ab00efa2ba541ae03ad22cf");

    let hash = hashRandom();
    console.log(hash);
}
if(op == "csf") {
    let name = opt.argv[1];

    let createSystemFile = systems("76c55430fccd4f9e0b19c1c2b98d8a3babea81b2");
    createSystemFile(name);
}
if(op == "ccn") {
    let name = opt.argv[1];

    let debugLogger = Logger.get("debug");
    debugLogger.setLevel(Logger.DEBUG);
    let createCoreNode = systems("a21b86930a00f7b31b5984aabb21cb5eea7efc56");
    createCoreNode(name);
    debugLogger.setLevel(Logger.OFF);
}
if(op == "rmg") {
    let group = opt.argv[1];
    let node = opt.argv[2];

    let graphFind = systems("a1e815356dceab7fded042f3032925489407c93e");
    let graphRemove = systems("c2d807f302ca499c3584a8ccf04fb7a76cf589ad");

    let edges = graphFind({ head: group, tail: node });
    console.log(edges);
    edges.forEach(edge => graphRemove(edge.id));
}
if(op == "") {
// let name = systems("2885e34819b8a2f043b139bd92b96e484efd6217");
// let nameRemove = systems("708f17af0e4f537757cf8817cbca4ed016b7bb8b");
// nameRemove({ node: "b7916f86301a6bc2af32f402f6515809bac75b03", name: "graph-listNodes" });
// name({ node: "b7916f86301a6bc2af32f402f6515809bac75b03", name: "graph-list-nodes" });
}
if(op == "cleanss") {
    let cleanStringSystem = systems("f3db04b0138e827a9b513ab195cc373433407f83");
    cleanStringSystem();
}

saveData(systems);
