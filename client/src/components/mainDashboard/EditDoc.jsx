import React, { useEffect, useRef, useState } from 'react';
import EditorJS from '@editorjs/editorjs';
import Paragraph from '@editorjs/paragraph';
import List from '@editorjs/list';
import Header from '@editorjs/header';
import ImageTool from '@editorjs/image';
import html2pdf from 'html2pdf.js';
import Swal from 'sweetalert2';
import axios from 'axios';

const EditDoc = ({ contract }) => {
  const editorRef = useRef(null);
  const [pdfname, setPdfName] = useState("QuickDoc.pdf");
  const [uploadingFile, setUploadingFile] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const account = localStorage.getItem('account');
  const fileType = "pdf";
  const description = "no description";
  const [loading, setLoading] = useState(false);

  const initializeEditor = () => {
    if (!editorRef.current) {
      console.log('Initializing EditorJS');
      editorRef.current = new EditorJS({
        holder: 'editorjs',
        tools: {
          paragraph: Paragraph,
          list: List,
          header: Header,
          image: {
            class: ImageTool,
            config: {
              uploader: {
                uploadByFile:  (file) => ({ success: 1, file: { url: URL.createObjectURL(file) } }),
              },
            },
          },
        },
      });
    }
  };

  const handleAIResponse = async () => {
    if (!editorRef.current) {
      console.error('Editor instance is not initialized');
      return;
    }

    const prompt = getSelectedText();
    if (!prompt.trim()) {
      console.error('Prompt is empty.');
      return;
    }

    try {
      setLoading(true);
      const response = await getAIResponse(prompt);
      insertAIResponse(response);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const getSelectedText = () => {
    const selection = window.getSelection();
    return selection.toString().trim();
  };

  const insertAIResponse = (response) => {
    const selection = window.getSelection();
    const range = selection.getRangeAt(0);
    range.deleteContents();
    range.insertNode(document.createTextNode(response));
  };
  

  const getAIResponse = async (prompt) => {
    try {
      const apiUrl = "https://chatpostapp-23srkaehza-uc.a.run.app/palm2";
      const response = await axios.post(apiUrl, { user_input: prompt });
      return response.data.content;
    } catch (error) {
      console.error('Error fetching response from AI:', error);
      return 'Error occurred while fetching response from AI.';
    }
  };

  const exportToPdf = async () => {
    if (!editorRef.current) {
      console.error('Editor instance is not initialized');
      return null;
    }
  
    const outputData = await editorRef.current.save();
    const pdfContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
            }
            pre {
              white-space: pre-wrap;
              word-wrap: break-word;
            }
            img {
              max-width: 100%;
              height: auto;
            }
          </style>
        </head>
        <body>
          ${outputData.blocks.map((block) => {
            switch (block.type) {
              case 'paragraph':
                return `<p>${block.data.text}</p>`;
              case 'header':
                return `<h${block.data.level}>${block.data.text}</h${block.data.level}>`;
              case 'list':
                return `<ul>${block.data.items.map((item) => `<li>${item}</li>`).join('')}</ul>`;
              case 'image':
                return `<img src="${block.data.file.url}" alt="${block.data.caption}" width="${block.data.width}" height="${block.data.height}" />`;
              default:
                return '';
            }
          }).join('')}
        </body>
      </html>
    `;
  
    const options = {
      margin: 1,
      filename: pdfname,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
    };
  
    // Generate the PDF blob
    const pdfBlob = await html2pdf().set(options).from(pdfContent).output('blob');
  
    // Save the PDF locally (optional)
    await html2pdf().set(options).from(pdfContent).save();
  
    return pdfBlob;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!contract) {
      alert("Contract not found. Please make sure you are connected to the blockchain.");
      return;
    }
  
    setUploadingFile(true);
  
    try {
      const pdfBlob = await exportToPdf();
  
      // Create a Blob from the PDF blob
      const blob = new Blob([pdfBlob], { type: 'application/pdf' });
  
      // Create FormData and append the Blob
      const formData = new FormData();
      formData.append('file', blob, pdfname); // Append the Blob directly to FormData
  
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
  
      const tx = await contract.addUserImage(pdfname, imgHash, fileType, timestamp, description);
      await tx.wait();
  
      Swal.fire({
        title: "File Uploaded Successfully !",
        text: "You Uploaded File On Blockchain Successfully",
        icon: "success"
      });
      setUploadingFile(false);
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
  };
  
  
  useEffect(() => {
    initializeEditor();
    return () => {
      if (editorRef.current && typeof editorRef.current.destroy === 'function') {
        editorRef.current.destroy();
      }
    };
  }, []);

  return (
    <div className='bg-[rgb(19,19,20)] h-[92vh] px-5'>
      <div className='grid grid-cols-4 h-full '>
        <div className='col-span-2  p-5 flex justify-center'>
          <div className='bg-grid w-[750px] h-[800px] rounded-xl shadow-2xl text-black py-5 text-xl overflow-y-scroll px-5'>
            <div id="editorjs"></div>
          </div>
        </div>
        <div className='col-span-2 p-5 flex flex-col items-center'>
          <div className='flex flex-col mx-5 items w-full mt-5 gap-5 '>
            <span className='text-5xl google-font modern-text font-bold'>Quick Document Editor</span>
            <p className=' text-xl google-font '>
              Every time you save a document as a PDF, it's securely recorded on the blockchain, ensuring tamper-proof integrity and traceability. This means your documents are protected against unauthorized alterations and provide an immutable record of their history.
            </p>
          </div>
          <div className='flex flex-col mx-5 items w-full mt-5 gap-5'>
            <div className='flex gap-5'>
              <input type="text" className='p-2 white-blur-glass rounded-xl' placeholder='Enter Document Name' value={pdfname} onChange={(e) => setPdfName(e.target.value)} />
              <button className="btn gradient-bg rounded-lg" onClick={handleSubmit} disabled={uploadingFile}>Upload to Blockchain</button>
              <button className="btn border border-white rounded-lg" onClick={exportToPdf}>Download PDF</button>
            </div>
            <div className='mt-5'>
              <span className='my-3 mb-3'>

            {loading && <p>Loading...</p>}
              </span>
              <button  className="btn gradient-bg  w-[50%] rounded-full" onClick={handleAIResponse}>
                  Get AI Responce
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditDoc;
