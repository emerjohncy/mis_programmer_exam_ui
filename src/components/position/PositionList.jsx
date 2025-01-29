import { useState } from "react";
import { Button, Table } from "react-bootstrap";
import AddModal from "./AddModal";
import EditModal from "./EditModal";
import DeleteModal from "./DeleteModal";

const PositionList = ({
	positions,
	refreshPositions,
  refreshEmployees,
	setToastError,
	setShowToastError,
	setToastSuccess,
	setShowToastSuccess,
}) => {
	const [showAddModal, setShowAddModal] = useState(false);
	const [showEditModal, setShowEditModal] = useState(false);
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [positionToUpdate, setPositionToUpdate] = useState(null);
	const [positionToDelete, setPositionToDelete] = useState(null);

	const handleShowAddModal = () => setShowAddModal(true);

	const handleCloseAddModal = () => setShowAddModal(false);

	const handleShowEditModal = (position) => {
		setPositionToUpdate(position);
		setShowEditModal(true);
	};

	const handleCloseEditModal = () => {
		setPositionToUpdate(null);
		setShowEditModal(false);
	};

	const handleShowDeleteModal = (position) => {
		setPositionToDelete(position);
		setShowDeleteModal(true);
	};

	const handleCloseDeleteModal = () => {
		setPositionToDelete(null);
		setShowDeleteModal(false);
	};

	return (
		<div className="container mt-4 text-center">
			{positions.length > 0 ? (
				<Table hover bordered className="text-center align-middle">
					<thead>
						<tr>
							<th>ID</th>
							<th>Position Title</th>
							<th>Salary</th>
							<th>Actions</th>
						</tr>
					</thead>
					<tbody>
						{positions.map((position) => (
							<tr key={position.id}>
								<td>{position.id}</td>
								<td>{position.position_title}</td>
								<td>Php {position.salary}</td>
								<td>
									<div>
										<Button
											variant="warning"
											className="me-1"
											onClick={() => handleShowEditModal(position)}
										>
											Edit
										</Button>
										<Button
											variant="danger"
											className="ms-1"
											onClick={() => handleShowDeleteModal(position)}
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
				<p>No positions found.</p>
			)}

			<Button variant="primary" onClick={handleShowAddModal}>
				Add Position
			</Button>

			<AddModal
				show={showAddModal}
				handleClose={handleCloseAddModal}
				refreshPositions={refreshPositions}
				setToastSuccess={setToastSuccess}
				setShowToastSuccess={setShowToastSuccess}
				setToastError={setToastError}
				setShowToastError={setShowToastError}
			/>

			<EditModal
				show={showEditModal}
				handleClose={handleCloseEditModal}
				positionToUpdate={positionToUpdate}
				refreshPositions={refreshPositions}
        refreshEmployees={refreshEmployees}
				setToastSuccess={setToastSuccess}
				setShowToastSuccess={setShowToastSuccess}
				setToastError={setToastError}
				setShowToastError={setShowToastError}
			/>

			<DeleteModal
				show={showDeleteModal}
				handleClose={handleCloseDeleteModal}
				positionToDelete={positionToDelete}
				refreshPositions={refreshPositions}
        refreshEmployees={refreshEmployees}
				setToastSuccess={setToastSuccess}
				setShowToastSuccess={setShowToastSuccess}
				setToastError={setToastError}
				setShowToastError={setShowToastError}
			/>
		</div>
	);
};

export default PositionList;
