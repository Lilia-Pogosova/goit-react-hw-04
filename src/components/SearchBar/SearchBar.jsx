import css from "./SearchBar.module.css";
import { toast, Toaster } from "react-hot-toast";
import { useState } from "react";
import { FiSearch } from 'react-icons/fi';
const SearchBar = ({ onSubmit }) => {
    const [query, setQuery] = useState("");

    function handleSubmitInput(evt) {
        setQuery(evt.target.value);
    }

    function handleSubmit(evt) {
        evt.preventDefault();
        if (!query.trim()) {
            toast.error("Please enter a search query");
            return;
        }
        onSubmit(query);
        setQuery("");
    }
    return (
        <header className={css.header}>
            <form onSubmit={handleSubmit} className={css.form}>
                <input
                    type="text"
                    autoComplete="off"
                    autoFocus
                    placeholder="Search images and photos"
                    value={query}
                    onChange={handleSubmitInput}
                    className={css.input}
                />
                
                <button type="submit" className={css.button}>
                    <FiSearch size="16px" className={css.icon} />
                    </button>

                <Toaster
                    position="top-center"
                    reverseOrder={false}
                />
            </form>
        </header>
    );
};

export default SearchBar;