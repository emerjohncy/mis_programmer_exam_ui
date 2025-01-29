import { useEffect, useState } from 'react';
// import { Button } from 'bootstrap';
import { Button, Table } from 'react-bootstrap';
import axios from 'axios';
import AddCompanyModal from './AddCompanyModal';
import UpdateCompanyModal from './UpdateCompanyModal';

const CompanyList = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [companyToUpdate, setCompanyToUpdate] = useState(null);

    const [companies, setCompanies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetching employees from the API
    useEffect(() => {
        const fetchCompanies = async () => {
            try {
                const response = await axios.get("http://localhost:3000/api/v1/companies");
                // Assuming response structure: { status: "Success", data: [ ... ] }
                if (response.data.status === "Success") {
                  setCompanies(response.data.data); // Set employees data in state
                } else {
                    setError('Failed to fetch company data.');
                }
            } catch (error) {
                console.error('Error fetching companies:', error);
                setError('Error fetching companies.');
            } finally {
                setLoading(false);
            }
        };

        fetchCompanies();
    }, []);

    if (loading) {
        return <div>Loading...</div>;  // Show loading indicator
    }

    if (error) {
        return <div>{error}</div>;  // Show error if there's any
    }

    const handleUpdate = (company) => {
      setCompanyToUpdate(company);
      setShowUpdateModal(true);
  };

  const handleDelete = async (id) => {
    try {
        await axios.delete(`http://localhost:3000/api/v1/companies/${id}`);
        setCompanies(companies.filter((company) => company.id !== id));
    } catch (error) {
        console.error('Error deleting company:', error);
    }
};

    const refreshCompanies = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/v1/companies");
        // Assuming response structure: { status: "Success", data: [ ... ] }
        if (response.data.status === "Success") {
          setCompanies(response.data.data); // Set employees data in state
        } else {
            setError('Failed to fetch company data.');
        }
    } catch (error) {
        console.error('Error fetching companies:', error);
        setError('Error fetching companies.');
    } finally {
        setLoading(false);
    }
  };

    return (
      <div className="container mt-4">
      <h1 className="mb-4">Company List</h1>
      <Button variant="primary" onClick={() => setShowAddModal(true)}>
        Add Company
      </Button>
      {companies.length > 0 ? (
          <Table className="table table-striped">
              <thead>
                  <tr>
                      <th>ID</th>
                      <th>Company Name</th>
                      <th>Company Email</th>
                      <th>Company Address</th>
                      <th>Actions</th>
                  </tr>
              </thead>
              <tbody>
                  {companies.map((company) => (
                      <tr key={company.id}>
                          <td>{company.id}</td>
                          <td>{company.CompanyName}</td>
                          <td>{company.CompanyEmail}</td>
                          <td>{company.CompanyAddress}</td>
                          <td>
                            <Button
                              variant="warning"
                              onClick={() => handleUpdate(company)}
                            >
                              Edit
                            </Button>{' '}
                            <Button
                              variant="danger"
                              onClick={() => handleDelete(company.id)}
                            >
                              Delete
                            </Button>
                          </td>
                      </tr>
                  ))}
              </tbody>
          </Table>
      ) : (
          <p>No companies found.</p>
      )}

      <AddCompanyModal
        show={showAddModal}
        handleClose={() => setShowAddModal(false)}
        refreshCompanies={refreshCompanies}
      />

      <UpdateCompanyModal
        show={showUpdateModal}
        handleClose={() => setShowUpdateModal(false)}
        companyToUpdate={companyToUpdate}
        refreshCompanies={refreshCompanies}
      />
    </div>
  );
};

export default CompanyList;
