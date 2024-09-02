import React from 'react'

const Home_Brands = () => {
    return (
        <div className=' h-[70vh] bg-blue-top-grad text-light flex flex-col justify-center'>
            <div className='container  flex justify-center flex-col '>
                <span className='font-bold text-3xl  text-center'>Join the brands you love in the metavault
                </span>
                <div className='flex justify-around gap-5 mt-[80px]'>

                    <div className="card text-dark w-[300px] h-[150px] object-contain rounded-xl hover:h-[180px] transition duration-300 ease-in-out" style={{transition:"0.1s"}}>
                        <img src="https://static.vecteezy.com/system/resources/previews/013/481/453/original/metamask-crypto-wallet-for-defi-web3-dapps-and-nfts-concept-banner-background-vector.jpg" alt="" className='w-full h-full object-cover border-2 rounded-lg' />
                    </div>
                    <div className="card text-dark w-[300px] h-[150px] object-contain rounded-xl hover:h-[180px] transition duration-300 ease-in-out" style={{transition:"0.1s"}}>
                        <img src="https://img.freepik.com/premium-photo/ethereum-cryptocurrency-technology-abstract-background-concept-pink-blue-glow-logo-reflect-water-landscape-background-blue-3d-illustration-rendering_37129-2431.jpg" alt="" className='w-full h-full object-cover border-2 rounded-lg' />
                    </div>
                    <div className="card text-dark w-[300px] h-[150px] object-contain rounded-xl hover:h-[180px] transition duration-300 ease-in-out" style={{transition:"0.1s"}}>
                        <img src="https://cryptoslate.com/wp-content/uploads/2022/03/polygon-id-zkproof.jpg" alt="" className='w-full h-full object-cover border-2 rounded-lg' />
                    </div>
                    <div className="card text-dark w-[300px] h-[150px] object-contain rounded-xl hover:h-[180px] transition duration-300 ease-in-out" style={{transition:"0.1s"}}>
                        <img src="https://www.sandbox.game/img/00_General/seo/home.png" alt="" className='w-full h-full object-cover border-2 rounded-lg' />
                    </div>


                </div>
            </div>
        </div>
    )
}

export default Home_Brands
