import {AddressLike} from "ethers";
import React, {ReactElement} from "react";
import {generatePolicy, getRandomBigInt, getRandomElementFromArray} from "@/app/generators";
import USDCIcon from "../public/usdc.svg";
import USDTIcon from "../public/usdt.svg";
import DAIIcon from "../public/dai-logo.svg";
import MaterialSyncAltIcon from "../public/material-sync-alt.svg";
import Image, {StaticImageData} from "next/image";
import Link from "next/link";
import ChainlinkLogo from "../public/chainlink-logo.svg";
import CoingeckoLogo from "../public/coingecko.png";
import BaseLogo from "../public/base-logo.jpeg";
import LayerZeroLogo from "../public/layer-zero.svg";
import TheGraphLogo from "../public/the-graph-logo.svg";
import WaldoLogo from "../public/waldo.png";
import CarmenLogo from "../public/carmen-sandiego.png";
import RiddlerLogo from "../public/riddler.png";
import GarfieldLogo from "../public/garfield.png";
import HyperlaneLogo from "../public/hyperlane.png";

export type Policy = {
    address: AddressLike,
    insuredTokenAddress: AddressLike,
    collateralTokenAddress: AddressLike,
    insuredAmount: bigint,
    collateralAmount: bigint
}

export type OracleCommittee = {
    startingBlock: bigint,
    endingBlock: bigint,
    providers: AddressLike[],
    minProvidersForQuorum: number,
    providersReportingDepegs: number,
}

export type DataProvider = {
    symbol: string,
    address: AddressLike,
    logo: StaticImageData,
    title: ReactElement,
    lastBlockNum: bigint,
    depegTolerance: bigint,
    minBlocksToSwitchStatus: number,
    switchStatusCounter: number, //the current number of sequential depegs
    onChain: boolean,
    decimals: number,
    stableValue: bigint,
    lastObservation: bigint,
    depegged: boolean,
    oracleType: string //this is actually bytes32
}

type Stablecoin = {
    address: string,
    symbol: string,
    name: string,
    icon: (height: number, width: number) => ReactElement,
    color: string
}

// TODO: Make this a part of the theme
export const OPTIMISM_RED = "#FF0420";
export const dataProviderToLogo = (symbol: string): StaticImageData => {
    switch (symbol) {
        case "chainlink-price-feed":
            return ChainlinkLogo
        case "chainlink-base-ccip-price-feed":
            return BaseLogo
        case "coingecko":
            return CoingeckoLogo
        case "hyperlane":
            return HyperlaneLogo
        case "layerzero":
            return LayerZeroLogo
        case "the-graph":
            return TheGraphLogo
        default:
            return getRandomElementFromArray([WaldoLogo, CarmenLogo, RiddlerLogo, GarfieldLogo])
    }
}
export const dataProviderToTitle = (symbol: string): ReactElement => {
    switch (symbol) {
        case "chainlink-price-feed":
            return <Link href={"https://docs.chain.link/data-feeds"}>Chainlink Data Feeds</Link>
        case "chainlink-base-ccip-price-feed":
            return <div className={"flex"}><Link href={"https://docs.chain.link/ccip"}>Chainlink CCIP</Link> <Link
                href={"https://docs.base.org/"}> on Base </Link></div>
        case "coingecko":
            return <Link href={"https://www.coingecko.com/en"}>Coingecko</Link>
        case "hyperlane":
            return <Link href={"https://www.hyperlane.xyz/"}>Hyperlane</Link>
        case "layerzero":
            return <Link href={"https://www.layerzero.network/"}>LayerZero</Link>
        case "the-graph":
            return <Link href={"https://thegraph.com/"}>The Graph</Link>
        default:
            return <Link href={"https://www.youtube.com/watch?v=oHg5SJYRHA0"}>Unknown</Link>
    }
}

export const stablecoins: {
    [key: string]: Stablecoin
} = {
    "0x222e9a549274B796715a4af8a9BB96bC6EFCd13A": {
        address: "0x222e9a549274B796715a4af8a9BB96bC6EFCd13A", symbol: "USDC", name: "US Dollar Coin", icon: (height, width) =>
            <Image src={USDCIcon} height={height} width={width} alt={"USDC"}/>, color: "#3E73C4"
    },
    "0xECF58c7323C56290157675777d30A1E223db451a": {
        address: "0xECF58c7323C56290157675777d30A1E223db451a", symbol: "USDT", name: "Tether USD", icon: (height, width) =>
            <Image src={USDTIcon} height={height} width={width} alt={"USDT"}/>, color: "#6AAD97"
    },
    "0xC3c8f830DedF94D185250bA5ac348aC1455a0520": {
        address: "0xC3c8f830DedF94D185250bA5ac348aC1455a0520", symbol: "DAI", name: "I don't know what DAI stands for", icon: (height, width) =>
            <Image src={DAIIcon} height={height} width={width} alt={"DAI"}/>, color: "#F5AC37"
    },
    // GUSD: {address: "0x00000", symbol: "GUSD", name: "Gemini USD", icon: GUSDIcon},
    // USDP: {address: "0x00000", symbol: "USDP", name: "Paxos USD", icon: USDPIcon},
    // TUSD: {address: "0x00000", symbol: "TUSD", name: "True USD", icon: TUSDIcon},
    // USDD: {address: "0x00000", symbol: "USDD", name: "Decentralized USD", icon: USDDIcon},
    // BUSD: {address: "0x00000", symbol: "BUSD", name: "Binance USD", icon: BUSDIcon},
    // SEUR: {address: "0x00000", symbol: "SEUR", name: "Statis EUR", icon: SEURIcon},
}
const symbolToStablecoin: {
    [key: string]: Stablecoin
} = {
    "USDC": stablecoins["0x222e9a549274B796715a4af8a9BB96bC6EFCd13A"],
    "USDT": stablecoins["0xECF58c7323C56290157675777d30A1E223db451a"],
    "DAI": stablecoins["0xC3c8f830DedF94D185250bA5ac348aC1455a0520"]
}

const amounts = () => {
    const values = Object.values(stablecoins).map((stablecoin, index) => {
        return {
            symbol: stablecoin.symbol,
            color: stablecoin.color,
            amount: getRandomBigInt(7)
        }
    })
    const totalValue = values.reduce((acc, curr) => acc + curr.amount, BigInt(0))

    values.sort((a, b) => 0);


    let rem = 100n
    const elems = values.map((v, i) => {
        const widthVal = (v.amount * 100n / totalValue)
        const width = i == values.length - 1 ? `${rem}%` : `${widthVal}%`
        rem -= widthVal
        return <div style={{
            backgroundColor: v.color,
            width,
        }}></div>
    })
    console.log(elems)
    return elems

}

const CardWithHeader: React.FC<{
    headerText: string,
    children: ReactElement[]
}> = ({headerText, children}) => {
    return <div className={"card max-w-lg space-y-4"}>
        <p className={"card-header"}>{headerText}</p>
        {...children}
    </div>
}

const InsuranceCollateralCard: React.FC<{
    insured: boolean,
    policy?: Policy
}> = ({insured, policy}) => {
    return <CardWithHeader headerText={insured ? "Total Insured" : "Total Collateral"}>
        <div className={"space-y-4"}>
            <div className={"amount-bar"}>
                {...amounts()}
            </div>
            <p className={"text-4xl text-center"}>
                ${getRandomBigInt(7).toLocaleString()}
            </p>
        </div>
        <div className={"flex"} style={{justifyContent: "center"}}>
            <p className={"flex text-center contained-button text-2xl w-fit"}>
                {insured ? "Get Insured" : "Provide Collateral"}
            </p>
        </div>
    </CardWithHeader>
}


const PolicyCard: React.FC<{
    policy: Policy
}> = ({policy}) => {
    return <Link href={`/policy/${policy.address.toString()}`}>
        <div className={"card max-w-md justify-center space-y-4"} key={policy.address.toString()}>
            <div className={"flex justify-center space-x-4"}>
                <div>
                    {stablecoins[policy.insuredTokenAddress.toString()].icon(80, 0)}
                </div>
                <div className={"flex items-center"} style={{color: "#FFF"}}>
                    <Image src={MaterialSyncAltIcon} alt="sync" height={80} color={"white"}
                           className={"material-icons"}/>
                </div>
                <div>
                    {stablecoins[policy.insuredTokenAddress.toString()].icon(80, 0)}
                </div>
            </div>
            <p className={"text-4xl text-center"}>
                ${policy.insuredAmount.toLocaleString()}
            </p>
            <p className={"text-xl text-center"}>
                0/5 Depegged
            </p>
        </div>
    </Link>
}

export default function Home() {
    return (
        <div className={"grid grid-cols-6 gap-8"}>
            <div className={"card col-span-1 mt-8 space-y-8"}>
                <div className={"contained-button"}>
                    Dashboard
                </div>
                <div className={"contained-button"}>
                    Pools
                </div>
            </div>
            <div className={"col-span-5 space-y-8"}>
                <p className={"text-5xl mt-16"}>Dashboard</p>
                <div className={"grid grid-cols-2 gap-8"}>
                    <InsuranceCollateralCard insured/>
                    <InsuranceCollateralCard insured={false}/>
                    <InsuranceCollateralCard insured/>
                    <InsuranceCollateralCard insured={false}/>
                </div>
                <p className={"text-5xl mt-16"}>Active Policies</p>
                <div className={"grid grid-cols-3"}>
                    <PolicyCard policy={generatePolicy()}/>
                    <PolicyCard policy={generatePolicy()}/>
                    <PolicyCard policy={generatePolicy()}/>
                </div>
            </div>
        </div>
    )

}
