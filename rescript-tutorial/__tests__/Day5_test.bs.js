// Generated by ReScript, PLEASE EDIT WITH CARE
'use strict';

var Fs = require("fs");
var Day5 = require("../src/Day5.bs.js");
var Jest = require("@glennsl/bs-jest/src/jest.bs.js");

var raw_seat = "FBFBBFFRLR";

var raw_row = "FBFBBFF";

var raw_col = "RLR";

function test_equal(name, actual, expected) {
  return Jest.test(name, (function (param) {
                return Jest.Expect.toEqual(expected, Jest.Expect.expect(actual));
              }));
}

Jest.describe("parse seat", (function (param) {
        test_equal("parse_row return expected row", Day5.parse_row(raw_row), 44);
        test_equal("parse_col return expected col", Day5.parse_column(raw_col), 5);
        var test_seat = Day5.parse_seat(raw_seat);
        test_equal("parse seat return expected seat", test_seat, {
              row: 44,
              col: 5
            });
        test_equal("get seat id is return expected", Day5.get_seat_id(test_seat), 357);
        var seat_id_list = Fs.readFileSync("input/Day5.txt", "utf8").trim().split("\n").map(function (v) {
              return Day5.get_seat_id(Day5.parse_seat(v));
            });
        test_equal("max of seat_id_list is 920", Day5.max(seat_id_list), 926);
        test_equal("max of seat_id_list is 920", Day5.min(seat_id_list), 80);
        test_equal("sum_of_arithmetic_seq 1 to 4 is 10", Day5.sum_of_arithmetic_seq(1, 4, 1), 10);
        test_equal("sum of [1,2,4] is 7", Day5.sum([
                  1,
                  2,
                  4
                ]), 7);
        console.log(Day5.find_my_seat(seat_id_list));
        
      }));

exports.raw_seat = raw_seat;
exports.raw_row = raw_row;
exports.raw_col = raw_col;
exports.test_equal = test_equal;
/*  Not a pure module */
