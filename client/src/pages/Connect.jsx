import React, { useState } from 'react';
import { ArrowBack, Wallet } from "@mui/icons-material";
import { ethers } from 'ethers';
import Register from '../components/Register';
import ABI from "./ABI.json";
import { Link } from 'react-router-dom';
const Connect = ({saveState}) => {
  const contract_address = import.meta.env.VITE_CONTRACT_ADDRESS;



  const [isConnect, setConnected] = useState(false);
  const [account, setAccount] = useState('');
  const [message, setMessage] = useState('');
  const [signature, setSignature] = useState('');
  const [register ,openRegister] = useState(false);
  const [contract ,setContract] = useState(null);

  const setWallet = async () => {
    if (window.ethereum) {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        // provider = new ethers.BrowserProvider(window.ethereum)
        // provider = new ethers.JsonRpcProvider()
        await provider.send('eth_requestAccounts', [0]);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        setAccount(address);
        console.log(address);
  
        const contractAddress = contract_address; // Replace with your actual contract address
        const abi = ABI; // Your contract ABI
  
        const contract = new ethers.Contract(contractAddress, abi, signer);
          
        // Check if the user is already registered
        const isRegistered = await contract.isUserRegistered(address);
        
        if (isRegistered) {
          // If registered, redirect the user to a specific page
          // Replace '/dashboard' with the desired URL
          window.location.href = '/dashboard';
        } else {
          // If not registered, continue with your current logic
          setConnected(true);
  
          const messageToSign = "Welcome To MetaVault, Let's SignIn Quickly!";
          const signature = await signer.signMessage(messageToSign);
          setMessage(messageToSign);
          setSignature(signature);
  
          saveState({ account: address, contract: contract });
          setContract(contract);
        }
      } catch (error) {
        console.error('Error connecting with wallet:', error);
        setConnected(false);
      }
    } else {
      console.error('No Ethereum provider found');
      setConnected(false);
    }
  };
  

  return (
    <div className='h-[100vh] relative ' style={{ backgroundImage: "url('https://img.freepik.com/premium-photo/megaoplis-stands-near-river-sunset-3d-illustration_76964-4973.jpg')", backgroundSize: "cover" }}>
      <div className='h-full w-full absolute' style={{ backgroundImage: "url('https://www.sandbox.game/cdn-cgi/image/f=auto,origin-auth=share-publicly,onerror=redirect,w=1367/img/14_Home/visitors-homepage/GM-Art-BG.webp')", backgroundRepeat: "no-repeat", backgroundSize: "cover" }}>
        <div className='w-full h-full absolute  flex items-end justify-end   '>
          <img src="https://www.sandbox.game/cdn-cgi/image/f=auto,origin-auth=share-publicly,onerror=redirect/img/41_Avatar_Reveal/avatars-background-compressed.webp" alt="" className='' style={{ width: '80%', height: 'auto' }} />
        </div>
      </div>
      <div className='grid grid-cols-2  text-white z-30 h-full'>
        <div className='relative p-5 '>
          <div className='blue-blur-glass  rounded-3xl h-full flex flex-col justify-center px-10'>
            <div className="container flex flex-col gap-4">
              <Link to="/" className='flex gap-3'>
                <ArrowBack />
                <span>back</span>
              </Link>
              
                <>
              <div className='flex flex-col gap-2'>
                <span className='text-3xl font-bold'>Let's enter the metavault</span>
                <span>How would you like to sign up with Wallet?</span>
              </div>
              <div className='flex flex-col gap-5 justify-start items-start'>
                <button className='flex gap-4 mt-5 i-glow border rounded-full px-5 p-2 font-bold' onClick={setWallet}>
                  <Wallet className='text-pink-600' />
                  <span>
                    {isConnect ? "Wallet Connected" : "Connect with Wallet"}
                  </span>
                </button>
                <div className='text-lg font-bold'>Don't have an account ? <Link to="/register" className='text-blue-500 cursor-pointer' onClick={()=>openRegister(true)}>register</Link> </div>
              </div>
                </>

            


            </div>
          </div>
        </div>
        <div className=''>
          
        </div>
      </div>
    </div>
  );
};

export default Connect;
