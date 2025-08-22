import React, { useState, useContext } from 'react';
import { CaptainDataContext } from '../context/CaptainContext';
import axios from 'axios';

const CaptainStatusToggle = () => {
  const { captain, setCaptain } = useContext(CaptainDataContext);
  const [isLoading, setIsLoading] = useState(false);

  const toggleStatus = async () => {
    if (!captain) return;

    setIsLoading(true);
    try {
      const newStatus = captain.status === 'active' ? 'inactive' : 'active';
      
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/captains/status`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      setCaptain(response.data.captain);
    } catch (error) {
      console.error('Error updating status:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!captain) return null;

  return (
    <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md">
      <div>
        <h3 className="text-lg font-semibold">Captain Status</h3>
        <p className="text-sm text-gray-600">
          Current status: {captain.status === 'active' ? 'Online' : 'Offline'}
        </p>
      </div>
      
      <button
        onClick={toggleStatus}
        disabled={isLoading}
        className={`px-4 py-2 rounded-lg font-medium transition-colors ${
          captain.status === 'active'
            ? 'bg-green-500 hover:bg-green-600 text-white'
            : 'bg-gray-500 hover:bg-gray-600 text-white'
        } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        {isLoading ? 'Updating...' : captain.status === 'active' ? 'Go Offline' : 'Go Online'}
      </button>
    </div>
  );
};

export default CaptainStatusToggle;
