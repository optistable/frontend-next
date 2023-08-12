'use client'
import {generateDataProvider, generateOracleCommittee, generatePolicy} from "@/app/generators";
import Image from "next/image";
import {DataProvider} from "@/app/common";
import {useEffect} from "react";


const hexToRgb = (hex: string) => {
    // Remove pound sign if present
    hex = hex.replace(/^#/, '');

    // Parse the hexadecimal components
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    return [r, g, b];
}

const transitionColors = (startColor: [number, number, number], endColor: [number, number, number], steps: number) => {

    const rStep = (endColor[0] - startColor[0]) / (steps - 1);
    const gStep = (endColor[1] - startColor[1]) / (steps - 1);
    const bStep = (endColor[2] - startColor[2]) / (steps - 1);

    const transitionColorsArray = [];

    for (let i = 0; i < steps; i++) {
        const r = Math.round(endColor[0] + i * rStep);
        const g = Math.round(endColor[1] + i * gStep);
        const b = Math.round(endColor[2] + i * bStep);

        const hexColor = `#${(r < 16 ? '0' : '') + r.toString(16)}${(g < 16 ? '0' : '') + g.toString(16)}${(b < 16 ? '0' : '') + b.toString(16)}`;

        transitionColorsArray.push(hexColor);
    }

    return transitionColorsArray;
}

const ProviderCard = ({provider}: { provider: DataProvider }) => {
    useEffect(() => {
        const fetchData = async () => {
            //TODO @ferrodri, re-fetch a provider's data here
        }
        const interval = setInterval(fetchData, 5000);
        return () => {
            clearInterval(interval);
        };
    }, [])
    return (<div className={"card w-3xl h-full"}>
    <div className={" justify-between text-center"}>

        <Image className={"m-auto"} src={provider.logo} height={80} alt={"logo"}/>
        <div className={"text-xl"}>{provider.title}</div>
        <div className={"text-xl"}>${provider.lastObservation?.toLocaleString()}</div>
        {/*TODO color hint when depegged vs depegged*/}
        <div className={"text-xl"} style={{color: provider.depegged ? "#ffa28a" : "#a3ff90"  }}>
            {provider.depegged ? "Depegged" : "Not Depegged"}
        </div>
    </div>
    </div>
    )
}
export default function Home({params}: {params: {policyId: string}}){

    // TODO @ferrodri, fetch policy, policy's oracle committee, and policy's data providers here
    // params.policyId for policy
    const policy = generatePolicy()
    const committee = generateOracleCommittee()
    const providers = [generateDataProvider("USDC"), generateDataProvider("USDT"), generateDataProvider("DAI")]
    const startColor = hexToRgb("#FF0000");
    const endColor = hexToRgb("#00FF00");
    const steps = 3; //TODO comes from policy


    console.log(`mix(#FF0000, #00FF00, ${(committee.providersReportingDepegs / committee.providers.length) * 100}%)`)
    console.log("TEST")
    return (
        <div className={"grid grid-cols-6 gap-8"}>
            <div className={"col-span-5 space-y-8"}>
                <p className={"text-5xl mt-16"} >Committee</p>
                <p className={"text-3xl mt-16"} style={{
                    color: `mix(#FF0000, #00FF00, ${(committee.providersReportingDepegs / committee.providers.length) * 100}%)`
                }}>
                    {committee.providersReportingDepegs}/{committee.providers.length} Depegged
                </p>

                <div className={"grid grid-cols-3 gap-8"}>
                    {providers.map((provider) => {
                        return (
                            <div className={"grid-cols-1"}>
                            <ProviderCard provider={provider}/>
                            </div>)
                    })}
                </div>
                <div className={"grid grid-cols-3"}>
                </div>

            </div>
        </div>
    )

}
