import { Cancel, CancelOutlined, Close, Remove } from '@mui/icons-material'
import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2';

const UserAccess = ({contract}) => {

    const [userAddress , setUserAddress] = useState('');
    const [isValid, setIsValid] = useState(true);
    const [accessList ,setAccessList] = useState([]);

    
    const validateAddress = (address) => {
      
        const re = /^0x[a-fA-F0-9]{40}$/;
        return re.test(address);
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        if (validateAddress(userAddress)) {
            setIsValid(true);
            try {
                const tx = await contract.allow(userAddress);
                await tx.wait();
                
                Swal.fire({
                    title: "User Added Successfully  !",
                   
                    icon: "success"
                  });


            } catch (error) {
                console.log(error);
            }
           
            
        } else {
            
            setIsValid(false);
            Swal.fire({
                title: "Invalid Account Address !",
                text: "Make Sure You Paste Correct Address",
                icon: "error"
              });
        }
    };
    const revokeAccess = async(userAddress) => {
        try {
            const tx = await contract.disallow(userAddress);
            await tx.wait();
            
            Swal.fire({
                title: "User Revoke Successfully  !",
               
                icon: "success"
              });


        } catch (error) {
            console.log(error);
        }
       
    }

    //fetch users
    useEffect(() => {
        const access = async () => {
          const addressList = await contract.shareAccess();
          setAccessList(addressList)
          
        }
        contract && access();
      }, [contract])

  return (
    <div className=' text-white h-[92vh] bg-[rgb(19,19,20)]'>
      <div className='p-5 grid grid-cols-2'>
        <div className='p-5'>
            <h1 className='mb-5 text-xl'>User Accounts</h1>
            {accessList.map((item)=>(
        <div className='w-full rounded-xl mt-4 p-4 white-blur-glass flex justify-between items-center'>
            <span className='text-xl'>
            {item.user.length > 20 ? `${item.user.slice(0, 30)}...` : item.user}
            </span>
            <span className={`border p-1 rounded-full  ${item.access ? 'text-green-500 border-green-500' : 'text-red-500 border-red-500'}`}>
                {item.access ? 'Accesed' : 'Denied'}
            </span>
            <span className='btn border border-white hover:bg-white hover:text-black' onClick={()=>revokeAccess(item.user)}>Revoke</span>
        </div>
    ))}
        </div>
        <div>
        <h1 className='text-5xl google-font  font-bold  modern-text p-5'>User Access Management</h1>
        <p className='p-3 text-justify text-xl '>
        Manage and control access permissions for your blockchain vault. Here, you can grant or revoke access to other users, ensuring secure and controlled sharing of your digital assets and sensitive information. Easily add new users, define their roles, and set specific permissions to maintain the integrity and security of your vault.
        </p>
        <div className='mt-5'>
            <form onSubmit={handleSubmit}>
                <input type="text" className="white-blur-glass p-3 rounded-xl w-[75%]" placeholder='Add User Address here for ex :- 0x236434983...' onChange={(e)=>setUserAddress(e.target.value)}/>
                <button type="submit" className='btn bg-blue-800  ms-5'>Give Access </button>
            </form>
        </div>
        </div>
      </div>
    </div>
  )
}

export default UserAccess
