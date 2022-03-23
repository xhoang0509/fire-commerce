import { Formik } from "formik";
import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import * as yup from "yup";
import Loader from "../../../components/Loader";
import { addDoc, collection } from "firebase/firestore";
import fireDB from "../../../fireConfig";
import { FaPlus } from "react-icons/fa";
AddNewProduct.propTypes = {};
const schema = yup.object().shape({
    name: yup.string().required(),
    description: yup.string().required(),
    price: yup.number().required(),
    category: yup.string().required(),
    imageURL: yup.string().required(),
});

function AddNewProduct() {
    const [validated, setValidated] = useState(false);
    const [loading, setLoading] = useState(false);
    const inititalValues = {
        name: "",
        description: "",
        price: 0,
        category: "",
        imageURL: "",
    };

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handeFormSubmit = async (values, actions) => {
        try {
            console.log(values);
            setLoading(true);
            await addDoc(collection(fireDB, "products"), values);
            toast.success("Add product successfully !");
            setLoading(false);
            handleClose();
        } catch (error) {
            toast.error("Add product failed ❗❗❗");
            setLoading(false);
            console.log(error);
        }
    };
    return (
        <>
            {loading && <Loader />}
            <button onClick={handleShow} className="d-flex align-items-center">
                <FaPlus />
                Add New Product
            </button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add New Product</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Formik
                        validationSchema={schema}
                        onSubmit={handeFormSubmit}
                        initialValues={inititalValues}
                    >
                        {({
                            handleSubmit,
                            handleChange,
                            handleBlur,
                            values,
                            touched,
                            isValid,
                            errors,
                        }) => (
                            <Form
                                noValidate
                                validated={validated}
                                onSubmit={handleSubmit}
                            >
                                <Form.Label>Name</Form.Label>
                                <Form.Group>
                                    <Form.Control
                                        type="text"
                                        name="name"
                                        value={values.name}
                                        onChange={handleChange}
                                        isInvalid={!!errors.name}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Please enter name.
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        name="description"
                                        value={values.description}
                                        onChange={handleChange}
                                        isInvalid={!!errors.description}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Please enter description.
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Price</Form.Label>
                                    <Form.Control
                                        type="number"
                                        name="price"
                                        value={values.price}
                                        onChange={handleChange}
                                        isInvalid={!!errors.price}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Please enter a number
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Category</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="category"
                                        value={values.category}
                                        onChange={handleChange}
                                        isInvalid={!!errors.category}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Please enter category.
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Image URL</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="imageURL"
                                        value={values.imageURL}
                                        onChange={handleChange}
                                        isInvalid={!!errors.imageURL}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Please enter image URL
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Modal.Footer>
                                    <Button
                                        variant="secondary"
                                        onClick={handleClose}
                                    >
                                        Close
                                    </Button>
                                    <button type="submit">ADD</button>
                                </Modal.Footer>
                            </Form>
                        )}
                    </Formik>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default AddNewProduct;
