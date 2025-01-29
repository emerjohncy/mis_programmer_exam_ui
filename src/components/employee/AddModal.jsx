import { useState } from "react";
import {
	Button,
	Modal,
	ModalBody,
	ModalFooter,
	ModalHeader,
	ModalTitle,
} from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { addEmployee } from "../../api";

const AddModal = ({
	show,
	handleClose,
  positions,
	refreshEmployees,
  setToastSuccess,
	setShowToastSuccess,
	setToastError,
	setShowToastError
}) => {
	const [firstName, setFirstName] = useState("");
	const [middleName, setMiddleName] = useState("");
	const [lastName, setLastName] = useState("");
	const [position, setPosition] = useState("");
	// const [positions, setPositions] = useState([]);
	// const [loading, setLoading] = useState(true);
	const [formErrors, setFormErrors] = useState({
		first_name: [],
		middle_name: [],
		last_name: [],
		position: [],
	});

	const removeError = (field) => {
		if (formErrors[field]) {
			setFormErrors({
				...formErrors,
				[field]: [],
			});
		}
	};

	const clearEmployeeDataAndErrors = () => {
		setFirstName("");
		setMiddleName("");
		setLastName("");
		setPosition("");
		setFormErrors({
			first_name: [],
			middle_name: [],
			last_name: [],
			position: []
		});
	};

	const handleOnChangeFirstName = (event, field) => {
		setFirstName(event.target.value);
		removeError(field);
	};

	const handleOnChangeMiddleName = (event, field) => {
		setMiddleName(event.target.value);
		removeError(field);
	};

	const handleOnChangeLastName = (event, field) => {
		setLastName(event.target.value);
		removeError(field);
	};

	const handleOnChangePosition = (event, field) => {
		setPosition(event.target.value);
		removeError(field);
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		const employeeData = {
			first_name: firstName,
			middle_name: middleName,
			last_name: lastName,
			position_id: position
		};

		try {
			const response = await addEmployee(employeeData);
			if (response.data.status === "Success") {
				handleClose();
				clearEmployeeDataAndErrors();
				refreshEmployees();
				setToastSuccess(response.data.message);
				setShowToastSuccess(true);
			}
		} catch (error) {
			console.error("Error adding employee:", error);
			if (
				error.response &&
				error.response.data &&
				error.response.data.message
			) {
				const errors = error.response.data.message;
				setFormErrors(errors);
			} else {
				setToastError("Something went wrong. Please try again later.");
				setShowToastError(true);
				handleClose();
        clearEmployeeDataAndErrors();
			}
		}
	};

	return (
		<Modal
			show={show}
			onHide={() => {
				handleClose();
				clearEmployeeDataAndErrors();
			}}
			backdrop="static"
			keyboard={false}
			centered
		>
			<ModalHeader closeButton>
				<ModalTitle>Add Employee</ModalTitle>
			</ModalHeader>
			<Form onSubmit={handleSubmit}>
				<ModalBody>
					<Form.Group className="mb-3" controlId="employeeFirstName">
						<Form.Label>First Name</Form.Label>
						<Form.Control
							type="text"
							placeholder="Enter employee's first name..."
							value={firstName}
							onChange={(event) => handleOnChangeFirstName(event, "first_name")}
							isInvalid={!!formErrors.first_name?.[0]}
						/>
						<Form.Control.Feedback type="invalid">
							{formErrors.first_name?.[0]}
						</Form.Control.Feedback>
					</Form.Group>
					<Form.Group className="mb-3" controlId="employeeMiddleName">
						<Form.Label>Middle Name</Form.Label>
						<Form.Control
							type="text"
							placeholder="Enter employee's middle name..."
							value={middleName}
							onChange={(event) =>
								handleOnChangeMiddleName(event, "middle_name")
							}
							isInvalid={!!formErrors.middle_name?.[0]}
						/>
						<Form.Control.Feedback type="invalid">
							{formErrors.middle_name?.[0]}
						</Form.Control.Feedback>
					</Form.Group>
					<Form.Group className="mb-3" controlId="employeeLastName">
						<Form.Label>Last Name</Form.Label>
						<Form.Control
							type="text"
							placeholder="Enter employee's last name..."
							value={lastName}
							onChange={(event) => handleOnChangeLastName(event, "last_name")}
							isInvalid={!!formErrors.last_name?.[0]}
						/>
						<Form.Control.Feedback type="invalid">
							{formErrors.last_name?.[0]}
						</Form.Control.Feedback>
					</Form.Group>
					<Form.Group className="mb-3" controlId="employeePosition">
						<Form.Label>Position</Form.Label>
						<Form.Select
							value={position}
							onChange={(event) => handleOnChangePosition(event, "position")}
							isInvalid={!!formErrors.position?.[0]}
						>
							{positions.length === 0 ? (
								<option hidden>No positions available.</option>
							) : (
                <>
                  <option hidden>Select Position</option>
									{positions.map((position) => (
										<option key={position.id} value={position.id}>
											{position.position_title}
										</option>
									))}
								</>
							)};
						</Form.Select>
						<Form.Control.Feedback type="invalid">
							{formErrors.position?.[0]}
						</Form.Control.Feedback>
					</Form.Group>
				</ModalBody>
				<ModalFooter>
					<Button
						variant="secondary"
						onClick={() => {
							handleClose();
							clearEmployeeDataAndErrors();
						}}
					>
						Cancel
					</Button>
					<Button variant="primary" type="submit">
						Add Employee
					</Button>
				</ModalFooter>
			</Form>
		</Modal>
	);
};

export default AddModal;
