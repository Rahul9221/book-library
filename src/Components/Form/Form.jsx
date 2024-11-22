import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

const LibraryForm = () => {

    const [inputValue, setInputValue] = useState({
        name: "",
        age: "",
        email: "",
        phoneNumber: "",
        password: "",
        city: "",
        address: "",
    });

    const [storage, setStorage] = useState([]);
    const [editingIndex, setEditingIndex] = useState(null);

    useEffect(() => {

        const storedData = JSON.parse(localStorage.getItem("employees"));

        if (storedData) {
            setStorage(storedData);
        }

    }, []);

    const handleChange = (e) => {

        const { name, value } = e.target;

        setInputValue((prevValue) => ({
            ...prevValue,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {

        e.preventDefault();

        const storedData = JSON.parse(localStorage.getItem("employees")) || [];


        if (editingIndex !== null) {
            const updatedStorage = [...storage];
            updatedStorage[editingIndex] = inputValue;

            setStorage(updatedStorage);
            localStorage.setItem("employees", JSON.stringify(updatedStorage));
            setEditingIndex(null); 

        } else {
            const newStorage = [...storedData, inputValue];
            setStorage(newStorage);
            localStorage.setItem("employees", JSON.stringify(newStorage));
        }

        setInputValue({
            name: "",
            age: "",
            email: "",
            phoneNumber: "",
            password: "",
            city: "",
            address: "",
        });
    };

    const handleEdit = (index) => {

        const employee = storage[index];
        setInputValue(employee);
        setEditingIndex(index); 
    };

    const handleDelete = (index) => {
        const updatedStorage = storage.filter((_, i) => i !== index);
        setStorage(updatedStorage);
        localStorage.setItem("employees", JSON.stringify(updatedStorage));
    };

  return (
    <>
        <div className="container" style={{ display: "block", width: 1200, padding: 30 }}>
            <h2 className="text-center mb-5"> REGISTRATION</h2>
            <form className="row g-3" onSubmit={handleSubmit}>
                <div className="col-md- mb-2">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" name="name" placeholder="Enter Name" onChange={handleChange} value={inputValue.name} />
                </div>
                <div className="">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" className="form-control" id="email" name="email" placeholder="Enter Email" onChange={handleChange} value={inputValue.email} />
                </div>
                <div className="">
                    <label htmlFor="phoneNumber" className="form-label">Phone Number</label>
                    <input type="number" className="form-control" id="phoneNumber" name="phoneNumber" placeholder="Enter Phone Number" onChange={handleChange} value={inputValue.phoneNumber} />
                </div>
                <div className="">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name="password" placeholder="Enter Password" onChange={handleChange} value={inputValue.password} />
                </div>
                <div className="">
                    <label htmlFor="address" className="form-label">Address</label>
                    <input type="text" className="form-control" id="address" name="address" placeholder="1234 Main St" onChange={handleChange} value={inputValue.address} />
                </div>
                <div className="">
                    <button type="submit" className="btn btn-primary">{editingIndex !== null ? "Update" : "Submit"}</button>
                </div>
            </form>
        </div>
        <h2 className="text-center">View Data</h2>

            <div className="container" style={{ marginTop: "100px" }}>
                <table className="table">
                    <thead>
                        <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Phone Number</th>
                        <th scope="col">Password</th>
                        <th scope="col">Address</th>
                        </tr>
                    </thead>
                    <tbody>
                        {storage.map((employee, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{employee.name}</td>
                            <td>{employee.email}</td>
                            <td>{employee.phoneNumber}</td>
                            <td>{employee.password}</td>
                            <td>{employee.address}</td>
                            <td>
                            <button className="btn btn-primary">Edit</button> || <button className="btn btn-danger" onClick={() => handleDelete(index)}>Delete</button>
                            </td>
                        </tr>
                        ))}
                    </tbody>
                </table>
            </div>

      </>

  );
};

export default LibraryForm;
