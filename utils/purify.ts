import DOMPurify from "dompurify"
import { SVG_ATTRS, SVG_TAGS } from "@/enums"

export function getSvgPurifyContent(content: string) {
  return DOMPurify.sanitize(content, {
    USE_PROFILES: { svg: true, svgFilters: true },
    ADD_TAGS: SVG_TAGS, // 允许额外的标签
    ADD_ATTR: SVG_ATTRS, // 允许额外的属性
  })
}
