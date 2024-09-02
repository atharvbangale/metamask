import React from 'react';
import bggrad from '../assets/bggrad.jpg';

const Home_Feature = () => {
    return (
        <div className=' border cyberpunk-glow-blue border-r-0 border-l-0 border-t-blue-800 relative text-white rounded-b-full  '>
            <div className=" inset-0 pb-[100px]" style={{ backgroundImage: `url(${bggrad})`, backgroundSize: 'cover' }}>
                <div className="container  flex flex-col  items-center h-full rounded-b-full">
                    <div className='container grid grid-cols-2 gap-6'>
                        <div className='flex flex-col justify-center items-center '>
                            <div className=' flex flex-col justify-center gap-3'>
                                <span className='text-blue-500'>Experience Together</span>
                                <h2 className='text-3xl font-bold'>Experience Decentralized Metavault</h2>
                                <p className=' text-lg'>
                                    Effortlessly share and securely store your files on a decentralized cloud platform. Experience seamless access to your data across devices, ensuring convenience and peace of mind.
                                </p>
                                <div className='mt-3 flex gap-4'>
                                    <button className='bg-blue-800 px-4 py-2 rounded-full font-bold'>Let's Experience Together</button>
                                    <button className='font-bold'>Learn More</button>
                                </div>
                            </div>
                        </div>
                        <div className=''>
                            <img src="https://www.sandbox.game/cdn-cgi/image/f=auto,origin-auth=share-publicly,onerror=redirect,w=717/img/14_Home/visitors-homepage/Avatar-Section_Fallback.webp" alt="Avatar" className='object-contain h-auto max-h-full' />
                        </div>
                    </div>

                    <div className='container grid grid-cols-2 gap-6 '>
                    <div className=''>
                            <img src="https://png.pngtree.com/png-clipart/20230613/ourmid/pngtree-apple-vision-png-image_7134823.png" alt="Avatar" className=' max-h-full' />
                        </div>
                        <div className='flex flex-col justify-center items-center '>
                            <div className=' flex flex-col justify-center gap-3'>
                                <span className='text-blue-500'>Experience Together</span>
                                <h2 className='text-3xl font-bold'>Experience Metaverse</h2>
                                <p className=' text-lg'>
                                Enter the immersive world of the Metaverse and NFTs, where digital innovation meets creative expression, unlocking endless possibilities for ownership and interaction.
                                </p>
                                <div className='mt-3 flex gap-4'>
                                    <button className='bg-blue-800 px-4 py-2 rounded-full font-bold'>Let's Experience Together</button>
                                    <button className='font-bold'>Learn More</button>
                                </div>
                            </div>
                        </div>
                       
                    </div>
                   
                </div>
            </div>
        </div>
    );
};

export default Home_Feature;
