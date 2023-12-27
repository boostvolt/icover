"use client"

import { CSSProperties, FC, ForwardedRef, forwardRef } from "react"
import { cn } from "@/lib/utils"
import AppleMusic from "./icons/apple-music"

interface CoverProps {
  gradient: string
  color: string
  isAppleMusicLogoVisible: boolean
  bigTitle: string
  subTitle: string
  footer: string
  isEdited: boolean
  bigTitleRef: ForwardedRef<HTMLDivElement>
  subTitleRef: ForwardedRef<HTMLDivElement>
  footerRef: ForwardedRef<HTMLDivElement>
}

interface CoverTextProps {
  isEdited: boolean
  text: string
  placeholder: string
  className?: string
}

const CoverText: FC<CoverTextProps & { ref?: ForwardedRef<HTMLDivElement> }> = forwardRef((props, ref) => (
  <div ref={ref} className={cn("whitespace-nowrap text-white", props.className)}>
    {props.isEdited ? props.text : props.placeholder}
  </div>
))
CoverText.displayName = "CoverText"

const absolutePosition = (top?: number, bottom?: number, left = 25): CSSProperties => ({
  position: "absolute",
  top,
  bottom,
  left,
})

export const Cover: FC<CoverProps> = (props) => {
  const imagePath = props.color === "" ? `gradients/${props.gradient}` : `colors/${props.color}`
  const coverTexts = [
    {
      ref: props.bigTitleRef,
      text: props.bigTitle,
      placeholder: "Big Title",
      className: "font-semibold",
      style: absolutePosition(55),
    },
    {
      ref: props.subTitleRef,
      text: props.subTitle,
      placeholder: "Sub Title",
      className: "font-thin",
      style: absolutePosition(105),
    },
    {
      ref: props.footerRef,
      text: props.footer,
      placeholder: "Footer",
      className: "text-opacity-60",
      style: absolutePosition(undefined, 25),
    },
  ]

  return (
    <div id="coverElement">
      <div style={{ width: 300, height: 300, position: "relative" }}>
        <img src={`/assets/${imagePath}.png`} alt="Cover Background" className="rounded-lg" />
        {props.isAppleMusicLogoVisible && (
          <div style={absolutePosition(10)}>
            <AppleMusic fontSize={60} color="white" fill="white" />
          </div>
        )}
        {coverTexts.map((textProps) => (
          <div style={textProps.style} key={textProps.placeholder}>
            <CoverText
              ref={textProps.ref}
              isEdited={props.isEdited}
              text={textProps.text}
              placeholder={textProps.placeholder}
              className={textProps.className}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
