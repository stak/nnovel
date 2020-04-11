import * as P from 'parsimmon'

function interpretEscapes(str: string) {
  const escapes: { [key: string]: string } = {
    b: '\b',
    f: '\f',
    n: '\n',
    r: '\r',
    t: '\t',
    '\\': '\\',
    '"': '"',
  }
  return str.replace(/\\(u[0-9a-fA-F]{4}|[^u])/g, (_, escape: string) => {
    const type = escape.charAt(0)
    const hex = escape.slice(1)
    if (type === 'u') {
      return String.fromCharCode(parseInt(hex, 16))
    }
    if (Object.prototype.hasOwnProperty.call(escapes, type)) {
      return escapes[type]
    }
    return type
  })
}

const inlineChars = '@\\'
const inlineCommands: { [key: string]: {} | {}[] } = {
  '@': {
    name: 'waitClick',
    args: [],
  },
  '\\': [
    {
      name: 'waitClick',
      args: [],
    },
    {
      name: 'setText',
      args: [''],
    },
  ],
}

export const nnParser = P.createLanguage({
  script: (r) => r.line.sepBy(P.newline).map((array) => array.flat()),

  line: (r) => P.alt(r.commandLine, r.textLine),

  textLine: (r) =>
    P.alt(r.inlineCommand, r.text)
      .many()
      .map((array) => array.flat()),

  inlineCommand: () => P.oneOf(inlineChars).map((char) => inlineCommands[char]),

  text: () =>
    P.regex(/[^@\\\r\n]+/)
      .map((s) => [
        {
          name: 'appendText',
          args: [s],
        },
        { name: 'waitText', args: [] },
      ])
      .desc('text'),

  commandLine: (r) =>
    P.string('/').then(
      P.seq(r.commandName, r.commandArgs).map(([name, args]) => ({
        name,
        args,
      }))
    ),
  commandName: () => P.regex(/[a-zA-Z_][a-zA-Z0-9_]*/).desc('commandName'),
  commandArgs: (r) =>
    P.alt(r.string, r.number, r.symbol)
      .sepBy(P.regex(/ */))
      .trim(P.regex(/ */)),

  symbol: () =>
    P.regex(/[a-zA-Z_][a-zA-Z0-9_]*/)
      .map((s) => ({
        symbol: s,
      }))
      .desc('symbol'),
  number: () =>
    P.regex(/-?[0-9]+(\.[0-9]+)?/)
      .map((s) => Number(s))
      .desc('number'),
  // from: https://github.com/jneen/parsimmon/blob/master/examples/json.js
  string: () =>
    P.regexp(/"((?:\\.|.)*?)"/, 1)
      .map(interpretEscapes)
      .desc('string'),
})
