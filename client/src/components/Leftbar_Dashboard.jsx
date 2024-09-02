import React from 'react';
import { Dashboard, FilePresent, ChatBubble, Add, Image, VideoCameraBack, DocumentScannerOutlined, FileOpenOutlined, ViewInAr, Password, ManageAccounts, GasMeter, GradeSharp, HelpCenter } from '@mui/icons-material';



const Leftbar_Dashboard = ({ onItemClick }) => {
  const profileImageUrl = localStorage.getItem("profileImgUrl");
  return (
    <div className='h-[92vh]   p-5 bg-[rgb(30,31,32)] text-light'>

      <div className='h-[95%] overflow-y-scroll'>
        <ul className='p-5 flex flex-col gap-5'>
          <li className='flex hover:text-blue-400 items-center gap-5 text-xl font-bold mt-5 cursor-pointer' onClick={() => onItemClick('')}>
            <span className=''>
              <Dashboard />
            </span>
            <span>Dashboard</span>
          </li>
          <li className='flex hover:text-blue-400 items-center gap-5 text-xl font-bold mt-5 cursor-pointer' onClick={() => onItemClick('MyFiles')}>
            <span className=''>
              <FilePresent />
            </span>
            <span>My Files</span>
          </li>
          <li className='flex hover:text-blue-400 items-center gap-5 text-xl font-bold mt-5 cursor-pointer' onClick={() => onItemClick('Images')}>
            <span className=''>
              <Image />
            </span>
            <span>My Images</span>
          </li>
          <li className='flex hover:text-blue-400 items-center gap-5 text-xl font-bold mt-5 cursor-pointer' onClick={() => onItemClick('Videos')}>
            <span className=''>
              <VideoCameraBack />
            </span>
            <span>My Videos</span>
          </li>
          <li className='flex hover:text-blue-400 items-center gap-5 text-xl font-bold mt-5 cursor-pointer' onClick={() => onItemClick('3dmodel')}>
            <span className=''>
              <ViewInAr />
            </span>
            <span>3d Models</span>
          </li>
          <li className='flex hover:text-blue-400 items-center gap-5 text-xl font-bold mt-5 cursor-pointer' onClick={() => onItemClick('password')}>
            <span className=''>
              <Password />
            </span>
            <span>KeySafe</span>
          </li>
          <li className='flex hover:text-blue-400 items-center gap-5 text-xl font-bold mt-5 cursor-pointer' onClick={() => onItemClick('editdoc')}>
            <span className=''>
              <FileOpenOutlined />
            </span>
            <span>Create Doc</span>
          </li>
          <li className='flex hover:text-blue-400 items-center gap-5 text-xl font-bold mt-5 cursor-pointer' onClick={() => onItemClick('TalkWithAI')}>
            <span className=''>
              <ChatBubble />
            </span>
            <span>Talk With AI</span>
          </li>

          <li className='flex hover:text-blue-400 items-center gap-5 text-xl font-bold mt-5 cursor-pointer' onClick={() => onItemClick('access')}>
            <span className=''>
              <ManageAccounts />
            </span>
            <span>User Access</span>
          </li>

          <li className='flex hover:text-blue-400 items-center gap-5 text-xl font-bold mt-5 cursor-pointer' onClick={() => onItemClick('details')}>
            <span className=''>
              <GradeSharp />
            </span>
            <span>Transactions</span>
          </li>

          <li className='flex hover:text-blue-400 items-center gap-5 text-xl font-bold mt-5 cursor-pointer' onClick={() => onItemClick('help')}>
            <span className=''>
              <HelpCenter/>
            </span>
            <span>Community Support & Help</span>
          </li>
          <hr className='mt-3' />
          <li className='flex hover:text-blue-400 items-center gap-5 text-xl font-bold mt-5 w-full cursor-pointer' onClick={() => onItemClick('profile')}>
            <span className=''>
              <img src={profileImageUrl} className='w-[50px] h-[50px] rounded-full object-cover' alt="" />
            </span>
            <span >My Profile</span>
          </li>


          <li className='flex hover:text-blue-400 items-center gap-5 text-xl font-bold mt-5 w-full cursor-pointer' onClick={() => onItemClick('experiences')}>
            <span className=''>
              <img src="https://cdn-icons-png.flaticon.com/512/11632/11632430.png" className='w-[50px]' alt="" />
            </span>
            <span >Experiences</span>
          </li>

          <hr className='mt-3' />

        </ul>

        <div className='flex me-3 mb-5 items-center gap-5 h-[60px] w-[90%] rounded-xl  logo-font text-xl white-blur-glass font-bold mt-5  cursor-pointer justify-center' onClick={() => onItemClick('buycoin')}>

          <span className='logo-font'>Buy MapCoin</span>
        </div>
      </div>
    </div>
  );
};

export default Leftbar_Dashboard;
// https://preview.redd.it/i-made-a-custom-op-discord-icon-v0-oby6d0ersbs81.png?auto=webp&s=0101218530a2068771a744d6523f09c29df76e90