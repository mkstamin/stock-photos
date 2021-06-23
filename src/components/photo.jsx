import React from 'react';

const photo = ({ image }) => {
    const {
        urls: { regular },
        alt_description,
        likes,
        user: {
            name,
            portfolio_url,
            profile_image: { medium },
        },
    } = image;

    return (
        <article className="photo">
            <img src={regular} alt={alt_description} />
            <div className="photo-info">
                <h4>{name}</h4>
                <p>{likes}</p>
                <a href={portfolio_url} target="_blank" rel="noreferrer">
                    <img src={medium} alt={name} className="user-img" />
                </a>
            </div>
        </article>
    );
};

export default photo;
