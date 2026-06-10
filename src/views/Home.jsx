// src/views/Home.jsx
import React, { useEffect, useState, useContext } from 'react';
import { OrderContext } from '../context/OrderContext';
import { useNavigate } from 'react-router-dom';
import vintageArt from '../assets/images/hand-drawn-indian-image.png';
import eateridoBannerImg from '../assets/images/eaterido_bannerimg.png';
import hotel1 from '../assets/images/hotel1.jpg';
import hotel2 from '../assets/images/hotel2.jpg';
import hotel3 from '../assets/images/hotel3.jpg';
import hotel4 from '../assets/images/hotel4.jpg';
import hotel5 from '../assets/images/hotel5.jpg';
import hotel6 from '../assets/images/hotel6.jpg';
import hotel7 from '../assets/images/hotel7.jpg';
import hotel8 from '../assets/images/hotel8.jpg';
import hotel9 from '../assets/images/hotel9.jpg';
import hotel10 from '../assets/images/hotel10.jpg';
import {
    MapPin,
    Star,
    Clock,
    ArrowLeft,
    Plus,
    Truck,
    Shield,
    Search,
    Globe,
    MinusCircle,
    PlusCircle
} from 'lucide-react';
import '../styles/home.css';

const Home = () => {
    const { createOrder, user } = useContext(OrderContext);
    const navigate = useNavigate();
    const [view, setView] = useState('HERO');
    const [selectedHotel, setSelectedHotel] = useState(null);
    const [cartItems, setCartItems] = useState([]);
    const [orderMessage, setOrderMessage] = useState('');
    const [specialInstructions, setSpecialInstructions] = useState('');
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        document.title = 'Eaterido | Order Premium Indian Delivery';
    }, []);

    const handleSearchKeyDown = (e) => {
        if (e.key === 'Enter') {
            setView('RESTAURANTS');
        }
    };

    const hotels = [
        {
            id: 1,
            name: 'Maharaja Spice House',
            cuisine: 'North Indian Classics',
            rating: 4.9,
            time: '22 min',
            location: 'Marine Drive, Mumbai',
            img: hotel1,
            items: [
                { id: '1-1', name: 'Butter Chicken Thali', description: 'Creamy tomato chicken, naan, dal makhani.', price: 325 },
                { id: '1-2', name: 'Paneer Lababdar', description: 'Smoky cottage cheese simmered in rich gravy.', price: 280 },
                { id: '1-3', name: 'Garlic Naan Basket', description: 'Freshly baked naan brushed with garlic butter.', price: 95 }
            ]
        },
        {
            id: 2,
            name: 'Coastal Curry Cabin',
            cuisine: 'South Indian Seafood',
            rating: 4.8,
            time: '30 min',
            location: 'Bandra West',
            img: hotel2,
            items: [
                { id: '2-1', name: 'Malabar Fish Curry', description: 'Coconut curry with seared kingfish.', price: 345 },
                { id: '2-2', name: 'Kerala Prawn Roast', description: 'Spicy prawns roasted with curry leaves.', price: 360 },
                { id: '2-3', name: 'Appam & Chutney Trio', description: 'Soft rice pancakes with coconut dips.', price: 160 }
            ]
        },
        {
            id: 3,
            name: 'Chaat Junction',
            cuisine: 'Street Food Favorites',
            rating: 4.7,
            time: '18 min',
            location: 'Connaught Place',
            img: hotel3,
            items: [
                { id: '3-1', name: 'Gol Gappa Platter', description: 'Crispy shells filled with tangy pani.', price: 120 },
                { id: '3-2', name: 'Paneer Tikka Chaat', description: 'Grilled paneer tossed with chutneys.', price: 150 },
                { id: '3-3', name: 'Dahi Puri Delight', description: 'Creamy yogurt and crunchy puris.', price: 135 }
            ]
        },
        {
            id: 4,
            name: 'Tandoori Trails',
            cuisine: 'Fire-Grilled Specialties',
            rating: 4.9,
            time: '26 min',
            location: 'Juhu',
            img: hotel4,
            items: [
                { id: '4-1', name: 'Tandoori Chicken', description: 'Wood-fired chicken with aromatic spices.', price: 320 },
                { id: '4-2', name: 'Seekh Kebab Platter', description: 'Minced lamb kebab with mint chutney.', price: 285 },
                { id: '4-3', name: 'Butter Naan', description: 'Soft, buttery naan from the charcoal tandoor.', price: 75 }
            ]
        },
        {
            id: 5,
            name: 'Bengal Bites',
            cuisine: 'Royal Mughlai & Bengali',
            rating: 4.8,
            time: '28 min',
            location: 'Park Street',
            img: hotel5,
            items: [
                { id: '5-1', name: 'Hyderabadi Biryani', description: 'Aromatic layered biryani with pickle.', price: 375 },
                { id: '5-2', name: 'Kosha Mangsho', description: 'Slow-cooked lamb curry with warm spices.', price: 340 },
                { id: '5-3', name: 'Mishti Doi', description: 'Caramelized sweet yogurt dessert.', price: 95 }
            ]
        },
        {
            id: 6,
            name: 'Paneer Palace',
            cuisine: 'Pure Vegetarian',
            rating: 4.7,
            time: '24 min',
            location: 'Hauz Khas',
            img: hotel6,
            items: [
                { id: '6-1', name: 'Palak Paneer Royale', description: 'Creamy spinach gravy with cottage cheese.', price: 260 },
                { id: '6-2', name: 'Shahi Paneer', description: 'Rich paneer curry with cashew cream.', price: 275 },
                { id: '6-3', name: 'Laccha Paratha', description: 'Flaky Indian bread layered to perfection.', price: 85 }
            ]
        },
        {
            id: 7,
            name: 'Spice Bazaar Café',
            cuisine: 'Modern Indian',
            rating: 4.6,
            time: '20 min',
            location: 'Bandra East',
            img: hotel7,
            items: [
                { id: '7-1', name: 'Masala Grilled Fish', description: 'Sea bass with house masala glaze.', price: 355 },
                { id: '7-2', name: 'Chole Bhature', description: 'Spiced chickpeas with fluffy bhature.', price: 165 },
                { id: '7-3', name: 'Kesar Kulfi', description: 'Saffron almond frozen dessert.', price: 110 }
            ]
        },
        {
            id: 8,
            name: 'Mumbai Masala Hub',
            cuisine: 'City Street Comfort',
            rating: 4.8,
            time: '17 min',
            location: 'Dadar',
            img: hotel8,
            items: [
                { id: '8-1', name: 'Bombay Pav Bhaji', description: 'Spicy vegetable mash with butter pav.', price: 140 },
                { id: '8-2', name: 'Chicken Frankie', description: 'Wrap filled with tangy chicken masala.', price: 180 },
                { id: '8-3', name: 'Kandivali Sandwich', description: 'Cheesy grilled sandwich with chutney.', price: 130 }
            ]
        },
        {
            id: 9,
            name: 'Royal Rasoi',
            cuisine: 'Heritage Feasts',
            rating: 4.9,
            time: '32 min',
            location: 'Juhu',
            img: hotel9,
            items: [
                { id: '9-1', name: 'Nizami Gosht', description: 'Royal mutton curry with aromatic masalas.', price: 395 },
                { id: '9-2', name: 'Murgh Dum Biryani', description: 'Slow-cooked chicken biryani with raita.', price: 365 },
                { id: '9-3', name: 'Roomali Roti Trio', description: 'Paper-thin flatbreads with rich gravy.', price: 105 }
            ]
        },
        {
            id: 10,
            name: 'Delhi Dhaba',
            cuisine: 'Rustic Punjabi',
            rating: 4.7,
            time: '21 min',
            location: 'Lajpat Nagar',
            img: hotel10,
            items: [
                { id: '10-1', name: 'Aloo Paratha Platter', description: 'Stuffed potato bread with chutney.', price: 145 },
                { id: '10-2', name: 'Dal Makhani', description: 'Slow-simmered black lentils in cream.', price: 225 },
                { id: '10-3', name: 'Lassi Glass', description: 'Sweet cardamom yogurt drink.', price: 95 }
            ]
        }
    ];

    const filteredHotels = hotels.filter(hotel => {
        if (!searchQuery.trim()) return true;
        const query = searchQuery.toLowerCase();
        const matchHotelName = hotel.name.toLowerCase().includes(query);
        const matchCuisine = hotel.cuisine.toLowerCase().includes(query);
        const matchDishName = hotel.items.some(item => item.name.toLowerCase().includes(query));
        const matchDishDesc = hotel.items.some(item => item.description.toLowerCase().includes(query));
        return matchHotelName || matchCuisine || matchDishName || matchDishDesc;
    });

    const handleAddItem = (menuItem) => {
        setCartItems(prev => {
            const existing = prev.find(item => item.id === menuItem.id);
            if (existing) {
                return prev.map(item => item.id === menuItem.id ? { ...item, qty: item.qty + 1 } : item);
            }
            return [...prev, { ...menuItem, qty: 1 }];
        });
    };

    const handleRemoveItem = (menuItem) => {
        setCartItems(prev => prev.flatMap(item => {
            if (item.id !== menuItem.id) return item;
            if (item.qty > 1) return [{ ...item, qty: item.qty - 1 }];
            return [];
        }));
    };

    const handleSelectHotel = (hotel) => {
        setSelectedHotel(hotel);
        setView('MENU');
        setCartItems([]);
        setOrderMessage('');
    };

    const handleBack = () => {
        if (view === 'MENU') {
            setSelectedHotel(null);
            setView('RESTAURANTS');
            return;
        }
        setView('HERO');
    };

    const handlePlaceOrder = () => {
        if (cartItems.length === 0) return;
        if (!user) {
            setOrderMessage('Please login before placing your order.');
            return;
        }

        const success = createOrder({
            hotel: selectedHotel,
            items: cartItems,
            total: subtotal,
            notes: specialInstructions
        });
        if (success) {
            setOrderMessage('');
            setSpecialInstructions(''); // Reset instructions text
            navigate('/track');
        }
    };

    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);

    return (
        <div className="home-wrapper">
            {view === 'HERO' ? (
                <section className="hero-section">
                    <div className="hero-content">
                        <span className="hero-tag">AI-Powered Delivery</span>
                        <h1 className="hero-title">From Indian Spice Streets to Global Gourmet — Delivered Fast</h1>
                        <p className="hero-description">Order curated regional favorites and international classics with live tracking, smart routing, and premium contactless delivery.</p>

                        <div className="glass-card hero-search-area">
                            <div className="search-input-group">
                                <MapPin size={20} color="var(--terracotta)" aria-hidden="true" />
                                <input
                                    type="text"
                                    name="search"
                                    aria-label="Search restaurants or dishes"
                                    placeholder="Search for restaurant or dish"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    onKeyDown={handleSearchKeyDown}
                                />
                            </div>
                            <button type="button" className="btn-premium" onClick={() => setView('RESTAURANTS')}>
                                Find Food <Search size={18} aria-hidden="true" />
                            </button>
                        </div>

                        <div className="hero-stats hero-stats-left">
                            <div className="stat-item"><Shield size={20} /> <span>AI-curated menus</span></div>
                            <div className="stat-item"><Truck size={20} /> <span>Under 30 min</span></div>
                            <div className="stat-item"><Star size={20} /> <span>4.9+ trust rating</span></div>
                        </div>

                        <img src={vintageArt} alt="Hand-drawn Indian illustration" className="hero-vintage-image" loading="lazy" />
                    </div>

                    <div className="hero-right">
                        <img src={eateridoBannerImg} alt="Eaterido rider and scooter illustration" className="hero-illustration" loading="lazy" />
                        <div className="hero-feature-grid">
                            <div className="feature-chip chip-large">
                                <strong>Order from Mumbai to Milan</strong>
                                <span>Premium delivery powered by global kitchens and local expertise.</span>
                            </div>
                            <div className="feature-chip">
                                <strong>Your Doorstep</strong>
                                <span>Contactless delivery right where you want it.</span>
                            </div>
                            <div className="feature-chip">
                                <strong>Global Menus</strong>
                                <span>Indian favorites meet world-class dining choices.</span>
                            </div>
                            <div className="feature-chip">
                                <strong>Live Dispatch</strong>
                                <span>Follow your order from kitchen to delivery.</span>
                            </div>
                            <div className="feature-chip">
                                <strong>Curated Picks</strong>
                                <span>Chef-selected meals & trending street food.</span>
                            </div>
                            <div className="feature-chip">
                                <strong>Doorstep Reach</strong>
                                <span>Fast coverage across city zones and beyond.</span>
                            </div>
                        </div>
                    </div>
                </section>
            ) : (
                <section className="restaurant-section">
                    <button className="btn-back" onClick={handleBack}>
                        <ArrowLeft size={18} /> {view === 'MENU' ? 'Back to Hotels' : 'Back to Search'}
                    </button>
                    {!selectedHotel ? (
                        <>
                            <div className="restaurant-section-header">
                                <h2 className="section-title">
                                    {searchQuery.trim() ? `Search Results for "${searchQuery}"` : "Nearby Curations"}
                                </h2>
                                <div className="restaurant-search-bar">
                                    <Search size={18} color="var(--terracotta)" />
                                    <input
                                        type="text"
                                        placeholder="Search for restaurant or dish..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                    {searchQuery && (
                                        <button className="btn-clear-search" onClick={() => setSearchQuery('')}>
                                            Clear
                                        </button>
                                    )}
                                </div>
                            </div>
                            {filteredHotels.length === 0 ? (
                                <div className="glass-card no-results-card">
                                    <Search size={48} className="no-results-icon" color="var(--terracotta)" />
                                    <h3>No Results Found</h3>
                                    <p className="no-results-text">We couldn't find any kitchens or dishes matching "<strong>{searchQuery}</strong>".</p>
                                    <p className="no-results-sub">Try searching for "Butter Chicken", "Fish Curry", "Biryani", "Gol Gappa", or "Veg".</p>
                                    <button className="btn-premium" onClick={() => setSearchQuery('')}>
                                        Clear Search
                                    </button>
                                </div>
                            ) : (
                                <div className="restaurant-grid">
                                    {filteredHotels.map(hotel => (
                                        <button
                                            key={hotel.id}
                                            type="button"
                                            className="glass-card food-card food-card-button"
                                            onClick={() => handleSelectHotel(hotel)}
                                            aria-label={`View menu for ${hotel.name}`}
                                        >
                                            <div className="food-image-container">
                                                <img src={hotel.img} alt={hotel.name} className="food-image" loading="lazy" />
                                                <span className="time-badge"><Clock size={12} aria-hidden="true" /> {hotel.time}</span>
                                            </div>
                                            <div className="food-details">
                                                <div className="food-header">
                                                    <h3>{hotel.name}</h3>
                                                    <span className="rating-badge"><Star size={12} fill="currentColor" aria-hidden="true" /> {hotel.rating}</span>
                                                </div>
                                                <p className="cuisine-text">{hotel.cuisine}</p>
                                                <span className="btn-premium full-width-btn btn-menu-card">
                                                    View Menu <Plus size={16} aria-hidden="true" />
                                                </span>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="menu-layout">
                            <div className="menu-list">
                                <div className="menu-header menu-header--spread">
                                    <div>
                                        <h2 className="section-title">{selectedHotel.name}</h2>
                                        <p className="cuisine-text">{selectedHotel.cuisine} • {selectedHotel.time} • {selectedHotel.location}</p>
                                    </div>
                                    <div className="hotel-badge-row">
                                        <span className="hotel-badge">Verified Kitchen</span>
                                        <span className="hotel-badge">Fast Delivery</span>
                                    </div>
                                </div>
                                <div className="menu-grid">
                                    {selectedHotel.items.map(item => {
                                        const isMatch = searchQuery.trim() && (
                                            item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                            item.description.toLowerCase().includes(searchQuery.toLowerCase())
                                        );
                                        return (
                                            <div key={item.id} className={`glass-card menu-item-card ${isMatch ? 'menu-item-highlighted' : ''}`}>
                                                <div>
                                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '10px', flexWrap: 'wrap' }}>
                                                        <h4>{item.name}</h4>
                                                        {isMatch && <span className="search-match-badge">Matched Dish</span>}
                                                    </div>
                                                    <p>{item.description}</p>
                                                </div>
                                                <div className="menu-item-bottom">
                                                    <span className="menu-price">₹{item.price}</span>
                                                    <button className="btn-secondary" onClick={() => handleAddItem(item)}>
                                                        Add <PlusCircle size={16} />
                                                    </button>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                            <aside className="order-summary">
                                <div className="summary-card glass-card">
                                    <h3>Selected Items</h3>
                                    {cartItems.length === 0 ? (
                                        <p className="empty-cart">Choose dishes from the menu to build your order.</p>
                                    ) : (
                                        <div className="summary-items">
                                            {cartItems.map(item => (
                                                <div key={item.id} className="summary-item">
                                                    <div>
                                                        <strong>{item.name}</strong>
                                                        <span>{item.qty} × ₹{item.price}</span>
                                                    </div>
                                                    <button className="btn-remove" onClick={() => handleRemoveItem(item)}>
                                                        <MinusCircle size={18} />
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                    {cartItems.length > 0 && (
                                        <div className="special-instructions-input" style={{ margin: '15px 0' }}>
                                            <label style={{ fontSize: '0.75rem', fontWeight: '800', color: 'var(--text)', display: 'block', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.5px', textAlign: 'left' }}>
                                                Special Cooking Instructions:
                                            </label>
                                            <textarea
                                                placeholder="e.g. No onions, Make it extra spicy, Peanut allergy alert..."
                                                value={specialInstructions}
                                                onChange={(e) => setSpecialInstructions(e.target.value)}
                                                rows={2}
                                                style={{
                                                    width: '100%',
                                                    borderRadius: '10px',
                                                    border: '1px solid var(--border)',
                                                    padding: '8px 12px',
                                                    fontSize: '0.8rem',
                                                    fontFamily: 'inherit',
                                                    background: 'var(--surface-strong)',
                                                    color: 'var(--text)',
                                                    resize: 'none',
                                                    boxSizing: 'border-box'
                                                }}
                                            />
                                        </div>
                                    )}
                                    <div className="summary-total">
                                        <span>Total</span>
                                        <strong>₹{subtotal.toFixed(2)}</strong>
                                    </div>
                                    {orderMessage && <p className="order-feedback">{orderMessage}</p>}
                                    <button className="btn-premium full-width-btn" onClick={handlePlaceOrder} disabled={cartItems.length === 0}>
                                        Order Now
                                    </button>
                                </div>
                            </aside>
                        </div>
                    )}
                </section>
            )}

            <footer className="premium-footer">
                <div className="footer-grid">
                    <div className="footer-about">
                        <h2 className="footer-logo">Eaterido</h2>
                        <p>Delivering modern Indian flavors and global cuisine with speed, precision, and premium service.</p>

                        {/* Integrated Social Brand Section */}
                        <div className="social-links-container">
                            <div className="social-brand-link">
                                <Globe size={16} />
                                <span>Connect with us:</span>
                            </div>
                            <div className="social-text-group">
                                <a href="#instagram" className="footer-nav-link">IG</a>
                                <a href="#twitter" className="footer-nav-link">TW</a>
                                <a href="#facebook" className="footer-nav-link">FB</a>
                            </div>
                        </div>
                    </div>

                    <div className="footer-links">
                        <h4>Company</h4>
                        <ul>
                            <li>About Us</li>
                            <li>Café Partners</li>
                            <li>Offers</li>
                        </ul>
                    </div>

                    <div className="footer-contact">
                        <h4>Contact</h4>
                        <p>support@eaterido.com</p>
                        <p>+1 (555) 000-1234</p>

                        {/* Updated Secondary Social Section */}
                        <div className="social-icons" style={{ marginTop: '20px' }}>
                            <a href="#instagram" className="social-icon-link" aria-label="Instagram">IG</a>
                            <a href="#twitter" className="social-icon-link" aria-label="Twitter">TW</a>
                            <a href="#facebook" className="social-icon-link" aria-label="Facebook">FB</a>
                        </div>
                    </div>
                </div>

                <div className="footer-bottom">
                    © 2026 Eaterido Premium. Crafted with Happiness.
                </div>
            </footer>
        </div>
    );
};

export default Home;