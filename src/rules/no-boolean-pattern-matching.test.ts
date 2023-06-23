import noBooleanPatternMatching from './no-boolean-pattern-matching'
import { ESLintUtils } from '@typescript-eslint/utils'

const ruleTester = new ESLintUtils.RuleTester({
  parser: '@typescript-eslint/parser'
})

ruleTester.run('no-boolean-pattern-matching', noBooleanPatternMatching, {
  valid: [],
  invalid: [
    {
      code: `match(asdf)
    .with(true, ()=>{})
    .with(false, ()=>{})
    .exhaustive()`,
      errors: [{ messageId: 'noFullyBooleanPatternMatching' }]
    },
    {
      code: 'match(asdf).with(false, ()=>{}).with(true, ()=>{}).exhaustive()',
      errors: [{ messageId: 'noFullyBooleanPatternMatching' }]
    },
    {
      code: 'match(asdf).with(false, ()=>{}).otherwise()',
      errors: [{ messageId: 'noPartiallyBooleanPatternMatching' }]
    },
    {
      code: 'match(asdf).with(true, ()=>{}).otherwise()',
      errors: [{ messageId: 'noPartiallyBooleanPatternMatching' }]
    }
  ]
})
