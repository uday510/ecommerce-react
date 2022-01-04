import axios from "axios";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useState } from "react/cjs/react.development";
import '../styles/cart.css';

const BASE_URL = 'http://13.235.87.215:4000';

function Cart() {
    const [orderDetails, setOrderDetails] = useState({});
    const [username, setUsername] = useState('User');

    useEffect(() => {
        setUsername(localStorage.getItem("username"));
        fetchOrderDetails();
    }, []);

    const updateProductQuantity = (e, productId) => {
        const data = {
            productId,
            quantity: e.target.value,
            orderId: orderDetails.orderId,
            userId: localStorage.getItem('userId')
        };

        axios.post(BASE_URL + '/api/v1/order/edit', data)
            .then(function (response) {
                if (response.data.success) {
                    fetchOrderDetails();
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const removeProductFromCart = (productId, quantity) => {
        const data = {
            productId,
            quantity,
            orderId: orderDetails.orderId,
            userId: localStorage.getItem('userId'),
            remove: true
        };

        axios.post(BASE_URL + '/api/v1/order/edit', data)
            .then(function (response) {
                if (response.data.success) {
                    fetchOrderDetails();
                }
            })
            .catch(function (error) {
                console.log(error);
            });

    }

    const fetchOrderDetails = () => {
        const data = {
            userId: localStorage.getItem("userId")
        };

        axios.post(BASE_URL + '/api/v1/order/details', data)
            .then(function (response) {
                if (response.data.success) {
                    setOrderDetails(response.data.orderDetails);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    return (
        <div id="cartPage">
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
                                <div className="logout-btn">Logout</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="row">
                    <div className="cart-title">My Cart</div>
                    <div className="cart-wrapper d-flex flex-row">
                        <div className="order-details d-flex flex-column">
                            <div className="order-details-title fw-bold">Order Details</div>
                            {
                                orderDetails.products && orderDetails.products.length > 0 ? orderDetails.products.map((product) => (
                                    <div className="order-details-product d-flex flex-row" key={product.productId}>
                                        <div className="order-details-product-img d-flex">
                                            <img src="https://img.favpng.com/8/17/0/product-design-clip-art-logo-food-png-favpng-TsCQEsJH2LUYN3d5Q6RzrTsqL.jpg" />
                                        </div>
                                        <div className="order-details-product-data d-flex flex-column">
                                            <div>{product.name}</div>
                                            <div>₹ {product.price}</div>
                                        </div>
                                        <div className="order-details-product-actions d-flex flex-column">
                                            <div className="order-details-product-quantity">
                                                <div className="fw-bold">Quantity</div>
                                                <div className="form-group">
                                                    <select
                                                        className="form-select"
                                                        value={product.quantity}
                                                        onChange={
                                                            (e) => updateProductQuantity(e, product.productId)
                                                        }
                                                    >
                                                        <option value="1">1</option>
                                                        <option value="2">2</option>
                                                        <option value="3">3</option>
                                                        <option value="4">4</option>
                                                        <option value="5">5</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="order-details-product-remove btn btn-info" onClick={() => removeProductFromCart(product.productId, product.quantity)}>Remove</div>
                                        </div>
                                    </div>
                                )) : (
                                    <div className="no-items-cart">No items in your cart</div>
                                )
                            }
                        </div>
                        {
                            orderDetails.products && orderDetails.products.length > 0 && (
                                <div className="price-details d-flex flex-column">
                                    <div className="price-details-box">
                                        <div className="price-details-title fw-bold">Price Details</div>
                                        <div className="price-details-data">
                                            <div className="price-details-item d-flex flex-row justify-content-between">
                                                <div>Price</div>
                                                <div>₹ {orderDetails.total}</div>
                                            </div>
                                            <div className="price-details-item d-flex flex-row justify-content-between">
                                                <div>Discount</div>
                                                <div>₹ 0</div>
                                            </div>
                                            <div className="price-details-item d-flex flex-row justify-content-between">
                                                <div>Delivery Charges</div>
                                                <div>FREE</div>
                                            </div>
                                            <div className="price-details-item d-flex flex-row justify-content-between">
                                                <div>Total</div>
                                                <div>₹ {orderDetails.total}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <Link className="continue-shopping-btn btn btn-info text-decoration-none" to={"/home"}>Continue Shopping</Link>
                                    <Link className="checkout-btn btn btn-primary text-decoration-none" to={"/checkout"}>Checkout</Link>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cart;