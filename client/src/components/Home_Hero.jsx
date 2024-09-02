import React from 'react';
import { Link } from 'react-router-dom';
import Spline from '@splinetool/react-spline';

const Home_Hero = () => {
  return (
    <div className="relative h-[90vh] max-h-[90vh]">
      {/* Background Spline */}
      
      {/* Content */}
      <div className="relative z-0 flex flex-col justify-center  items-center h-full gap-5">
      <div className="absolute inset-0 overflow-hidden z-0">
        <Spline scene="https://prod.spline.design/xOnklTmswv6b4H4L/scene.splinecode" />
      </div>
        <h1 className="text-white text-3xl font-bold flex flex-col items-center z-0">
          <span>THE</span>
          <span className="text-7xl font-bold logo-font text-white glow-text-blue z-0">METAVAULT</span>
        </h1>
        <div className='flex flex-col justify-center items-center gap-3 z-0'>
          <p className="text-white font-bold text-xl z-0">Store files, Mint NFTs, and Experience the Metaverse.</p>
          <Link to="/connect" className='bg-blue-700 btn text-white p-3 font-bold text-xl rounded-full w-[75%] hover:border-2 hover:bg-blue-900 z-0'>Enter the Metavault</Link>
        </div>
      </div>
    </div>
  );
}

export default Home_Hero;
