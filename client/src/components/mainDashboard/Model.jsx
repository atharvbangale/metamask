import React, { useEffect, useState } from 'react';
import { Add, Close } from '@mui/icons-material';
import { CircularProgress } from "@mui/material";
import axios from 'axios';
import Swal from 'sweetalert2';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

// Card component
const Card = ({ type, title, onClick }) => {
  const imageSrc = type === 'glb' ? 'https://www.freeiconspng.com/thumbs/3d-cube-png/3d-cube-transparent-png-4.png' : glbLogo; // Change this line to handle GLB files
  return (
    <div className='w-[300px] h-[300px] white-blur-glass rounded-xl cursor-pointer' onClick={onClick}>
      <div className='flex justify-center'>
        <img src={imageSrc} alt={`${type} document`} className='w-[250px]' />
      </div>
      <div className='flex justify-center mt-5 '>
        <span className='' style={{ maxWidth: '100%' }}>{title}</span>
      </div>
    </div>
  );
};

// MyFiles component
const MyFiles = ({ contract }) => {
  const [documents, setDocuments] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [title, setTitle] = useState('');
  const [uploadingFile, setUploadingFile] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [otherAccount  , setOtherAccount] = useState('');

  const account = localStorage.getItem('account');
  const fileType = "glb"; // Change file type to GLB
  const description = "no description";


  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await contract.getUserFiles(account);
        console.log("Received data:", data);
        const glbDocuments = data.filter(document => document.file_type === 'glb'); // Filter documents by GLB file type
        setDocuments(glbDocuments);
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

      const pdfDocuments = dataArray.filter(document => document.file_type === 'glb');

      setDocuments(pdfDocuments)
      

    } catch (error) {
      alert(error);
    }

  }


  const toggleModal = () => {
    setModalVisible(!modalVisible);
    setSelectedFile(null);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!contract) {
      alert("Contract not found. Please make sure you are connected to the blockchain.");
      return;
    }
  
    if (!title || !selectedFile) {
      alert("Please fill out all fields.");
      return;
    }
  
    const fileNameParts = selectedFile.name.split('.');
    const fileExtension = fileNameParts[fileNameParts.length - 1];
    if (fileExtension.toLowerCase() !== 'glb') {
      alert("Please select a GLB file.");
      return;
    }
  
    setUploadingFile(true);
  
    try {
      const formData = new FormData();
      formData.append('file', selectedFile);
  
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
  
      const tx = await contract.addUserImage(title, imgHash, fileType, timestamp, description);
      await tx.wait();
  
      Swal.fire({
        title: "File Uploaded Successfully !",
        text: "You Uploaded File On Blockchain Successfully",
        icon: "success"
      });
      setUploadingFile(false)
    } catch (error) {
      console.error('Error:', error);
      if (error.response && error.response.data && error.response.data.error) {
        alert(`Error: ${error.response.data.error}`);
        setUploadingFile(false);
      } else if (error.message && error.message.includes("execution reverted:") && error.message.includes("User is already registered")) {
        alert("Error: User is already registered.");
        setUploadingFile(false);
      } else if (error.message && error.message.includes("execution reverted:")) {
        const errorMessage = error.message.split("execution reverted:")[1].trim();
        alert(`Error: ${errorMessage}`);
        setUploadingFile(false);
      } else {
        alert('Transaction failed. Please check the console for details.');
        setUploadingFile(false);
      }
    }
  }

  const handleCardClick = (document) => {
    setSelectedDocument(document);
  };

  return (
    <div className='relative h-[92vh] overflow-y-scroll'>
         <div className='mt-5 p-5 w-full'>
          <input type="text" className='white-blur-glass p-2 rounded-xl w-[25%]' placeholder='Enter Address ..' onChange={(e)=>setOtherAccount(e.target.value)} require/>
          <button className="btn gradient-bg rounded-full mx-4" onClick={()=>getData()}>Get Data</button>
      </div>
      {documents.length === 0 && (
        <div className="no-videos-message text-center w-full h-full  text-3xl text-gray-500 dark:text-gray-400 flex items-center justify-center ">
          <span className=''>
            No files uploaded
          </span>
        </div>
      )}
      <div className='grid grid-cols-5 p-5 gap-5'>
        {documents.map((document, index) => (
          <Card key={index} type={document.file_type} title={document.file_name} onClick={() => handleCardClick(document)} />
        ))}
      </div>

      <span className='absolute bottom-10 right-10 p-3 white-blur-glass rounded-full cursor-pointer' onClick={toggleModal}>
        <Add className='font-bold text-4xl' />
      </span>

      {modalVisible && (
        <div className='absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-25'>
          <div className='w-[800px]  white-blur-glass rounded-lg'>
            <div className='p-5'>
              <div className='flex justify-end'>
                <button className='ml-3 bg-red-500 text-white px-4 py-2 rounded-md' onClick={toggleModal}>
                  <Close />
                </button>
              </div>
              <span className='flex justify-center font-bold   text-3xl w-full'>Upload File</span>

              <div className='p-5 mt-5'>
                <form onSubmit={handleSubmit}>
                  <div className='flex flex-col gap-3'>
                    <span className=' font-bold '>Enter Title :</span>
                    <input type="text" placeholder='Document Name ...' className='form-control blue-blur-glass text-white border-0 p-4 text-lg' onChange={(e) => setTitle(e.target.value)} required />
                  </div>
                  <div className='flex flex-col gap-3 mt-4 justify-between items-between'>
                    <div className=''>
                      <span className=' font-bold '>Choose file :</span>
                      <label htmlFor="file-upload" className="cursor-pointer flex items-center justify-center w-full px-4 py-20  blue-blur-glass rounded-xl border-2 border-white border-dashed">
                        <span className="leading-normal  border-none font-bold text-lg">
                          {selectedFile ? (
                            <div className='flex justify-center flex-col items-center'>
                              
                              <span>
                                {selectedFile.name}
                              </span>
                            </div>
                          ) : "Select File or Drop File"}
                        </span>
                        <input id="file-upload" type="file" className="hidden" accept=".glb" onChange={handleFileChange} required />
                      </label>
                    </div>
                    <button type="submit" className='btn bg-blue-600 mt-5 rounded-full font-bold'>
                      {uploadingFile ? (<CircularProgress className='text-white' />) : "Upload File"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Render 3D model */}
      {selectedDocument && (
        <div className='absolute top-0 left-0 w-full h-full bg-black-grid bg-opacity-75'>
            
          <Canvas style={{ width: '100%', height: '100%' }}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 10]} intensity={1} />
            <ModelLoader url={selectedDocument.file_url} initialScale={4} />

            <OrbitControls />
          </Canvas>
          <button className='absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-md' onClick={() => setSelectedDocument(null)}>
            close
          </button>
        </div>
      )}
    </div>
  );
};

// ModelLoader component
const ModelLoader = ({ url, initialScale = 1 }) => {
    const [model, setModel] = useState(null);
    const gltfLoader = new GLTFLoader();
  
    useEffect(() => {
      gltfLoader.load(url, (gltf) => {
        // Calculate bounding box dimensions
        const boundingBox = new THREE.Box3().setFromObject(gltf.scene);
        const size = new THREE.Vector3();
        boundingBox.getSize(size);
  
        // Determine the scale to fit the model into the container
        const maxSize = Math.max(size.x, size.y, size.z);
        const scale = 1 / maxSize * initialScale;
  
        // Set the model and scale
        setModel(gltf.scene);
        gltf.scene.scale.set(scale, scale, scale);
      });
    }, [url, initialScale]);
  
    return model ? <primitive object={model} position={[0, -2, 0]} /> : null;
  };
  
export default MyFiles;
