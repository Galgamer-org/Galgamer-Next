"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.clearJsonFile = void 0;
var fs = require("fs");
var clearJsonFile = function (filename) {
    fs.writeFileSync(filename, JSON.stringify({}, null, 2), 'utf8');
    console.log('Cleared');
};
exports.clearJsonFile = clearJsonFile;
var saveDataToJsonFile = function (filename, objectName, data) {
    var existingData = {};
    try {
        existingData = JSON.parse(fs.readFileSync(filename, 'utf8'));
    }
    catch (error) { }
    existingData[objectName] = data;
    fs.writeFileSync(filename, JSON.stringify(existingData), 'utf8');
    console.log("Data saved for object ".concat(objectName));
};
var queryMethod = function (url, options) { return __awaiter(void 0, void 0, void 0, function () {
    var response, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, fetch(url, options)];
            case 1:
                response = _a.sent();
                if (!response.ok) {
                    throw new Error("Request failed: ".concat(response.status, " - ").concat(response.statusText));
                }
                return [4 /*yield*/, response.json()];
            case 2: return [2 /*return*/, _a.sent()];
            case 3:
                error_1 = _a.sent();
                throw error_1;
            case 4: return [2 /*return*/];
        }
    });
}); };
var connectMethod = function (query) { return __awaiter(void 0, void 0, void 0, function () {
    var start_time, connection_data, headers, batchRequestBody, batch_data, batch_result_data, vndbData, end_time, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                start_time = performance.now();
                _a.label = 1;
            case 1:
                _a.trys.push([1, 6, , 7]);
                return [4 /*yield*/, queryMethod('https://query.vndb.org/api/connections', {
                        method: 'GET',
                    })];
            case 2:
                connection_data = _a.sent();
                headers = {
                    'Content-Type': 'application/json',
                };
                batchRequestBody = {
                    connectionId: connection_data[0].id,
                    name: '',
                    batchText: query,
                    selectedText: '',
                    chart: {
                        chartType: '',
                        fields: {},
                    },
                };
                return [4 /*yield*/, queryMethod('https://query.vndb.org/api/batches', {
                        method: 'POST',
                        headers: headers,
                        body: JSON.stringify(batchRequestBody),
                    })];
            case 3:
                batch_data = _a.sent();
                return [4 /*yield*/, queryMethod("https://query.vndb.org/api/batches/".concat(batch_data.id), {
                        method: 'GET',
                        headers: headers,
                    })];
            case 4:
                batch_result_data = _a.sent();
                return [4 /*yield*/, queryMethod("https://query.vndb.org/api/statements/".concat(batch_data.statements[0].id, "/results"), {
                        method: 'GET',
                        headers: headers,
                    })];
            case 5:
                vndbData = _a.sent();
                end_time = performance.now();
                console.log('Connection Data:', connection_data);
                console.log('Batch Data:', batch_data);
                console.log('Votes Data:', vndbData);
                console.log('Request Time:', end_time - start_time);
                return [2 /*return*/, vndbData];
            case 6:
                error_2 = _a.sent();
                console.error('An error occurred:', error_2);
                // 如果出现异常，重新执行 connectMethod
                return [2 /*return*/, connectMethod(query)];
            case 7: return [2 /*return*/];
        }
    });
}); };
var vndbDataQuery = function (vndbId, data_file) { return __awaiter(void 0, void 0, void 0, function () {
    var queryInfo, data, result, error_3;
    var _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                queryInfo = "SELECT target, (\n  with score_votes(score, count) as (\n    select vote/10, count(*)\n    from ulist_vns\n    where vid::text = target\n      and vote is not null\n    group by vote/10\n    order by vote/10 desc\n  ), \n  vn_data AS (\n    SELECT *\n    FROM vn\n    WHERE id::text = target\n  ),\n  length_votes(length, count) as (\n    select length / 60, count(*)\n    from vn_length_votes\n    where vid::text = target\n      and length is not null\n    group by length / 60\n    order by length / 60\n  ),\n  translations as (\n    select\n      releases.id,\n      releases.website,\n      releases.official,\n      releases.notes,\n      releases.title,\n      releases.released,\n      (with info as (\n        select p.* from releases_producers r join producers p on (p.id = r.pid) where r.id = releases.id\n      ) select json_agg(info) from info) as producers\n    from releases_vn\n    join releases on (releases.id = releases_vn.id)\n    where vid::text = target\n      and exists (\n        select from releases_lang\n        where releases_lang.id = releases_vn.id\n          and releases_lang.lang::text like 'zh%'\n      )\n  ),\n  relations(id, vid, relation, titles) as (\n    with recursive cte(id, vid, relation) as (\n      select\n        r.id,\n        r.vid,\n        r.relation\n      from vn_relations r\n      where id::text = target\n        and r.official\n      union\n      select\n        r.id,\n        r.vid,\n        r.relation\n      from cte\n      join vn_relations r on (r.id = cte.vid)\n      where r.official\n        and r.vid::text <> target\n    ) select\n      cte.id,\n      cte.vid,\n      cte.relation,\n      (\n        with sources(lang, title) as (select lang, title from vn_titles where vn_titles.id=cte.vid)\n        select json_agg(sources) from sources\n      ) from cte\n  ) \n  SELECT json_build_object(\n    'score_votes', (select json_agg(score_votes) from score_votes),\n    'basicInfo', (select row_to_json(vn_data) from vn_data),\n    'length_votes', (select json_agg(length_votes) from length_votes),\n    'translations', (select json_agg(translations) from translations),\n    'relations', (select json_agg(relations) from relations)\n  )\n)\nFROM json_array_elements_text('[\"".concat(vndbId, "\"]') target;");
                _c.label = 1;
            case 1:
                _c.trys.push([1, 3, , 4]);
                return [4 /*yield*/, connectMethod(queryInfo)];
            case 2:
                data = _c.sent();
                console.log(queryInfo);
                result = {
                    basic_info: data[0][1].basicInfo,
                    score_votes: data[0][1].score_votes,
                    length_votes: data[0][1].length_votes,
                    translations: data[0][1].translations,
                    relations: ((_b = (_a = data[0][1]) === null || _a === void 0 ? void 0 : _a.relations) === null || _b === void 0 ? void 0 : _b.length) > 50 ? null : data[0][1].relations,
                };
                console.log('----------------------');
                console.log(result);
                saveDataToJsonFile(data_file, vndbId, result);
                return [3 /*break*/, 4];
            case 3:
                error_3 = _c.sent();
                console.error('An error occurred:', error_3);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.default = vndbDataQuery;
