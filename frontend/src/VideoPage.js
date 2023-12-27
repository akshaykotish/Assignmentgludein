import React, { useState, useEffect } from 'react';
import './VideoSearchPage.css'; // Import CSS file for styling

const VideoPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    // Function to fetch videos based on searchTerm
    const fetchVideos = async () => {
      try {
        const response = await fetch(`http://localhost:4000/SearchVideos`,  {
            method: 'POST',
            body: JSON.stringify({
              "search": searchTerm,
            }),
            headers: {
              'Content-type': 'application/json; charset=UTF-8',
            },
          });
        if (response.ok) {
          const data = await response.json();
        if(data.length === undefined)
        {
            setVideos([]);
        }
        else{
          setVideos(data); 
        }
        } else {
          console.error('Failed to fetch videos');
        }
      } catch (error) {
        console.error('Error fetching videos:', error);
      }
    };

    const loadvideos = async () => {
        try {
          const response = await fetch(`http://localhost:4000/VideoList`);
          if (response.ok) {
            const data = await response.json();
            setVideos(data); // Assuming the API returns an array of videos
          } else {
            console.error('Failed to fetch videos');
          }
        } catch (error) {
          console.error('Error fetching videos:', error);
        }
      };

    if (searchTerm) {
      fetchVideos();
    } else {
        loadvideos(); // Clear videos when searchTerm is empty
    }
  }, [searchTerm]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="video-search-container">
      <h1 className="video-search-heading">Video Search</h1>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search videos..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="search-input"
        />
      </div>
      <div className="video-container">
        {videos.map((video) => (
          <div className="video-card" key={video.id}>
            <img src={video.thumbnail} alt={video.title} className="video-thumbnail" />
            <div className="video-details">
              <h3 className="video-title">{video.title}</h3>
              <p className="video-category">Category: {video.category}</p>
              <p className="video-description">{video.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoPage;