import { useState } from "react";
import { Button, Form, Modal, ModalBody, ModalFooter, ModalHeader, ModalTitle } from "react-bootstrap";
import { addPosition } from "../../api";

const AddModal = ({
	show,
	handleClose,
	refreshPositions,
	setToastSuccess,
	setShowToastSuccess,
	setToastError,
	setShowToastError,
}) => {
	const [positionTitle, setPositionTitle] = useState("");
	const [salary, setSalary] = useState("");
	const [formErrors, setFormErrors] = useState({
		position_title: [],
		salary: []
	});

  const removeError = (field) => {
		if (formErrors[field]) {
			setFormErrors({
				...formErrors,
				[field]: [],
			});
		}
	};

  const clearPositionDataAndErrors = () => {
    setPositionTitle("");
    setSalary("");
    setFormErrors({
      position_title: [],
      salary: []
    });
  };

  const handleOnChangePositionTitle = (event, field) => {
    setPositionTitle(event.target.value);
    removeError(field);
  }

  const handleOnChangeSalary = (event, field) => {
    setSalary(event.target.value);
    removeError(field);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    const positionData = {
      position_title: positionTitle,
      salary: salary
    }

    try {
      const response = await addPosition(positionData);
      if (response.data.status === "Success") {
        handleClose();
        clearPositionDataAndErrors();
        refreshPositions();
        setToastSuccess(response.data.message);
        setShowToastSuccess(true);
      }
    } catch (error) {
      console.error("Error adding position:", error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        const errors = error.response.data.message;
        setFormErrors(errors);
      } else {
        clearPositionDataAndErrors();
        setToastError("Something went wrong. Please try again later.");
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
				clearPositionDataAndErrors();
			}}
			backdrop="static"
			keyboard={false}
			centered
		>
			<ModalHeader closeButton>
				<ModalTitle>Add Position</ModalTitle>
			</ModalHeader>
			<Form onSubmit={handleSubmit}>
				<ModalBody>
					<Form.Group className="mb-3" controlId="positionTitle">
						<Form.Label>Position Title</Form.Label>
						<Form.Control
							type="text"
							placeholder="Enter position title..."
							value={positionTitle}
							onChange={(event) => handleOnChangePositionTitle(event, "position_title")}
							isInvalid={!!formErrors.position_title?.[0]}
						/>
						<Form.Control.Feedback type="invalid">
							{formErrors.position_title?.[0]}
						</Form.Control.Feedback>
					</Form.Group>
					<Form.Group className="mb-3" controlId="positionSalary">
						<Form.Label>Salary</Form.Label>
						<Form.Control
							type="number"
							placeholder="Enter salary..."
							value={salary}
							onChange={(event) =>
								handleOnChangeSalary(event, "salary")
							}
							isInvalid={!!formErrors.salary?.[0]}
						/>
						<Form.Control.Feedback type="invalid">
							{formErrors.salary?.[0]}
						</Form.Control.Feedback>
					</Form.Group>
				</ModalBody>
				<ModalFooter>
					<Button
						variant="secondary"
						onClick={() => {
							handleClose();
							clearPositionDataAndErrors();
						}}
					>
						Cancel
					</Button>
					<Button variant="primary" type="submit">
						Add Position
					</Button>
				</ModalFooter>
			</Form>
		</Modal>
	);
};

export default AddModal;
