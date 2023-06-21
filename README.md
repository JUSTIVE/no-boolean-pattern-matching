# eslint-plugin-no-boolean-ts-pattern

recommend ternary expression over pattern matching boolean values

## Installation

You'll first need to install [ESLint](https://eslint.org/):

```sh
npm i eslint --save-dev
```

Next, install `eslint-plugin-no-boolean-ts-pattern`:

```sh
npm install eslint-plugin-no-boolean-ts-pattern --save-dev
```

## Usage

Add `no-boolean-ts-pattern` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "no-boolean-ts-pattern"
    ]
}
```


Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "no-boolean-ts-pattern/rule-name": 2
    }
}
```

## Rules

<!-- begin auto-generated rules list -->
TODO: Run eslint-doc-generator to generate the rules list.
<!-- end auto-generated rules list -->


