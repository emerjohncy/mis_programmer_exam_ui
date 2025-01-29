import { useEffect, useState } from "react";
import { Button, Form, Modal, ModalBody, ModalFooter, ModalHeader, ModalTitle } from "react-bootstrap";
import { updateCompany } from "../../api";

const EditModal = ({
  show, 
  handleClose,
  companyToUpdate,
  refreshCompanies,
  setToastError,
	setShowToastError,
	setToastSuccess,
	setShowToastSuccess
}) => {
  const [companyName, setCompanyName] = useState("");
  const [companyAddress, setCompanyAddress] = useState("");
  const [companyEmail, setCompanyEmail] = useState("");
  const [formErrors, setFormErrors] = useState([]);

  useEffect(() => {
    if (companyToUpdate) {
      setCompanyName(companyToUpdate.company_name);
      setCompanyAddress(companyToUpdate.company_address);
      setCompanyEmail(companyToUpdate.company_email);
    }
  }, [companyToUpdate])

  const removeError = (field) => {
		if (formErrors[field]) {
			setFormErrors({
				...formErrors,
				[field]: [],
			});
		}
	};

  const clearErrors = () => {
    removeError("company_name");
    removeError("company_address");
    removeError("company_email");
  }

  const handleOnChangeCompanyName = (event, field) => {
    setCompanyName(event.target.value);
    removeError(field);
  }

  const handleOnChangeCompanyAddress = (event, field) => {
    setCompanyAddress(event.target.value);
    removeError(field);
  }

  const handleOnChangeCompanyEmail = (event, field) => {
    setCompanyEmail(event.target.value);
    removeError(field);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    const companyData = {
      company_name: companyName,
      company_address: companyAddress,
      company_email: companyEmail
    };

    try {
      const response = await updateCompany(companyToUpdate.id, companyData);
      if (response.data.status === "Success") {
				handleClose();
				clearErrors();
				refreshCompanies();
				setToastSuccess(response.data.message);
				setShowToastSuccess(true);
			}
    } catch (error) {
      console.error("Error updating company:", error);
			if (
				error.response &&
				error.response.data &&
				error.response.data.message
			) {
				const errors = error.response.data.message;
				setFormErrors(errors);
			} else {
				setToastError("Something went wrong. Please try again later!");
				setShowToastError(true);
				handleClose();
			}
    }
  }

  return (
    <Modal
      show={show}
      onHide={() => {
        handleClose();
        clearErrors();
      }}
      backdrop="static"
      keyboard={false}
      centered
    >
      <ModalHeader closeButton>
        <ModalTitle>Edit Company</ModalTitle>
      </ModalHeader>
      <Form onSubmit={(event) => handleSubmit(event)}>
        <ModalBody>
          <Form.Group className="mb-3" controlId="companyName">
						<Form.Label>Company Name</Form.Label>
						<Form.Control
							type="text"
							placeholder="Enter company name..."
							value={companyName}
							onChange={(event) => handleOnChangeCompanyName(event, "company_name")}
							isInvalid={!!formErrors.company_name?.[0]}
						/>
						<Form.Control.Feedback type="invalid">
							{formErrors.company_name?.[0]}
						</Form.Control.Feedback>
					</Form.Group>
          <Form.Group className="mb-3" controlId="companyAddress">
						<Form.Label>Company Address</Form.Label>
						<Form.Control
							type="text"
							placeholder="Enter company address..."
							value={companyAddress}
							onChange={(event) => handleOnChangeCompanyAddress(event, "company_address")}
							isInvalid={!!formErrors.company_address?.[0]}
						/>
						<Form.Control.Feedback type="invalid">
							{formErrors.company_address?.[0]}
						</Form.Control.Feedback>
					</Form.Group>
          <Form.Group className="mb-3" controlId="companyEmail">
						<Form.Label>Company Email</Form.Label>
						<Form.Control
							type="text"
							placeholder="Enter company email..."
							value={companyEmail}
							onChange={(event) => handleOnChangeCompanyEmail(event, "company_email")}
							isInvalid={!!formErrors.company_email?.[0]}
						/>
						<Form.Control.Feedback type="invalid">
							{formErrors.company_email?.[0]}
						</Form.Control.Feedback>
					</Form.Group>
        </ModalBody>
        <ModalFooter>
					<Button
						variant="secondary"
						onClick={() => {
							handleClose();
							clearErrors();
						}}
					>
						Cancel
					</Button>
					<Button variant="primary" type="submit">
						Update Company
					</Button>
				</ModalFooter>
      </Form>
    </Modal>
  )
}

export default EditModal