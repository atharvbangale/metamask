import React, { useEffect, useState } from 'react';
import MyLineChart from '../charts/MyLineChart';
import { ethers } from "ethers";
import FileTypeDistributionPieChart from '../charts/FileTypeDistributionPieChart';
import { Download, KeyboardArrowDown, KeyboardArrowUp, Upload } from '@mui/icons-material';

const Dashhome = ({ contract }) => {
    const [dateTime, setDateTime] = useState(new Date());
    const [userData, setUserData] = useState([]);
    const [balance, setBalance] = useState('?');
    const [video, setVideo] = useState('');
    const [file, setFile] = useState('');
    const [image, setImage] = useState('');
    const [model ,setModel] = useState('');


    const account = localStorage.getItem('account');


    // console.log(userData)

    useEffect(() => {
        const intervalID = setInterval(() => {
            setDateTime(new Date());
        }, 1000);

        return () => clearInterval(intervalID);
    }, []);

    useEffect(() => {
        const res = async () => {
            try {
                
                if (contract) {
                    const data = await contract.getUser(account);
                    
                    setUserData(data); 
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }



        };

        res();
    }, [contract]);

    useEffect(() => {
        const res = async () => {
            try {
                if (contract) {
                    const data = await contract.getUserFiles(account);
                    
                    const image = data.filter(document => document.file_type === 'image');
                    const pdf = data.filter(document => document.file_type === 'pdf');
                    const video = data.filter(document => document.file_type === 'video');
                    const model = data.filter(document => document.file_type === 'glb');


                    setImage(image.length)
                    setFile(pdf.length)
                    setVideo(video.length)
                    setModel(model.length)

                }
            } catch {
                console.error('Error fetching data:', error);
            }
        }
        res()
    }, [contract])


    const formattedTime = dateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    useEffect(() => {
        const getAccountBalance = async (accountAddress) => {
            try {
                
                const provider = new ethers.providers.Web3Provider(window.ethereum);

               
                const balance = await provider.getBalance(accountAddress);


                const balanceInEther = ethers.utils.formatEther(balance);

                
                setBalance(balanceInEther);

                return balanceInEther;
            } catch (error) {
                console.error('Error fetching account balance:', error);
                return null;
            }
        };

        getAccountBalance(account);
    }, [account]);

    return (
        <div className='h-[92vh] '>
            <div className='p-5'>
                
            </div>
            <div>
                <div className='lg:grid lg:grid-cols-2 lg:p-4 lg:gap-5'>
                    <div className='shadow-2xl rounded-xl flex justify-center items-center  p-3  '>
                    <div className='flex  text-4xl relative'  >
                      
                        <span className=''>
                       Welcome ,  <span className='ms-2 font-bold'>
                      {userData.username} ! </span>

                        </span>
                        
                    </div>
                    </div>
                    <div className='shadow-2xl rounded-xl justify-center items-center flex'>
                        <FileTypeDistributionPieChart i={image} f={file} v={video} m={model} />
                    </div>
                </div>
                <div className='grid grid-cols-1 lg:grid-cols-12 h-[250px] p-4 mt-5 gap-4'>
                    <div className="shadow-2xl rounded-xl border p-6 flex flex-col items-center justify-center lg:col-span-4">
                        <div className="text-center">
                            <div className="text-7xl font-bold text-white">{formattedTime}</div>
                            <div className="text-lg text-gray-400">{dateTime.toLocaleDateString()}</div>
                        </div>
                    </div>

                    <div className="shadow-2xl rounded-xl border p-6 flex flex-col lg:col-span-4 gradient-bg">
                        <div className="flex justify-start items-center gap-5">
                            <img src="https://preview.redd.it/i-made-a-custom-op-discord-icon-v0-oby6d0ersbs81.png?auto=webp&s=0101218530a2068771a744d6523f09c29df76e90" className="w-[50px] rounded-full" alt="" />
                            <span className="font-bold logo-font text-white">
                                MapCoin Card
                            </span>
                        </div>
                        <div className="flex flex-col gap-3 p-4 mt-10 ">
                            <div className="text-white font-semibold ">
                                Total Bal: <span className="text-xl logo-font">{userData.tokenBalance?.toString()} MAP</span>
                            </div>
                            <div className="text-white font-mono">
                                {account}
                            </div>
                        </div>
                    </div>


                    <div className="shadow-2xl rounded-xl border p-6 flex flex-col   lg:col-span-4 bg-random-grad justify-between ">

                        <div className='flex justify-start items-center gap-3'>
                            <img src="https://assets.coingecko.com/coins/images/279/large/ethereum.png?1595348880" className='w-[50px] ' alt="" />
                            <span className='font-bold logo-font '>
                                Ethreum Card
                            </span>
                        </div>
                        <div className='flex flex-col gap-3 p-4'>
                            <div className='logo-font'>Total Bal: <span className=''>{balance} ETH</span></div>
                            <div className='font-mono '>
                                {account}
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </div>
    )
}

export default Dashhome;
