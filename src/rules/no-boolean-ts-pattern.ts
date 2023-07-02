import { ESLintUtils } from '@typescript-eslint/utils'
import { AST_NODE_TYPES } from '@typescript-eslint/utils'
import { P, match } from 'ts-pattern'
import escodegen from 'escodegen'

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
      CallExpression: function (node){
        match(node)
          .with({
            callee:{
              type:AST_NODE_TYPES.MemberExpression,
              property:{name:'exhaustive'},
              object: {
                type: AST_NODE_TYPES.CallExpression,
                arguments: P.select('secondArgument'),
                callee: {
                  property: { name: 'with' },
                  type: AST_NODE_TYPES.MemberExpression,
                  object: {
                    arguments: P.select('firstArgument'),
                    type: AST_NODE_TYPES.CallExpression,
                    callee: {
                      property: { name: 'with' },
                      type: AST_NODE_TYPES.MemberExpression,
                      object: {
                        type: AST_NODE_TYPES.CallExpression,
                        callee: {
                          name: 'match'
                        },
                        arguments: [P.select('condition')]
                      }
                    }
                  }
                }
              }
            }
          },({firstArgument,secondArgument,condition}) => {
            

            const [secondBoolean,secondAssignment] = secondArgument
            const [firstBoolean,firstAssignment] = firstArgument
            match([firstBoolean, secondBoolean]).with(
              [
                { type: AST_NODE_TYPES.Literal },
                { type: AST_NODE_TYPES.Literal }
              ],
              ([first, second]) => {
                match([first.raw, second.raw])
                  .with(['true', 'false'], () => {
                    context.report({
                      node: node,
                      messageId: 'noFullyBooleanPatternMatching',
                      fix: (fixer) => {
                        return fixer.replaceText(node, 
`${escodegen.generate(condition)}\n\t?${escodegen.generate(secondAssignment)}\n\t:${escodegen.generate(firstAssignment)}`)
                      }
                    })
                  })
                  .with(['false', 'true'], () => {
                    context.report({
                      node: node,
                      messageId: 'noFullyBooleanPatternMatching',
                      fix: (fixer) => {
                        return fixer.replaceText(node, 
                          `${escodegen.generate(condition)}\n\t?${escodegen.generate(firstAssignment)}\n\t:${escodegen.generate(secondAssignment)}`)
                      }
                    })
                      
                    })
                  
                  .otherwise(ignore)
              }
            )
          })
          .otherwise(ignore)
      },

      MemberExpression: function (node) {

        match(node)
          .with(
            {
              property: { type: AST_NODE_TYPES.Identifier, name: 'otherwise' }
            },
            (exhaustiveMemberExpression) => {
              match(exhaustiveMemberExpression)
                .with(
                  {
                    object: {
                      type: AST_NODE_TYPES.CallExpression,
                      arguments: P.select('firstArgument'),
                      callee: {
                        property: { name: 'with' },
                        type: AST_NODE_TYPES.MemberExpression,
                        object: {
                          callee: {
                            name: 'match'
                          }
                        }
                      }
                    }
                  },
                  ({ firstArgument }) => {
                    const [firstBoolean] = firstArgument
                    match(firstBoolean).with(
                      {
                        type: AST_NODE_TYPES.Literal,
                        raw: P.union('true', 'false')
                      },
                      () => {
                        context.report({
                          node: node,
                          messageId: 'noPartiallyBooleanPatternMatching'
                        })
                      }
                    )
                  }
                )
                .otherwise(ignore)
            }
          )
          .otherwise(ignore)
      }
    }
  },
  name: 'no-boolean-pattern-matching',
  meta: {
    // version: '0.0.1',
    type: 'suggestion',
    messages: {
      noFullyBooleanPatternMatching:
        '불리언 값에 대한 패턴 매칭은 권장되지 않습니다. 삼항연산자로 대체해주세요',
      noPartiallyBooleanPatternMatching:
        '불리언 값에 대한 패턴 매칭은 권장되지 않습니다. 삼항연산자로 대체해주세요'
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
