// Generated by ReScript, PLEASE EDIT WITH CARE
'use strict';

var Js_dict = require("bs-platform/lib/js/js_dict.js");
var Belt_SetString = require("bs-platform/lib/js/belt_SetString.js");

function parse_inner(right) {
  return right.replace(".", "").split(", ").map(function (v) {
              return v.replace(/[0-9]+ /, "").trim();
            });
}

function parseRule(input) {
  var v = input.replace(/bags/g, "").replace(/bag/g, "").split(" contain ");
  if (v.length !== 2) {
    throw {
          RE_EXN_ID: "Failure",
          _1: "invalid rule input" + v.join(" "),
          Error: new Error()
        };
  }
  var left = v[0];
  var right = v[1];
  return {
          outer: left.trim(),
          inner: parse_inner(right)
        };
}

function parseRules(input) {
  return input.split("\n").map(parseRule);
}

function to_dict(l) {
  return l.reduce((function (acc, r) {
                r.inner.forEach(function (inner_bag) {
                      var opt_outer = Js_dict.get(acc, inner_bag);
                      var old = opt_outer !== undefined ? opt_outer : [];
                      acc[inner_bag] = old.concat([r.outer]);
                      
                    });
                return acc;
              }), {});
}

function how_many(d, now_bag, childs) {
  var childs_with_now = Belt_SetString.add(childs, now_bag);
  var parents = Js_dict.get(d, now_bag);
  if (parents !== undefined) {
    return parents.reduce((function (acc, parent) {
                  if (Belt_SetString.has(acc, parent)) {
                    return acc;
                  } else {
                    return how_many(d, parent, acc);
                  }
                }), childs_with_now);
  } else {
    return childs_with_now;
  }
}

exports.parse_inner = parse_inner;
exports.parseRule = parseRule;
exports.parseRules = parseRules;
exports.to_dict = to_dict;
exports.how_many = how_many;
/* No side effect */
