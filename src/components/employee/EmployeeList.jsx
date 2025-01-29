import { useState } from "react";
import { Button, Table } from "react-bootstrap";
import AddModal from "./AddModal.jsx";
import EditModal from "./EditModal.jsx";
import DeleteModal from "./DeleteModal.jsx";

const EmployeeList = ({
	employees,
	positions,
	refreshEmployees,
	refreshPositions,
	setToastError,
	setShowToastError,
	setToastSuccess,
	setShowToastSuccess
}) => {
	const [showAddModal, setShowAddModal] = useState(false);
	const [showEditModal, setShowEditModal] = useState(false);
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [employeeToUpdate, setEmployeeToUpdate] = useState(null);
	const [employeeToDelete, setEmployeeToDelete] = useState(null);

	const handleShowAddModal = () => setShowAddModal(true);

	const handleCloseAddModal = () => setShowAddModal(false);

	const handleShowEditModal = (employee) => {
		setEmployeeToUpdate(employee);
		setShowEditModal(true);
	};

	const handleCloseEditModal = () => {
		setEmployeeToUpdate(null);
		setShowEditModal(false);
	};

	const handleShowDeleteModal = (employee) => {
		setEmployeeToDelete(employee);
		setShowDeleteModal(true);
	};

	const handleCloseDeleteModal = () => {
		setEmployeeToDelete(null);
		setShowDeleteModal(false);
	};

	return (
		<div className="container my-4 text-center">
			{employees.length > 0 ? (
				<Table hover bordered className="text-center align-middle">
					<thead>
						<tr>
							<th>Employee No.</th>
							<th>Full Name</th>
							<th>Position Title</th>
							<th>Salary</th>
							<th>Actions</th>
						</tr>
					</thead>
					<tbody>
						{employees.map((employee) => (
							<tr key={employee.id}>
								<td>{employee.employee_number}</td>
								<td>{employee.full_name}</td>
								<td>
									{employee.position ? employee.position.position_title : ""}
								</td>
								<td>
									{employee.position ? `Php ${employee.position.salary}` : ""}
								</td>
								<td>
									<div>
										<Button
											variant="warning"
											className="me-1"
											onClick={() => handleShowEditModal(employee)}
										>
											Edit
										</Button>
										<Button
											variant="danger"
											className="ms-1"
											onClick={() => handleShowDeleteModal(employee)}
										>
											Delete
										</Button>
									</div>
								</td>
							</tr>
						))}
					</tbody>
				</Table>
			) : (
				<p>No employees found.</p>
			)}

			<Button variant="primary" onClick={handleShowAddModal}>
				Add Employee
			</Button>

			<AddModal
				show={showAddModal}
				handleClose={handleCloseAddModal}
				positions={positions}
				refreshEmployees={refreshEmployees}
				setToastSuccess={setToastSuccess}
				setShowToastSuccess={setShowToastSuccess}
				setToastError={setToastError}
				setShowToastError={setShowToastError}
			/>

			<EditModal
				show={showEditModal}
				handleClose={handleCloseEditModal}
				employeeToUpdate={employeeToUpdate}
				positions={positions}
				refreshEmployees={refreshEmployees}
				refreshPositions={refreshPositions}
				setToastSuccess={setToastSuccess}
				setShowToastSuccess={setShowToastSuccess}
				setToastError={setToastError}
				setShowToastError={setShowToastError}
			/>

			<DeleteModal
				show={showDeleteModal}
				handleClose={handleCloseDeleteModal}
				employeeToDelete={employeeToDelete}
				refreshEmployees={refreshEmployees}
				setToastSuccess={setToastSuccess}
				setShowToastSuccess={setShowToastSuccess}
				setToastError={setToastError}
				setShowToastError={setShowToastError}
			/>
		</div>
	);
};

export default EmployeeList;
