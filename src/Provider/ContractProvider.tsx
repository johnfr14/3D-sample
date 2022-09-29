import { createContext } from "react"
import { ethers } from "ethers"
import { interfaces } from "../Lib/interfaces";

export type ContractContextType = {
  Fud: ethers.Contract | undefined,
  Fomo: ethers.Contract | undefined, 
  Alpha: ethers.Contract | undefined, 
  Kek: ethers.Contract | undefined,
}

export const ContractContext = createContext<ContractContextType>({
  Fud: undefined,
  Fomo: undefined, 
  Alpha: undefined, 
  Kek: undefined,
})

export const ContractProvider = (props: any) => {
  let Iwindow: any = window
    const provider = new ethers.providers.JsonRpcProvider("https://polygon-mumbai.g.alchemy.com/v2/wHrexNy09A28NIdtRXfCE-oJN5RMZxI7");
    const signer = provider.getSigner(Iwindow.ethereum.account)
    const Fud = new ethers.Contract("0x525152AC7CC61F21D820c0e08f9e4596c16723cE", interfaces.fud, signer)
    const Fomo = new ethers.Contract("0x9101c94e08a0B328F6bCdF8616A99Ce1a6E49fB5", interfaces.fomo, signer)
    const Alpha = new ethers.Contract("0x922DcB84f05bf40c66c77E4BFC12B4d139ba41c5", interfaces.alpha, signer)
    const Kek = new ethers.Contract("0x4e9Da2008Bb40e916B9Ea62d281CC9DB1F08516c", interfaces.kek, signer)

  
  return (
    <ContractContext.Provider value={{Fomo, Fud, Alpha, Kek}}>
    {props.children}
    </ContractContext.Provider>
  )
}
