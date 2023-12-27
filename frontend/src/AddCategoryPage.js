import React, { useState } from 'react';
import './CategoryPage.css'; // Reusing the same CSS file for styling

const AddCategoryPage = () => {
  const [newCategory, setNewCategory] = useState('');

  const handleInputChange = (e) => {
    setNewCategory(e.target.value);
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

  const handleAddCategory = async () => {
    if (newCategory.trim() !== '') {
      // Simulating adding a new category by pushing it to the categories array
      let id = await generateString(6);
      let name = newCategory;
      fetch("http://localhost:4000/CreateCategory", {
        method: 'POST',
        body: JSON.stringify({
          "id": id,
          "name": name
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }).then((e)=>{
        setNewCategory('');
      });
      alert("Category Created");
    }
  };

  return (
    <div className="category-container">
      <h1 className="category-heading">Add Category</h1>
      <div className="add-category-form">
        <input
          type="text"
          placeholder="Enter category name"
          value={newCategory}
          onChange={handleInputChange}
          className="category-input"
        />
        <button onClick={handleAddCategory} className="add-category-button">
          Add Category
        </button>
      </div>
    </div>
  );
};

export default AddCategoryPage;