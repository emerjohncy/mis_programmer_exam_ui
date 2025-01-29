import { Fade, Toast, ToastBody, ToastContainer } from 'react-bootstrap';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import EmployeeList from './employee/EmployeeList';
import PositionList from './position/PositionList';
import { useEffect, useState } from 'react';
import CompanyList from './companies/CompanyList';
import { getCompanies, getEmployeeCompanies, getEmployees, getPositions } from '../api';
import EmployeeCompaniesList from './employee_company/EmployeeCompaniesList';

export default function TableData() {
  const [toastError, setToastError] = useState(null);
  const [toastSuccess, setToastSuccess] = useState(null);
  const [showToastError, setShowToastError] = useState(false);
  const [showToastSuccess, setShowToastSuccess] = useState(false);

  const [employees, setEmployees] = useState([]);
  const [positions, setPositions] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const [employeesWithoutCompany, setEmployeesWithoutCompany] = useState([]);
  const [employeeCompanies, setEmployeeCompanies] = useState([]);

  const fetchEmployees = async () => {
      try {
        const response = await getEmployees();
        if (response.data.status === "Success") {
          setEmployees(response.data.data);
          setError(null);
        }
      } catch (error) {
        console.error('Error fetching employees:', error);
        setError('Something went wrong. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    const fetchPositions = async () => {
      try {
        const response = await getPositions();
        if (response.data.status === "Success") {
          setPositions(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching positions:", error);
        // setFormErrors({ ...formErrors, position: "Error fetching positions" });
        setError("Something went wrong. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

  const fetchCompanies = async () => {
    try {
      const response = await getCompanies();
      if (response.data.status === "Success") {
        setCompanies(response.data.data);
        setError(null);
      }
    } catch (error) {
      console.error('Error fetching companies:', error);
      setError("Something went wrong. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  }

  const fetchEmployeeCompanies = async () => {
    try {
      const response = await getEmployeeCompanies();
      if (response.data.status === "Success") {
        setEmployeeCompanies(response.data.data);
        setError(null);
      }
    } catch (error) {
      console.error('Error fetching companies:', error);
      setError("Something went wrong. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  }

  const fetchEmployeesWithoutCompany = async () => {
    try {
      const response = await getEmployees({ without_company: true });
      if (response.data.status === "Success") {
        setEmployeesWithoutCompany(response.data.data);
        setError(null);
      }
    } catch (error) {
      console.error('Error fetching employees without company:', error);
      setError('Something went wrong. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
    fetchPositions();
    fetchCompanies();
    fetchEmployeeCompanies();
    fetchEmployeesWithoutCompany();
  },[])

  if (isLoading) {
    return <div>Loading...</div>;  // Show loading indicator
  }

  if (error) {
    return <div>{error}</div>;  // Show error if there's any
  }
  
  return (
    <div>
      <h1>Workforce & Organization Management</h1>
      <Tabs
      defaultActiveKey="employee"
      transition={Fade}
      id="justify-tab-example"
      className="mb-3"
    >
      <Tab eventKey="employee" title="Employees">
        <EmployeeList
          employees={employees}
          positions={positions}
          refreshEmployees={fetchEmployees}
          refreshPositions={fetchPositions}
          setToastError={setToastError}
          setShowToastError={setShowToastError}
          setToastSuccess={setToastSuccess}
          setShowToastSuccess={setShowToastSuccess}
        />
      </Tab>
      <Tab eventKey="position" title="Positions">
        <PositionList 
          positions={positions}
          refreshPositions={fetchPositions}
          refreshEmployees={fetchEmployees}
          setToastError={setToastError}
          setShowToastError={setShowToastError}
          setToastSuccess={setToastSuccess}
          setShowToastSuccess={setShowToastSuccess}
        />
      </Tab>
      <Tab eventKey="company" title="Companies">
        <CompanyList
          companies={companies}
          refreshCompanies={fetchCompanies}
          setToastError={setToastError}
          setShowToastError={setShowToastError}
          setToastSuccess={setToastSuccess}
          setShowToastSuccess={setShowToastSuccess}
        />
      </Tab>
      <Tab eventKey="employee-company" title="Employee-Company">
        <EmployeeCompaniesList
          employeeCompanies={employeeCompanies}
          employeesWithoutCompany={employeesWithoutCompany}
          refreshEmployeeCompanies={fetchEmployeeCompanies}
          setToastError={setToastError}
          setShowToastError={setShowToastError}
          setToastSuccess={setToastSuccess}
          setShowToastSuccess={setShowToastSuccess}
        />
      </Tab>
    </Tabs>
    <ToastContainer
      className='p-3 z-3 position-fixed'
      position='top-end'
    >
      <Toast
        bg="danger"
        onClose={() => {
          setShowToastError(false);
          setToastError(null);
        }}
        show={showToastError}
        delay={3000}
        autohide
      >
        <ToastBody className='text-white'>
          {toastError}
        </ToastBody>
      </Toast>
      <Toast
        bg="success"
        onClose={() => {
          setShowToastSuccess(false);
          setToastSuccess(null);
        }}
        show={showToastSuccess}
        delay={3000}
        autohide
      >
        <ToastBody className='text-white'>
          {toastSuccess}
        </ToastBody>
      </Toast>
    </ToastContainer>
    </div>
  )
}
