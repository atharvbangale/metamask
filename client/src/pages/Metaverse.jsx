import React, { useRef,useEffect, useState } from 'react'
import ABI from "./ABI.json";
import { ethers } from 'ethers';
import 'aframe';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import mountain from '../models/mountain.glb';
// import carpet from '../models/carpet.glb';
import gallery from '../models/gallery.glb';
import sky from "../assets/sky.jpg";
import useSpeechRecognition from './useSpeechRecognition';

const positions = [
  {
    customPosition: { x: -24.9, y: 5, z: 20 },
    customRotation: { x: 0, y: 90, z: 0 }
  },
  {
    customPosition: { x: -24.9, y: 5, z: 10 },
    customRotation: { x: 0, y: 90, z: 0 }
  },
  {
    customPosition: { x: -24.9, y: 5, z: 0 },
    customRotation: { x: 0, y: 90, z: 0 }
  },
  {
    customPosition: { x: -24.9, y: 5, z: -10 },
    customRotation: { x: 0, y: 90, z: 0 }

  },
  {
    customPosition: { x: -24.9, y: 5, z: -20 },
    customRotation: { x: 0, y: 90, z: 0 }
  }
  ,
  {
    customPosition: { x: -20.9, y: 5, z: -24.9 },
    customRotation: { x: 0, y: 0, z: 0 }
  },
  {
    customPosition: { x: -10.9, y: 5, z: -24.9 },
    customRotation: { x: 0, y: 0, z: 0 }
  },
  {
    customPosition: { x: -0.9, y: 5, z: -24.9 },
    customRotation: { x: 0, y: 0, z: 0 }
  },
  {

    customPosition: { x: 10, y: 5, z: -24.9 },
    customRotation: { x: 0, y: 0, z: 0 }

  },
  {


    customPosition: { x: 20, y: 5, z: -24.9 },
    customRotation: { x: 0, y: 0, z: 0 }


  }

]


const Metaverse = () => {
  const contract_address = import.meta.env.VITE_CONTRACT_ADDRESS;
  const [selectedComponent, setSelectedComponent] = useState('');
  const [connected, setConnected] = useState(false);
  const [account, setAccount] = useState('');
  const [contract, setContract] = useState(null);
  const [userData, setUserData] = useState([]);
  const [images, setImages] = useState([]);

  console.log(images)

  useEffect(() => {
    const connect = async () => {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        setAccount(address);
        localStorage.setItem('account', address);

        setConnected(true);

        const contractAddress = contract_address;

        const abi = ABI;
        const contract = new ethers.Contract(contractAddress, abi, signer);
        setContract(contract);



      } catch (error) {
        console.error('Error connecting with wallet:', error);
        setConnected(false);
      }
    };

    connect();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await contract.getUserFiles(account);
        // console.log("Received data:", data);
        const imageDocuments = data.filter(document => document.file_type === 'image');
        setImages(imageDocuments);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };

    fetchData();
  }, [contract, account]);

  //Metaverse 

  const loader = new GLTFLoader();
  const mountainRef = useRef(null);
  const cameraRef = useRef(null);
  const [showPopup, setShowPopup] = useState(false);
  const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0, z: 0 });
  const [popupRotation, setPopupRotation] = useState({ x: 0, y: 0, z: 0 });

  const [popupInfo, setPopupInfo] = useState('');
  const [listening, setListening] = useState(false);
  const [movingForward, setMovingForward] = useState(false);
  const [plane, setPlane] = useState("mountain");


  const combinedData = images.map((image, index) => ({
    ...image,
    ...positions[index]
  }));

  console.log("room activated")
  useEffect(() => {
    if (localStorage.getItem('plane') == "carpet") {

      loader.load(gallery, (d) => {
        const mountainEntity = mountainRef.current.object3D;
        mountainEntity.add(d.scene);
      });




    } else {
      loader.load(mountain, (d) => {
        const mountainEntity = mountainRef.current.object3D;
        mountainEntity.add(d.scene);
      });


    }

  }, [loader]);



  const handleImageClick = (position, info, rotation) => {
    const offset = 2; // Adjust as needed to position the pop-up in front of the image
    const popupX = position.x;
    const popupY = position.y;
    const popupZ = position.z
    const rotateZ = rotation.z

    setShowPopup(true);
    setPopupPosition({ x: popupX, y: popupY, z: popupZ });
    setPopupRotation({ x: rotation.x, y: rotation.y, z: rotation.z })
    setPopupInfo(info);
  };


  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleButtonClick = () => {
    alert('Button clicked!');
  };

  // Speech recognition setup
  const { transcript, startListening, stopListening, resetTranscript } = useSpeechRecognition(); // Use the custom hook

  useEffect(() => {
    if (listening) {
      startListening();
    } else {
      stopListening();
    }
  }, [listening, startListening, stopListening]);

  useEffect(() => {
    if (transcript === 'move forward') {
      moveCameraForward() // Simulate pressing 'w' key for 1 second
      console.log("move forward")
      resetTranscript();
    } else if (transcript === 'move backward') {
      moveCameraBackward(); // Simulate pressing 's' key for 1 second
      console.log("move backword")

      resetTranscript();
    } else if (transcript === "room") {
      console.log("room")
      if (localStorage.getItem('plane') === "carpet") {
        localStorage.setItem('plane', 'mountain');

      } else {

        localStorage.setItem('plane', 'carpet');
      }
      window.location.reload();

      resetTranscript();

    }
  }, [transcript, resetTranscript]);
  const room = () =>{
    console.log("room")
      if (localStorage.getItem('plane') === "carpet") {
        localStorage.setItem('plane', 'mountain');

      } else {

        localStorage.setItem('plane', 'carpet');
      }
      window.location.reload();

  }

  const moveCameraForward = () => {
    const cameraEntity = cameraRef.current.object3D;
    let stepCount = 0; // Initialize step count

    const moveStep = () => {
      if (cameraEntity && stepCount < 20) { // Repeat 20 times
        // Get the current position and rotation of the camera
        const currentPosition = cameraEntity.position.clone();
        const currentRotation = cameraEntity.rotation.clone();

        // Calculate the movement vector based on the camera's rotation
        const deltaX = -0.5 * Math.sin(currentRotation.y);
        const deltaZ = -0.5 * Math.cos(currentRotation.y);

        // Update the camera position relative to the ground plane
        cameraEntity.position.x += deltaX;
        cameraEntity.position.z += deltaZ;

        stepCount++;
      } else {
        clearInterval(moveInterval); // Stop the interval once step count reaches 20
      }
    };

    const moveInterval = setInterval(moveStep, 30); // Adjust the interval duration as needed for smoother movement
  };

  const moveCameraBackward = () => {
    const cameraEntity = cameraRef.current.object3D;
    let stepCount = 0; // Initialize step count

    const moveStep = () => {
      if (cameraEntity && stepCount < 20) { // Repeat 20 times
        // Get the current position and rotation of the camera
        const currentPosition = cameraEntity.position.clone();
        const currentRotation = cameraEntity.rotation.clone();

        // Calculate the movement vector based on the camera's rotation
        const deltaX = 0.5 * Math.sin(currentRotation.y);
        const deltaZ = 0.5 * Math.cos(currentRotation.y);

        // Update the camera position relative to the ground plane
        cameraEntity.position.x += deltaX;
        cameraEntity.position.z += deltaZ;

        stepCount++;
      } else {
        clearInterval(moveInterval); // Stop the interval once step count reaches 20
      }
    };

    const moveInterval = setInterval(moveStep, 30); // Adjust the interval duration as needed for smoother movement
  };



  const toggleListening = () => {
    setListening(!listening);
  };

  const exit = () => {
    window.location.href = '/dashboard';
  }



  return (
    <div style={{ paddingTop: "100px" }}>
      <div style={{ position: 'absolute', top: '45px', left: '10px', zIndex: '9999' }} className='flex gap-3'>
        <button onClick={toggleListening} style={{ padding: "0.5rem", fontSize: "1rem", borderRadius: "10px", border: "none", color: "white", fontWeight: "bold", background: 'rgba(25,25,25,0.5)', }}>{listening ? "Stop Listening" : "Start Listening"}</button>

        <button onClick={room} style={{ padding: "0.5rem", fontSize: "1rem", borderRadius: "10px", border: "none", color: "white", fontWeight: "bold", background: 'rgba(25,25,25,0.5)', }}>room</button>

        <button onClick={exit} style={{ padding: "0.5rem", fontSize: "1rem", borderRadius: "10px", border: "none", color: "white", fontWeight: "bold" }} className='bg-red-800 opacity-70'>Exit</button>
      </div>
      <a-scene cursor="rayOrigin: mouse">
        <a-assets>
          <img id="sky" src={sky} />
        </a-assets>
        <a-sky color="#FFFFFF" material="src: #sky" rotation="0 0 0" />
        <a-entity
          color="#FFFFFF"
          id="mountain"
          position="0 0 0"
          scale={localStorage.getItem('plane') === "carpet" ? "5 5 5" : "15 15 15"}
          ref={mountainRef}
        />
        <a-camera ref={cameraRef} position="0 3 20"></a-camera>
        {combinedData.map((image) => (
          <a-image
            key={image.id}
            src={image.file_url}
            width="6"
            height="5"
            position={`${image.customPosition.x} ${image.customPosition.y} ${image.customPosition.z}`} // Use custom position values
            rotation={`${image.customRotation.x} ${image.customRotation.y} ${image.customRotation.z}`} // Use custom rotation values
            style={{ cursor: 'pointer' }}
            onClick={() => handleImageClick(image.customPosition, image.file_name, image.customRotation, image.id)}
          />
        ))}

        {showPopup && (
          <a-entity
            id="infoPanel"
            position={`${popupPosition.x} ${popupPosition.y} ${popupPosition.z}`}
            rotation={`${popupRotation.x} ${popupRotation.y} ${popupRotation.z}`}
            geometry="primitive: plane; width: 6; height: 5; radius: 0.1"
            material="color: #ffffff; shader: flat; opacity: 0.7; transparent: true"
          >
            {/* Close button */}
            <a-entity
              id="closeButton"
              position="2 2 0.3"
              geometry="primitive: plane; width: 0.5; height: 0.5"
              material="color: #ff0000; shader: flat"
              onClick={handleClosePopup}
              events={{ click: handleClosePopup }}
            >
              <a-text value="X" align="center" color="#ffffff"></a-text>
            </a-entity>

            {/* Popup content */}
            <a-text value={popupInfo} align="center" color="black" wrap-count="20" position="0 0.5 0.3"></a-text>

            {/* Button */}
            <a-entity
              id="popupButton"
              position="0 -0.5 0.1"
              geometry="primitive: plane; width: 2; height: 0.5"
              material="color: #0088ff; shader: flat"
              onClick={handleButtonClick}
            >
              <a-text value="Click Me!" align="center" color="#ffffff"></a-text>
            </a-entity>


          </a-entity>
        )}

      </a-scene>
    </div>
  )
}

export default Metaverse
