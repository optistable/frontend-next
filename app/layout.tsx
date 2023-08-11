"use client";

import './globals.css'
import "./index.scss"
import type {Metadata} from 'next'
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
                <AppBar position={"static"}>
                    <Container>

                    <Toolbar>
                        <Link href="/" className={"flex space-x-4"}>
                            <Image src={OptistableLogo} alt="Optistable" height={60}/>
                            <div className={"flex title items-center"} style={{
                                textTransform: "uppercase",
                            }}>
                                <p className={"optimism-color"}>OP</p>
                                <p className={"text-white"}>TISTABLE</p>
                            </div>
                        </Link>
                        <div className={"nav-link flex"} style={{border: "1px solid red", height: "100%"}}>
                            <Link href={"/subscribe"}>
                                Get Insured
                            </Link>
                        </div>

                        {/* TODO @ferrodri, connect to wallet button here*/}
                        {/*{account &&*/}
                        {/*    <img style={{maxWidth: 40, marginLeft: "auto"}}*/}
                        {/*         src={jazziconImageString(account)}*/}
                        {/*         onError={(e) => fallbackToJazzicon(e, account || "")}/>}*/}
                        {/*<Tooltip title={tooltipText} placement={"bottom"} disableHoverListener={tooltipText === ""}>*/}
                        {/*    {isActive ?*/}
                        {/*        <Button variant={"contained"} color={"secondary"}*/}
                        {/*                sx={{marginLeft: 1, textTransform: "none"}}*/}
                        {/*                onClick={disconnectWallet}*/}
                        {/*                startIcon={connectIcon}>*/}
                        {/*            {account?.slice(0, 6) + "..." + account?.slice(account.length - 4, account.length)}*/}
                        {/*        </Button> : <Button variant={"contained"}  style={{marginLeft: "auto"}}*/}
                        {/*                            onClick={connectWallet}*/}
                        {/*                            startIcon={connectIcon}>*/}
                        {/*            Connect*/}
                        {/*        </Button>*/}
                        {/*    }*/}
                        {/*</Tooltip>*/}
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
