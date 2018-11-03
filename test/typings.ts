/* tslint:disable:no-unused-expression interface-over-type-literal */
import { immerge } from '../immerge'

type FooBar = { foobar: 'foobar' }
type Foo = { foo: 'foo' }
type Bar = { bar: 'bar' }
type Baz = { baz: 'baz' }
type Qux = { qux: 'qux' }
type Quux = { quux: 'quux' }
type Quuz = { quuz: 'quuz' }

const foobar: FooBar = { foobar: 'foobar' }
const foo: Foo = { foo: 'foo' }
const bar: Bar = { bar: 'bar' }
const baz: Baz = { baz: 'baz' }
const qux: Qux = { qux: 'qux' }
const quux: Quux = { quux: 'quux' }
const quuz: Quuz = { quuz: 'quuz' }

immerge(foobar).foobar
immerge(foobar, foobar).foobar

{
  const value = immerge(foobar, foo)
  value.foobar
  value.foo
}
{
  const value = immerge(foobar, foo, bar)
  value.foobar
  value.foo
  value.bar
}
{
  const value = immerge(foobar, foo, bar, baz)
  value.foobar
  value.foo
  value.bar
  value.baz
}
{
  const value = immerge(foobar, foo, bar, qux)
  value.foobar
  value.foo
  value.bar
  value.qux
}
{
  const value = immerge(foobar, foo, bar, qux)
  value.foobar
  value.foo
  value.bar
  value.qux
}
{
  const value = immerge(foobar, foo, bar, qux, quux)
  value.foobar
  value.foo
  value.bar
  value.qux
}
{
  type All = FooBar & Foo & Bar & Baz & Qux & Quux & Quuz
  const value = immerge<All>(foobar, foo, bar, qux, quux, quuz)
  value.foobar
  value.foo
  value.bar
  value.qux
}
