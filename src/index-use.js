
/* 
  使用h函数
*/
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
const vnode1 = h(
  'a',
  {
    props: {
      href: 'www.baidu.com',
      target: '_blank',
    },
  },
  '北极星'
)
// 创建虚拟节点
const vnode2 = h(
  'div',
  { class: {'box': true} },
  '我是北极星'
)

const vnode3 = h('ul', [
  h('li', '苹果'),
  h('li', '句子'),
  h('li', '苹果'),
  h('li', [
    h('li', '苹果儿子'),
    h('div', [
      h('p', 'hh')
    ]),
  ]),
])

const container =
  document.getElementById('container')
// 让虚拟节点上树
patch(container, vnode3)

// const patch = init([
//   // Init patch function with chosen modules
//   classModule, // makes it easy to toggle classes
//   propsModule, // for setting properties on DOM elements
//   styleModule, // handles styling on elements with support for animations
//   eventListenersModule, // attaches event listeners
// ])

// const container =
//   document.getElementById('container')

// const vnode = h(
//   'div#container.two.classes',
//   { on: { click: function(){} } },
//   [
//     h(
//       'span',
//       { style: { fontWeight: 'bold' } },
//       'This is bold'
//     ),
//     ' and this is just normal text',
//     h(
//       'a',
//       { props: { href: '/foo' } },
//       "I'll take you places!"
//     ),
//   ]
// )
// // Patch into empty DOM element – this modifies the DOM as a side effect
// patch(container, vnode)

// const newVnode = h(
//   'div#container.two.classes',
//   {
//     on: { click: function(){} },
//   },
//   [
//     h(
//       'span',
//       {
//         style: {
//           fontWeight: 'normal',
//           fontStyle: 'italic',
//         },
//       },
//       'This is now italic type'
//     ),
//     ' and this is still just normal text',
//     h(
//       'a',
//       { props: { href: '/bar' } },
//       "I'll take you places!"
//     ),
//   ]
// )
// // Second `patch` invocation
// patch(vnode, newVnode) // Snabbdom efficiently updates the old view to the new state
