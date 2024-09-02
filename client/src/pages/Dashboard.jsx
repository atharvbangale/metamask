import React, { useEffect, useState } from 'react';
import Leftbar_Dashboard from '../components/Leftbar_Dashboard';
import Main_Dashboard from '../components/Main_Dashboard';
import { ethers } from 'ethers';
import ABI from './ABI.json';
import Joyride from 'react-joyride';

import { Menu } from '@mui/icons-material';

const steps = [
    {
        target: '.my-first-step',
        content: 'This is my awesome feature!',
    },
    {
        target: '.my-other-step',
        content: 'This another awesome feature!',
    },
];

const Dashboard = ({ state }) => {
    const contract_address = import.meta.env.VITE_CONTRACT_ADDRESS;



    const [selectedComponent, setSelectedComponent] = useState('');
    const [connected, setConnected] = useState(false);
    const [account, setAccount] = useState('');
    const [contract, setContract] = useState(null);
    const [userData, setUserData] = useState([]);
    const [isSidebarShort, setIsSidebarShort] = useState(false);

    const handleMenuClick = () => {
        setIsSidebarShort(!isSidebarShort);
    };

    const [steps, setSteps] = useState([
        {
            target: '.firstStep',
            content: 'This is a super awesome feature!',
        },
        {
            target: '.secondStep',
            content: "Everyone's learning React Joyride!",
        },
    ]);




    const handleNavbarItemClick = (componentName) => {
        setSelectedComponent(componentName);
    };


    useEffect(() => {
        const connect = async () => {
            try {
                const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                const signer = provider.getSigner();
                const address = await signer.getAddress();
                setAccount(address);
                localStorage.setItem('account', address);

                setConnected(true);

                const contractAddress = contract_address;
                const abi = ABI;
                const contract = new ethers.Contract(contractAddress, abi, signer);
                setContract(contract);



            } catch (error) {
                console.error('Error connecting with wallet:', error);
                setConnected(false);
            }
        };

        connect();
    }, []);

    useEffect(() => {
        const res = async () => {
            try {
                // Check if contract is set
                if (contract) {
                    const data = await contract.getUser(account);
                    console.log('Data from contract:', data);
                    setUserData(data); // Set user data in state
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        res();
    }, [contract]);

    localStorage.setItem("profileImgUrl", userData[1]);


    return (
        <div className='h-[100vh] overflow-hidden'>
            <Joyride steps={steps} />
            <div className='bg-[#252525] p-3 text-white flex items-center justify-between'>
                <div>
                    <span className='logo-font text-3xl'>Metavault</span>
                </div>
                <div className='flex gap-5  items-center'>
                    <div className='border p-2 rounded-full font-mono border-pink-500 '>
                        {account}
                    </div>
                    <div className='  gap-3 border neon-bg  border-blue-500 cursor-pointer  rounded-full  p-2 flex justify-center items-center' >
                        <img src="https://preview.redd.it/i-made-a-custom-op-discord-icon-v0-oby6d0ersbs81.png?auto=webp&s=0101218530a2068771a744d6523f09c29df76e90" alt="" className='w-[35px] object-cover' />
                        <span className="text-xl logo-font">{userData.tokenBalance?.toString()} MAP</span>
                    </div>
                    <div className='flex items-center gap-3 border  pe-3 border-blue-500 cursor-pointer  rounded-full' >
                        <img src={userData[1]} alt="" className='w-[50px] h-[50px] rounded-full object-cover' />
                        <span className='font-mono text-xl'>{userData[0]}</span>
                    </div>
                </div>
            </div>

            <div className='flex h-screen bg-dark'>
                
                    <div className={`w-[200px] bg-[rgb(30,31,32)] h-[92vh] transition-all duration-300 ${isSidebarShort ? 'w-[60px]' : 'w-[300px]'}`}>
                        <div className='flex justify-start px-2 mt-5' onClick={handleMenuClick}>
                            <span className='p-3 cursor-pointer rounded-full hover:bg-gray-600'>
                                <Menu className='text-white' />
                            </span>
                        </div>
                        {/* Use opacity and transition for smooth reveal */}
                        <div className={`transition-opacity duration-300 ${isSidebarShort ? 'opacity-0' : 'opacity-100'}`}>
                            {!isSidebarShort && <Leftbar_Dashboard onItemClick={handleNavbarItemClick} />}
                        </div>
                    </div>
               
                <div className='flex-1 bg-dark'>
                    <Main_Dashboard selectedComponent={selectedComponent} contract={contract} account={account} />
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
