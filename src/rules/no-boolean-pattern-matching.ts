import { ESLintUtils } from '@typescript-eslint/utils'
import { AST_NODE_TYPES } from '@typescript-eslint/utils'
import { match } from 'ts-pattern'

const createRule = ESLintUtils.RuleCreator(
  (name) => `https://example.com/rule/${name}`
)

const ignore = () => {}

type MessageIds =
  | 'noFullyBooleanPatternMatching'
  | 'noPartiallyBooleanPatternMatching'
type Options = []

const noBooleanPatternMatching = createRule<Options, MessageIds>({
  create(context) {
    return {
      MemberExpression: function (node) {
        match(node)
          .with(
            {
              property: { type: AST_NODE_TYPES.Identifier, name: 'exhaustive' }
            },
            (exhaustiveExpression) => {
              match(exhaustiveExpression)
                .with(
                  {
                    object: {
                      type: AST_NODE_TYPES.CallExpression,
                      callee: { property: { name: 'with' } }
                    }
                  },
                  (secondCallExpression) => {
                    match(secondCallExpression)
                      .with({}, () => {
                        context.report({
                          node: node,
                          messageId: 'noFullyBooleanPatternMatching'
                        })
                      })
                      .otherwise(ignore)
                  }
                )
                .otherwise(ignore)
            }
          )
          .otherwise(ignore)

        // if (node.property.name === 'exhaustive') {
        // if (
        //   node.object.type === 'CallExpression' &&
        //   node.object.callee.property.name === 'with'
        // )

        // if (
        //   node.object.callee.object.type === 'CallExpression' &&
        //   node.object.callee.object.arguments[0]
        // )
        //   if (
        //     node.object.callee.object.callee.type === 'MemberExpression' &&
        //     node.object.callee.object.callee.property.name === 'with'
        //   )
        //     if (
        //       node.object.callee.object.callee.object.type ===
        //         'CallExpression' &&
        //       node.object.callee.object.callee.object.arguments[0]
        //     )
        //       if (
        //         node.object.callee.object.callee.object.callee &&
        //         node.object.callee.object.callee.object.callee.name === 'match'
        //       )
        //         if (
        //           (node.object.arguments[0].raw === 'false' &&
        //             node.object.callee.object.arguments[0].raw === 'true') ||
        //           (node.object.arguments[0].raw === 'true' &&
        //             node.object.callee.object.arguments[0].raw === 'false')
        //         )
        // context.report({
        //   node: node,
        //   messageId: 'noFullyBooleanPatternMatching'
        // })
        // } else if (node.property.name === 'otherwise') {
        //   if (
        //     node.object.type === 'CallExpression' &&
        //     node.object.callee.property.name === 'with'
        //   )
        //     if (node.object.arguments[0])
        //       if (
        //         node.object.arguments[0].raw == 'false' ||
        //         node.object.arguments[0].raw == 'true'
        //       )
        //         context.report({
        //           node: node,
        //           messageId: 'noPartiallyBooleanPatternMatching'
        //         })
        // }
      }
    }
  },
  name: 'no-boolean-pattern-matching',
  meta: {
    // version: '0.0.1',
    type: 'suggestion',
    messages: {
      noFullyBooleanPatternMatching:
        'F Boolean pattern matching is not allowed',
      noPartiallyBooleanPatternMatching:
        'P Boolean pattern matching is not allowed'
    },
    fixable: 'code',
    schema: [],
    docs: {
      description: 'Boolean pattern matching is not allowed',

      recommended: 'error'
    }
  },
  defaultOptions: []
})

export default noBooleanPatternMatching
