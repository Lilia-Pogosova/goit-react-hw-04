import css from "./ImageCard.module.css";


const ImageCard = ({ image, onClick }) => {
    return (
        <img
            className={css.cardImage}
            src={image.urls.small}
            onClick={onClick}
        />
    );
}

export default ImageCard;