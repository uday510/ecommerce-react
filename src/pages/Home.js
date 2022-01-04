import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import '../styles/home.css';

const BASE_URL = 'http://13.235.87.215:4000';

function Home() {
    const [categoryList, setCategoryList] = useState([]);
    const [username, setUsername] = useState('User');

    const logoutFn = () => {
        localStorage.removeItem('username');
        localStorage.removeItem('userId');

        window.location.href = "/login";
    }

    useEffect(() => {
        setUsername(localStorage.getItem("username"));
        axios.post(BASE_URL + '/api/v1/category/all', {})
        .then(function (response) {
            if (response.data.success) {
                setCategoryList(response.data.categories);
            }
        })
        .catch(function (error) {
            console.log(error);
        });
    }, []);

    return (
        <div id="homePage">
            <div id="header">
                <div className="container">
                    <div className="row">
                        <div className="header-wrapper d-flex justify-content-between">
                            <div className="logo d-inline-block">
                                <Link className="text-decoration-none" to={"/home"}>Ecommerce</Link>
                            </div>
                            <div className="user-actions d-flex flex-row">
                                <Link className="text-decoration-none" to={"/cart"}>Cart</Link>
                                <div className="user-intro">Hi {username}</div>
                                <div className="logout-btn" onClick={logoutFn}>Logout</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col">
                        <h2 className="home-title text-center">Welcome to Ecommerce</h2>
                        <div className="category-list d-flex flex-row justify-content-center align-items-center">
                            <div className="category-item rounded-3 d-flex justify-content-center align-items-center">
                                <Link className="text-decoration-none text-white" to={"/products"}>All Products</Link>
                            </div>
                            {
                                categoryList.map((category) => (
                                    <div key={category.categoryId} className="category-item rounded-3 d-flex justify-content-center align-items-center">
                                        <Link to={`/products${category.categoryId ? `?categoryId=${category.categoryId}` : ''}`} className="text-decoration-none text-white">{category.name}</Link>
                                    </div>
                                ))
                            }
                        </div>
                        <div className="category-title text-center">Select a category to start shopping</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;