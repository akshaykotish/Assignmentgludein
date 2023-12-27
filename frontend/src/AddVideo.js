import React, { useState, useEffect } from 'react';
import './CategoryPage.css'; // Reusing the same CSS file for styling

const initialFormData = {
  id: '',
  title: '',
  description: '',
  videoUrls: [],
  resolutions: [],
  playbackurls: {},
  categoryId: '',
  thumbnail: '',
};

const AddVideo = () => {

  const [formData, setFormData] = useState(initialFormData);

 
  const [data, setdata] = useState([]);

  const fetchCategories = async () =>{
    const data = await fetch("http://localhost:4000/CategoryList", {
      method: 'GET',
      headers: {'Content-type': 'application/json; charset=UTF-8',},
    });
    const jsondata = await data.json();
    setdata(jsondata);
  }

  useEffect(()=>{
    fetchCategories();
  }, []);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleVideoUrlChange = (e, index) => {
    const videoUrls = [...formData.videoUrls];
    videoUrls[index] = e.target.value;
    setFormData({
      ...formData,
      videoUrls,
    });
  };

  const handleResolutionChange = (e, index) => {
    const resolutions = [...formData.resolutions];
    resolutions[index] = e.target.value;
    setFormData({
      ...formData,
      resolutions,
    });
  };

  const handleAddVideoField = () => {
    setFormData({
      ...formData,
      videoUrls: [...formData.videoUrls, ''],
      resolutions: [...formData.resolutions, ''],
    });
  };

const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

function generateString(length) {
    let result = ' ';
    const charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {

      var rndm_id = generateString(6);

      for(let i=0; i<formData.videoUrls.length; i++)
      {
            formData.playbackurls[formData.videoUrls[i]] = formData.resolutions[i];
      }

      formData.id = rndm_id;

      delete formData.videoUrls;
      delete formData.resolutions;

      console.log(formData);

      const v = document.getElementById("category").value;
    formData.categoryId = v;

      const response = await fetch('http://localhost:4000/CreateVideo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Handle success
        alert("Video Added");
        console.log('Data submitted successfully!');
      } else {
        // Handle error
        console.error('Failed to submit data.');
      }
    } catch (error) {
      console.error('Error submitting data:', error);
    }
  };

  const onCategoryChange = (e)=>{
    const v = document.getElementById("category").value;
    formData.categoryId = v;
  }

  return (
    <div className="category-container">
      <h1 className="category-heading">Add Video</h1>
      <form onSubmit={handleFormSubmit} className="add-video-form">
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          required
        />

        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          required
        ></textarea>

        <label htmlFor="category">Category:</label>
        <select
          id="category"
          name="categoryId"
          onChange={onCategoryChange}
          required
        >
        <option value="">Select a category</option>
          {data.map(c=>{
            return (<option id={c.id} value={c.id}>{c.name}</option>);            
          })}
        </select>
        <label htmlFor="thumbnail">Thumbnail URL:</label>
        <input
          type="text"
          id="thumbnail"
          name="thumbnail"
          value={formData.thumbnail}
          onChange={handleInputChange}
          required
        />

        <div className="video-fields">
          <h3>Video URLs and Resolutions</h3>
          {formData.videoUrls.map((url, index) => (
            <div key={index}>
              <label htmlFor={`videoUrl${index + 1}`}>Video URL:</label>
              <input
                type="text"
                id={`videoUrl${index + 1}`}
                name={`videoUrl${index + 1}`}
                value={url}
                onChange={(e) => handleVideoUrlChange(e, index)}
                required
              />

              <label htmlFor={`resolution${index + 1}`}>Resolution:</label>
              <input
                type="text"
                id={`resolution${index + 1}`}
                name={`resolution${index + 1}`}
                value={formData.resolutions[index]}
                onChange={(e) => handleResolutionChange(e, index)}
                required
              />
            </div>
          ))}
          <button type="button" onClick={handleAddVideoField}>
            Add Video Field
          </button>
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddVideo;