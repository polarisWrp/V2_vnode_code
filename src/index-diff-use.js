import {
  init,
  classModule,
  propsModule,
  styleModule,
  eventListenersModule,
  h,
} from 'snabbdom'

// 创建patch函数
const patch = init([
  classModule,
  propsModule,
  styleModule,
  eventListenersModule,
])
// 创建虚拟节点
const vnode1 = h('ul', [
  h('li', { key: 'A' }, 'A'),
  h('li', { key: 'B' }, 'B'),
  h('li', { key: 'C' }, 'C'),
  h('li', { key: 'D' }, 'D'),
])
const container =
  document.getElementById('container')
// 让虚拟节点上树
patch(container, vnode1)

// 这时候因为没有key值会全部替换dom元素
const vnode2 = h('ul', [
  h('li', {key: 'E'}, 'E'),
  h('li', {key: 'A'}, 'A'),
  h('li', {key: 'B'}, 'B'),
  h('li', {key: 'C'}, 'C'),
  h('li', {key: 'D'}, 'D'),
  // h('li', {}, 'E'),
])


// 跨层级比较会直接删除旧的dom再新增
const vnode3 = h(
  'ul',
  {},
  h('span', {}, [
    h('li', { key: 'A' }, 'A'),
    h('li', { key: 'B' }, 'B'),
    h('li', { key: 'C' }, 'C'),
    h('li', { key: 'D' }, 'D'),
  ])
)

const btn = document.getElementById('btn')
btn.onclick = function() {
  // 最小量更新，控制台修改li标签内容，点击修改之后之前写的内容不变并且新增了E
  patch(vnode1, vnode3)
}