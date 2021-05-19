// Generated by ReScript, PLEASE EDIT WITH CARE
'use strict';

var Fs = require("fs");
var Day6 = require("../src/Day6.bs.js");
var Jest = require("@glennsl/bs-jest/src/jest.bs.js");
var Belt_Id = require("bs-platform/lib/js/belt_Id.js");
var Belt_Set = require("bs-platform/lib/js/belt_Set.js");
var Caml_obj = require("bs-platform/lib/js/caml_obj.js");
var TestUtil = require("./TestUtil.bs.js");

var cmp = Caml_obj.caml_compare;

var ColorCmp = Belt_Id.MakeComparable({
      cmp: cmp
    });

Jest.describe("variant set", (function (param) {
        var red_blue_set = Belt_Set.fromArray([
              "red",
              "blue"
            ], ColorCmp);
        TestUtil.test_equal("red_blue_set has red", Belt_Set.has(red_blue_set, "red"), true);
        return TestUtil.test_equal("red_blue_set has not greed", Belt_Set.has(red_blue_set, "green"), false);
      }));

var test_input = "abc\n\na\nb\nc\n\nab\nac\n\na\na\na\na\n\nb";

Jest.describe("Day 6 Custom Customs", (function (param) {
        var test_group_list = Day6.get_group_list(test_input);
        TestUtil.test_equal("test group length is 5", test_group_list.length, 5);
        TestUtil.test_equal("test result is [3,3,3,1,1]", test_group_list.map(Day6.count_group_unique), [
              3,
              3,
              3,
              1,
              1
            ]);
        var group_list = Day6.get_group_list(Fs.readFileSync("input/Day6.txt", "utf8"));
        var sum_of_count = group_list.map(Day6.count_group_unique).reduce((function (acc, v) {
                return acc + v | 0;
              }), 0);
        TestUtil.test_equal("sum of counts is ...", sum_of_count, 6387);
        TestUtil.test_equal("all answered yes questions in test_input is [3,0,1,1,1]", test_group_list.map(Day6.count_every_person), [
              3,
              0,
              1,
              1,
              1
            ]);
        var sum_of_count_2 = group_list.map(Day6.count_every_person).reduce((function (acc, v) {
                return acc + v | 0;
              }), 0);
        return TestUtil.test_equal("all answered yes questions's sum is 3038", sum_of_count_2, 3039);
      }));

exports.ColorCmp = ColorCmp;
exports.test_input = test_input;
/* ColorCmp Not a pure module */
