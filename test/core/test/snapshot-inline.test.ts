import { expect, test } from 'vitest'

test('object', () => {
  expect({
    foo: {
      type: 'object',
      map: new Map(),
    },
  })
    .toMatchInlineSnapshot(`
      {
        "foo": {
          "map": Map {},
          "type": "object",
        },
      }
    `)
})

test('single line', () => {
  expect('inline string').toMatchInlineSnapshot('"inline string"')
})

test('multiline', () => {
  const indent = `
()=>
  array
    .map(fn)
    .filter(fn)
`
  expect(indent).toMatchInlineSnapshot(`
    "
    ()=>
      array
        .map(fn)
        .filter(fn)
    "
  `)
})

test('template literal', () => {
  const literal = `
  Hello \${world}
`
  expect(literal).toMatchInlineSnapshot(`
    "
      Hello \${world}
    "
  `)
})

test('throwing inline snapshots', () => {
  expect(() => {
    throw new Error('omega')
  }).toThrowErrorMatchingInlineSnapshot('"omega"')

  expect(() => {
    // eslint-disable-next-line no-throw-literal
    throw 'omega'
  }).toThrowErrorMatchingInlineSnapshot('"omega"')

  expect(() => {
    // eslint-disable-next-line no-throw-literal
    throw { error: 'omega' }
  }).toThrowErrorMatchingInlineSnapshot(`
    {
      "error": "omega",
    }
  `)
})

test('properties inline snapshot', () => {
  const user = {
    createdAt: new Date(),
    id: Math.floor(Math.random() * 20),
    name: 'LeBron James',
  }

  expect(user).toMatchInlineSnapshot({
    createdAt: expect.any(Date),
    id: expect.any(Number),
  }, `
    {
      "createdAt": Any<Date>,
      "id": Any<Number>,
      "name": "LeBron James",
    }
  `)
})
