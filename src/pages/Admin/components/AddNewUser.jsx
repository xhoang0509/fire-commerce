import { Formik } from "formik";
import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import * as yup from "yup";
import Loader from "../../../components/Loader";
import { addDoc, collection } from "firebase/firestore";
import fireDB from "../../../fireConfig";
import { FaPlus } from "react-icons/fa";
AddNewUser.propTypes = {};
const schema = yup.object().shape({
    name: yup.string().required(),
    age: yup.number().required(),
});

function AddNewUser() {
    const [validated, setValidated] = useState(false);
    const [loading, setLoading] = useState(false);
    const inititalValues = {
        name: "",
        age: 0,
    };

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handeFormSubmit = async (values, actions) => {
        try {
            console.log(values);
            setLoading(true);
            await addDoc(collection(fireDB, "users"), values);
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
                Add New User
            </button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add New User</Modal.Title>
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
                                    <Form.Label>Age</Form.Label>
                                    <Form.Control
                                        type="number"
                                        name="age"
                                        value={values.age}
                                        onChange={handleChange}
                                        isInvalid={!!errors.age}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Please enter age.
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

export default AddNewUser;
