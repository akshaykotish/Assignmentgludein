import logo from './logo.svg';
import './App.css';
import CategoryPage from './CategoryPage';
import AddCategoryPage from './AddCategoryPage';
import VideoPage from './VideoPage';
import AddVideo from './AddVideo';
import Header from './Header';

import {
  Switch,
  Route,
  Link,
  Routes,
  BrowserRouter
} from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
          <div>
            <Header />
          </div>
          <Routes>
            <Route path='/' element={<CategoryPage/>} />
            <Route path="/categories" element={<CategoryPage/>} />
            <Route path="/category-listing" element={<AddCategoryPage/>} />
            <Route path="/videos" element={<VideoPage/>} />
            <Route path="/add-video" element={<AddVideo/>} />      
          </Routes>
    </BrowserRouter>
  );
}

export default App;
