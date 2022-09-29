import h from './mSnabbdom/h'
import patch from './mSnabbdom/patch'

// const vnode = h('ul', {}, '北极星')
// const vnode1 =  h('ul', {}, [
//     h('li', { key: 'A' }, 'A'),
//     h('li', { key: 'B' }, 'B'),
//   ])

// const vnode = h('section', {}, [
//   h('p', {key: 'A'}, 'A'),
//   h('p', {key: 'B'}, 'B'),
//   h('p', {key: 'C'}, 'C'),
// ])

// const vnode1 = h('section', {}, [
//   h('p', { key: 'A' }, 'A'),
//   h('p', { key: 'B' }, 'B'),
//   h('p', { key: 'C' }, 'C'),
//   h('p', { key: 'D' }, 'D'),
//   h('p', { key: 'E' }, 'E'),
// ])


// const vnode = h('ul', {}, [
//   h('li', { key: 'A' }, 'A'),
//   h('li', { key: 'B' }, 'B'),
//   h('li', { key: 'C' }, 'C'),
//   h('li', { key: 'D' }, 'D'),
//   h('li', { key: 'E' }, 'E'),
// ])

// const vnode1 = h('ol', {}, [
//   h('li', { key: 'A' }, 'A'),
//   h('li', { key: 'B' }, 'B'),
//   h('li', { key: 'E' }, 'E'),
//   h('li', { key: 'Q' }, 'QBBBB'),
// ])


const vnode2 = h('section', {}, [
  h('p', { key: 'A' }, 'A'),
  h('p', { key: 'C' }, 'C'),
])

const vnode1 = h('section', {}, [
  h('p', { key: 'C' }, 'C感觉很积极'),
  h('p', { key: 'B' }, 'B'),
  h('p', { key: 'A' }, 'Ahhh'),
  // h('p', { key: 'D' }, 'D'),
  // h('p', { key: 'E' }, 'E'),
])

// const vnode1 = h('section', {}, 'nihao,beijjx')

const container = document.getElementById('container')
const btn = document.getElementById('btn')

// 让虚拟节点上树
patch(container, vnode2)

btn.onclick = function() {
  patch(vnode2, vnode1)
  // console.log(container.innerHTML = 'kkk')
  // console.log(container.innerText = '大白')
}