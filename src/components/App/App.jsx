import { useState, useEffect } from "react";
import { toast } from 'react-hot-toast';
import fetchImages from "../FetchImages/FetchImages"


import ImageGallery from "../ImageGallery/ImageGallery";
import Loader from "../Loader/Loader";
import ErrorMassage from "../ErrorMessage/ErrorMessage";
import SearchBar from "../SearchBar/SearchBar";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import ImageModal from "../ImageModal/ImageModal";

import css from "./App.module.css";

function App() {
const [images, setImages] = useState([]);
const [query, setQuery] = useState("");
const [loader, setLoader] = useState(false);
const [error, setError] = useState(false);
const [page, setPage] = useState(1);
const [modalIsOpen, setModalIsOpen] = useState(false);
const [isVisible, setIsVisible] = useState(false);
const [selectedImage, setSelectedImage] = useState(null);


useEffect(() => {
  if (!query) {
    return
  }
  const getImages = async () => {
    setLoader(true);
    try {
      setError(false);
      const data = await fetchImages(page, query);
      console.log(data.results);
      
      if (data.results.length === 0) {
        
        setIsVisible(false);
        toast.error("Sorry. The images you requested couldn't be found");
      } else {
        setImages((prevImages) => [...prevImages, ...data.results]);
        setIsVisible(data.total_pages && data.total_pages !== page);
        console.log(data.total_pages);
        console.log(page);
      }
    } catch (error) {
      setError(true);
    } finally {
      setLoader(false);
    }
  };
  getImages();
}, [query, page]);

const handleSubmit = (query) => {
  setQuery(query);
  setPage(1);
  setError(null);
  setImages([]);
  setIsVisible(false);

}

const handleLoadMore = () => {
  setPage(page + 1);
}

const openModal = (image) => {
  setSelectedImage(image);
  setModalIsOpen(true);
}

const closeModal = () => {
  setModalIsOpen(false);
  
}
  return (
    <div className={css.container}>
      <SearchBar onSubmit={handleSubmit} />

      {images.length > 0 && (
        <ImageGallery images={images} onImageClick={openModal}/>
      )}
      {error && <ErrorMassage />}
      {loader && <Loader/>}
      {images.length > 0 && !loader && isVisible && (
        <LoadMoreBtn onClick={handleLoadMore}/>
      )}
      {selectedImage && (
        <ImageModal 
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        imageUrl={selectedImage.urls.regular}
        altDescription={selectedImage.description}
        description={selectedImage.description}
        likes={selectedImage.likes}
        user={selectedImage.user.name}
        />
      )}
    </div>
  );
}


export default App;
