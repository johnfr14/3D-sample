import React, { createContext, useEffect, useState } from "react"
import { useWeb3React } from "@web3-react/core";
// import { connectUser } from '../Lib/Utils';
import { formatEther } from "ethers/lib/utils";
import { BigNumber } from "ethers";

export type GeneralContextType = {
    signer?: any
    balance: string,
}

export const GeneralContext = createContext<GeneralContextType>({
    balance: "0.00",
})

export const GeneralProvider = (props: any) => {
    const signer = useWeb3React()
    const {account, library, chainId} = signer
    const [balance, setBalance] = useState<string>("")

    // If wallet detected, connect user
    // useEffect(() => {
    //     const userWindow: any = window
    //     if (userWindow.ethereum && !signer.active) setTimeout(() => connectUser(signer.activate), 500)
    // }, [signer.activate, signer.active])

    // get balance of user
    useEffect(() => {
        if (account && chainId === 80001) {
            try {
                library.getBalance(account)
                .then((result: BigNumber) => setBalance(formatEther(result)))
            } catch (error) {
                console.log(error)            
            }
        }
    }, [account, library, chainId])

  return (
    <GeneralContext.Provider value={{ signer, balance }}>
    {props.children}
    </GeneralContext.Provider>
  )
}
