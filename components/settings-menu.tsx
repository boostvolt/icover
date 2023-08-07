"use client"

import { Cog } from "lucide-react"
import { useTheme } from "next-themes"
import { FC, useState } from "react"
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog"
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarSeparator, MenubarTrigger } from "./ui/menubar"

interface SettingsMenuProps {
  downloadOnClick: () => void
}

export const SettingsMenu: FC<SettingsMenuProps> = ({ downloadOnClick }) => {
  const { setTheme, theme } = useTheme()
  const [isAckknowledgmentsOpen, setAckknowledgmentsOpen] = useState(false)

  return (
    <>
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger onClick={downloadOnClick}>Download</MenubarTrigger>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger title="Settings">
            <Cog className="h-5 w-5" />
          </MenubarTrigger>
          <MenubarContent>
            <MenubarItem onClick={() => setTheme(theme === "light" ? "dark" : "light")}>Switch Appearance</MenubarItem>
            <MenubarSeparator />
            <MenubarItem onClick={() => setAckknowledgmentsOpen(true)}>Acknowledgments</MenubarItem>
            <MenubarItem disabled>v1.0.1</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
      <AlertDialog
        open={isAckknowledgmentsOpen}
        onOpenChange={(isAckknowledgmentsOpen) => {
          if (isAckknowledgmentsOpen === true) return
          setAckknowledgmentsOpen(false)
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle> Acknowledgments</AlertDialogTitle>
            <AlertDialogDescription>
              We are deeply inspired by the creativity and innovation of countless individuals and projects, which have
              fueled our own endeavors and shaped the direction of this work.
              <ul className="mt-4 space-y-1">
                <li>
                  <a
                    href="https://amac.zephra.org"
                    target="_blank"
                    rel="noreferrer"
                    className="font-medium underline underline-offset-4"
                  >
                    Amac
                  </a>
                </li>
                <li>
                  <a
                    href="https://coverx.vercel.app"
                    target="_blank"
                    rel="noreferrer"
                    className="font-medium underline underline-offset-4"
                  >
                    CoverX
                  </a>
                </li>
                <li>
                  <a
                    href="https://apps.apple.com/en/app/denim-playlist-cover-maker/id1532250420"
                    target="_blank"
                    rel="noreferrer"
                    className="font-medium underline underline-offset-4"
                  >
                    Denim
                  </a>
                </li>
              </ul>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Close</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
