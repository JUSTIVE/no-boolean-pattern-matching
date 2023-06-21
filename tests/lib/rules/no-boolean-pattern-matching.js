"use strict";

const rule = require("../../../lib/rules/no-boolean-pattern-matching.js"),
    RuleTester = require("eslint").RuleTester;

const ruleTester = new RuleTester({
  parserOptions: { ecmaVersion: 2018 } 
});

ruleTester.run("no-boolean-pattern-matching", rule, {
    valid: [
        {
            code: "var foo = true",
            options: []
        }
    ],
    invalid: [
        {
            code: `match(asdf)
    .with(true, ()=>{})
    .with(false, ()=>{})
    .exhaustive()`,
            errors: [{ message: "F Boolean pattern matching is not allowed" }]
        },
        {
            code: "match(asdf).with(false, ()=>{}).with(true, ()=>{}).exhaustive()",
            errors: [{ message: "F Boolean pattern matching is not allowed" }]
        },
        {
            code: "match(asdf).with(false, ()=>{}).otherwise()",
            errors: [{ message: "P Boolean pattern matching is not allowed" }]
        },
        {
            code: "match(asdf).with(true, ()=>{}).otherwise()",
            errors: [{ message: "P Boolean pattern matching is not allowed" }]
        }
    ]
});