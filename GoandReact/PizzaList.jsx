import { useState, useEffect } from 'react';
import PageHeader from "../header/PageHeader";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function PizzaList() {
    const [pizzas, setPizzas] = useState([]);

    const readAllPizzas = async () => {
        try {
            const baseUrl = 'http://127.0.0.1:8080';
            const response = await axios.get(`${baseUrl}/pizzas`);
            setPizzas(response.data);
        } catch (error) {
            alert("Error fetching pizzas.");
        }
    };

    const onDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this pizza?')) {
            return;
        }
        try {
            const baseUrl = 'http://127.0.0.1:8080';
            const response = await axios.delete(`${baseUrl}/pizzas/${id}`);
            alert(response.data.message);
            readAllPizzas();
        } catch (error) {
            alert("Error deleting pizza.");
        }
    };

    useEffect(() => {
        readAllPizzas();
    }, []);

    return (
        <>
            <PageHeader PageNumber={1} />
            <h3>List Of Pizzas 🍕</h3>
            <div className="container">
                <table className="table table-striped table-bordered">
                    <thead className="table-dark">
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Name</th>
                            <th scope="col">Size (in cm)</th>
                            <th scope="col">Price (in rupees)</th>
                            <th scope="col">Category</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pizzas.map((pizza) => (
                            <tr key={pizza.pizzaId}>
                                <th scope="row">{pizza.pizzaId}</th>
                                <td>{pizza.pizzaName}</td>
                                <td>{pizza.pizzaSize}</td>
                                <td>{pizza.pizzaPrice}</td>
                                <td>{pizza.pizzaCategory}</td>
                                <td>
                                    <a
                                        href={`/pizzas/edit/${pizza.pizzaId}`}
                                        className="btn btn-warning me-2"
                                    >
                                        Edit
                                    </a>
                                    <button
                                        onClick={() => onDelete(pizza.pizzaId)}
                                        className="btn btn-danger"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default PizzaList;
