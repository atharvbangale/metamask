import React from 'react'

const Footer = () => {
  return (
    <div className='h-[70vh] border s-glow  '>
    <div className='50vh h-[40vh]  object-fit' style={{backgroundImage:"url('https://www.sandbox.game/cdn-cgi/image/f=auto,origin-auth=share-publicly,onerror=redirect,trim=150,w=2304/img/14_Home/visitors-homepage/footer-grid.webp')", backgroundRepeat:"no-repeat", backgroundSize:"fit" ,backgroundPosition:"bottom"}}>

        <div className='flex flex-col justify-center items-center text-white h-full gap-4'>
            <span className='text-3xl font-bold'>Ready to unlock a whole new world?</span>
            <span>Start exploring, find your communities, and make your mark in the metavault!</span>
            <button className='text-lg font-bold p-2 bg-blue-700 rounded-full'>Enter the metavault</button>
        </div>

    </div>
    <div className='bg-blue-bottom-grad text-white text-center'>
    <div className="container mx-auto py-8">
        
        <h1 className="text-3xl font-bold logo-font">The 
        Metavault</h1>
        <p className="mt-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam accumsan dapibus dui, at mattis lorem porta sit amet.</p>
    </div>
    <footer className="py-4 text-center">
        <p>&copy; 2024 Your Company. All rights reserved.</p>
        <ul className="mt-2">
            <li><a href="#">About Us</a></li>
            <li><a href="#">Contact Us</a></li>
            <li><a href="#">Privacy Policy</a></li>
        </ul>
    </footer>
</div>

</div>

  )
}

export default Footer
