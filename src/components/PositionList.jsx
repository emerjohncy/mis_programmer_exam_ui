import { useEffect, useState } from "react";
import axios from "axios";
import AddPositionModal from "./AddPositionModal";
import { Button } from "react-bootstrap";
import UpdatePositionModal from "./UpdatePositionModal";

const PositionList = () => {
	const [showAddModal, setShowAddModal] = useState(false);
	const [showUpdateModal, setShowUpdateModal] = useState(false);
	const [positionToUpdate, setPositionToUpdate] = useState(null);

	const [positions, setPositions] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	// Fetching employees from the API
	useEffect(() => {
		const fetchPositions = async () => {
			try {
				const response = await axios.get(
					"http://localhost:3000/api/v1/positions"
				);
				if (response.data.status === "Success") {
					setPositions(response.data.data); // Set employees data in state
				} else {
					setError("Failed to fetch positions data.");
				}
			} catch (error) {
				console.error("Error fetching positions:", error);
				setError("Error fetching positions.");
			} finally {
				setLoading(false);
			}
		};

		fetchPositions();
	}, []);

	if (loading) {
		return <div>Loading...</div>; // Show loading indicator
	}

	if (error) {
		return <div>{error}</div>; // Show error if there's any
	}

	const handleUpdate = (position) => {
		setPositionToUpdate(position);
		setShowUpdateModal(true);
    console.log(position)
	};

	const handleDelete = async (id) => {
		try {
			await axios.delete(`http://localhost:3000/api/v1/positions/${id}`);
			setPositions(positions.filter((position) => position.id !== id));
		} catch (error) {
			console.error("Error deleting position:", error);
		}
	};

	const refreshPositions = async () => {
		try {
			const response = await axios.get(
				"http://localhost:3000/api/v1/positions"
			);
			// Assuming response structure: { status: "Success", data: [ ... ] }
			if (response.data.status === "Success") {
				setPositions(response.data.data); // Set employees data in state
			} else {
				setError("Failed to fetch position data.");
			}
		} catch (error) {
			console.error("Error fetching positions:", error);
			setError("Error fetching positions.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="container mt-4">
			<h1 className="mb-4">Position List</h1>
			<Button variant="primary" onClick={() => setShowAddModal(true)}>
				Add Position
			</Button>
			{positions.length > 0 ? (
				<table className="table table-striped">
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
								<td>{position.PositionTitle}</td>
								<td>{position.Salary}</td>
								<td>
									<Button
										variant="warning"
										onClick={() => handleUpdate(position)}
									>
										Edit
									</Button>{" "}
									<Button
										variant="danger"
										onClick={() => handleDelete(position.id)}
									>
										Delete
									</Button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			) : (
				<p>No positions found.</p>
			)}
			<AddPositionModal
				show={showAddModal}
				handleClose={() => setShowAddModal(false)}
				refreshPositions={refreshPositions}
			/>

			<UpdatePositionModal
				show={showUpdateModal}
				handleClose={() => setShowUpdateModal(false)}
				positionToUpdate={positionToUpdate}
				refreshPositions={refreshPositions}
			/>
		</div>
	);
};

export default PositionList;
