import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getSingleProductApi, updateProductApi } from "../../../apis/Api";
import { toast } from "react-toastify";

const AdminProductEdit = () => {
    const [name, setProductName] = useState("");
    const [price, setProductPrice] = useState("");
    const [category, setProductCategory] = useState("");
    const [description, setProductDescription] = useState("");
    const [image, setProductImage] = useState("");
    // for image preview
    const [previewImage, setPreviewImage] = useState("");

    //get id from params
    const { id } = useParams();

    //get single product
    const [product, setProduct] = useState({});

    useEffect(() => {
        getSingleProductApi(id)
            .then((res) => {
                setProduct(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    // set data to state
    useEffect(() => {
        setProductName(product.name);
        setProductPrice(product.price);
        setProductCategory(product.category);
        setProductDescription(product.description);
        setProductImage(product.image);
    }, [product]);

    // for image setting and preview
    const handleImageUpload = (event) => {
        setProductImage(event.target.files[0]);

        // // Read the image file using FileReader
        const reader = new FileReader();
        reader.onload = () => {
            setPreviewImage(reader.result);
        };
        reader.readAsDataURL(event.target.files[0]);
    };

    const handleUpdate = () => {
        // create form data
        const formData = new FormData();
        formData.append("name", name);
        formData.append("price", price);
        formData.append("category", category);
        formData.append("description", description);
        formData.append("image", image);

        // calll api
        updateProductApi(id, formData)
            .then((res) => {
                toast.success("Product Updated Successfully");
            })
            .catch((err) => {
                console.log(err);
                toast.error("Something went wrong");
            });
    };

    return (
        <div className="container mt-2">
            <h3 className="text-danger">Updating for {product.name}</h3>
            <form className="w-50">
                <div class="mb-3">
                    <label for="formFile" class="form-label">
                        Product Name
                    </label>
                    <input onChange={(e) => setProductName(e.target.value)} type="text" class="form-control" id="formFile" placeholder="Enter Product Name" value={name} />
                    <label for="formFile" class="form-label mt-2">
                        Product Price
                    </label>
                    <input onChange={(e) => setProductPrice(e.target.value)} type="text" class="form-control" id="formFile" placeholder="Enter Product Price" value={price} />
                    <label for="formFile" class="form-label mt-2">
                        Product Category
                    </label>
                    <input onChange={(e) => setProductCategory(e.target.value)} type="text" class="form-control" id="formFile" placeholder="Enter Product Category" value={category} />
                    <label for="formFile" class="form-label mt-2">
                        Product Description
                    </label>
                    <textarea onChange={(e) => setProductDescription(e.target.value)} class="form-control" id="textAreaExample" rows="4" value={description}></textarea>
                    <label for="formFile" class="form-label mt-2">
                        Product Image
                    </label>
                    <input onChange={handleImageUpload} type="file" class="form-control" id="formFile" placeholder="Enter Product Image" />

                    {previewImage ? <img src={previewImage} alt="" className="mt-2 object-cover rounded-3" height={200} width={"100%"} /> : <img src={product.image} alt="" className="mt-2 object-cover rounded-3" height={200} width={"100%"} />}
                </div>

                <button type="button" class="btn btn-primary w-100" onClick={handleUpdate}>
                    Update Product
                </button>
            </form>
        </div>
    );
};

export default AdminProductEdit;
