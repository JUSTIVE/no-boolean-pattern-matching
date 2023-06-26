import{ESLintUtils as y}from"@typescript-eslint/utils";import{AST_NODE_TYPES as e}from"@typescript-eslint/utils";import{P as o,match as t}from"ts-pattern";var u=y.RuleCreator(a=>`https://example.com/rule/${a}`),n=()=>{},w=u({create(a){return{MemberExpression:function(r){t(r).with({property:{type:e.Identifier,name:"exhaustive"}},i=>{t(i).with({object:{type:e.CallExpression,arguments:o.select("secondArgument"),callee:{property:{name:"with"},type:e.MemberExpression,object:{arguments:o.select("firstArgument"),type:e.CallExpression,callee:{property:{name:"with"},type:e.MemberExpression,object:{callee:{name:"match"}}}}}}},({firstArgument:s,secondArgument:l})=>{let[c]=l,[m]=s;t([m,c]).with([{type:e.Literal},{type:e.Literal}],([h,g])=>{t([h.raw,g.raw]).with(o.union(["true","false"],["false","true"]),()=>{a.report({node:r,messageId:"noFullyBooleanPatternMatching"})}).otherwise(n)})}).otherwise(n)}).otherwise(n),t(r).with({property:{type:e.Identifier,name:"otherwise"}},i=>{t(i).with({object:{type:e.CallExpression,arguments:o.select("firstArgument"),callee:{property:{name:"with"},type:e.MemberExpression,object:{callee:{name:"match"}}}}},({firstArgument:s})=>{let[l]=s;t(l).with({type:e.Literal,raw:o.union("true","false")},()=>{a.report({node:r,messageId:"noPartiallyBooleanPatternMatching"})})}).otherwise(n)}).otherwise(n)}}},name:"no-boolean-pattern-matching",meta:{type:"suggestion",messages:{noFullyBooleanPatternMatching:"F Boolean pattern matching is not allowed",noPartiallyBooleanPatternMatching:"P Boolean pattern matching is not allowed"},fixable:"code",schema:[],docs:{description:"Boolean pattern matching is not allowed",recommended:"error"}},defaultOptions:[]}),p=w;var b={noBooleanPatternMatching:p};export{b as rules};
