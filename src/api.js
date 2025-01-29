import axios from 'axios';

// const API_URL = import.meta.env.VITE_API_URL;
const API_URL = "http://localhost:3000/api/v1";

// Employees API
export const getEmployees = () => axios.get(`${API_URL}/employees`);                                        // GET fetch all employees
export const addEmployee = (employeeData) => axios.post(`${API_URL}/employees`, employeeData);              // POST add an employee
export const updateEmployee = (id, employeeData) => axios.put(`${API_URL}/employees/${id}`, employeeData);  // PUT update an employee
export const deleteEmployee = (id) => axios.delete(`${API_URL}/employees/${id}`);                           // DELETE delete an employee

// Position API
export const getPositions = () => axios.get(`${API_URL}/positions`);                                        // GET fetch all positions
export const addPosition = (positionData) => axios.post(`${API_URL}/positions`, positionData);              // POST add a position
export const updatePosition = (id, positionData) => axios.put(`${API_URL}/positions/${id}`, positionData);  // PUT update a position
export const deletePosition = (id) => axios.delete(`${API_URL}/positions/${id}`);                           // DELETE delete a position


// Company API
export const getCompanies = () => axios.get(`${API_URL}/companies`);                                      // GET fetch all companies
export const addCompany = (companyData) => axios.post(`${API_URL}/companies`, companyData);               // POST add a company
export const updateCompany = (id, companyData) => axios.put(`${API_URL}/companies/${id}`, companyData);   // PUT update a company
export const deleteCompany = (id) => axios.delete(`${API_URL}/companies/${id}`);                          // DELETE delete a company

// Employee-Companies API
export const getEmployeeCompanies = () => axios.get(`${API_URL}/employee_companies`);                                      // GET fetch all employee-companies