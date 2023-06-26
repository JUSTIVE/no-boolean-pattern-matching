import { ESLintUtils } from '@typescript-eslint/utils'
import { AST_NODE_TYPES } from '@typescript-eslint/utils'
import { P, match } from 'ts-pattern'

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
            (exhaustiveMemberExpression) => {
              match(exhaustiveMemberExpression)
                .with(
                  {
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
                              callee: {
                                name: 'match'
                              }
                            }
                          }
                        }
                      }
                    }
                  },
                  ({ firstArgument, secondArgument }) => {
                    const [secondBoolean] = secondArgument
                    const [firstBoolean] = firstArgument
                    match([firstBoolean, secondBoolean]).with(
                      [
                        { type: AST_NODE_TYPES.Literal },
                        { type: AST_NODE_TYPES.Literal }
                      ],
                      ([first, second]) => {
                        match([first.raw, second.raw])
                          .with(
                            P.union(['true', 'false'], ['false', 'true']),
                            () => {
                              context.report({
                                node: node,
                                messageId: 'noFullyBooleanPatternMatching'
                              })
                            }
                          )
                          .otherwise(ignore)
                      }
                    )
                  }
                )
                .otherwise(ignore)
            }
          )
          .otherwise(ignore)

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
