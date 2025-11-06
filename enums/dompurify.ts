export const SVG_TAGS = [
  "use", // SVG 引用
  "symbol", // SVG 符号定义
  "defs", // SVG 定义
  "clipPath", // 裁剪路径
  "mask", // 遮罩
  "pattern", // 图案填充
  "linearGradient", // 线性渐变
  "radialGradient", // 径向渐变
  "stop", // 渐变色标
  "foreignObject", // 嵌入 HTML（需谨慎）
]

export const SVG_ATTRS = [
  "xlink:href", // SVG 1.1 链接
  "href", // SVG 2.0 链接
  "data-*", // 自定义数据属性
  "clip-path", // 裁剪路径引用
  "mask", // 遮罩引用
  "fill", // 填充
  "stroke", // 描边
  "opacity", // 透明度
  "transform", // 变换
  "preserveAspectRatio", // 比例保持
  "target", // 链接目标
]
