"use client"

import { FC } from "react"
import { CardFooter } from "./ui/card"

export const Footer: FC = () => (
  <CardFooter>
    <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
      Built by{" "}
      <a
        href="https://github.com/boostvolt"
        target="_blank"
        rel="noreferrer"
        className="font-medium underline underline-offset-4"
      >
        Boostvolt
      </a>
      . The source code is available on{" "}
      <a
        href="https://github.com/boostvolt/i-cover"
        target="_blank"
        rel="noreferrer"
        className="font-medium underline underline-offset-4"
      >
        GitHub
      </a>
      .
    </p>
  </CardFooter>
)
