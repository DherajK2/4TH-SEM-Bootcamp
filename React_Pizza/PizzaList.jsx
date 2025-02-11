import React from 'react';
import { Link } from 'react-router-dom';  // <-- Import Link here
import PageHeader from "../header/PageHeader";

function PizzaList() {
    return (
        <>
           <PageHeader />

            <h3 className="mt-4">List Of Pizza 🍕</h3>
            <div className="container">
                <table className="table table-striped table-bordered">
                    <thead className="table-dark">
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Name</th>
                            <th scope="col">Size (in cm)</th>
                            <th scope="col">Price (in rupees)</th>
                            <th scope="col">Category</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">P1234</th>
                            <td>🍕 Papparoni Pizza</td>
                            <td>16</td>
                            <td>250</td>
                            <td>Fast Delivery</td>
                            <td>
                                <Link to="/Pizza/view/P1234" className="btn btn-success">View</Link>  {/* Correct the link and close properly */}
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">P1256</th>
                            <td>🍕 Sizzling Pizza</td>
                            <td>18</td>
                            <td>300</td>
                            <td>Order Delivery</td>
                            <td>
                                <Link to="/Pizza/view/P1256" className="btn btn-success">View</Link>  {/* Corrected here as well */}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default PizzaList;
