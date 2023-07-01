import React, { useEffect } from "react";
import { useState } from "react";
import { getOrdersByUserApi, getAllOrdersApi, changeOrderStatusApi } from "../../apis/Api";
import { toast } from "react-toastify";

const AdminOrder = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        getAllOrdersApi().then((res) => {
            console.log(res);
            setOrders(res.data.orders);
        });
    }, []);

    const handleChangeStatus = (orderNumber, status) => {
        console.log(orderNumber, status);
        const orderStatus = { status };
        changeOrderStatusApi(orderNumber, orderStatus)
            .then((res) => {
                toast.success("Order Status Changed Successfully");
                window.location.reload();
            })
            .catch((e) => {
                toast.error("Something went wrong");
                console.log(e);
            });
    };
    return (
        <div className="container mt-3">
            <h3>All Orders</h3>
            {orders.map((order) => (
                <div className="card">
                    <div className="card-header d-flex justify-content-between">
                        <h6>ORDER - {order.orderNumber}</h6>
                        <div className="dropdown">
                            <button className="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton" data-mdb-toggle="dropdown" aria-expanded="false">
                                {order.status}
                            </button>
                            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                <li>
                                    <button className="dropdown-item" onClick={() => handleChangeStatus(order._id, "Pending")}>
                                        Pending
                                    </button>
                                </li>
                                <li>
                                    <button className="dropdown-item" onClick={() => handleChangeStatus(order._id, "In Progress")}>
                                        In Progress
                                    </button>
                                </li>
                                <li>
                                    <button className="dropdown-item" onClick={() => handleChangeStatus(order._id, "Delivered")}>
                                        Delivered
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="card-body">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">Image</th>
                                    <th scope="col">Product Name</th>
                                    <th scope="col">Category</th>
                                    <th scope="col">Price</th>
                                    <th scope="col">Quantity</th>
                                </tr>
                            </thead>
                            <tbody>
                                {order.cart.map((item) => (
                                    <tr>
                                        <th scope="row">
                                            <img src={item.image} alt="" width="50" />
                                        </th>
                                        <td>{item.name}</td>
                                        <td>{item.category}</td>
                                        <td>{item.price}</td>
                                        <td>{item.quantity}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="card-footer d-flex justify-content-between">
                        <div>
                            <h6>Order Date : {order.orderedAt}</h6>
                        </div>
                        <div>
                            <h6>Shipping info : {order.shippingAddress}</h6>
                        </div>
                        <div>
                            <h6>Total Price : {order.totalAmount}</h6>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default AdminOrder;
