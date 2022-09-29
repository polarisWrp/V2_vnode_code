import createDomNode from "./createDomNode"
import patchVnode from "./patchVnode"

/**
 * @description: 新旧vnode都有children属性的更新策略
 * @param {*} parentNode 父节点 
 * @param {*} oldChildren 旧的子元素 
 * @param {*} newChildren 新的子元素
 * 如何移动节点？只要插入一个已经在dom树上的节点，他就会被移动
 */
export default function updateChildren(
  parentNode,
  oldChildren,
  newChildren
) {
  // console.log('旧的。。', oldChildren)
  // console.log('新的。。', newChildren)
  let oldStartIdx = 0 //旧前下标
  let oldEndIdx = oldChildren.length - 1 //旧后下标
  let newStartIdx = 0 //新前下标
  let newEndIdx = newChildren.length - 1 //新后下标

  let oldStartVnode = oldChildren[0] //旧前节点
  let oldEndVnode = oldChildren[oldEndIdx] //旧后节点
  let newStartVnode = newChildren[0] //新前节点
  let newEndVnode = newChildren[newEndIdx] //新后节点

  let keyMap = {}

  // 旧前<=旧后 && 新前<= 新后
  while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
    // 略过已经标识为undefined的项
    if (oldStartVnode == null || oldChildren[oldStartIdx] == undefined) {
      oldStartVnode = oldChildren[++oldStartIdx]
    } else if (oldEndVnode == null || oldChildren[oldEndIdx] == undefined) {
      oldEndVnode = oldChildren[--oldEndIdx]
    } else if (newStartVnode == null || newChildren[newStartIdx] == undefined) {
      newStartVnode = newChildren[++newStartIdx]
    } else if (newEndVnode == null || newChildren[newEndIdx] == undefined) {
      newEndVnode = newChildren[--newEndIdx]
    } else if (checkSomeVnode(oldStartVnode, newStartVnode)) {
      console.log('【新前与旧前】命中')
      // 比较【新前与旧前】节点
      // 是同一个节点，通过patchVnode函数处理，接着比较下一个节点
      patchVnode(
        oldStartVnode,
        newStartVnode
      )
      // ++表示先计算加一
      oldStartVnode =
        oldChildren[++oldStartIdx]
      newStartVnode =
        newChildren[++newStartIdx]
    } else if (checkSomeVnode(oldEndVnode, newEndVnode)) {
      console.log('【新后与旧后】命中')
      // 【新后与旧后】
      patchVnode(oldEndVnode, newEndVnode)
      oldEndVnode = oldChildren[--oldEndIdx]
      newEndVnode = newChildren[--newEndIdx]
    } else if (checkSomeVnode(newEndVnode, oldStartVnode)) {
      console.log('【新后与旧前】命中')
      // 【新后与旧前】
      patchVnode(oldStartVnode, newEndVnode)
      // 新后与旧前命中（此时需要将新后指向的节点(旧前节点)移动至旧后的后面
      // console.log(oldEndVnode.elm)
      // parentNode.insertBefore(oldStartVnode.elm, oldEndVnode.elm.nextSibling())
        parentNode.insertBefore(oldStartVnode.elm, oldEndVnode.elm)
      newEndVnode = newChildren[--newEndIdx]
      oldStartVnode = oldChildren[++oldStartIdx]
    } else if (checkSomeVnode(newStartVnode, oldEndVnode)) {
      console.log('【新前与旧后】命中')
      // 【新前与旧后】命中，需要把旧后这个节点移动到旧前的前面
      patchVnode(oldEndVnode, newStartVnode)
      parentNode.insertBefore(oldEndVnode.elm, oldStartVnode.elm)
      oldEndVnode = oldChildren[--oldEndIdx]
      newStartVnode = newChildren[++newStartIdx]
    } else {
      // 都没有命中,将旧节点队列以key/value 形式存储至对象中
      // key为节点的key，value为节点下标
      for (let i = oldStartIdx; i <= oldEndIdx; i++) {
        const key = oldChildren[i].data.key
        if (key != undefined) {
          keyMap[key] = i
        }
      }
    
      // 存在则返回此节点的下标
      const idxOnold = keyMap[newStartVnode.data.key]
      // idxOnold不存在标识此项为新增的项，直接插入；
      // 存在则标识此项是已存在的，需要移动位置
      if (idxOnold != undefined) {
        const elmMove = oldChildren[idxOnold]
        patchVnode(elmMove, newStartVnode)
        // 处理完的项设置为undefined
        oldChildren[idxOnold] = undefined
        parentNode.insertBefore(elmMove.elm, oldStartVnode.elm)
      } else {
        // 新增插入,新增项是vnode；需要先创建dom
        parentNode.insertBefore(createDomNode(newStartVnode), oldStartVnode.elm)
      }
      // 新队列指针下移
      newStartVnode = newChildren[++newStartIdx]
    }
  } 

  // 循环结束，新对列还剩下节点，此时需要插入
  if (newStartIdx <= newEndIdx) {
    // 插入的标杆，此时相比于旧的节点还有新增的节点需要插入
    // const before = newChildren[newEndIdx + 1] == null ? null : newChildren[newEndIdx + 1].elm
    for (let i = newStartIdx; i <= newEndIdx; i++) {
      // insertBefore能够识别null,是null会自动排到队尾
      parentNode.insertBefore(createDomNode(newChildren[i]), oldChildren[oldStartIdx]?.elm)
         
    }
  } else if(oldStartIdx <= oldEndIdx) {
    // 旧节点队列有需要被删除的
    for (let i = oldStartIdx; i <= oldEndIdx; i++) {
      if (oldChildren[i]) 
        parentNode.removeChild(oldChildren[i].elm)
    }
  }
}

/**
 * @description: 判断两个虚拟节点是否相同
 * @param {*} a
 * @param {*} b
 * @return {*}
 */
export function checkSomeVnode(a, b) {
  return a.sel === b.sel && a.data.key === b.data.key
}