import { execSync as exec } from "child_process";
import fs from "fs";

import _ from "lodash";
import { expect } from "chai";

import systemLoader from "kitsune-core/31d21eb2620a8f353a250ad2edd4587958faf3b1";

// Logging
import Logger from "js-logger";
Logger.useDefaults();

let rootLogger = Logger.get("root");
let bootstrapLogger = Logger.get("bootstrap");

rootLogger.setLevel(Logger.INFO);
bootstrapLogger.setLevel(Logger.WARN);

// Settings
let runReportWrappers = 0;
let runReports = 1;

describe("sandbox", function() {
    it.only("should have sand in it", function() {

        let log = rootLogger;

        log.info("boostrap");
        let { modules, systems } = bootstrap();

        log.info("build name loader");
        let nameLoader = buildNameLoader(systems);

        log.info("load systems");
        let bind = nameLoader("bind");
        let autoParam = nameLoader("auto-param");
        let autoId = systems("e048e5d7d4a4fbc45d5cd0d035982dae2ee768d0");
        let returnFirst = nameLoader("return-first");

        // Report Functions //
        let graphFind = systems("a1e815356dceab7fded042f3032925489407c93e");

        // let isInGroup = nameLoader("is-in-collection");
        // let isEdge = bind({ func: isInGroup, params: { collFind: graphFind }});
        // let isString = bind({ func: isInGroup, params: { collFind: stringFind }});

        // Utility functions //
        let createSystemFile = systems("76c55430fccd4f9e0b19c1c2b98d8a3babea81b2");

        let graphAutoPut = systems("f7b073eb5ef5680e7ba308eaf289de185f0ec3f7");
        let name = systems("2885e34819b8a2f043b139bd92b96e484efd6217");
        let createCoreNode = bind({ func: _createCoreNode, params: { graphAutoPut, nameFn: name }});

        let stringFind = systems("8b1f2122a8c08b5c1314b3f42a9f462e35db05f7");
        let graphListNodes = systems("74b1eb95baaf14385cf3a0b1b76198a5cadfa258");
        let stringRemove = systems("6f00c44367d415878955630378683e1463f87aea");
        let cleanStringSystem = bind({ func: _cleanStringSystem, params: { stringFind, graphListNodes, stringRemove }});

        // OUTER SCOPE //
        let node;
        let nodeSearch;
        let graphFindOneId;
        let readEdgeId;
        /////////////////
        let graphRemove = systems("c2d807f302ca499c3584a8ccf04fb7a76cf589ad");
        let nameRemove = systems("708f17af0e4f537757cf8817cbca4ed016b7bb8b");

        // createSystemFile("something");
        // let edges = graphFind({ head: "7f82d45a6ffb5c345f84237a621de35dd8b7b0e3", tail: ["fdf7d0f2b33dcf6c71a9b91111f83f458161cee2", "4cb8a3c55e8489dfa51211a9295dddeef6f9cfda"] });
        // edges.forEach(edge => graphRemove(edge.id));
        // nameRemove({ node: "b7916f86301a6bc2af32f402f6515809bac75b03", name: "graph-listNodes" });
        // name({ node: "b7916f86301a6bc2af32f402f6515809bac75b03", name: "graph-list-nodes" });
        // cleanStringSystem();

        // BEFORE REPORT //
        let beforeReports = function() {

            console.log("== BEFORE REPORTS ==");

            let lokiRemove = systems("2ebd8d9fff28833dab44f086d4692fb888525fc8");
            let graphColl = systems("adf6b91bb7c0472237e4764c044733c4328b1e55");

            // Create function calls
            let writeAndNameFuncCall = systems("253cd1812a32a6a81f1365e1eca19cc1549f6002");
            graphFindOneId = writeAndNameFuncCall({ func: returnFirst,
                param: graphFind,
                name: "graph-find-one" });
            let fRef = nameLoader("function-reference");
            readEdgeId = writeAndNameFuncCall({ func: autoParam,
                param: { func: fRef(graphFindOneId), paramName: "id" },
                name: "read-edge" });

            let graphRemoveBind = writeAndNameFuncCall({ func: bind,
                param: { func: lokiRemove, params: { db: graphColl }},
                name: "graph-remove-bind" });
            let graphRemove = writeAndNameFuncCall({ func: autoParam,
                param: { func: fRef(graphRemoveBind), paramName: "id" },
                name: "graph-remove" });

            nodeSearch = {
                head: "66564ec14ed18fb88965140fc644d7b813121c78",
                tail: "2f7ff34b09a1fb23b9a5d4fbdd8bb44abbe2007a"
            };
            node = graphFind(nodeSearch)[0];
            // let myGraphRemove = systems(graphRemove);
            // myGraphRemove(node.id);
        };
        /////////////////////

        // AFTER REPORT //
        let afterReports = function() {
            console.log("== AFTER REPORTS ==");
            console.log(node.id);

            let edge = graphFind(nodeSearch)[0];
            console.log(edge);

            let graphFindOne = systems(graphFindOneId);
            console.log(graphFindOne(nodeSearch));

            let readEdge = systems(readEdgeId);
            console.log(readEdge(node.id));
        };
        ///////////////////////////

        // REPORTS //
        if(runReportWrappers)
            beforeReports();

        let coreNodes = fs.readdirSync("node_modules/kitsune-core");
        let groupList = systems("a8a338d08b0ef7e532cbc343ba1e4314608024b2");
        let nameList = systems("890b0b96d7d239e2f246ec03b00cb4e8e06ca2c3");
        if(runReports) {
            // nodeDescReport({ bind, isInGroup, graphFind, andIs, isEdge, isString, graphListNodes, describeNode });
            coreNodeReport({ groupList, nameList });
            functionCallReport({ groupList, nameList });
            systemFileReport({ coreNodes, groupList, nameList });
            graphReport({ graphFind, graphListNodes });
            // stringReport({ stringFind });
        }

        if(runReportWrappers)
            afterReports();

        // END REPORTS //

        // Recreate links
        recreateLinks({ coreNodes, nameList });

        // Sort and save Data
        let sortedGraphData = _.sortBy(graphFind(), ["head", "tail"]);
        let sortedStringData = _.sortBy(stringFind(), ["string"]);

        exec("mkdir -p out/data");
        writeData(sortedGraphData, "out/data/graph.js");
        writeData(sortedStringData, "out/data/string.js");
    });
});

function buildNameLoader(systems) {

    let bind = systems("878c8ef64d31a194159765945fc460cb6b3f486f");
    let autoParam = systems("b69aeff3eb1a14156b1a9c52652544bcf89761e2");

    let stringAutoPut = systems("4e63843a9bee61351b80fac49f4182bd582907b4");
    let graphFactor = systems("c83cd0ab78a1d57609f9224f851bde6d230711d0");
    let nameListIds = systems("2bf3bbec64d4b33302b9ab228eb90bc3f04b22a8");

    let nameLoader = function({ nameListIds, core, name }) {
        let ids = nameListIds(name);

        let system;
        for(let key in ids) {
            let id = ids[key];
            system = core(id);
            if(system)
                break;
        }

        return system;
    };
    nameLoader = bind({ func: nameLoader, params: { nameListIds, core: systems }});
    nameLoader = autoParam({ func: nameLoader, paramName: "name" });

    return nameLoader;
}

function recreateLinks({ coreNodes, nameList }) {
    exec("rm -rf src/kitsune-core-src");
    exec("mkdir -p src/kitsune-core-src");
    coreNodes.forEach(node => {
        let myNames = nameList(node);
        if(myNames && myNames.length > 0) {
            try {
                let cmdStr = "ln -s ../../src/kitsune-core/"+node+" src/kitsune-core-src/"+myNames[0];
                exec(cmdStr);
            } catch(e) {
                console.log("Already a link for "+myNames[0]);
            }
        }
    });
}

// Report functions
function printReport(report) {
    report.forEach(({ node, names }) => {
        console.log(`${node} ${JSON.stringify(names)}`);
    });
}

function coreNodeReport({ groupList, nameList }) {
    console.log("=== Core Node Report ===");
    let report = groupReport({ groupList, nameList, groupId: "7f82d45a6ffb5c345f84237a621de35dd8b7b0e3" });
    printReport(report);
}

function functionCallReport({ groupList, nameList }) {
    console.log("=== Function Call Report ===");
    let report = groupReport({ groupList, nameList, groupId: "d2cd5a6f99428baaa05394cf1fe3afa17fb59aff" });
    printReport(report);
}

function groupReport({ groupList, nameList, groupId }) {
    let coreNodes = groupList(groupId);
    let nodesAndNames = [];
    coreNodes.forEach(node => {
        let names = nameList(node);
        nodesAndNames.push({
            node,
            names
        });
    });

    // Sort by first name
    nodesAndNames = _.sortBy(nodesAndNames, value => {
        return value.names[0];
    });

    return nodesAndNames;
}

function nodeDescReport({ bind, isInGroup, graphFind, andIs, isEdge, isString, graphListNodes, describeNode }) {
    let isCoreNode = bind({ func: isInGroup, params: { graphFind, group: "7f82d45a6ffb5c345f84237a621de35dd8b7b0e3" }});
    let isSystemFile = bind({ func: isInGroup, params: { graphFind, group: "66564ec14ed18fb88965140fc644d7b813121c78" }});
    let isInNameGroup = bind({ func: isInGroup, params: { graphFind, group: "f1830ba2c84e3c6806d95e74cc2b04d99cd269e0" }});
    let isNameEdge = bind({ func: andIs, params: { types: [ isEdge, isInNameGroup ] }});

    let typeMap = { isEdge, isString, isCoreNode, isSystemFile, isNameEdge };
    let nodeList = graphListNodes();

    nodeList.forEach(node => {
        let types = describeNode({ node: node, types: typeMap });
        console.log(node+" => "+JSON.stringify(types));
    });
}

function systemFileReport({ coreNodes, groupList, nameList }) {
    console.log("=== System File Report ===");
    console.log("System files: "+coreNodes.length);

    let group = groupList("66564ec14ed18fb88965140fc644d7b813121c78");
    let systemFiles = group.sort();

    let list = coreNodes.map(node => {
        let isInGroup = systemFiles.indexOf(node) != -1;
        let myNames = nameList(node);
        return {
            node,
            isInGroup,
            names: myNames
        };
    });

    list.sort((a, b) => {
        let aName = a.names[0] || "";
        let bName = b.names[0] || "";
        return aName.localeCompare(bName);
    });

    list.forEach(({isInGroup, node, names}) => {
        console.log(`[${isInGroup ? "X" : " "}] ${node} ${JSON.stringify(names)}`);
    });
}

function graphReport({ graphFind, graphListNodes }) {
    let edges = graphFind();
    let nodes = graphListNodes();
    let nodePercent = (edges.length/nodes.length*100).toPrecision(4);

    console.log("== Graph Report ==");
    console.log("Nodes: "+nodes.length);
    console.log("Edges: "+edges.length+" ("+nodePercent+"%)");
}

function stringReport({ stringFind }) {
    let strings = stringFind();

    strings = _.sortBy(strings, "string");

    console.log("== String Report ==");
    strings.forEach(value => {
        console.log(`${value.id} => ${value.string}`);
    });
}

// Local utils - don't need to make system files out of these
function _createSystemFile({ hashRandom, graphAutoPut, nameFn, name }) {
    let newSystemId = hashRandom();
    exec("cp src/kitsune-core/ddfe7d402ff26c18785bcc899fa69183b3170a7d src/kitsune-core/"+newSystemId);
    graphAutoPut({ head: "66564ec14ed18fb88965140fc644d7b813121c78", tail: newSystemId });
    nameFn({ node: newSystemId, name: name });
}

function _createCoreNode({ node, name, graphAutoPut, nameFn }) {
    graphAutoPut({ head: "7f82d45a6ffb5c345f84237a621de35dd8b7b0e3", tail: node });
    nameFn({ node: node, name: name });
}

function removeSystemFile({ graphFind, graphRemove, nameRemove, stringFind, stringRemove,
                            systemFileId, systemFileName  }) {
    // TODO: Fix this, it's broken
    let groupEdge = graphFind({ head: "66564ec14ed18fb88965140fc644d7b813121c78",
                                tail: systemFileId });
    graphRemove({ id: groupEdge[0].id });
    nameRemove({ node: groupEdge[0].tail, name: systemFileName });
    let stringNode = stringFind({ string: systemFileName });
    stringRemove({ id: stringNode[0].id });
}

function _cleanStringSystem({ stringFind, graphListNodes, stringRemove }) {
        let stringIds = stringFind({}).map(value => value.id);
        let graphNodes = graphListNodes();
        let diff = _.difference(stringIds, graphNodes);
        diff.forEach(id => {
            stringRemove({ id });
        });
}

function cleanLoki(data) {
    let result = data.map(value => _.omit(value, "meta", "$loki"));
    return result;
}

function wrapData(data) {
    return `// -*- mode: js2 -*-
var data = function() {
    return ${data};
};
module.exports = data;
`;
}

function writeData(data, filename) {
    data = cleanLoki(data);
    let json = JSON.stringify(data, null, 2);
    let finalData = wrapData(json);
    fs.writeFileSync(filename, finalData);
}

function hyphenNameToCamelCase(name) {
    let result = name
            .replace(/-(.)/g, capture => capture.toUpperCase())
            .replace(/-/g, '');
    return result;
}

// BOOTSTRAP - STEP 1
function buildLoader({ bind, autoParam }) {
    // INIT LOADER SYSTEM - already loaded, just here for reference
    // TODO: Make loader that returns null instead of exception on missing module
    // let systemLoaderId = "31d21eb2620a8f353a250ad2edd4587958faf3b1"; // system-loader
    let loader = bind({ func: systemLoader, params: { path: "kitsune-core" }});
    loader = autoParam({ func: loader, paramName: "id" });

    return loader;
}

// BOOTSTRAP - STEP 2
function buildCache({ loader, bind }) {
    let systemList = {};

    let dictFunc = loader("30c8959d5d7804fb80cc9236edec97e04e5c4c3d"); // dictionary-function
    let cache = dictFunc(systemList);

    var putSystem = loader("d1e484530280752dd99b7e64a854f96cf66dd502"); // put-system
    putSystem = bind({ func: putSystem, params: { systemList }});

    return { cache, putSystem };
}

// BOOTSTRAP - STEP 3
function buildCore({ cache, modules, putSystem, bind, autoParam }) {
    let systems = function({ cache, modules, id }) {

        let system = cache(id);

        if(!system) {
            for(let key in modules) {
                let module = modules[key];
                system = module(id);

                if(system)
                    break;
            }
            putSystem({ id, system });
        }
        return system;
    };
    systems = bind({ func: systems, params: { cache, modules }});
    systems = autoParam({ func: systems, paramName: "id" });

    return systems;
}

// BOOTSTRAP - STEP 4
function loadDataSystems({ loader, bind, autoParam, putSystem }) {

    let graphData = loader("24c045b912918d65c9e9aaea9993e9ab56f50d2e");
    let stringData = loader("1cd179d6e63660fba96d54fe71693d1923e3f4f1");

    let lokiColl = loader("0741c54e604ad973eb41c02ab59c5aabdf2c6bc3");
    let lokiPut = loader("f45ccdaba9fdca2234be7ded1a5578dd17c2374e");
    let lokiFind = loader("30dee1b715bcfe60afeaadbb0e3e66019140686a");

    let valueFunc = loader("62126ce823b700cf7441b5179a3848149c9d8c89");

    // Graph
    let graphColl = lokiColl();
    putSystem({ id: "adf6b91bb7c0472237e4764c044733c4328b1e55", system: valueFunc(graphColl) });

    let graphPut = bind({ func: lokiPut, params: { db: graphColl }});
    putSystem({ id: "7e5e764e118960318d513920a0f33e4c5ae64b50", system: graphPut });

    let graphFind = bind({ func: lokiFind, params: { db: graphColl }});
    graphFind = autoParam({ func: graphFind, paramName: "where" });
    putSystem({ id: "a1e815356dceab7fded042f3032925489407c93e", system: graphFind });

    // String
    let stringColl = lokiColl();
    putSystem({ id: "ce6de1160131bddb4e214f52e895a68583105133", system: valueFunc(stringColl) });

    let stringPut = bind({ func: lokiPut, params: { db: stringColl }});
    putSystem({ id: "b4cdd85ce19700c7ef631dc7e4a320d0ed1fd385", system: stringPut });

    let stringFind = bind({ func: lokiFind, params: { db: stringColl }});
    stringFind = autoParam({ func: stringFind, paramName: "where" });
    putSystem({ id: "8b1f2122a8c08b5c1314b3f42a9f462e35db05f7", system: stringFind });

    // Populate collections
    var insertData = function({ data, put }) {
        data().forEach(value => {
            put({ element: value });
        });
    };

    insertData({ data: graphData, put: graphPut });
    insertData({ data: stringData, put: stringPut });

    return { graphFind, stringPut, stringFind };
}

// BOOTSTRAP - STEP 5
function buildFuncCallLoader(systems) {

    let bind = systems("878c8ef64d31a194159765945fc460cb6b3f486f");
    let autoParam = systems("b69aeff3eb1a14156b1a9c52652544bcf89761e2");
    let putSystem = systems("a26808f06030bb4c165ecbfe43d9d200672a0878");

    // 4
    let returnFirst = systems("68d3fb9d10ae2b0455a33f2bfb80543c4f137d51");
    let graphFind = systems("a1e815356dceab7fded042f3032925489407c93e");
    let graphReadEdge = returnFirst(graphFind);
    graphReadEdge = autoParam({ func: graphReadEdge, paramName: "id" });

    // 3
    let readAssign = systems("b8aea374925bfcd5884054aa23fed2ccce3c1174");
    readAssign = bind({ func: readAssign, params: { graphReadEdge }});
    readAssign = autoParam({ func: readAssign, paramName: "id" });

    let callNodeFunction = systems("ad95b67eca3c4044cb78a730a9368c3e54a56c5f");
    // TODO: Figure out why this isn't needed
    // callNodeFunction = bind({ func: callNodeFunction, params: { funcSys: systems }});

    // 2
    let readFuncCall = systems("2751294a2da41ad516a23054f3273a9f3bd028b4");
    readFuncCall = bind({ func: readFuncCall, params: { readAssign }});
    readFuncCall = autoParam({ func: readFuncCall, paramName: "id" });

    let executeFunction = systems("db7ab44b273faf81159baba0e847aaf0e46a406b");
    executeFunction = bind({ func: executeFunction, params: {callNodeFunc: callNodeFunction, funcSys: systems }});

    // 1
    // TODO: Make a file system
    let loadSystem = function({ readFuncCall, executeFunction, id }) {
        let funcCall = readFuncCall(id);

        if(!funcCall)
            return null;

        let func = executeFunction(funcCall);

        return func;
    };
    loadSystem = bind({ func: loadSystem, params: { readFuncCall, executeFunction }});
    loadSystem = autoParam({ func: loadSystem, paramName: "id" });

    // 0
    // TODO: Make a file system
    let funcCallSystems = function({ loadSystem, putSystem, id }) {

        let system = loadSystem(id);

        if(system)
            putSystem({ id, system });

        return system;
    };
    funcCallSystems = bind({ func: funcCallSystems, params: {
        loadSystem,
        putSystem
    }});
    funcCallSystems = autoParam({ func: funcCallSystems, paramName: "id" });
    return funcCallSystems;
}

// BOOTSTRAP - STEP 6
function buildManualSystemLoader({ bind, autoParam, systems, putSystem }) {
    var manSysFuncs = {};
    let addManSys = function(id, builderFunc) {
        if(typeof id == "object") {
            _.forEach(id, value => {
                manSysFuncs[value] = builderFunc;
            });
        } else
            manSysFuncs[id] = builderFunc;
    };

    var manualSystems = function({ manSysFuncs, systems, putSystem, id }) {
        let result;

        if(manSysFuncs[id]) {
            result = manSysFuncs[id](systems);

            if(typeof result == "object") {
                _.forEach(result, (value, key) => {
                    putSystem({ id: key, system: value });
                });
                result = result[id];
            }
        }

        return result;
    };
    manualSystems = bind({ func: manualSystems, params: { manSysFuncs, systems, putSystem }});
    manualSystems = autoParam({ func: manualSystems, paramName: "id" });

    // TODO: See which of these can be converted to function call systems
    // TODO; Report of which of these have/have-not been loaded at certain points
    addManSys("4e63843a9bee61351b80fac49f4182bd582907b4", function(systems) {
        let stringFind = systems("8b1f2122a8c08b5c1314b3f42a9f462e35db05f7");
        let stringPut = systems("b4cdd85ce19700c7ef631dc7e4a320d0ed1fd385");

        let stringAutoPut = systems("8f8b523b9a05a55bfdffbf14187ecae2bf7fe87f");
        stringAutoPut = bind({ func: stringAutoPut, params: { stringFind, stringPut }});
        stringAutoPut = autoParam({ func: stringAutoPut, paramName: "string" });
        return stringAutoPut;
    });

    addManSys("c83cd0ab78a1d57609f9224f851bde6d230711d0", function(systems) {
        let graphFind = systems("a1e815356dceab7fded042f3032925489407c93e");

        let graphFactor = systems("4163d1cd63d3949b79c37223bd7da04ad6cd36c8");
        graphFactor = bind({ func: graphFactor, params: { graphFind }});
        return graphFactor;
    });

    addManSys("08f8db63b1843f7dea016e488bd547555f345c59", function(systems) {
        let stringFind = systems("8b1f2122a8c08b5c1314b3f42a9f462e35db05f7");
        let returnFirst = systems("68d3fb9d10ae2b0455a33f2bfb80543c4f137d51");
        let returnProperty = systems("c1020aea14a46b72c6f8a4b7fa57acc14a73a64e");

        let stringReadString = autoParam({ func: stringFind, paramName: "id" });
        stringReadString = returnFirst(stringReadString);
        stringReadString = returnProperty({ func: stringReadString, propertyName: "string" });
        return stringReadString;
    });

    addManSys("f7b073eb5ef5680e7ba308eaf289de185f0ec3f7", function(systems) {
        let graphPut = systems("7e5e764e118960318d513920a0f33e4c5ae64b50");
        let autoId = systems("e048e5d7d4a4fbc45d5cd0d035982dae2ee768d0");

        let graphAutoPut = autoParam({ func: graphPut, paramName: "element" });
        graphAutoPut = autoId(graphAutoPut);
        return graphAutoPut;
    });

    addManSys("7b5e1726ccc3a1c2ac69e441900ba002c26b2f74", function(systems) {
        let graphAutoPut = systems("f7b073eb5ef5680e7ba308eaf289de185f0ec3f7");

        let graphAssign = systems("6c877bef62bc8f57eb55265c62e75b36515ef458");
        graphAssign = bind({ func: graphAssign, params: { graphAutoPut }});
        return graphAssign;
    });

    addManSys("25cff8a2afcf560b5451d2482dbf9d9d69649f26", function(systems) {
        let returnFirst = systems("68d3fb9d10ae2b0455a33f2bfb80543c4f137d51");
        let graphFind = systems("a1e815356dceab7fded042f3032925489407c93e");

        let graphReadEdge = returnFirst(graphFind);
        graphReadEdge = autoParam({ func: graphReadEdge, paramName: "id" });
        return graphReadEdge;
    });

    addManSys("ca79cd84ab6a9eb3e5ac06ed48d3d24e6649d0bc", function(systems) {
        let callNodeFunction = systems("ad95b67eca3c4044cb78a730a9368c3e54a56c5f");
        callNodeFunction = bind({ func: callNodeFunction, params: { funcSys: systems }});
        return callNodeFunction;
    });

    addManSys("bf565ae1309f425b0ab00efa2ba541ae03ad22cf", function(systems) {
        let hashString = systems("c2ea0ae0bca74d50be301049b8ff6e3a5b7d10ae");

        let hashRandom = systems("2f7ff34b09a1fb23b9a5d4fbdd8bb44abbe2007a");
        hashRandom = bind({ func: hashRandom, params: { hashString }});
        return hashRandom;
    });

    addManSys("2885e34819b8a2f043b139bd92b96e484efd6217", function(systems) {
        let stringAutoPut = systems("4e63843a9bee61351b80fac49f4182bd582907b4");
        let graphAssign = systems("7b5e1726ccc3a1c2ac69e441900ba002c26b2f74");

        let name = systems("ddfe7d402ff26c18785bcc899fa69183b3170a7d");
        name = bind({ func: name, params: { stringAutoPut, graphAssign }});
        return name;
    });

    addManSys("890b0b96d7d239e2f246ec03b00cb4e8e06ca2c3", function(systems) {
        let graphFactor = systems("c83cd0ab78a1d57609f9224f851bde6d230711d0");
        let stringReadString = systems("08f8db63b1843f7dea016e488bd547555f345c59");

        let nameList = systems("81e0ef7e2fae9ccc6e0e3f79ebf0c9e14d88d266");
        nameList = bind({ func: nameList, params: { graphFactor, stringReadString }});
        nameList = autoParam({ func: nameList, paramName: "node" });
        return nameList;
    });

    addManSys("2bf3bbec64d4b33302b9ab228eb90bc3f04b22a8", function() {
        let graphFactor = systems("c83cd0ab78a1d57609f9224f851bde6d230711d0");
        let stringAutoPut = systems("4e63843a9bee61351b80fac49f4182bd582907b4");

        let nameListIds = systems("c4863daa27736a3fb94fa536fcf17bab5fce25bf");
        nameListIds = bind({ func: nameListIds, params: { stringAutoPut, graphFactor }});
        nameListIds = autoParam({ func: nameListIds, paramName: "name" });
        return nameListIds;
    });

    addManSys("d7f80b3486eee7b142c190a895c5496242519608", function() {
        let graphFactor = systems("c83cd0ab78a1d57609f9224f851bde6d230711d0");
        let stringReadString = systems("08f8db63b1843f7dea016e488bd547555f345c59");
        let graphReadEdge = systems("25cff8a2afcf560b5451d2482dbf9d9d69649f26");
        let callNodeFunction = systems("ca79cd84ab6a9eb3e5ac06ed48d3d24e6649d0bc");

        let readObject = systems("e5ac371a5d01eb2e1df8f42166f2ef20a5ae094b");
        readObject = bind({ func: readObject, params: { graphFactor, stringReadString, graphReadEdge, nodeFunc: callNodeFunction }});
        readObject = autoParam({ func: readObject, paramName: "node" });
        return readObject;
    });

    addManSys("c2d807f302ca499c3584a8ccf04fb7a76cf589ad", function() {
        let lokiRemove = systems("2ebd8d9fff28833dab44f086d4692fb888525fc8");
        let graphColl = systems("adf6b91bb7c0472237e4764c044733c4328b1e55");

        let graphRemove = bind({ func: lokiRemove, params: { db: graphColl }});
        graphRemove = autoParam({ func: graphRemove, paramName: "id" });
        return graphRemove;
    });

    addManSys("74b1eb95baaf14385cf3a0b1b76198a5cadfa258", function() {
        let graphFind = systems("a1e815356dceab7fded042f3032925489407c93e");

        let graphListNodes = systems("b7916f86301a6bc2af32f402f6515809bac75b03");
        graphListNodes = bind({ func: graphListNodes, params: { graphFind }});
        return graphListNodes;
    });

    addManSys("8c7d214678ce851d39ebb4a774c9f168bfffe43d", function() {
        let stringFind = systems("8b1f2122a8c08b5c1314b3f42a9f462e35db05f7");
        let returnFirst = systems("68d3fb9d10ae2b0455a33f2bfb80543c4f137d51");
        let returnProperty = systems("c1020aea14a46b72c6f8a4b7fa57acc14a73a64e");

        let stringGetId = autoParam({ func: stringFind, paramName: "string" });
        stringGetId = returnFirst(stringGetId);
        stringGetId = returnProperty({ func: stringGetId, propertyName: "id" });
        return stringGetId;
    });

    addManSys("a8a338d08b0ef7e532cbc343ba1e4314608024b2", function() {
        let graphFind = systems("a1e815356dceab7fded042f3032925489407c93e");

        let groupList = systems("ab54a0a1abd5f849fcc04c809e5db0ebb1f1cc29");
        groupList = bind({ func: groupList, params: { graphFind }});
        groupList = autoParam({ func: groupList, paramName: "group" });
        return groupList;
    });

    addManSys("6f00c44367d415878955630378683e1463f87aea", function() {
        let lokiRemove = systems("2ebd8d9fff28833dab44f086d4692fb888525fc8");
        let stringColl = systems("ce6de1160131bddb4e214f52e895a68583105133");

        let stringRemove = bind({ func: lokiRemove, params: { db: stringColl }});
        return stringRemove;
    });

    addManSys("708f17af0e4f537757cf8817cbca4ed016b7bb8b", function() {
        let graphFactor = systems("c83cd0ab78a1d57609f9224f851bde6d230711d0");
        let graphRemove = systems("c2d807f302ca499c3584a8ccf04fb7a76cf589ad");
        let stringGetId = systems("8c7d214678ce851d39ebb4a774c9f168bfffe43d");

        let nameRemove = systems("7087272f7205fdac70e1f29d3d4b9e170d99a431");
        nameRemove = bind({ func: nameRemove, params: { stringGetId, graphFactor, graphRemove }});
        return nameRemove;
    });

    addManSys("e048e5d7d4a4fbc45d5cd0d035982dae2ee768d0", function() {
        let hashRandom = systems("bf565ae1309f425b0ab00efa2ba541ae03ad22cf");

        let autoId = systems("a0089c410302c18427b4cbdc4c3a55de6a69eb8b");
        autoId = bind({ func: autoId, params: { hashRandom, paramName: "id" }});
        autoId = autoParam({ func: autoId, paramName: "func" });
        return autoId;
    });

    addManSys("76c55430fccd4f9e0b19c1c2b98d8a3babea81b2", function(systems) {
        let hashRandom = systems("bf565ae1309f425b0ab00efa2ba541ae03ad22cf");
        let graphAutoPut = systems("f7b073eb5ef5680e7ba308eaf289de185f0ec3f7");
        let name = systems("2885e34819b8a2f043b139bd92b96e484efd6217");

        let createSystemFile = bind({ func: _createSystemFile, params: { hashRandom, graphAutoPut, nameFn: name }});
        createSystemFile = autoParam({ func: createSystemFile, paramName: "name" });
        return createSystemFile;
    });

    addManSys("cfcb898db1a24d50ed7254644ff75aba4fb5c5f8", () => console.log);

    addManSys(["c5cfe7d5154188daaa2a5cdf5d27a18fce4c2345",
               "0abebb208d96e3aa8a17890a5606734e03fa2539",
               "30381757ef98651b92e54ce11a4fb839e76aa847",
               "6e52da614fc7779bd2aed50b06e753ee09cc346b",
               "0d4085c107c1e9fab3fcb0cd49a8372003f00484",
               "253cd1812a32a6a81f1365e1eca19cc1549f6002"], function(systems) {

        // Object Put and Auto Put
        let graphAssign = systems("7b5e1726ccc3a1c2ac69e441900ba002c26b2f74");
        let graphAutoPut = systems("f7b073eb5ef5680e7ba308eaf289de185f0ec3f7");
        let stringAutoPut = systems("4e63843a9bee61351b80fac49f4182bd582907b4");
        let typeMappings = systems("58f4149870fd4f99bcbf8083eedfee6fbc1199b0")();
        let autoId = systems("e048e5d7d4a4fbc45d5cd0d035982dae2ee768d0");
        let name = systems("2885e34819b8a2f043b139bd92b96e484efd6217");

        let objectPut = systems("eed13556a72cf02a35da377d6d074fe39c3b59c4");
        objectPut = bind({ func: objectPut, params: { graphAssign, graphAutoPut, stringAutoPut, typeMappings }});

        let objectAutoPut = autoId(objectPut);
        objectAutoPut = autoParam({ func: objectAutoPut, paramName: "object" });

        // Add object to type mappings
        let readObject = systems("d7f80b3486eee7b142c190a895c5496242519608");
        typeMappings.objects = {
            typeFunc: _.isPlainObject,
            putFunc: objectAutoPut,
            readFuncId: readObject.id
        };

        let mappingResult = _.mapValues(typeMappings, function(value) {
            return value.readFuncId;
        });
        console.log(mappingResult);

        // Write func call Stuff
        let writeValue = systems("d2a5636a4b4e88b0c7c640bfd8915e78919641a0");
        writeValue = bind({ func: writeValue, params: { typeMappings }});
        writeValue = autoParam({ func: writeValue, paramName: "value" });

        let writeFuncCall = function({ writeValue, graphAssign, func, param }) {
            if(typeof func == "function")
                func = func.id;

            if(!func)
                throw new Error("funcId must not be null or must have an id");

            let ref = writeValue(param);

            let args = { head: ref.funcId, type: func, tail: ref.id };
            let result = graphAssign(args);

            return result;
        };
        writeFuncCall = bind({ func: writeFuncCall, params: { writeValue, graphAssign }});

        let writeAndNameFuncCall = function({ writeFuncCall, nameFn, func, param, name }) {
            let id = writeFuncCall({ func, param });
            graphAutoPut({ head: "d2cd5a6f99428baaa05394cf1fe3afa17fb59aff", tail: id });
            nameFn({ node: id, name });
            return id;
        };
        writeAndNameFuncCall = bind({ func: writeAndNameFuncCall, params: { writeFuncCall, nameFn: name }});

                   return { "c5cfe7d5154188daaa2a5cdf5d27a18fce4c2345": objectPut,
                            "0abebb208d96e3aa8a17890a5606734e03fa2539": objectAutoPut,
                            "30381757ef98651b92e54ce11a4fb839e76aa847": readObject,
                            "6e52da614fc7779bd2aed50b06e753ee09cc346b": writeValue,
                            "0d4085c107c1e9fab3fcb0cd49a8372003f00484": writeFuncCall,
                            "253cd1812a32a6a81f1365e1eca19cc1549f6002": writeAndNameFuncCall };
               });

    addManSys("58f4149870fd4f99bcbf8083eedfee6fbc1199b0", function() {
        let hashInteger = systems("cb76708f83577aa1a50f91ed39b98f077e969efe");
        let readInteger = systems("a3cb3210c4688aabf0772e5a7dec9c9922247194");
        let stringAutoPut = systems("4e63843a9bee61351b80fac49f4182bd582907b4");
        let stringReadString = systems("08f8db63b1843f7dea016e488bd547555f345c59");

        let typeMappings = {
            "integer": {
                typeFunc: _.isInteger,
                putFunc: hashInteger,
                readFuncId: readInteger.id
            },
            "string": {
                typeFunc: _.isString,
                putFunc: stringAutoPut,
                readFuncId: stringReadString.id
            },
            "function": {
                typeFunc: _.isFunction,
                putFunc: value =>  value.id,
                readFuncId: systems.id
            }
        };

        return function() {
            return typeMappings;
        };
    });

    return manualSystems;
}

function bootstrap() {

    let log = bootstrapLogger;

    // STEP 1: LOADER
    log.info(":Loader");
    let bind = systemLoader({ path: "kitsune-core", id: "878c8ef64d31a194159765945fc460cb6b3f486f" });
    let autoParam = systemLoader({ path: "kitsune-core", id: "b69aeff3eb1a14156b1a9c52652544bcf89761e2" });
    let loader = buildLoader({ bind, autoParam });

    // STEP 2: CACHE MODULE
    log.info(":Cache Modules");
    let { cache, putSystem } = buildCache({ loader, bind });
    putSystem({ id: "a26808f06030bb4c165ecbfe43d9d200672a0878", system: putSystem });

    // STEP 3: BUILD CORE
    log.info(":Build Core");
    let modules = [loader];
    let systems = buildCore({ cache, modules, putSystem, bind, autoParam });
    putSystem({ id: "ab3c2b8f8ef49a450344437801bbadef765caf69", system: systems });

    // STEP 4: LOAD DATA SYSTEMS
    log.info(":Load Data Systems");
    let { graphFind, stringPut, stringFind } = loadDataSystems({ loader, bind, autoParam, putSystem });

    // STEP 5: FUNCTION CALL SYSTEMS
    log.info(":Function Call Systems");
    let funcCallSystems = buildFuncCallLoader(systems);
    modules.splice(0, 0, funcCallSystems);

    // STEP 6: MANUALLY SYSTEM LOADER
    log.info(":Manually System Loader");
    let manualSystems = buildManualSystemLoader({ bind, autoParam, systems, putSystem });
    modules.splice(0, 0, manualSystems);

    return { modules, systems };
}
