import React, { useEffect, useState } from 'react';
import './CategoryPage.css'; // Import CSS file for styling

const CategoryPage = () => {

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

  return (
    <div className="category-container">
      <h1 className="category-heading">Categories</h1>
      <ul className="category-list">
        {data.map(d => (
          <li className="category-item" key={d.id}>
            <a href={`/category/${d.id}`} className="category-link">{d.name}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryPage;