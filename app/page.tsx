import React, {ReactElement} from "react";
import {generatePolicy, getRandomBigInt} from "@/app/generators";
import MaterialSyncAltIcon from "../public/material-sync-alt.svg";
import Image from "next/image";
import Link from "next/link";
import {amounts, Policy, stablecoins} from "@/app/common";
import {Card, Grid, Stack} from "@mui/material";


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
    // TODO @ferrodri, put total insured and total collateral by stablecoin here. See amounts() for the hacky way I split for the generators

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
            <Link href={"/subscribe?insured=" + insured.toString()}
                  className={"flex text-center contained-button text-2xl w-fit"}>
                {insured ? "Get Insured" : "Provide Collateral"}
            </Link>
        </div>
    </CardWithHeader>
}


const PolicyCard: React.FC<{
    policy: Policy
}> = ({policy}) => {
    return <Link href={`/policy/${policy.address.toString()}`}>
        <div className={"card action-card max-w-md justify-center space-y-4"} key={policy.address.toString()}>
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
        <Stack spacing={2}>
            {/*<div className={"card col-span-1 mt-8 space-y-8"}>*/}
            {/*    <div className={"contained-button"}>*/}
            {/*        Dashboard*/}
            {/*    </div>*/}
            {/*    <div className={"contained-button"}>*/}
            {/*        Pools*/}
            {/*    </div>*/}
            {/*</div>*/}
            <div className={"col-span-5 space-y-8"}>
                <p className={"text-5xl mt-16"}>Dashboard</p>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <InsuranceCollateralCard insured/>
                    </Grid>
                    <Grid item xs={6}>
                        <InsuranceCollateralCard insured={false}/>
                    </Grid>
                </Grid>
                {/*// TODO @ferrodri, put upcoming policies here*/}
                <p className={"text-5xl mt-16"}>Upcoming Policies</p>
                <Grid container spacing={2}>
                    <Grid item xs={4}>
                        <PolicyCard policy={generatePolicy()}/>
                    </Grid>
                    <Grid item xs={4}>
                        <PolicyCard policy={generatePolicy()}/>
                    </Grid>
                    <Grid item xs={4}>
                        <PolicyCard policy={generatePolicy()}/>
                    </Grid>
                </Grid>
                {/*// TODO @ferrodri, put active policies here*/}
                <p className={"text-5xl mt-16"}>Active Policies</p>
                <Grid container spacing={2}>
                    <Grid item xs={4}>
                        <PolicyCard policy={generatePolicy()}/>
                    </Grid>
                    <Grid item xs={4}>
                        <PolicyCard policy={generatePolicy()}/>
                    </Grid>
                    <Grid item xs={4}>
                        <PolicyCard policy={generatePolicy()}/>
                    </Grid>
                </Grid>
            </div>
        </Stack>
    )

}
