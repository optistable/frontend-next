'use client'
import {MenuItem, Select, TextField} from "@mui/material";
import {getRandomNumber} from "@/app/generators";
import React, {useState} from "react";
import {AddressLike} from "ethers";
import {useForm} from "react-hook-form";
import {Stablecoin, stablecoins} from "@/app/common";


type FormValues = {
    amount: number,
    insurerToken: AddressLike,
    collateralToken: AddressLike,
}

const StablecoinMenuItem = (stablecoin: Stablecoin, key: number, disableAddress ?: AddressLike) => {
    const disabled = stablecoin.address === disableAddress
    return <MenuItem value={stablecoin.address} key={key} disabled={disabled}>
        <div className={"flex items-center space-x-4"}>
            {stablecoin.icon(25, 25)}
            <p className={"text-xl"}>{stablecoin.symbol}</p>
        </div>
    </MenuItem>
}

export default function Subscribe() {
    const [amount, setAmount] = useState(0)


    const {register, handleSubmit, getValues, setValue, watch, formState, control} = useForm<FormValues>({
        defaultValues: {
            insurerToken: Object.values(stablecoins)[0].address,
            collateralToken: Object.values(stablecoins)[1].address,
        }
    });


    // TODO @ferrodri, subscribe to policy here
    const onSubmit = handleSubmit(async (data) => {
        console.log("Raw form values", data)
    })
    return (
        <div className={"flex flex-col items-center space-y-8 mt-16"}>
            <div className={"card max-w-xl space-y-4"}>
                <p className={"text-3xl mb-8"}>Subscribe to an upcoming policy</p>

                <TextField label={"Amount to insure"} sx={{backgroundColor: "#062b55", width: "70%"}}
                           {...register("amount", {required: true})}
                           error={!!formState.errors.amount}
                           onChange={(e) => setAmount(parseInt(e.target.value))}
                />

                <Select fullWidth label={"Token"}
                        labelId={"Token"}
                        {...register("insurerToken", {validate: (v) => v !== getValues("collateralToken")})}
                        error={!!formState.errors.insurerToken}
                        sx={{width: "30%", backgroundColor: "#062b55",}}
                >
                    {Object.values(stablecoins).map((v, i) => StablecoinMenuItem(v, i))}
                </Select>
                <TextField label={"Collateral"} sx={{backgroundColor: "#062b55", width: "70%"}}
                           disabled
                           value={amount}

                />
                <Select fullWidth label={"Token"}
                        labelId={"Token"}
                        {...register("insurerToken", {validate: (v) => v !== getValues("collateralToken")})}
                        error={!!formState.errors.insurerToken}
                        sx={{width: "30%", backgroundColor: "#062b55",}}
                >
                    {Object.values(stablecoins).map((v, i) => StablecoinMenuItem(v, i, getValues("insurerToken")))}
                </Select>

                {/*<input type={"text"} className={"test-input"}/>*/}
                <div className={"flex items-center justify-center text-4xl space-x-4"}>
                    <p className={"mr-16"}>Premium</p>
                    {stablecoins[getValues("insurerToken").toString()].icon(50, 50)}
                    <p>{getRandomNumber(100, 1000)}</p>
                </div>

                <p className={"text-2xl text-center"}>
                    Activates in {getRandomNumber(100, 1000)} blocks
                </p>
                <div className={"flex justify-center"}>
                    <button className={"contained-button text-xl3 m-auto"}>Subscribe</button>
                </div>
            </div>
        </div>
    )
}
