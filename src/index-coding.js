
/* 
  手写的h函数
*/
import h from './mSnabbdom/h'

// const vnode = h('div', {}, '北极星')

const vnode = h('div', {}, [
  h('p', {}, '好好'),
  h('p', {}, 'pp'),
  h('p', {}, [
    h('span', {}, 'kkk1'),
    h('span', {}, 'kkk2'),
  ]),
])
const vnode1 = h('div', {}, [
  h('p', {}, '好好'),
  h('p', {}, 'pp'),
  h('p', {}, [
    h('span', {}, 'kkk1'),
    h('span', {}, 'kkk2'),
  ]),
])

console.log(vnode1, '00000')