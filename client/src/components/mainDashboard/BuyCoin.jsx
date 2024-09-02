import React from 'react';
import Swal from 'sweetalert2'
const BuyCoin = ({ contract }) => {

    console.log(contract)

    const buyTokens = async (amountInWei) => {
        try {

            await contract.mintTokensWithSubscription_0_0001Ether({ value: amountInWei });
            Swal.fire({
                title: "Transistion Successfull !",
                text: "Wait,few second to update ",
                icon: "success"
            });
        } catch (error) {
            console.error('Failed to purchase tokens:', error);
        }
    };
    const buyTokens1 = async (amountInWei) => {
        try {

            await contract.mintTokensWithSubscription_0_001Ether({ value: amountInWei });
            Swal.fire({
                title: "Transistion Successfull !",
                text: "Wait,few second to update ",
                icon: "success"
            });
        } catch (error) {
            console.error('Failed to purchase tokens:', error);
        }
    };
    const buyTokens2 = async (amountInWei) => {
        try {

            await contract.mintTokensWithSubscription_0_01Ether({ value: amountInWei });
            Swal.fire({
                title: "Transistion Successfull !",
                text: "Wait,few second to update ",
                icon: "success"
            });
        } catch (error) {
            console.error('Failed to purchase tokens:', error);
        }
    };

    return (
        <div className='h-[92vh] p-5 flex flex-col items-center justify-center'>
            <div className="p-5  flex flex-col gap-5">
                <span className=' text-3xl font-bold'>Introducing MapCoin</span>
                <p className='text-xl'>Join the MapCoin ecosystem and unlock limitless possibilities for digital transactions. Whether you're navigating the world , building blockchain applications, or exploring the future of digital currencies, MapCoin is your gateway to a new era of financial freedom.</p>
            </div>
            <div className='p-5 flex  justify-between gap-[100px] mt-5'>
                {/* Subscription Plan 1 */}
                <div className='w-[400px] h-[500px] shadow-2xl rounded-xl white-blur-glass flex justify-center gap-[50px] p-5 items-center flex-col'>
                    <div className='flex flex-col gap-4 items-center'>
                        <img src="https://preview.redd.it/i-made-a-custom-op-discord-icon-v0-oby6d0ersbs81.png?auto=webp&s=0101218530a2068771a744d6523f09c29df76e90" alt="" className='w-[100px]' />
                        <span className='flex flex-col items-center gap-2 '>
                            <span className='text-5xl logo-font'>30 MAP</span>
                            <span>(0.0001 Ether)</span>
                        </span>
                    </div>
                    {/* Button for Plan 1 */}
                    <div>
                        <button onClick={() => buyTokens('100000000000000')} className='btn neon-bg w-full font-bold logo-font p-3 text-xl rounded-xl '>
                            Buy Now
                        </button>
                    </div>
                </div>

                {/* Subscription Plan 2 */}
                <div className='w-[400px] h-[500px] shadow-2xl rounded-xl white-blur-glass flex justify-center gap-[50px] p-5 items-center flex-col'>
                    <div className='flex flex-col gap-4 items-center'>
                        <img src="https://i.pinimg.com/originals/35/68/a6/3568a6dace15c3e8b64421a7594f50b3.png" alt="" className='w-[100px]' />
                        <span className='flex flex-col items-center gap-2 '>
                            <span className='text-5xl logo-font'>60 MAP</span>
                            <span>(0.001 Ether)</span>
                        </span>
                    </div>
                    {/* Button for Plan 2 */}
                    <div>
                        <button onClick={() => buyTokens1('1000000000000000')} className='btn neon-bg w-full font-bold logo-font p-3 text-xl rounded-xl '>
                            Buy Now
                        </button>
                    </div>
                </div>

                {/* Subscription Plan 3 */}
                <div className='w-[400px] h-[500px] shadow-2xl rounded-xl white-blur-glass flex justify-center gap-[50px] p-5 items-center flex-col'>
                    <div className='flex flex-col gap-4 items-center'>
                        <img src="https://www.clipartmax.com/png/full/216-2169801_inspiration-legal-logos-clip-art-medium-size-one-piece-trafalgar-law-logo.png" alt="" className='w-[100px]' />
                        <span className='flex flex-col items-center gap-2 '>
                            <span className='text-5xl logo-font'>100 MAP</span>
                            <span>(0.01 Ether)</span>
                        </span>
                    </div>
                    {/* Button for Plan 3 */}
                    <div>
                        <button onClick={() => buyTokens2('10000000000000000')} className='btn neon-bg w-full font-bold logo-font p-3 text-xl rounded-xl '>
                            Buy Now
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BuyCoin;
