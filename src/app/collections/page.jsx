"use client"
import React, { useState, useEffect } from "react";


export default function Collection() {
    // State to keep track of the currently active category filter
    const [activeCategory, setActiveCategory] = useState('all');

    // useEffect hook to handle the filtering logic whenever activeCategory changes
    useEffect(() => {
        const collectionCards = document.querySelectorAll('.collection-card');

        collectionCards.forEach(card => {
            const cardCategory = card.dataset.category; // Get the category from the data-category attribute

            // If "All Collections" is selected or the card's category matches the active category
            if (activeCategory === 'all' || cardCategory === activeCategory) {
                card.classList.remove('hidden'); // Show the card
            } else {
                card.classList.add('hidden'); // Hide the card
            }
        });

        // Cleanup function (optional, but good practice for event listeners if they were added dynamically)
        // In this case, we're not adding listeners here, but manipulating classes.
        // If you were adding global event listeners inside useEffect, you'd return a cleanup function.
    }, [activeCategory]); // Dependency array: re-run this effect whenever activeCategory changes

    // Function to handle clicks on the filter buttons
    const handleFilterClick = (category) => {
        setActiveCategory(category); // Update the active category state

        // Manually handle the 'active' class on buttons, as we're not using React state for button classes directly.
        // This is a common pattern when mixing React with direct DOM manipulation (though often avoided).
        document.querySelectorAll('.filter-button').forEach(btn => {
            if (btn.dataset.category === category) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    };

    return (
        <>
        

            {/* Main content for the collections page */}
            <main id="collections-main" className="container">
                <h1 id="page-title">Discover Our Curated Collections</h1>

                {/* Category Filter Navigation */}
                <div id="category-filter">
                    {/* Buttons: onClick calls handleFilterClick with the respective category */}
                    <button className={`filter-button ${activeCategory === 'all' ? 'active' : ''}`} data-category="all" onClick={() => handleFilterClick('all')}>All Collections</button>
                    <button className={`filter-button ${activeCategory === 'seasonal' ? 'active' : ''}`} data-category="seasonal" onClick={() => handleFilterClick('seasonal')}>Seasonal</button>
                    <button className={`filter-button ${activeCategory === 'technology' ? 'active' : ''}`} data-category="technology" onClick={() => handleFilterClick('technology')}>Technology</button>
                    <button className={`filter-button ${activeCategory === 'lifestyle' ? 'active' : ''}`} data-category="lifestyle" onClick={() => handleFilterClick('lifestyle')}>Lifestyle</button>
                    <button className={`filter-button ${activeCategory === 'home' ? 'active' : ''}`} data-category="home" onClick={() => handleFilterClick('home')}>Home & Living</button>
                    <button className={`filter-button ${activeCategory === 'hobbies' ? 'active' : ''}`} data-category="hobbies" onClick={() => handleFilterClick('hobbies')}>Hobbies & Kids</button>
                </div>

                {/* Collections Grid - These cards will be dynamically hidden/shown by the useEffect hook */}
                <div id="collections-grid">
                    {/* Collection Card 1: Summer Essentials */}
                    <div className="collection-card" data-category="seasonal">
                        <img src="https://placehold.co/400x250/F8F8F8/4A5568?text=Summer+Essentials" alt="Summer Essentials Collection" className="collection-image"/>
                        <div className="card-content">
                            <h2 className="card-title">Summer Essentials</h2>
                            <p className="card-description">Gear up for the sunny season with our must-have summer items.</p>
                            <a href="#" className="view-collection-button">View Collection</a>
                        </div>
                    </div>

                    {/* Collection Card 2: Tech Gadgets */}
                    <div className="collection-card" data-category="technology">
                        <img src="https://placehold.co/400x250/F8F8F8/4A5568?text=Tech+Gadgets" alt="Tech Gadgets Collection" className="collection-image"/>
                        <div className="card-content">
                            <h2 className="card-title">Tech Gadgets</h2>
                            <p className="card-description">Explore the latest innovations in personal and home electronics.</p>
                            <a href="#" className="view-collection-button">View Collection</a>
                        </div>
                    </div>

                    {/* Collection Card 3: Sustainable Living */}
                    <div className="collection-card" data-category="lifestyle">
                        <img src="https://placehold.co/400x250/F8F8F8/4A5568?text=Sustainable+Living" alt="Sustainable Living Collection" className="collection-image"/>
                        <div className="card-content">
                            <h2 className="card-title">Sustainable Living</h2>
                            <p className="card-description">Products designed to help you live a greener, more eco-conscious life.</p>
                            <a href="#" className="view-collection-button">View Collection</a>
                        </div>
                    </div>

                    {/* Collection Card 4: Home Decor Trends */}
                    <div className="collection-card" data-category="home">
                        <img src="https://placehold.co/400x250/F8F8F8/4A5568?text=Home+Decor+Trends" alt="Home Decor Trends Collection" className="collection-image"/>
                        <div className="card-content">
                            <h2 className="card-title">Home Decor Trends</h2>
                            <p className="card-description">Spruce up your space with the newest and most stylish home decor.</p>
                            <a href="#" className="view-collection-button">View Collection</a>
                        </div>
                    </div>

                    {/* Collection Card 5: Fitness Gear */}
                    <div className="collection-card" data-category="lifestyle">
                        <img src="https://placehold.co/400x250/F8F8F8/4A5568?text=Fitness+Gear" alt="Fitness Gear Collection" className="collection-image"/>
                        <div className="card-content">
                            <h2 className="card-title">Fitness Gear</h2>
                            <p className="card-description">Everything you need to boost your workouts and healthy lifestyle.</p>
                            <a href="#" className="view-collection-button">View Collection</a>
                        </div>
                    </div>

                    {/* Collection Card 6: Kids' Favorites */}
                    <div className="collection-card" data-category="hobbies">
                        <img src="https://placehold.co/400x250/F8F8F8/4A5568?text=Kids'+Favorites" alt="Kids' Favorites Collection" className="collection-image"/>
                        <div className="card-content">
                            <h2 className="card-title">Kids' Favorites</h2>
                            <p className="card-description">Hand-picked toys, books, and accessories loved by kids of all ages.</p>
                            <a href="#" className="view-collection-button">View Collection</a>
                        </div>
                    </div>

                    {/* New Collection Card 7: Winter Warmers */}
                    <div className="collection-card" data-category="seasonal">
                        <img src="https://placehold.co/400x250/F8F8F8/4A5568?text=Winter+Warmers" alt="Winter Warmers Collection" className="collection-image"/>
                        <div className="card-content">
                            <h2 className="card-title">Winter Warmers</h2>
                            <p className="card-description">Cozy up with our selection of warm clothing and home goods.</p>
                            <a href="#" className="view-collection-button">View Collection</a>
                        </div>
                    </div>

                    {/* New Collection Card 8: Smart Home Devices */}
                    <div className="collection-card" data-category="technology">
                        <img src="https://placehold.co/400x250/F8F8F8/4A5568?text=Smart+Home" alt="Smart Home Devices Collection" className="collection-image"/>
                        <div className="card-content">
                            <h2 className="card-title">Smart Home Devices</h2>
                            <p className="card-description">Automate and simplify your home with cutting-edge smart devices.</p>
                            <a href="#" className="view-collection-button">View Collection</a>
                        </div>
                    </div>

                </div>
            </main>
        </>
    );
}
