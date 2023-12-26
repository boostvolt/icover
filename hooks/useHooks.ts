import html2canvas from "html2canvas"
import { RefObject, useCallback, useEffect } from "react"
import { adjustFontSize } from "@/lib/utils"

export const useDownloadCanvas = (elementId: string, filename: string): (() => void) => {
  return useCallback(() => {
    const element = document.getElementById(elementId)
    if (element) {
      html2canvas(element, { useCORS: true, allowTaint: true }).then((canvas) => {
        const link = document.createElement("a")
        link.download = filename
        link.href = canvas.toDataURL()
        link.click()
      })
    }
  }, [elementId, filename])
}

export const useAdjustFontSize = (ref: RefObject<HTMLDivElement>, watch: string, factor: number): void => {
  useEffect(() => {
    if (ref.current) {
      adjustFontSize(ref, factor)
    }
  }, [watch])
}
