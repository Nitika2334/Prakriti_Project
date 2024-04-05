import React, { useState } from 'react'
import "./Carousel.scss"
import { Link, useNavigate } from 'react-router-dom'
import { shortenText } from '../../utils'
import { useDispatch, useSelector } from 'react-redux'
import { getUser } from '../../redux/features/auth/authSlice'
import { toast } from 'react-toastify'
import authService from '../../redux/features/auth/authService'
import Loader from '../loader/Loader'



const CarouselItem = ({id, url, name, stock, price, description}) => {
    const { user, isLoading } = useSelector( (state) => state.auth );
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    console.log(stock);


    const handleAddToCart = () => {
        if(!user){
            navigate('/login');
        }
    
        setLoading(true);
        authService.addProductToCart(id, { quantity : 1 })
            .then((response) => {
                dispatch(getUser());
                toast.success("Product has been added to the cart");
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <>
        {(loading || isLoading) && <Loader/>}
        { stock >= 1 &&
            <div className="carouselItem">
                <Link to={`/product-details/${id}`}>

                    <img className="product--image" src={url} alt="product" />

                    <p className="price">
                        {`Rs.${price}`}
                    </p>

                    <h4>
                        {shortenText(name,18)}
                    </h4>

                    <p className="--mb">
                        {shortenText(description,26)}
                    </p>
                </Link>
                {user?.role === 'admin' ?
                    <button onClick={() => navigate(`/update-product/${id}`)} disabled={loading} className="--btn --btn-primary --btn-block">
                        Update
                    </button>
                    :
                    <button onClick={handleAddToCart} disabled={loading} className="--btn --btn-primary --btn-block">
                        Add to Cart
                    </button>
                }
            </div>
        }
        </>
    )
}

export default CarouselItem
