import { useState } from "react"
import { Button, Table } from "react-bootstrap"

const EmployeeCompaniesList = ({
  employeeCompanies,
  employeesWithoutCompany,
  refreshEmployeeCompanies,
  setToastError,
	setShowToastError,
	setToastSuccess,
	setShowToastSuccess
}) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
	const [showDeleteModal, setShowDeleteModal] = useState(false);

  return (
    <div className="container my-4 text-center">
      {employeeCompanies.length > 0 ? (
        <Table hover bordered className="text-center align-middle">
        <thead>
          <tr>
            <th>ID</th>
            <th>Employee ID</th>
            <th>Full Name</th>
            <th>Company ID</th>
            <th>Company Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employeeCompanies.map((employeeCompany) => (
            <tr key={employeeCompany.id}>
              <td>{employeeCompany.id}</td>
              <td>{employeeCompany.employee.id}</td>
              <td>{employeeCompany.employee.full_name}</td>
              <td>{employeeCompany.company.id}</td>
              <td>{employeeCompany.company.company_name}</td>
              <td>
                <div>
                  <Button
                    variant="warning"
                    className="me-1"
                    onClick={() => handleShowEditModal(employeeCompany)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    className="ms-1"
                    onClick={() => handleShowDeleteModal(employeeCompany)}
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
        <p>No Employee-Company records found.</p>
      )}

      <Button variant="primary" 
        // onClick={handleShowAddModal}
      >
				Add Employee-Company
			</Button>
    </div>
  )
}

export default EmployeeCompaniesList