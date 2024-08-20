import css from "./ImageModal.module.css";
import Modal from "react-modal";
import { AiOutlineLike } from "react-icons/ai";

Modal.setAppElement("#root");
const customStyles = {
    content: {
        top: "50%",
        left: "50%",
        right: "50%",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        border: 'none',
        outline: 'none',
    },
};

const ImageModal = ({
    isOpen,
    onRequestClose,
    imageUrl,
    altDescription,
    description,
    likes,
    user,
}) => {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            style={customStyles}
            contentLabel="Image Modal"
        >
            <div className={css.container}>
                <img className={css.image} src={imageUrl} alt={altDescription} />
                <h3 className={css.author}>Author: {user}</h3>
                <p className={css.description}>{description}</p>
                <div className={css.divLikes}>
                    <AiOutlineLike className={css.icon} size="25px" />
                    <p className={css.likes}>
                        {likes}
                    </p>
                </div>
            </div>
        </Modal>
    );
};

export default ImageModal;