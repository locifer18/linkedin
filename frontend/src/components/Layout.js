import React, { useState, useEffect } from 'react'
import Header from './Header'
import { Helmet } from 'react-helmet'
import { Toaster } from "react-hot-toast";
import { FaArrowUp } from 'react-icons/fa';

const Layout = (props) => {
    const [showScrollTop, setShowScrollTop] = useState(false);
    const [loading, setLoading] = useState(false);

    // Check scroll position to show/hide scroll to top button
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 300) {
                setShowScrollTop(true);
            } else {
                setShowScrollTop(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Scroll to top function
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <div className="site-wrapper">
            <Helmet>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta name="description" content={props.description} />
                <meta name="keywords" content={props.keywords} />
                <meta name="author" content={props.author} />
                <title>{props.title}</title>
                <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
            </Helmet>
            <Header />
            <main>
                <div className="page-content">
                    {props.children}
                </div>
            </main>
        </div>
    );
};

Layout.defaultProps = {
    title: "ShopEase - Premium Shopping Experience",
    description: "Shop the latest products with best deals on ShopEase e-commerce platform",
    keywords: "e-commerce, online shopping, products, deals, fashion, electronics",
    author: "ShopEase"
}

export default Layout