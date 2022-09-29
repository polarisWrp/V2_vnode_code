import createDomNode from "./createDomNode"
import updateChildren from "./updateChildren"

/**
 * @description: 对比两个虚拟节点是否相同
 * @param {*} oldVnode
 * @param {*} newVnode
 */
export default function patchVnode(oldVnode, newVnode) {
  // 新旧vnode是同一个对象，即所有属性都相同则不处理
  if (oldVnode === newVnode) return

  // 【newVnode有text属性且没有(children)子节点】
  if (
    newVnode.text != undefined &&
    (newVnode.children == undefined ||
      !newVnode.children.length)
  ) {
    // newVnode的text属性与oldVnode的text不相同
    if ( newVnode.text != oldVnode.text ) {
      // newVnode中的text直接替换旧vnode.elm的innerText（此操作会把text与children一并删除）
      oldVnode.elm.innerText =
        newVnode.text
    }
      
  } else {
    // 【newVnode没有text属性且存在children属性】
    // 判断oldVnode是否存在children
    if (
      oldVnode.children != undefined &&
      oldVnode.children.length
    ) {
      // newVnode和oldVnode都存在children
      // 需要进行精细化比较
      updateChildren(oldVnode.elm, oldVnode.children, newVnode.children)     
    } else {
      // oldVnode没有children，newVnode存在children属性
      // 清空旧dom节点的内容，oldVnode.elm
      oldVnode.elm.innerHTML = ''
      // 遍历newVnode子节点，创建dom且上树
      for (
        let i = 0;
        i < newVnode.children.length;
        i++
      ) {
        const dom = createDomNode(
          newVnode.children[i]
        )
        oldVnode.elm.appendChild(dom)
      }
    }
  }
}