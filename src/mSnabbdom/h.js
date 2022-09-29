
// 编写低配版本的h函数
// 调用形态只支持3种
/* 
  h('div', {}, '文字')
  h('div', {}, [])
  h('div', {}, h())
*/
import vnode from './vnode'

/**
 * @description: 
 * @param {*} sel 选择器
 * @param {*} data 属性，样式等
 * @param {*} c 
 */ 
export default function(sel, data, c) {
  if (arguments.length !== 3) 
    throw new Error('函数必须传入3个参数')
  if (typeof c === 'string' || typeof c === 'number') {
    //  h('div', {}, '文字')
    return vnode(sel, data, undefined, c, undefined)
  } else if (Array.isArray(c)) {
    // h('div', {}, [])
    // 收集子数据
    let children = []
    // 遍历数组，数组中的每一项必须是个对象
    for (let i = 0; i < c.length; i++) {
      if (!(typeof c[i] == 'object' && c[i].hasOwnProperty('sel')))      
        throw new Error('数组中的项不是h函数！')
      children.push(c[i])
    }
    // 返回结果
    return vnode(sel, data, children, undefined, undefined)
  } else if (typeof c == 'object' && c.hasOwnProperty('sel')) {
    // h('div', {}, h())
    let children = [c]
    return vnode(sel, data, children, undefined, undefined)
  } else {
    throw new Error('传入的第三个参数类型错误！')
  }
}