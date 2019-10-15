"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var config_1 = require("./config");
var crawler_1 = require("./crawler");
var file_1 = require("./file");
crawler_1.Crawl(config_1.Config.url, config_1.Config.delay).then(function (results) {
    return file_1.Save(results, config_1.Config.outDir, config_1.Config.resultName);
});
