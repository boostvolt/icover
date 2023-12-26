"use client"

import { Cog } from "lucide-react"
import { useTheme } from "next-themes"
import { FC, useCallback, useState } from "react"
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog"
import { Button } from "./ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"

export const SettingsMenu: FC = () => {
  const { setTheme, theme } = useTheme()
  const [open, setOpen] = useState(false)

  const handleAppearanceSelect = useCallback(() => {
    setTheme(theme === "light" ? "dark" : "light")
  }, [theme, setTheme])

  const handleAcknowledgmentSelect = useCallback(() => {
    setOpen(!open)
  }, [setOpen, open])

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary" title="Settings">
            <Cog className="h-5 w-5" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">
          <DropdownMenuItem onSelect={handleAppearanceSelect}>Switch Appearance</DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem onSelect={handleAcknowledgmentSelect}>Acknowledgments</DropdownMenuItem>
          <DropdownMenuItem disabled>v1.1.0</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog open={open} onOpenChange={handleAcknowledgmentSelect}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Acknowledgments</AlertDialogTitle>
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
