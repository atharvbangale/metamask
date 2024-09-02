import React, { useEffect, useState } from 'react';
import Card from '../charts/Card';
import { Send } from '@mui/icons-material';
import Swal from 'sweetalert2';

const Community = ({ contract }) => {
  const [content, setContent] = useState('');
  const [username, setUsername] = useState('');
  const account = localStorage.getItem('account');
  const [data ,setData] = useState([]);
  const [dp ,setDp] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (contract) {
          const data = await contract.getUser(account);
          setUsername(data.username);
          setDp(data.profileImgUrl);
          

        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [contract, account]);

  const handleSubmit = async () => {
    try {
      const tx = await contract.addChat(username, dp,content);
      await tx.wait();
      Swal.fire({
        title: "Post Added Successfully!",
        icon: "success"
      });
      // Clear the content state after successful submission
      setContent('');
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (contract) {
         
          const data = await contract.getAllChats();
          setData(data)
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [contract]);

  

  return (
    <div className='text-white h-[92vh] bg-[rgb(19,19,20)] p-5'>
      <span className='text-3xl google-font font-bold modern-text'>Community Support & Help</span>
      <hr className='bg-gray-800 mt-5 w-[75%]' />
      <div className='grid grid-cols-5 h-full p-5 gap-3'>
        <div className='col-span-4 rounded-xl p-5 overflow-y-scroll flex flex-col items-center'>
          <div className="white-blur-glass rounded-xl p-5 w-[800px] flex">
            <textarea
              className='form-control text-white blue-blur-glass rounded-xl h-[60px]'
              cols="30"
              rows="5"
              placeholder='start writing from here ...'
              value={content}
              onChange={(e) => setContent(e.target.value)} 
            ></textarea>
            <span className='flex items-center justify-center ms-3'>
              <Send className='cursor-pointer' style={{ fontSize: "2.5rem" }} onClick={handleSubmit} />
            </span>
          </div>
          <div className='flex flex-col gap-4 justify-center items-center p-4'>
            {data.map((item)=>(
              
              <Card username={item.username} time={item.timestamp} content={item.content} dp={item.profileImage} />

            ))}
          </div>
        </div>
        <div className='col-span-1 rounded-xl'>
          {/* add chat bot here */}
          <df-messenger
            location="us-central1"
            project-id="ace-hydra-404205"
            agent-id="4caa6e87-ff54-4be2-a61f-e56e730d6200"
            language-code="en"
            max-query-length="-1">
            <df-messenger-chat-bubble
              chat-title="Help Center"
              chat-subtitle="you can contact us for any help">
            </df-messenger-chat-bubble>
          </df-messenger>
        </div>
      </div>
    </div>
  );
};

export default Community;
