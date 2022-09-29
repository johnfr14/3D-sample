import "./style.css"
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Web3ReactProvider } from '@web3-react/core';
import { getLibrary } from './Lib/Utils';
import { GeneralProvider } from "./Provider/GeneralProvider";
import { ContractProvider } from "./Provider/ContractProvider";


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <>
    <Web3ReactProvider getLibrary={getLibrary}>
      <GeneralProvider>
        <ContractProvider>
          <App />
        </ContractProvider>
      </GeneralProvider>
    </Web3ReactProvider>
  </>
);

