/**
 * @description: 创建真实dom节点并返回,存在子虚拟节点则递归创建子节点并上父级树
 * @param {*} vnode 接收传入的新的虚拟节点
 * @return {*} (domNode === vnode.elm) 真实dom节点
 */
export default function createDomNode(vnode) {
  // 创建一个dom节点
  const domNode =
    document.createElement(vnode.sel)
  // 判断该节点是存在子节点还是只有文本内容
  if (
    vnode.text != '' &&
    (vnode.children == undefined ||
      !vnode.children.length)
  ) {
    // 文本
    domNode.innerText = vnode.text
  } else if (
    Array.isArray(vnode.children) &&
    vnode.children.length
  ) {
    // 内部是子节点，递归创建子节点
    for (
      let i = 0;
      i < vnode.children.length;
      i++
    ) {
      // 获取每个子虚拟节点
      const ch = vnode.children[i]
      // 转为真实dom
      const chDom = createDomNode(ch)
      // 上父级树
      domNode.appendChild(chDom)
    }
  }
  // 给vnode补充elm属性(真实dom节点)
  vnode.elm = domNode

  // 返回真实dom
  return domNode
}