import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs))
}

export const adjustFontSize = (textRef: React.RefObject<HTMLDivElement>, defaultFontSize: number) => {
  if (!textRef.current) return defaultFontSize

  const textElement = textRef.current
  let currentFontSize = defaultFontSize
  textElement.style.fontSize = `${currentFontSize}em`

  while (textElement.offsetWidth > 270) {
    currentFontSize -= 0.1
    textElement.style.fontSize = `${currentFontSize}em`
  }

  return currentFontSize
}
