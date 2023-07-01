import React from "react";

const Profile = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    return (
        <div className="container d-flex flex-column align-items-center mt-3">
            <div className="d-flex flex-column align-items-center">
                <img
                    src="https://www.picsum.photos/200"
                    alt=""
                    width={300}
                    className="rounded-circle"
                />
                <h3>Welcome, {user.fname}</h3>
            </div>

            <div className="mt-5">
                <h4>Personal Information</h4>
                <p>Name: {user.fname + " " + user.lname}</p>
                <p>Email: {user.email}</p>
            </div>
        </div>
    );
};

export default Profile;
