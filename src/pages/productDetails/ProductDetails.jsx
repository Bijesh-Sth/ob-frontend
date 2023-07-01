import React, { useEffect, useState } from "react";
import { getSingleProductApi } from "../../apis/Api";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../store/cartSlice";

const ProductDetails = () => {
    // get id from url
    const { id } = useParams();

    const [product, setProduct] = useState({});
    const [cartValue, setCartValue] = useState(1);

    useEffect(() => {
        getSingleProductApi(id)
            .then((res) => {
                setProduct(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    // increase and decrease quantity
    const increaseQuantity = () => {
        setCartValue(cartValue + 1);
    };

    const decreaseQuantity = () => {
        if (cartValue > 1) {
            setCartValue(cartValue - 1);
        }
    };

    const dispatch = useDispatch();
    const handleAddToCart = () => {
        const cartItem = {
            id: id,
            name: product.name,
            category: product.category,
            price: product.price,
            image: product.image,
            quantity: cartValue,
        };
        dispatch(addToCart(cartItem));
    };
    return (
        <>
            {
                // ANCHOR: Product Details
                <div className="container mt-5">
                    <div className="d-flex">
                        <img className="object-cover rounded-3" height={"500px"} width={"600px"} src={product.image} alt="" />
                        <div className="ms-3 mt-4">
                            <span className="fs-3 fw-bold">{product.name}</span>

                            <p className="fs-4">Price: ${product.price}</p>
                            <p className="fs-4">Category : {product.category}</p>
                            <p className="fs-4">Description : {product.description}</p>

                            <div class="btn-group" role="group" aria-label="Basic example">
                                <button type="button" class="btn btn-primary" onClick={decreaseQuantity}>
                                    -
                                </button>
                                <input type="number" min={1} value={cartValue} />
                                <button type="button" class="btn btn-primary" onClick={increaseQuantity}>
                                    +
                                </button>
                            </div>
                            <br />
                            <button className="btn btn-primary my-3" onClick={handleAddToCart}>
                                Add to cart
                            </button>
                        </div>
                    </div>
                </div>
            }
        </>
    );
};

export default ProductDetails;
