import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { AssistWalker, PersonPinCircle, TextFields } from '@mui/icons-material';

const ChatInterface = ({contract}) => {
  const [inputText, setInputText] = useState('');
  const [username, setUsername] = useState('');
  const account = localStorage.getItem('account');


  useEffect(() => {
    const fetchData = async () => {
      try {
        if (contract) {
          const data = await contract.getUser(account);
          setUsername(data.username);
          console.log(data.username)
          

        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [contract, account]);


  const [conversation, setConversation] = useState([
    {
      role: 'system',
      content: 'You will follow the conversation and respond to the queries asked by the user.'
    }
  ]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const apiUrl = "https://chatpostapp-23srkaehza-uc.a.run.app/palm2";

      const headersList = {
        "Content-Type": "application/json",
      };

      const bodyContent = JSON.stringify({
        user_input: inputText,
      });

      const reqOptions = {
        url: apiUrl,
        method: "POST",
        headers: headersList,
        data: bodyContent,
      };

      const response = await axios.request(reqOptions);
      setConversation(prevConversation => [...prevConversation, { role: 'user', content: inputText }, { role: 'assistant', content: response.data.content }]);
      setInputText('');

    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="flex flex-col p-4 text-white h-[92vh] bg-[rgb(19,19,20)]">
      <div className="overflow-y-auto flex-grow container">
        {conversation.length === 1 ? (
          <div className="  w-full h-full">
              <div className='container p-[150px] flex flex-col gap-4'>
                <span className='google-font text-6xl font-bold modern-text'>Hello {username} ,</span>
                <span className='text-gray-500  text-6xl font-bold google-font'>How can I help you today?</span>
                <div className='flex gap-4 mt-[100px]'>
                  <div className='w-[250px] h-[200px] rounded-2xl bg-gray-800 flex  p-5 hover:bg-gray-600 cursor-pointer flex-col items-end gap-[50px] relative' onClick={()=>setInputText("Tips For Secure Documents")}>
                    <span className='google-font text-xl'>Ask, Tips for Secure Documents. </span>
                    <span className='flex justify-end absolute bottom-6'>
                      <TextFields className=' text-3xl ' style={{fontSize:"2rem"}}/>
                    </span>
                  </div>

                  <div className='w-[250px] h-[200px] rounded-2xl bg-gray-800 flex  p-5 hover:bg-gray-600 cursor-pointer flex-col items-end gap-[50px] relative' onClick={()=>setInputText("What exactly is Blockchain explain in short  ?")}>
                    <span className='google-font text-xl'>Ask, About to define blockchain. </span>
                    <span className='flex justify-end absolute bottom-6'>
                      <TextFields className=' text-3xl ' style={{fontSize:"2rem"}}/>
                    </span>
                  </div>

                  <div className='w-[250px] h-[200px] rounded-2xl bg-gray-800 flex  p-5 hover:bg-gray-600 cursor-pointer flex-col items-end gap-[50px] relative' onClick={()=>setInputText("Expalin in Short About Metaverse and Virtual-Reality in Web 3.0 World.")}>
                    <span className='google-font text-xl'>Ask, About Metaverse and Virtual-Reality in Web 3.0 World. </span>
                    <span className='flex justify-end absolute bottom-6'>
                      <TextFields className=' text-3xl ' style={{fontSize:"2rem"}}/>
                    </span>
                  </div>

                  <div className='w-[250px] h-[200px] rounded-2xl bg-gray-800 flex  p-5 hover:bg-gray-600 cursor-pointer flex-col items-end gap-[50px] relative' onClick={()=>setInputText("what exactly cryptocurrency and token in ERC20 ?")}>
                    <span className='google-font text-xl'>Ask, About ERC20 Cryptocurrency Creation. </span>
                    <span className='flex justify-end absolute bottom-6 '>
                      <TextFields className=' text-3xl ' style={{fontSize:"2rem"}}/>
                    </span>
                  </div>
                  

                  

                </div>
              </div>
              
          </div>
        ) : (
          conversation.map((message, index) => (
            <div key={index} className={`flex mb-4 ${message.role === 'assistant' ? 'justify-end' : 'justify-start'}`}>
              {message.role === 'assistant' && (
                <div className="flex items-end ">
                  <div className="  mr-2 text-xl flex justify-end">
                    <div className='rounded-xl p-5 w-[75%] white-blur-glass'>
                      {message.content}
                    </div>
                  </div>
                  <img src="https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/google-gemini-icon.png" alt="Assistant" className="w-9 h-8 rounded-full object-cover" />
                </div>
              )}
              {message.role === 'user' && (
                <div className="flex items-end ">
                  <img src="https://gateway.pinata.cloud/ipfs/QmS7YQ9bFGH3WeLbLPJEKYHAyiEi6E5Vpr5tSi4Pkh6cKa" alt="User" className="w-9 h-8 rounded-full" />
                  <div className=" r ml-2 text-xl">
                    <div className='rounded-xl p-5  blue-blur-glass'>
                      {message.content}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
      <div className="flex gap-3 justify-center">
        <input
          className=" p-4 w-[75%] rounded-full border  border-gray-700 focus:outline-none blue-blur-glass  text-xl font-mono focus:border-blue-500"
          placeholder="Type your message here..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
        <button
          className="p-2 rounded-r-lg  text-white  focus:outline-none"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Sending..." : (
            <img src="https://cdn-icons-png.freepik.com/256/11454/11454609.png" alt="" className='w-[50px] h-[50px]' />
          )}
        </button>
      </div>
    </div>
  );
};

export default ChatInterface;
