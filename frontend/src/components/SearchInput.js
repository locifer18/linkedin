import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';

const SearchInput = () => {
    return (
        <>
            <FaSearch className="search-icon position-absolute" style={{ left: '15px', top: '50%', transform: 'translateY(-50%)', color: '#999' }} />
            <input
                className='form-control rounded-pill search-input'
                style={{ paddingLeft: '40px' }}
                type='search'
                placeholder='Search'
                aria-label='Search'
            />
            <button className='btn btn-primary d-none' type='submit'>
                <FaSearch />
            </button>
        </>
    )
}

export default SearchInput