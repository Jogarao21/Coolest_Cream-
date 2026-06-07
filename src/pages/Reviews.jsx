import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useAnimationFrame } from 'framer-motion';
import '../styles/Reviews.css';

const reviewsData = [
    {
        avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
        name: 'Mike Torello',
        role: 'Food Blogger',
        review: 'The best ice cream I\'ve ever had! So creamy, so fresh, and so many amazing flavours. You can really taste the quality in every scoop.',
        size: 'large'
    },
    {
        avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
        name: 'Sarah Wright',
        role: 'Marketing Specialist',
        review: 'Coolest Cream never disappoints! From unique flavours to beautiful packaging, everything feels premium and made with love.',
        size: 'medium'
    },
    {
        avatar: 'https://randomuser.me/api/portraits/men/46.jpg',
        name: 'Devon Miles',
        role: 'Entrepreneur',
        review: 'Finally, an ice cream brand that cares about taste and the planet. Love their eco-friendly approach and insanely good ice cream!',
        size: 'large'
    },
    {
        avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
        name: 'Priya S.',
        role: 'Local Guide',
        review: 'The rose cardamom flavour is the most beautiful thing I\'ve ever eaten. I dream about it. Literally.',
        size: 'small'
    },
    {
        avatar: 'https://randomuser.me/api/portraits/men/22.jpg',
        name: 'Arjun M.',
        role: 'Chef',
        review: 'Finally, an ice cream shop that doesn\'t rely on artificial stuff. It tastes like real food — what a concept!',
        size: 'medium'
    }
];

// Duplicate array multiple times for seamless infinite scrolling
const marqueeItems = [...reviewsData, ...reviewsData, ...reviewsData, ...reviewsData];

export default function Reviews() {
    const x = useMotionValue(0);
    const [isHovered, setIsHovered] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const containerRef = useRef(null);

    // Approximate width of one original set of 5 reviews (pixels)
    // small: ~320, medium: ~380, large: ~420. + gaps (32px)
    // We will use a safe wrap width.
    const wrapWidth = 1950; 

    useAnimationFrame((t, delta) => {
        if (isHovered || isDragging) return;
        let currentX = x.get();
        if (currentX <= -wrapWidth) {
            currentX += wrapWidth;
        }
        // Speed of auto-scroll
        x.set(currentX - (delta * 0.05));
    });

    return (
        <section id="reviews" className="reviews-section">
            <div className="container">
                <div className="luxury-header-wrap">
                    <span className="luxury-eyebrow">Reviews</span>
                    <h2 className="luxury-heading">What Our Customers Say</h2>
                    <p className="luxury-lead">
                        Real stories from real people who love Coolest Cream.
                    </p>
                </div>

                {/* Review Metrics */}
                <div className="review-metrics">
                    <div className="metrics-stars">
                        <span className="star">★</span>
                        <span className="star">★</span>
                        <span className="star">★</span>
                        <span className="star">★</span>
                        <span className="star">★</span>
                    </div>
                    <p className="metrics-text">
                        <strong>4.9/5</strong> Average Rating based on 500+ reviews
                    </p>
                </div>
            </div>

            <div 
                className="framer-marquee-wrapper"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                ref={containerRef}
            >
                <motion.div 
                    className="framer-marquee-track"
                    style={{ x }}
                    drag="x"
                    dragConstraints={{ left: -wrapWidth * 3, right: wrapWidth }}
                    onDragStart={() => setIsDragging(true)}
                    onDragEnd={() => setIsDragging(false)}
                >
                    {marqueeItems.map((item, idx) => (
                        <div key={idx} className={`review-glass-card size-${item.size}`}>
                            <div className="reviewer-header">
                                <img src={item.avatar} alt={item.name} className="review-avatar-inline" draggable="false" />
                                <div className="reviewer-info">
                                    <h4 className="reviewer-name">{item.name}</h4>
                                    <p className="reviewer-role">{item.role}</p>
                                </div>
                            </div>
                            
                            <div className="review-content">
                                <p className="review-text">"{item.review}"</p>
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
