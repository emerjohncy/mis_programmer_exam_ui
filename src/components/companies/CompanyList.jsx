import { useState } from "react";
import { Button, Table } from "react-bootstrap";
import AddModal from "./AddModal";
import EditModal from "./EditModal";
import DeleteModal from "./DeleteModal";

const CompanyList = ({
	companies,
	refreshCompanies,
	setToastError,
	setShowToastError,
	setToastSuccess,
	setShowToastSuccess
}) => {
	const [showAddModal, setShowAddModal] = useState(false);
	const [showEditModal, setShowEditModal] = useState(false);
	const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [companyToUpdate, setCompanyToUpdate] = useState(null);
  const [companyToDelete, setCompanyToDelete] = useState(null);

	const handleShowAddModal = () => setShowAddModal(true);

	const handleCloseAddModal = () => setShowAddModal(false);

  const handleShowEditModal = (company) => {
    setCompanyToUpdate(company);
    setShowEditModal(true);
  }

  const handleCloseEditModal = () => {
    setCompanyToUpdate(null);
    setShowEditModal(false);
  }

  const handleShowDeleteModal = (company) => {
    setCompanyToDelete(company);
    setShowDeleteModal(true);
  }

  const handleCloseDeleteModal = () => {
    setCompanyToDelete(null);
    setShowDeleteModal(false);
  }

	return (
		<div className="container my-4 text-center">
			{companies.length > 0 ? (
				<Table hover bordered className="text-center align-middle">
					<thead>
						<tr>
							<th>ID</th>
							<th>Company Name</th>
							<th>Company Address</th>
							<th>company Email</th>
							<th>Actions</th>
						</tr>
					</thead>
					<tbody>
						{companies.map((company) => (
							<tr key={company.id}>
								<td>{company.id}</td>
								<td>{company.company_name}</td>
								<td>{company.company_address}</td>
								<td>{company.company_email}</td>
								<td>
									<div>
										<Button
											variant="warning"
											className="me-1"
											onClick={() => handleShowEditModal(company)}
										>
											Edit
										</Button>
										<Button
											variant="danger"
											className="ms-1"
											onClick={() => handleShowDeleteModal(company)}
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
				<p>No companies found.</p>
			)}

			<Button variant="primary" onClick={handleShowAddModal}>
				Add Company
			</Button>

			<AddModal
				show={showAddModal}
				handleClose={handleCloseAddModal}
				refreshCompanies={refreshCompanies}
        setToastSuccess={setToastSuccess}
        setShowToastSuccess={setShowToastSuccess}
        setToastError={setToastError}
        setShowToastError={setShowToastError}
			/>

      <EditModal
        show={showEditModal}
        handleClose={handleCloseEditModal}
        companyToUpdate={companyToUpdate}
        refreshCompanies={refreshCompanies}
        setToastSuccess={setToastSuccess}
        setShowToastSuccess={setShowToastSuccess}
        setToastError={setToastError}
        setShowToastError={setShowToastError}
      />

      <DeleteModal
        show={showDeleteModal}
        handleClose={handleCloseDeleteModal}
        companyToDelete={companyToDelete}
        refreshCompanies={refreshCompanies}
        setToastSuccess={setToastSuccess}
        setShowToastSuccess={setShowToastSuccess}
        setToastError={setToastError}
        setShowToastError={setShowToastError}
      />
		</div>
	);
};

export default CompanyList;
