"use strict";var l=Object.defineProperty;var u=Object.getOwnPropertyDescriptor;var w=Object.getOwnPropertyNames;var d=Object.prototype.hasOwnProperty;var f=(o,e)=>{for(var r in e)l(o,r,{get:e[r],enumerable:!0})},B=(o,e,r,i)=>{if(e&&typeof e=="object"||typeof e=="function")for(let a of w(e))!d.call(o,a)&&a!==r&&l(o,a,{get:()=>e[a],enumerable:!(i=u(e,a))||i.enumerable});return o};var M=o=>B(l({},"__esModule",{value:!0}),o);var E={};f(E,{rules:()=>x});module.exports=M(E);var p=require("@typescript-eslint/utils"),n=require("@typescript-eslint/utils"),t=require("ts-pattern"),P=p.ESLintUtils.RuleCreator(o=>`https://example.com/rule/${o}`),s=()=>{},b=P({create(o){return{MemberExpression:function(e){(0,t.match)(e).with({property:{type:n.AST_NODE_TYPES.Identifier,name:"exhaustive"}},r=>{(0,t.match)(r).with({object:{type:n.AST_NODE_TYPES.CallExpression,arguments:t.P.select("secondArgument"),callee:{property:{name:"with"},type:n.AST_NODE_TYPES.MemberExpression,object:{arguments:t.P.select("firstArgument"),type:n.AST_NODE_TYPES.CallExpression,callee:{property:{name:"with"},type:n.AST_NODE_TYPES.MemberExpression,object:{callee:{name:"match"}}}}}}},({firstArgument:i,secondArgument:a})=>{let[m]=a,[h]=i;(0,t.match)([h,m]).with([{type:n.AST_NODE_TYPES.Literal},{type:n.AST_NODE_TYPES.Literal}],([g,y])=>{(0,t.match)([g.raw,y.raw]).with(t.P.union(["true","false"],["false","true"]),()=>{o.report({node:e,messageId:"noFullyBooleanPatternMatching"})}).otherwise(s)})}).otherwise(s)}).otherwise(s),(0,t.match)(e).with({property:{type:n.AST_NODE_TYPES.Identifier,name:"otherwise"}},r=>{(0,t.match)(r).with({object:{type:n.AST_NODE_TYPES.CallExpression,arguments:t.P.select("firstArgument"),callee:{property:{name:"with"},type:n.AST_NODE_TYPES.MemberExpression,object:{callee:{name:"match"}}}}},({firstArgument:i})=>{let[a]=i;(0,t.match)(a).with({type:n.AST_NODE_TYPES.Literal,raw:t.P.union("true","false")},()=>{o.report({node:e,messageId:"noPartiallyBooleanPatternMatching"})})}).otherwise(s)}).otherwise(s)}}},name:"no-boolean-pattern-matching",meta:{type:"suggestion",messages:{noFullyBooleanPatternMatching:"F Boolean pattern matching is not allowed",noPartiallyBooleanPatternMatching:"P Boolean pattern matching is not allowed"},fixable:"code",schema:[],docs:{description:"Boolean pattern matching is not allowed",recommended:"error"}},defaultOptions:[]}),c=b;var x={noBooleanPatternMatching:c};0&&(module.exports={rules});