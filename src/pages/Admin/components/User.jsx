import {
    collection,
    deleteDoc,
    doc,
    getDocs,
    setDoc,
} from "firebase/firestore";

import { useEffect, useState } from "react";
import { Form, Button, FloatingLabel, Modal } from "react-bootstrap";
import { FaEdit, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import fireDB from "../../../fireConfig";
import AddNewProduct from "./AddNewProduct";
import AddNewUser from "./AddNewUser";
UserAdmin.propTypes = {};

function UserAdmin(props) {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [product, setProduct] = useState({
        id: "",
        name: "",
        description: "",
        price: 0,
        category: "",
        imageURL: "",
    });

    const [showUpdate, setShowUpdate] = useState(false);
    const handleCloseUpdate = () => setShowUpdate(false);
    const handleShowUpdate = () => setShowUpdate(true);

    const [showDelete, setShowDelete] = useState(false);
    const handleCloseDelete = () => setShowDelete(false);
    const handleShowDelete = () => setShowDelete(true);
    useEffect(() => {
        handleGetProducts();
    }, []);
    const handleGetProducts = async () => {
        try {
            setLoading(true);
            const products = await getDocs(collection(fireDB, "users"));
            const productArray = [];
            products.forEach((product) => {
                const obj = {
                    id: product.id,
                    ...product.data(),
                };

                productArray.push(obj);
            });

            setProducts(productArray);
            setLoading(false);
        } catch (error) {
            console.log("Failed to get user: ", error);
            setLoading(false);
        }
    };

    const handleEditClick = (product) => {
        handleShowUpdate();
        setProduct({ id: product.id, ...product });
    };

    const handleDeleteClick = (product) => {
        handleShowDelete();
        setProduct({ id: product.id, ...product });
    };

    const handleUpdateProduct = async () => {
        try {
            setLoading(true);
            await setDoc(doc(fireDB, "products", product.id), product);
            setLoading(false);
            toast.success("Update product successfully 🎉");
            handleCloseUpdate();
        } catch (error) {
            setLoading(false);
            toast.error("Update product failed 😪");
        }
    };

    const handleDeleteProduct = async () => {
        try {
            setLoading(true);
            await deleteDoc(doc(fireDB, "products", product.id));
            toast.success("Delete product successfully !");
            handleCloseDelete();
            setLoading(false);
        } catch (error) {
            toast.error("Delete product failed 😪");
        }
    };

    return (
        <>
            <AddNewUser />
            <table className="table table-striped" style={{ width: "100%" }}>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Age</th>
                        <th>Action</th>                        
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product.id}>
                            <td>{product.name}</td>
                            <td>{product.age}</td>
                            <th>
                                <FaEdit
                                    onClick={() => handleEditClick(product)}
                                    className="btn-delete-all text-warning mx-2"
                                />
                                <FaTrash
                                    onClick={() => handleDeleteClick(product)}
                                    className="btn-delete-all text-danger mx-2"
                                />
                            </th>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Modal show={showUpdate} onHide={handleCloseUpdate}>
                <Modal.Header closeButton>
                    <Modal.Title>Update product</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <label className="form-label">Name</label>
                    <input
                        type="text"
                        className="form-control mb-2"
                        placeholder="Name"
                        value={product.name}
                        onChange={(e) =>
                            setProduct({ ...product, name: e.target.value })
                        }
                    />
                    <label className="form-label">Description</label>
                    <FloatingLabel
                        controlId="floatingTextarea2"
                        label="Description"
                    >
                        <Form.Control
                            value={product.description}
                            as="textarea"
                            placeholder="Leave a comment here"
                            style={{ height: "100px" }}
                            onChange={(e) =>
                                setProduct({
                                    ...product,
                                    description: e.target.value,
                                })
                            }
                        />
                    </FloatingLabel>
                    <label className="form-label">Price</label>
                    <input
                        className="form-control mb-2"
                        placeholder="Price"
                        type="number"
                        value={product.price}
                        onChange={(e) =>
                            setProduct({
                                ...product,
                                price: e.target.value,
                            })
                        }
                    />
                    <label className="form-label">Category</label>
                    <input
                        className="form-control mb-2"
                        placeholder="Category"
                        type="text"
                        value={product.category}
                        onChange={(e) =>
                            setProduct({
                                ...product,
                                category: e.target.value,
                            })
                        }
                    />
                    <label className="form-label">Image URL</label>
                    <input
                        className="form-control mb-2"
                        placeholder="Image URL"
                        type="text"
                        value={product.imageURL}
                        onChange={(e) =>
                            setProduct({
                                ...product,
                                imageURL: e.target.value,
                            })
                        }
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseUpdate}>
                        Close
                    </Button>
                    <Button onClick={handleUpdateProduct} variant="warning">
                        UPDATE
                    </Button>
                </Modal.Footer>
            </Modal>
            <Modal show={showDelete} onHide={handleCloseDelete}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete product</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure delete product ? This action cannot be reversed
                    ❗❗❗
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseDelete}>
                        Close
                    </Button>
                    <Button onClick={handleDeleteProduct} variant="danger">
                        DELETE
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default UserAdmin;
