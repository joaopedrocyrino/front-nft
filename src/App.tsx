import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import cyrinoNFTabi from "./CyrinoNFT.json";

export default function App() {
  const [toAddress, settoAddress] = useState<string>();
  const [isOwner, setisOwner] = useState<boolean>(false);

  useEffect(() => {
    async function load() {
      // @ts-ignore
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const accounts = await provider.send("eth_requestAccounts", []) as string[];

      const signer = await provider.getSigner();

      const nftContract = new ethers.Contract('0x2A94dFc936Db88B1c28c639d4507A5c4ED36ed80', cyrinoNFTabi, signer);

      const owner = await nftContract.getCollectionOwner();

      if (owner === accounts[0]) {
        setisOwner(true);
      }
    }

    load();
  }, []);

  // @ts-ignore
  const mint = async (e) => {
    e.preventDefault();

    // @ts-ignore
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const accounts = await provider.send("eth_requestAccounts", []) as string[];

    const signer = await provider.getSigner();

    const nftContract = new ethers.Contract('0x2A94dFc936Db88B1c28c639d4507A5c4ED36ed80', cyrinoNFTabi, signer);

    nftContract.mint(toAddress);
  }

  return (
    <div style={{
      display: 'flex',
      width: '100vw',
      height: '100vh',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      {isOwner ? <>
        <input value={toAddress} onChange={e => settoAddress(e.target.value)} />
        <button style={{ cursor: 'pointer' }} onClick={mint}>mint nft</button>
      </>
        :
        <p>Only collections owner can interact with the contract</p>}
    </div>
  );
}
