"use client"

import { FC } from "react"
import { SettingsMenu } from "./settings-menu"
import { Button } from "./ui/button"
import { CardHeader, CardTitle } from "./ui/card"

interface HeaderProps {
  onDownloadClick: () => void
}

export const Header: FC<HeaderProps> = (props) => (
  <CardHeader>
    <div className="flex w-full items-center justify-between">
      <div className="flex items-center space-x-4">
        <CardTitle>iCover</CardTitle>
      </div>

      <div className="flex space-x-4">
        <Button variant="secondary" onClick={props.onDownloadClick}>
          Download
        </Button>
        <SettingsMenu />
      </div>
    </div>
  </CardHeader>
)
