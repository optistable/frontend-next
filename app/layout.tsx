"use client";

import './globals.css'
import "./index.scss"
import {Poppins} from "next/font/google";
import Link from "next/link";
import OptistableLogo from "../public/logo.svg"
import Image from "next/image";


import {createTheme} from "@mui/material/styles";
import {AppBar, Container, CssBaseline, ThemeProvider, Toolbar} from "@mui/material";


const theme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#09FBD3',
        },
        secondary: {
            main: '#B76CFD',
        },
        background: {
            default: '#0D0B1C',
        },
    },
    spacing: 8
})


const poppins = Poppins({
    subsets: ["latin"],
    weight: "400"
})
//
// export const metadata: Metadata = {
//     title: 'Optistable',
// }

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <body className={poppins.className} style={{backgroundColor: "#000"}}>
            <header>

                {/*<nav*/}
                {/*    className="*/}
                {/*    flex*/}
                {/*    flex-wrap*/}
                {/*    items-center*/}
                {/*    justify-between*/}
                {/*    w-full*/}
                {/*    /!*md:py-0*!/*/}
                {/*    px-4*/}
                {/*    py-2*/}
                {/*    text-lg*/}
                {/*    bg-secondary*/}
                {/*"*/}
                {/*>*/}
                <AppBar position={"static"} className={"bg-secondary"}>
                    <Container>
                        <Toolbar className={"flex space-x-4 h-1 border-l-2"}>
                            <Link href="/" className={"flex space-x-1.5 h-full ml-0"}>
                                <Image src={OptistableLogo} alt="Optistable" height={45}/>
                                <div className={"flex title items-center"} style={{
                                    textTransform: "uppercase",
                                }}>
                                    <p className={"optimism-color font-bold"}>OP</p>
                                    <p className={"text-white font-bold"}>TISTABLE</p>
                                </div>
                            </Link>
                            <div className={"nav-link flex items-center p-2"} style={{height: "100%"}}>
                                <Link href={"/subscribe"}>
                                    Get Insured
                                </Link>
                            </div>

                        </Toolbar>
                    </Container>
                </AppBar>
                {/*</nav>*/}
            </header>
            <Container>
                {children}
            </Container>
            </body>
        </ThemeProvider>
        </html>
    )
}
