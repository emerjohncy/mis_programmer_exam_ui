import { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';

const AddEmployeeModal = ({ show, handleClose, refreshEmployees }) => {
    const [firstName, setFirstName] = useState('');
    const [middleName, setMiddleName] = useState('');
    const [lastName, setLastName] = useState('');
    const [companyId, setCompanyId] = useState('');
    const [positionId, setPositionId] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:3000/api/v1/employees", {
              FirstName: firstName,
              MiddleName: middleName,
              LastName: lastName,
              company_id: companyId,
              position_id: positionId
            });
            refreshEmployees();
            handleClose();
            setFirstName('');
            setMiddleName('');
            setLastName('');
            setCompanyId('');
            setPositionId('');
        } catch (error) {
            console.error('Error adding employee:', error);
        }
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Add Employee</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="employeeFirstName">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter first name"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="employeeMiddleName">
                        <Form.Label>Middle Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter middle name"
                            value={middleName}
                            onChange={(e) => setMiddleName(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="employeeLastName">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter last name"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="employeeCompanyId">
                        <Form.Label>Company ID</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Enter company ID"
                            value={companyId}
                            onChange={(e) => setCompanyId(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="employeePositionId">
                        <Form.Label>Position ID</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Enter position ID"
                            value={positionId}
                            onChange={(e) => setPositionId(e.target.value)}
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Add Employee
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default AddEmployeeModal;
