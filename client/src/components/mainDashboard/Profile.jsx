import React, { useEffect, useState } from 'react';

import { Email, Phone } from '@mui/icons-material';
import Table from '../charts/Table';

const Profile = ({ contract }) => {
  const profileImageUrl = localStorage.getItem("profileImgUrl");
  const account = localStorage.getItem('account');

  const videoUrl = "https://res.cloudinary.com/dl4jjxn61/video/upload/q_auto:best,f_auto:video/fetch/https://cdn.sandbox.game/home/home-banner.mp4";

  const [userData , setUserData] = useState([]);

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

  return (
    <div className='h-[92vh] relative overflow-hidden'>
      <div className=' h-full overflow-y-scroll'>

        <div className='h-[50%] m-5 rounded-2xl relative'>
          <div className='h-[80%]  flex justify-center rounded-2xl '>
            <div className='relative h-full w-full'>

              <video
                className="absolute inset-0 object-cover w-full h-full rounded-2xl "
                src={videoUrl}
                autoPlay
                muted
                loop
              />
            </div>


            <div className="absolute bottom-5">
              <img src={profileImageUrl} alt="" className='w-[200px] h-[200px] rounded-full object-cover border-2 opacity-100' />
            </div>

          </div>
        </div>
        <div className='flex'>
          <div className='white-blur-glass w-[30%] m-5 p-5 rounded-2xl '>
            <span className='font-bold logo-font text-2xl'>{userData.username}</span>
            <p className=' mt-3'>{userData.about}</p>
          </div>

          <div className='white-blur-glass w-[30%] m-5 p-5 rounded-2xl text-xl  flex flex-col justify-center'>
            <div className='flex gap-3 items-center'>
              <Email />
              <span className='logo-font '>{userData.email}</span>

            </div>
            <div className='flex gap-3 items-center'>
              <Phone />
              <span className='font-mono mt-3'>{userData.phoneNumber}</span>
            </div>
          </div>

          <div className=' w-[30%] flex justify-center items-center gradient-bg m-5 p-5 rounded-2xl gap-4'>
            <img src="https://preview.redd.it/i-made-a-custom-op-discord-icon-v0-oby6d0ersbs81.png?auto=webp&s=0101218530a2068771a744d6523f09c29df76e90" alt="" className='w-[60px]'/>
            <span className="text-4xl logo-font">{userData.tokenBalance?.toString()} MAP</span>
          </div>


        </div>
        <div className='p-5'>
          <Table contract={contract}/>
        </div>
      </div>
    </div>
  );
}

export default Profile;
