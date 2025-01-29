import { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';

const AddPositionModal = ({ show, handleClose, refreshPositions }) => {
    const [name, setName] = useState('');
    const [salary, setSalary] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:3000/api/v1/positions", {
              PositionTitle: name,
              Salary: salary
            });
            refreshPositions();
            handleClose();
            setName('')
            setSalary('')
        } catch (error) {
            console.error('Error adding position:', error);
        }
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Add Position</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="positionTitle">
                        <Form.Label>Position Title</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter position title"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="position">
                        <Form.Label>Salary</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Enter salary"
                            value={salary}
                            onChange={(e) => setSalary(e.target.value)}
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Add Position
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default AddPositionModal;
