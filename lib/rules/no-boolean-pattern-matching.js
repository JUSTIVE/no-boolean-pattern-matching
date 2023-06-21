module.exports = {
  meta: {
    name: 'no-boolean-pattern-matching',
    type:'suggestion',
    version: '0.0.1',
    messages:{
      noFullyBooleanPatternMatching:'F Boolean pattern matching is not allowed',
      noPartiallyBooleanPatternMatching:'P Boolean pattern matching is not allowed'
    },
    fixable: 'code',
    schema:[]
  },

  create: function(context) {
    return {
      MemberExpression: function(node) {
        if(node.property.name === 'exhaustive'){
          if(node.object.type==='CallExpression'&&node.object.callee.property.name==='with')
          if(node.object.callee.object.type==='CallExpression'&&node.object.callee.object.arguments[0])
          if(node.object.callee.object.callee.type==='MemberExpression'&&node.object.callee.object.callee.property.name==='with')
          if(node.object.callee.object.callee.object.type==='CallExpression'&&node.object.callee.object.callee.object.arguments[0])
          if(node.object.callee.object.callee.object.callee&&node.object.callee.object.callee.object.callee.name==='match')
          
          if (node.object.arguments[0].raw === "false" &&node.object.callee.object.arguments[0].raw === "true"
          ||node.object.arguments[0].raw === "true" &&node.object.callee.object.arguments[0].raw === "false")
            context.report({
              node:node,
              messageId:'noFullyBooleanPatternMatching'
            });
        }
        else if(node.property.name === 'otherwise'){
          if (node.object.type==="CallExpression" && node.object.callee.property.name === "with")
          if (node.object.arguments[0])
          if (node.object.arguments[0].raw == "false" || node.object.arguments[0].raw == "true")
            context.report({
              node:node,
              messageId:'noPartiallyBooleanPatternMatching'
            });
        }
      }
    }
  }
};
