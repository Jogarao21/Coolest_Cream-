import React from 'react';
import '../styles/Reviews.css';

const reviewsData = [
    {
        avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
        name: 'Mike Torello',
        role: 'Food Blogger',
        review: 'The best ice cream I\'ve ever had! So creamy, so fresh, and so many amazing flavours. You can really taste the quality in every scoop.'
    },
    {
        avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
        name: 'Sarah Wright',
        role: 'Marketing Specialist',
        review: 'Coolest Cream never disappoints! From unique flavours to beautiful packaging, everything feels premium and made with love.'
    },
    {
        avatar: 'https://randomuser.me/api/portraits/men/46.jpg',
        name: 'Devon Miles',
        role: 'Entrepreneur',
        review: 'Finally, an ice cream brand that cares about taste and the planet. Love their eco-friendly approach and insanely good ice cream!'
    },
    {
        avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
        name: 'Priya S.',
        role: 'Local Guide',
        review: 'The rose cardamom flavour is the most beautiful thing I\'ve ever eaten. I dream about it. Literally.'
    },
    {
        avatar: 'https://randomuser.me/api/portraits/men/22.jpg',
        name: 'Arjun M.',
        role: 'Chef',
        review: 'Finally, an ice cream shop that doesn\'t rely on artificial stuff. It tastes like real food — what a concept!'
    }
];

// Duplicate array for seamless infinite scrolling
const marqueeItems = [...reviewsData, ...reviewsData];

export default function Reviews() {
    return (
        <section id="reviews" className="reviews-section">
            <div className="reviews-bg-elements" aria-hidden="true">
                <div className="r-blob r-blob-1" />
                <div className="r-blob r-blob-2" />
            </div>

            <div className="container reviews-header-container">
                <div className="reviews-header text-center">
                    <h2 className="reviews-title">
                        What Our <span className="accent-pink">Customers</span> Say
                    </h2>
                    <p className="reviews-subtitle">
                        Real stories from real people who love <span className="accent-pink">Coolest Cream</span>.
                    </p>
                    <div className="reviews-stars">
                        ★★★★★
                    </div>
                </div>
            </div>

            <div className="marquee-wrapper">
                <div className="marquee-track">
                    {marqueeItems.map((item, idx) => (
                        <div key={idx} className="review-glass-card">
                            <div className="review-avatar-wrap">
                                <img src={item.avatar} alt={item.name} className="review-avatar" draggable="false" />
                            </div>
                            
                            <div className="review-content">
                                <span className="quote-mark quote-top">“</span>
                                <p className="review-text">{item.review}</p>
                                
                                <div className="reviewer-info">
                                    <h4 className="reviewer-name">{item.name}</h4>
                                    <p className="reviewer-role">{item.role}</p>
                                </div>
                                <span className="quote-mark quote-bot">”</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            
        </section>
    );
}
