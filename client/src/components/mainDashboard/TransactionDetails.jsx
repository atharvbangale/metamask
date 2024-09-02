import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import ABI from "../../pages/ABI.json";
const TransactionDetails = ({ contract ,abi }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (!contract) return;
    
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const contractInstance = new ethers.Contract(contract.address, ABI, provider);
    
        // Define the event filter for the TransactionDetailsStored event
        const filter = contractInstance.filters.TransactionDetailsStored();
    
        // Fetch all past events matching the filter
        const events = await contractInstance.queryFilter(filter);
    
        // Map the events to transaction details
        const transactions = events.map(event => ({
          blockNumber: event.args.blockNumber.toString(),
          blockHash: event.args.blockHash,
          gasUsed: event.args.gasUsed.toString(),
          gasPrice: event.args.gasPrice.toString(),
          timestamp: new Date(event.args.timestamp.toNumber() * 1000).toLocaleString(),
          sender: event.args.sender
        }));
    
        setData(transactions);
      } catch (error) {
        console.error('Error fetching transaction details:', error);
      }
    };
    fetchData();
  }, [contract]);

  // Ensure data is defined before attempting to map over it
  return (
    <div className='text-white h-[92vh] bg-[rgb(19,19,20)]'>
      <div className='p-[80px]'>
        <span className='google-text modern-text text-3xl mb-3 font-bold '>
          Transactions Details 
        </span>
        <div className="mt-5 bg-gray-800 text-white p-4 rounded-lg overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-700">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Block Number</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Block Hash</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Gas Used</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Gas Price</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Timestamp</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Sender</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {data.map((row, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap">{row.blockNumber}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{row.blockHash}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{row.gasUsed}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{row.gasPrice}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{row.timestamp}</td>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    <div className="truncate w-40">
                      <span className="tooltip">{row.sender}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};


export default TransactionDetails;
