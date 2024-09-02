import React from 'react'

const Card = ({username ,time ,content ,dp}) => {
  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp * 1000); 
    return date.toLocaleDateString();
  };
  return (
    <div className='white-blur-glass h-auto w-[800px] rounded-xl'>
      <div className='p-3 flex gap-5'>
        <img src={dp} alt="" className='w-[60px] h-[60px] rounded-full  object-cover' />
        <div className='flex flex-col gap-2'>
            <span className='text-xl font-bold'>{username}</span>
            <span>{formatTimestamp(time.toString())}</span>
        </div>
       
      </div>
        <hr className=''/>
        <div className='p-5 text-xl'>
            <p>
                {content}
            </p>
        </div>
    </div>
  )
}

export default Card
