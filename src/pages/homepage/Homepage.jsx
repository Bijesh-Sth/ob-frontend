import React, { useEffect, useState } from "react";
import { getAllProductsApi } from "../../apis/Api";
import { Link, useNavigate } from "react-router-dom";

const Homepage = () => {
    const [products, setProducts] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        getAllProductsApi()
            .then((res) => {
                setProducts(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const navigate = useNavigate();
    const handleSearch = (e) => {
        e.preventDefault();
        navigate(`/search/${searchQuery}`);
    };

    return (
        <>
            {/* <h1>Homepage</h1>
            <button type="button" className="btn btn-danger">Button</button><br />
            <img src="./assets/images/test.jpg" alt="city" width="300px" /> */}

            {/* Carousel */}
            {/* <!-- Carousel wrapper --> */}
            <div className="container mt-5">
                {/* Search */}
                <form action="" onSubmit={handleSearch}>
                    <input type="text" placeholder="Search" className="form-control mb-3" name="" id="" onChange={(e) => setSearchQuery(e.target.value)} />
                    {/* <button type="submit" className="btn btn-primary" hidden>
                        Search
                    </button> */}
                </form>
                {/* ANCHOR: Carousel */}
                <div id="carouselBasicExample" className="carousel slide carousel-fade" data-mdb-ride="carousel">
                    {/* <!-- Indicators --> */}
                    <div className="carousel-indicators">
                        <button type="button" data-mdb-target="#carouselBasicExample" data-mdb-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                        <button type="button" data-mdb-target="#carouselBasicExample" data-mdb-slide-to="1" aria-label="Slide 2"></button>
                        <button type="button" data-mdb-target="#carouselBasicExample" data-mdb-slide-to="2" aria-label="Slide 3"></button>
                    </div>

                    {/* <!-- Inner --> */}
                    <div className="carousel-inner">
                        {/* <!-- Single item --> */}
                        <div className="carousel-item active">
                            <img src="https://mdbcdn.b-cdn.net/img/Photos/Slides/img%20(15).webp" className="d-block w-100" alt="Sunset Over the City" />
                            <div className="carousel-caption d-none d-md-block">
                                <h5>First slide label</h5>
                                <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                            </div>
                        </div>

                        {/* <!-- Single item --> */}
                        <div className="carousel-item">
                            <img src="https://mdbcdn.b-cdn.net/img/Photos/Slides/img%20(22).webp" className="d-block w-100" alt="Canyon at Nigh" />
                            <div className="carousel-caption d-none d-md-block">
                                <h5>Second slide label</h5>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                            </div>
                        </div>

                        {/* <!-- Single item --> */}
                        <div className="carousel-item">
                            <img src="https://mdbcdn.b-cdn.net/img/Photos/Slides/img%20(23).webp" className="d-block w-100" alt="Cliff Above a Stormy Sea" />
                            <div className="carousel-caption d-none d-md-block">
                                <h5>Third slide label</h5>
                                <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                            </div>
                        </div>
                    </div>
                    {/* <!-- Inner -->

  <!-- Controls --> */}
                    <button className="carousel-control-prev" type="button" data-mdb-target="#carouselBasicExample" data-mdb-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-mdb-target="#carouselBasicExample" data-mdb-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
                {/* <!-- Carousel wrapper --> */}
                {/* NOTE: Carousel End */}
                {/* ANCHOR: Products Display Card */}
                <div>
                    <h1 className="mt-5 mb-4">Available products</h1>

                    <div className="row row-cols-1 row-cols-md-4 g-4">
                        {/* NOTE: Card */}
                        {products.map((product) => {
                            return (
                                <Link to={`/products/details/${product._id}`} className="col">
                                    <div className="card">
                                        <img src={product.image} className="card-img-top object-cover" alt="Hollywood Sign on The Hill" width={"100px"} height={"220px"} />
                                        <div className="card-body">
                                            <div className="d-flex justify-content-between">
                                                <h5 className="card-title text-black">{product.name}</h5>
                                                <h5 className="card-title text-black">${product.price}</h5>
                                            </div>
                                            <hr />
                                            <p className="text-black">{product.description}</p>
                                            <button className="btn w-100 btn-outline-black">View more</button>
                                        </div>
                                    </div>
                                </Link>
                            );
                        })}
                        {/* NOTE: Card End */}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Homepage;