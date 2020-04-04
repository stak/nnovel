import { nnParser } from './parser'

function ok(v: any) {
  return {
    status: true,
    value: v,
  }
}

test('symbol', () => {
  const f = nnParser.symbol
  expect(f.parse('hoge')).toStrictEqual(ok({ symbol: 'hoge' }))
  expect(f.parse('a0123456789')).toStrictEqual(ok({ symbol: 'a0123456789' }))
  expect(f.parse('52').status).toStrictEqual(false)
  expect(f.parse('321prefixisfail').status).toStrictEqual(false)
  expect(f.parse('whitespace is fail').status).toStrictEqual(false)
  expect(f.parse('_underscoredisok')).toStrictEqual(
    ok({ symbol: '_underscoredisok' })
  )
  expect(f.parse('__')).toStrictEqual(ok({ symbol: '__' }))
  expect(f.parse('').status).toBe(false)
})

test('string', () => {
  const f = nnParser.string
  expect(f.parse('"aiueo"')).toStrictEqual(ok('aiueo'))
  expect(f.parse('""')).toStrictEqual(ok(''))
  expect(f.parse('"  this is text  "')).toStrictEqual(ok('  this is text  '))
  expect(f.parse('"\\"')).toStrictEqual(ok('\\'))
  expect(f.parse('"\\\\"')).toStrictEqual(ok('\\'))
  expect(f.parse('"\\\\\\\\\\\\"')).toStrictEqual(ok('\\\\\\'))
  expect(f.parse('"\\""')).toStrictEqual(ok('"'))
  expect(f.parse('"   \\"\\"   "')).toStrictEqual(ok('   ""   '))
  expect(f.parse('   \\"\\"   "').status).toBe(false)
  expect(f.parse('').status).toBe(false)
})

test('commandLine', () => {
  const f = nnParser.commandLine
  expect(f.parse('/cmd')).toStrictEqual(
    ok({
      name: 'cmd',
      args: [],
    })
  )
  expect(f.parse('/bg sky')).toStrictEqual(
    ok({ name: 'bg', args: [{ symbol: 'sky' }] })
  )
  expect(f.parse('/char 10 20')).toStrictEqual(
    ok({ name: 'char', args: [10, 20] })
  )
  expect(f.parse('/char       "hoge"        ')).toStrictEqual(
    ok({ name: 'char', args: ['hoge'] })
  )
  expect(f.parse('/_exp      hoge     "a b c"       0')).toStrictEqual(
    ok({ name: '_exp', args: [{ symbol: 'hoge' }, 'a b c', 0] })
  )
})

test('textLine', () => {
  const f = nnParser.textLine
  expect(f.parse('this is textline')).toStrictEqual(
    ok([
      { name: 'appendText', args: ['this is textline'] },
      { name: 'waitText', args: [] },
    ])
  )
  expect(f.parse('this@ is@ also\\ textline')).toStrictEqual(
    ok([
      { name: 'appendText', args: ['this'] },
      { name: 'waitText', args: [] },
      { name: 'waitClick', args: [] },
      { name: 'appendText', args: [' is'] },
      { name: 'waitText', args: [] },
      { name: 'waitClick', args: [] },
      { name: 'appendText', args: [' also'] },
      { name: 'waitText', args: [] },
      { name: 'waitClick', args: [] },
      { name: 'setText', args: [''] },
      { name: 'appendText', args: [' textline'] },
      { name: 'waitText', args: [] },
    ])
  )
})

test('nnParser', () => {
  const f = nnParser.nn
  expect(
    f.parse(`
/bg sky

Hello,@ hello world!\\
Today is Sunday. It's time to
/shake 10 20
SLEEP!`)
  ).toStrictEqual(
    ok([
      { name: 'bg', args: [{ symbol: 'sky' }] },
      { name: 'appendText', args: ['Hello,'] },
      { name: 'waitText', args: [] },
      { name: 'waitClick', args: [] },
      { name: 'appendText', args: [' hello world!'] },
      { name: 'waitText', args: [] },
      { name: 'waitClick', args: [] },
      { name: 'setText', args: [''] },
      { name: 'appendText', args: ["Today is Sunday. It's time to"] },
      { name: 'waitText', args: [] },
      { name: 'shake', args: [10, 20] },
      { name: 'appendText', args: ['SLEEP!'] },
      { name: 'waitText', args: [] },
    ])
  )
})
