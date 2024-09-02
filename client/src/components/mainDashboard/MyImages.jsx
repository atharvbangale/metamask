import React, { useEffect, useState } from 'react';
import { Add, Close } from '@mui/icons-material';
import { CircularProgress } from "@mui/material";
import axios from 'axios';
import Swal from 'sweetalert2'

// Placeholder image URL
const defaultImage = "https://via.placeholder.com/250";

// Images component
const Images = ({ title, onClick, imageUrl }) => {
  return (
    <div className='w-[300px]  white-blur-glass rounded-xl cursor-pointer' onClick={onClick}>
      <div className='flex justify-center'>
        <img src={imageUrl} alt="Image document" className='rounded-[15px] w-full h-full' />
      </div>
      <div className='flex   justify-center items-center'>
        <span className='font-bold font-mono p-2' style={{ maxWidth: '100%' }}>{title}</span>
      </div>
    </div>
  );
};

// MyImages component
const MyImages = ({ contract }) => {
  const [images, setImages] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [otherAccount  , setOtherAccount] = useState('');

  const [title, setTitle] = useState('');
  const [uploadingImage, setUploadingImage] = useState(false);
  const account = localStorage.getItem('account');
  const fileType = "image";
  const description = "no description";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await contract.getUserFiles(account);
        console.log("Received data:", data);
        const imageDocuments = data.filter(document => document.file_type === 'image');
        setImages(imageDocuments);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };

    fetchData();
  }, [contract, account]);
  //other account data 
  const getData = async () => {
    try {

    let dataArray
      if(otherAccount){
       dataArray = await contract.getUserFiles(otherAccount);
       
      }else{
       dataArray = await contract.getUserFiles(account);
      }

      const pdfDocuments = dataArray.filter(document => document.file_type === 'image');

      setImages(pdfDocuments)
      

    } catch (error) {
      alert(error);
    }

  }

  const toggleModal = () => {
    setModalVisible(!modalVisible);
    setSelectedImage(null);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!contract) {
      alert("Contract not found. Please make sure you are connected to the blockchain.");
      return;
    }

    if (!title || !selectedImage) {
      alert("Please fill out all fields.");
      return;
    }

    if (!selectedImage.type.startsWith('image/')) {
      alert("Please select an image file.");
      return;
    }

    setUploadingImage(true);

    try {
      const formData = new FormData();
      formData.append('file', selectedImage);

      const resFile = await axios.post(
        'https://api.pinata.cloud/pinning/pinFileToIPFS',
        formData,
        {
          headers: {
            pinata_api_key: '9c7b88953bed4a983af8',
            pinata_secret_api_key: '53203490d2e84a0bdd80876d540cf493372e714d7ebdeccfc34d1692274c3ad3',
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      const imgHash = `https://gateway.pinata.cloud/ipfs/${resFile.data.IpfsHash}`;
      const timestamp = Math.floor(Date.now() / 1000);

      const tx = await contract.addUserImage( title, imgHash, fileType, timestamp, description);
      await tx.wait();
      Swal.fire({
        title: "Image Uploaded Successfully !",
        text: "You Uploaded Image On Blockchain Successfully",
        icon: "success"
      });
      setUploadingImage(false)
    } catch (error) {
      console.error('Error:', error);
      if (error.response && error.response.data && error.response.data.error) {
        alert(`Error: ${error.response.data.error}`);
        setUploadingImage(false);
      } else {
        alert('Transaction failed. Please check the console for details.');
        setUploadingImage(false);
      }
    }
  }

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  return (
    <div className='relative h-[92vh] overflow-y-scroll'>
         <div className='mt-5 p-5 w-full'>
          <input type="text" className='white-blur-glass p-2 rounded-xl w-[25%]' placeholder='Enter Address ..' onChange={(e)=>setOtherAccount(e.target.value)} require/>
          <button className="btn gradient-bg rounded-full mx-4" onClick={()=>getData()}>Get Data</button>
      </div>
       {images.length === 0 && (
      <div className="no-videos-message text-center w-full h-full  text-3xl text-gray-500 dark:text-gray-400 flex items-center justify-center ">
        <span className=''>
        No Images uploaded

        </span>
      </div>
    )}
      <div className='grid grid-cols-5 p-5 gap-5'>
      {
      images.map((image, index) => (
        <Images key={index} title={image.file_name} imageUrl={image.file_url} onClick={() => handleImageClick(image)} />
      ))
    }
      </div>
      <span className='absolute bottom-10 right-10 p-3 white-blur-glass rounded-full cursor-pointer' onClick={toggleModal}>
        <Add className='font-bold text-4xl' />
      </span>

      {selectedImage && (
        <div className='absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-75' onClick={() => setSelectedImage(null)}>
          <div className='w-[80%] h-[90%]'>
            <iframe src={selectedImage.file_url} title={selectedImage.file_name} className='w-full h-full rounded-2xl' />
            <button className='absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-md' onClick={() => setSelectedImage(null)}>
              Close
            </button>
          </div>
        </div>
      )}

      {modalVisible && (
        <div className='absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-25'>
          <div className='w-[800px]  white-blur-glass rounded-lg'>
            <div className='p-5'>
              <div className='flex justify-end'>
                <button className='ml-3 bg-red-500 text-white px-4 py-2 rounded-md' onClick={toggleModal}>
                  <Close />
                </button>
              </div>
              <span className='flex justify-center font-bold   text-3xl w-full'>Upload Image</span>

              <div className='p-5 mt-5'>
                <form onSubmit={handleSubmit}>
                  <div className='flex flex-col gap-3'>
                    <span className=' font-bold '>Enter Title :</span>
                    <input type="text" placeholder='Image Name ...' className='form-control blue-blur-glass text-white border-0 p-4 text-lg' onChange={(e) => setTitle(e.target.value)} required />
                  </div>
                  <div className='flex flex-col gap-3 mt-4 justify-between items-between'>
                    <div className=''>
                      <span className=' font-bold '>Choose image :</span>
                      <label htmlFor="image-upload" className="cursor-pointer flex items-center justify-center w-full px-4 py-20  blue-blur-glass rounded-xl border-2 border-white border-dashed">
                        <span className="leading-normal  border-none font-bold text-lg">
                          {selectedImage ? (
                            <div className='flex justify-center flex-col items-center'>
                              <img src={URL.createObjectURL(selectedImage)} alt="" className='w-[100px] ' />
                              <span>
                                {selectedImage.name}
                              </span>
                            </div>
                          ) : "Select Image or Drop Image"}
                        </span>
                        <input id="image-upload" type="file" className="hidden" accept="image/*" onChange={handleImageChange} required />
                     
                        </label>
                    </div>
                    <button type="submit" className='btn bg-blue-600 mt-5 rounded-full font-bold'>
                      {uploadingImage ? (<CircularProgress className='text-white' />) : "Upload Image"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyImages;
