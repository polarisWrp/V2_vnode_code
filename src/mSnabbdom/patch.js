import createDomNode from './createDomNode'
import patchVnode from './patchVnode';
import vnode from "./vnode";

export default function(oldVnode, newVnode) {
  // 判断传入的旧节点是否为虚拟节点，是dom节点那么转为虚拟节点
  if (oldVnode.sel == '' || oldVnode.sel == undefined) 
    oldVnode = vnode(oldVnode.tagName.toLowerCase(), {}, [], undefined, oldVnode)
  
  // console.log(oldVnode)
  // 判断新旧虚拟节点是否为同一个节点
  if (oldVnode.data.key == newVnode.data.key && oldVnode.sel == newVnode.sel) {
    // 同一个节点
    patchVnode(oldVnode, newVnode)
  } else {
    // 不是同一个节点
    // 将虚拟dom转为真实dom
    const newVnodeElm = createDomNode(newVnode)
    // 插入到老节点之前
    if (oldVnode.elm && newVnodeElm) {
      oldVnode.elm.parentNode.insertBefore(
        newVnodeElm,
        oldVnode.elm
      )
      oldVnode.elm.parentNode.removeChild(
        oldVnode.elm
      )
    }

  }
}