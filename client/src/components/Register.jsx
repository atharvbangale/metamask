import { ContentCopy, Image, NavigateNext } from '@mui/icons-material'
import React, { useState } from 'react'
import CircularProgress from '@mui/material/CircularProgress';
import { ArrowBack, Wallet } from "@mui/icons-material";
import { Link } from 'react-router-dom';
import { ethers } from "ethers";
import axios from 'axios'
import Swal from 'sweetalert2'
const randomPrompts = [
  "Design a Minecraft character with a blocky body and a determined expression, holding a pickaxe.",
  "Create a Minecraft miner with a helmet and a backpack, exploring deep caves for valuable resources.",
  "Craft a Minecraft builder with a toolbox and a blueprint, constructing impressive structures in the game world.",
  "Design a Minecraft adventurer with a map and a compass, embarking on epic quests and exploration.",
  "Create a Minecraft warrior with armor and a sword, bravely facing off against hostile mobs.",
  "Craft a Minecraft farmer with a hoe and a basket of crops, tending to lush fields and gardens.",
  "Design a Minecraft wizard with a magical staff and enchanted robes, casting powerful spells.",
  "Create a Minecraft merchant with a trading stall and a chest of valuable goods, conducting business with players.",
  "Craft a Minecraft explorer with a backpack and a telescope, discovering hidden treasures and landmarks.",
  "Design a Minecraft ranger with a bow and arrow, patrolling the wilderness and protecting the environment."
];

async function query(data) {
  const response = await fetch(
    "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-2",
    {
      headers: { Authorization: "Bearer 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" },
      method: "POST",
      body: JSON.stringify(data),
    }
  );
  const result = await response.blob();
  return result;
}

const Register = ({ state }) => {




  const [isNext, setNext] = useState(true);
  const [prompt, setPrompt] = useState('');
  const [imageSrc, setImageSrc] = useState(null);
  const [error, setError] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [about, setAbout] = useState('');
  const [uploadingImage, setUploadingImage] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setImageSrc(null);
    try {
      setLoading(true);
      const blob = await query({ "inputs": prompt });
      const imageUrl = URL.createObjectURL(blob);
      setImageSrc(imageUrl);
    } catch (error) {
      console.error("Error fetching image:", error);
      setError('Error fetching image');
    } finally {
      setLoading(false);
    }
  };

  const handleRandomPrompt = () => {
    const randomIndex = Math.floor(Math.random() * randomPrompts.length);
    setPrompt(randomPrompts[randomIndex]);
  };
  
  const handleImageChange = (file) => {
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImageSrc(imageUrl);
    }
  };
  
  const finalSubmit = async () => {
    const { contract } = state;

    if (!contract) {
      alert("Contract not found. Please make sure you are connected to the blockchain.");
      return;
    }

    if (!username || !phoneNumber || !email || !about || !imageSrc) {
      alert("Please fill out all fields.");
      return;
    }

    setUploadingImage(true);

    try {
      // Request user account access
      await window.ethereum.request({ method: 'eth_requestAccounts' });

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const address = await signer.getAddress();

      const response = await fetch(imageSrc);
      const blob = await response.blob();
      const file = new File([blob], "avatar.png", { type: "image/png" });

      const formData = new FormData();
      formData.append('file', file);

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

      // Call smart contract function to add user
      const tx = await contract.addUser(username, email, phoneNumber, address, imgHash, about, false);
      await tx.wait();

      Swal.fire({
        title: "User Registered Successfully !",
        text: "let's Start MetaVault Journey",
        icon: "success"
      });
      window.location.href = '/dashboard';
    } catch (error) {
      console.error('Error:', error);
      if (error.response && error.response.data && error.response.data.error) {
        alert(`Error: ${error.response.data.error}`);
        setUploadingImage(false)
      } else if (error.message && error.message.includes("execution reverted:") && error.message.includes("User is already registered")) {
        alert("Error: User is already registered.");
        setUploadingImage(false)

      } else if (error.message && error.message.includes("execution reverted:")) {
        const errorMessage = error.message.split("execution reverted:")[1].trim();
        alert(`Error: ${errorMessage}`);
        setUploadingImage(false)

      } else {
        alert('Transaction failed. Please check the console for details.');
        setUploadingImage(false)

      }
    }

  }



  return (
    <div className='h-[100vh] relative ' style={{ backgroundImage: "url('https://img.freepik.com/premium-photo/megaoplis-stands-near-river-sunset-3d-illustration_76964-4973.jpg')", backgroundSize: "cover" }}>
      <div className='h-full w-full absolute' style={{ backgroundImage: "url('https://www.sandbox.game/cdn-cgi/image/f=auto,origin-auth=share-publicly,onerror=redirect,w=1367/img/14_Home/visitors-homepage/GM-Art-BG.webp')", backgroundRepeat: "no-repeat", backgroundSize: "cover" }}>
        <div className='w-full h-full absolute  flex items-end justify-end   '>
          <img src="https://www.sandbox.game/cdn-cgi/image/f=auto,origin-auth=share-publicly,onerror=redirect/img/41_Avatar_Reveal/avatars-background-compressed.webp" alt="" className='' style={{ width: '80%', height: 'auto' }} />
        </div>
      </div>
      <div className='grid grid-cols-2  text-white z-30 h-full'>
        <div className='relative p-5 '>
          <div className='blue-blur-glass  rounded-3xl h-full flex flex-col justify-center px-10'>
            <div className="container flex flex-col gap-4">
              <Link to="/connect" className='cursor-pointer flex gap-3'>
                <ArrowBack />
                <span>back</span>
              </Link>
              <div className='p-5 '>
                {isNext ? (
                  <div className="container flex flex-col gap-10 text-white">
                    <div className='flex gap-3 text-white '>
                      <span className='flex flex-col gap-3 w-full'>
                        Username :
                        <input type="text" className='form-control bg-transparent text-white ' placeholder='Enter Username ' value={username} onChange={(e) => setUsername(e.target.value)} />
                      </span>
                      <span className='flex flex-col gap-3 w-full'>
                        Phone Number :
                        <input type="number" className='form-control bg-transparent text-white' placeholder='Enter Mobile Number' value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                      </span>
                    </div>
                    <div>
                      <span className='flex flex-col gap-3'>
                        Email :
                        <input type="email" name="" id="" className="form-control bg-transparent text-white" placeholder='Enter Email' value={email} onChange={(e) => setEmail(e.target.value)} />
                      </span>
                    </div>
                    <div>
                      <span className='flex flex-col gap-2'>
                        Tell Something About You :
                        <textarea name="" id="" cols="30" rows="10" className='form-control bg-transparent text-white' placeholder='Start writing from here....' value={about} onChange={(e) => setAbout(e.target.value)}></textarea>
                      </span>
                    </div>
                    <div className='flex justify-end'>
                      <button className='btn bg-pink-600 font-bold text-lg rounded-full ' onClick={() => setNext(false)}>
                        <span>next</span>
                        <NavigateNext />
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className='flex flex-col gap-4  justify-center'>
                    <span className='text-3xl font-bold '>Let's Genrate Your Avatar</span>
                    <div className='flex gap-4  mb-4'>
                      <div className='blue-blur-glass border-[3px] border-white rounded-lg w-[400px] h-[400px] object-contain i-glow'>
                        {isLoading && <div className='w-full h-full flex justify-center items-center'>
                          <CircularProgress />
                        </div>}
                        {imageSrc && <img src={imageSrc} alt="Generated Image" className='w-[400px] h-[400px] object-cover rounded-xl ' />}
                        {error && <div>{error}</div>}
                      </div>

                      <form onSubmit={handleSubmit}>
                        <textarea name="" id="" cols="30" rows="5" className='form-control bg-transparent text-lg font-mono text-white' placeholder='Explain Which type of avatar you need here ....' value={prompt} onChange={(e) => setPrompt(e.target.value)}></textarea>

                        <span className='mt-3 text-white cursor-pointer flex justify-center items-center font-mono text-lg rounded-full' onClick={handleRandomPrompt}>
                          <ContentCopy />
                          Generate Random Prompt
                        </span>

                       

                        <button type='submit' className='rounded-full hover:bg-blue-800 justify-center mt-4 w-full btn flex bg-blue-500 gap-3'>
                          <Image />
                          <span className='font-bold'>Generate Avatar</span>
                        </button>

                         {/* Add the input element for selecting a file */}
                         <input type="file" accept="image/*" onChange={(e) => handleImageChange(e.target.files[0])} className='hidden' id="avatarInput" />
                        <label htmlFor="avatarInput" className='rounded-full hover:bg-blue-800 justify-center mt-4 w-full btn flex bg-blue-500 gap-3 cursor-pointer'>
                          <Image />
                          <span className='font-bold'>Select Image</span>
                        </label>
                      </form>
                    </div>

                    <div className='flex justify-between'>
                      <button className='btn bg-pink-600 rounded-full font-bold text-lg' onClick={() => setNext(true)}>previous</button>
                      <button className='btn bg-pink-600 text-white w-[200px] font-bold text-lg rounded-full' onClick={finalSubmit}>
                        {uploadingImage ? <CircularProgress /> : "Start Journey"}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className=''>

          </div>
        </div>
      </div>
    </div>
  )
}

export default Register;
