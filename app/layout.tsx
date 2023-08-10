import './globals.css'
import "./index.scss"
import type {Metadata} from 'next'
import {Poppins} from "next/font/google";
import {TitleText} from "@/app/common";

const poppins = Poppins({
    subsets: ["latin"],
    weight: "400"
})

export const metadata: Metadata = {
    title: 'Create Next App',
    description: 'Generated by create next app',
}

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">

        <body className={poppins.className} style={{backgroundColor: "#0D0B1C"}}>
        <header>
            <nav
                className="
          flex flex-wrap
          items-center
          justify-between
          w-full
          {/*md:py-0*/}
          px-4
          py-4
          text-lg text-gray-700
          bg-black
        "
            >
                {/*<a href="#">*/}
                    <TitleText/>

                {/*</a>*/}
            </nav>
        </header>
            {children}
        </body>
        </html>
    )
}
