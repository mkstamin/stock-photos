import React, { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import Photo from './components/photo';

const clientID = process.env.REACT_APP_UNSPLASH_API_KEY;
const mainUrl = `https://api.unsplash.com/photos`;
const searchUrl = `https://api.unsplash.com/search/photos`;

const App = () => {
    const [loading, setLoading] = useState(false);
    const [photos, setPhotos] = useState([]);
    const [page, setPage] = useState(0);
    const [query, setQuery] = useState('');

    useEffect(() => {
        const feactImages = async () => {
            setLoading(true);

            const urlPage = `&page=${page}`;
            const urlQuery = `&query=${query}`;

            let url;

            if (query) {
                url = `${searchUrl}?client_id=${clientID}${urlQuery}`;
            } else {
                url = `${mainUrl}?client_id=${clientID}${urlPage}`;
            }

            try {
                const response = await fetch(url);
                const data = await response.json();

                setPhotos((prevPhotos) => {
                    if (query && page === 1) {
                        return data.results;
                    }
                    if (query) {
                        return [...prevPhotos, ...data.results];
                    }
                    return [...prevPhotos, ...data];
                });
                setLoading(false);
            } catch (err) {
                setLoading(false);
                console.log(err);
            }
        };

        feactImages();
    }, [page, query]);

    useEffect(() => {
        const event = window.addEventListener('scroll', () => {
            if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 2) {
                setPage((prevPage) => prevPage + 1);
            }
        });
        return () => {
            window.removeEventListener('scroll', event);
        };
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        setPage(1);
    };

    return (
        <main>
            <section className="search">
                <form className="search-form">
                    <input
                        type="text"
                        placeholder="search"
                        className="form-input"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                    <button type="submit" className="submit-btn" onClick={handleSubmit}>
                        <FaSearch />
                    </button>
                </form>
            </section>
            <section className="photos">
                <div className="photos-center">
                    {photos.map((image, index) => (
                        // eslint-disable-next-line react/no-array-index-key
                        <Photo key={index} image={image} />
                    ))}
                </div>

                {loading && <h2 className="loading">Loading....</h2>}
            </section>
        </main>
    );
};

export default App;
