import { Cancel, CopyAll, Earbuds ,ArrowForwardIos} from '@mui/icons-material';
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2'; // Import Swal for alerts

const PasswordManager = ({ contract }) => {
    const [modalOpen, setModalOpen] = useState(false); // Renamed state variable for clarity
    const [data, setData] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null); // Track selected item
    const account = localStorage.getItem('account');
    const [site, setSite] = useState('');
    const [username, setUsername] = useState(''); // Corrected variable name
    const [password, setPassword] = useState('');
    const fileType = "keysafe";

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userData = await contract.getUserFiles(account); 
                console.log("Received data:", userData);
                const pdfDocuments = userData.filter(document => document.file_type === 'keysafe');
                setData(pdfDocuments);
            } catch (error) {
                console.log("Error fetching data:", error);
            }
        };

        fetchData();
    }, [contract, account]);

    const onSubmit = async (e) => {
        e.preventDefault();

        try {
            const timestamp = Math.floor(Date.now() / 1000);

            const tx = await contract.addUserImage(username, site, fileType, timestamp, password);
            await tx.wait();

            Swal.fire({
                title: "File Uploaded Successfully!",
                text: "You Uploaded File On Blockchain Successfully",
                icon: "success"
            });
        } catch (error) {
            console.error("Error uploading file:", error);
            Swal.fire({
                title: "Something went wrong!",
                text: "Unable to upload file. Please try again later.",
                icon: "error"
            });
        }
    };

    const handleItemClick = (item) => {
        setSelectedItem(item); // Set selected item when clicked
        setModalOpen(true); // Open modal
    };

    return (
        <div className='bg-[rgb(19,19,20)] h-[92vh] p-5 relative'>
            {modalOpen && selectedItem && // Render modal only when it's open and item is selected
                <div className="absolute flex justify-center items-center  w-full h-full z-10">
                    <div className='blue-blur-glass w-[700px] h-[450px] rounded-xl shadow-2xl p-3 '>
                        <span className='w-full flex justify-end p-3'>
                            <Cancel className='cursor-pointer' onClick={() => setModalOpen(false)} />
                        </span>
                        <div className='mt-5 flex flex-col gap-3'>
                            <div className='flex flex-col gap-3'>
                                <span>Site</span>
                                <div className='p-3 white-blur-glass  flex justify-between px-10 rounded-xl'>
                                    <span className='  text-xl'>{selectedItem.file_url}</span>
                                    <CopyAll className='cursor-pointer hover:text-blue-600' />
                                </div>
                            </div>
                            <div className='flex flex-col gap-3'>
                                <span>Username</span>
                                <div className='p-3 white-blur-glass  flex justify-between px-10 rounded-xl'>
                                    <span className='  text-xl'>{selectedItem.file_name}</span>
                                    <CopyAll className='cursor-pointer hover:text-blue-600' />
                                </div>
                            </div>
                            <div className='flex flex-col gap-3'>
                                <span>Password</span>
                                <div className='p-3 white-blur-glass  flex justify-between px-10 rounded-xl'>
                                    <span className='  text-xl'>{selectedItem.description}</span>
                                    <CopyAll className='cursor-pointer hover:text-blue-600' />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
            <div className='grid grid-cols-2 h-full'>
                <div className='col-span-1 p-5 '>
                    <div className=''>
                        {data.map((item, index) => (
                            <div key={index} className='flex justify-between mt-4  hover:bg-gray-900 gap-4 blue-blur-glass p-5 cursor-pointer rounded-xl' onClick={() => handleItemClick(item)}>
                                <div className='flex gap-4'>
                                    <Earbuds />
                                    <span>{item.file_url}</span>
                                </div>
                                <ArrowForwardIos />
                            </div>
                        ))}
                    </div>
                </div>
                <div className='col-span-1 p-5 flex flex-col gap-5'>
                    <div className='flex flex-col gap-5'>
                        <span className='text-5xl google-font modern-text font-bold'>KeySafe Password Manager</span>
                        <p className='google-font text-xl'>Your digital vault for secure and convenient password storage. Safeguard all your sensitive information with ease.</p>
                    </div>

                    <div className='mt-5'>
                        <span className='google-font text-2xl'>Add new password</span>

                        <form onSubmit={onSubmit} className='white-blur-glass mt-5 p-4 rounded-xl shadow-2xl'>
                            <div className='flex flex-col gap-3'>
                                <span className=''>Site</span>
                                <input type="text" placeholder='example.com' className='form-control blue-blur-glass text-white' onChange={(e) => setSite(e.target.value)} />
                            </div>

                            <div className='flex flex-col gap-3 mt-3'>
                                <span className=''>Username</span>
                                <input type="text" placeholder='example_123' className='form-control blue-blur-glass text-white' onChange={(e) => setUsername(e.target.value)} />
                            </div>
                            <div className='flex flex-col gap-3 mt-3'>
                                <span className=''>Password</span>
                                <input type="text" placeholder='password' className='form-control blue-blur-glass text-white' onChange={(e) => setPassword(e.target.value)} />
                                <span className='text-sm text-slate-400'>Make sure that you're saving your current password for this site</span>
                            </div>

                            <div className="mt-5">
                                <button type="submit" className='bg-blue-800 w-[25%] rounded-full p-2'>Save</button>
                            </div>
                        </form>
                    </div>
                </div>

            </div>

        </div>
    );
};

export default PasswordManager;
