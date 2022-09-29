

/**
 * @description: 将5个属性拼接返回一个对象
 * @param {*} sel 选择器(div,p,span...)
 * @param {*} data 属性，样式等
 * @param {*} children 子元素
 * @param {*} text 文字
 * @param {*} elm 此元素对应的真实dom节点
 */
export default function(sel, data, children, text, elm) {
  return {
    sel,
    data,
    children,
    text,
    elm,
  }
}