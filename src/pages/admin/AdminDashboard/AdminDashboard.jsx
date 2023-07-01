import React, { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import { addProductApi, deleteProductApi, getAllProductsApi , getCountApi} from "../../../apis/Api";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
    const [productImage, setProductImage] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);
    const [productCount, setProductCount] = useState(0);
    const [pendingOrders, setPendingOrders] = useState(0);
    const [deliveredOrders, setDeliveredOrder]= useState(0);
    const [userCount, setUserCount]= useState(0);
    //response data
    const [products, setProducts] = useState([]);

    const handleName = (e) => {
        setName(e.target.value);
    };

    const handlePrice = (e) => {
        setPrice(e.target.value);
    };

    const handleCategory = (e) => {
        setCategory(e.target.value);
    };

    const handleDescription = (e) => {
        setDescription(e.target.value);
    };

    // ANCHOR: Image Upload
    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        setProductImage(file);
        const reader = new FileReader();
        reader.onload = () => {
            setPreviewImage(reader.result);
        };

        reader.readAsDataURL(file);
    };

    const handleSubmit = (e) => {
        const formData = new FormData();
        formData.append("name", name);
        formData.append("price", price);
        formData.append("category", category);
        formData.append("description", description);
        formData.append("image", productImage);

        addProductApi(formData)
            .then((res) => {
                toast.success("Product Added Successfully");
                window.location.reload(true);
            })
            .catch((err) => {
                toast.error("Something went wrong");
            });
    };

    // ANCHOR: Delete Product
    const handleDelete = (id) => {
        const confirm = window.confirm("Are you sure you want to delete this product?");
        if (!confirm) {
            return;
        }
        deleteProductApi(id)
            .then((res) => {
                toast.success("Product Deleted Successfully");
                window.location.reload(true);
            })
            .catch((err) => {
                toast.error("Something went wrong");
            });
    };

    // ANCHOR: Get All Products
    useEffect(() => {
        getAllProductsApi()
            .then((res) => {
                setProducts(res.data);
            })
            .catch((err) => {
                console.log(err);
            })
        getCountApi()
        .then((res)=>{
            setProductCount(res.data.productCount)
            setPendingOrders(res.data.pendingOrderCount)
            setDeliveredOrder(res.data.deliveredOrderCount)
            setUserCount(res.data.userCount)
        })
            
    }, []);

    return (
        <>
        
            <div className="container mt-3">
                {/* //make 4 divs
                 */}
                 <div className="row row-cols-1 row-cols-md-4 g-4">
                
                 <div className="cols">
                            <div className="card text-white bg-danger mb-3">
                                <div className="card-header text-white bg-danger mb-3">Total Products</div>
                            <div className="card-body">{productCount}</div>
                            </div>
                        </div>
                 <div className="cols">
                            <div className="card text-white bg-warning mb-3">
                                <div className="card-header ">Total Pending Orders</div>
                            <div className="card-body">{pendingOrders}</div>
                            </div>
                        </div>
                 <div className="cols">
                            <div className="card text-white bg-warning mb-3">
                                <div className="card-header ">Total Delivered</div>
                            <div className="card-body">{deliveredOrders}</div>
                            </div>
                        </div>
                 <div className="cols">
                            <div className="card text-white bg-warning mb-3">
                                <div className="card-header ">Total Users</div>
                            <div className="card-body">{userCount}</div>
                            </div>
                        </div>
                 
                 </div>
                <div className="d-flex justify-content-between">
                    <h4>Admin Dashboard</h4>
                    <button type="button" className="btn btn-danger" data-mdb-toggle="modal" data-mdb-target="#exampleModal">
                        Add Product
                    </button>

                    <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLabel">
                                        Add Product
                                    </h5>
                                    <button type="button" className="btn-close" data-mdb-dismiss="modal" aria-label="Close"></button>
                                </div>

                                {/* ANCHOR: Add Product Form */}
                                <div className="modal-body">
                                    <form action="">
                                        <div className="mb-3">
                                            <label htmlFor="name" className="mt-2">
                                                Product Name
                                            </label>
                                            <input type="text" className="form-control" placeholder="Product Name" onChange={handleName} />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="price" className="mt-2">
                                                Product Price
                                            </label>
                                            <input type="text" className="form-control" placeholder="Product Price" onChange={handlePrice} />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="category" className="mt-2">
                                                Category
                                            </label>
                                            <input type="text" className="form-control" placeholder="Product Category" onChange={handleCategory} />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="description" className="mt-2">
                                                Product Description
                                            </label>
                                            <textarea name="description" id="description" className="form-control" cols="30" rows="5" onChange={handleDescription}></textarea>
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="image" className="mt-2">
                                                Product Image
                                            </label>
                                            <input type="file" className="form-control" placeholder="Product Image" onChange={handleImageUpload} />

                                            {/* ANCHOR: Image Preview */}
                                            {productImage && <img src={previewImage} alt="product image" className="img-fluid object-cover rounded-3 mt-2" />}
                                        </div>
                                    </form>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-mdb-dismiss="modal">
                                        Close
                                    </button>
                                    <button type="button" className="btn btn-primary" onClick={handleSubmit}>
                                        Add
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <table className="table mt-3">
                    <thead className="table-warning">
                        <tr>
                            <th scope="col">Product Image</th>
                            <th scope="col">Product Name</th>
                            <th scope="col">Product Price</th>
                            <th scope="col">Category</th>
                            <th scope="col">Description</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* ANCHOR : Product List Display */}
                        {products.map((product) => {
                            return (
                                <tr>
                                    <td>
                                        <img src={product.image} alt="" width={70} />
                                    </td>
                                    <td>{product.name}</td>
                                    <td>${product.price}</td>
                                    <td>{product.category}</td>
                                    <td>{product.description}</td>
                                    <td>
                                        <div className="btn-group" role="group">
                                            <Link to={`/admin/product/edit/${product._id}`} type="button" className="btn btn-success">
                                                Edit
                                            </Link>
                                            <button
                                                onClick={() => {
                                                    handleDelete(product._id);
                                                }}
                                                type="button"
                                                className="btn btn-danger"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default AdminDashboard;
