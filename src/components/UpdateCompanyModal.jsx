import { useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';

const UpdateCompanyModal = ({ show, handleClose, companyToUpdate, refreshCompanies }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');

    useEffect(() => {
      if (companyToUpdate) {
          setName(companyToUpdate.name);
          setEmail(companyToUpdate.email);
          setAddress(companyToUpdate.position);
      }
  }, [companyToUpdate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put("http://localhost:3000/api/v1/companies", {
              CompanyName: name,
              CompanyEmail: email,
              CompanyAddress: address
            });
            refreshCompanies();
            handleClose();
        } catch (error) {
            console.error('Error updating company:', error);
        }
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Update Company</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="companyName">
                        <Form.Label>Company Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter company name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="employeePosition">
                        <Form.Label>Company Email</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter company email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="employeeCompany">
                        <Form.Label>Company Address</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter company address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Add Company
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default UpdateCompanyModal;
