import React, {useEffect, useState} from 'react'
import { deleteEmployee, listEmployees } from '../services/EmployeeService'
import { useNavigate } from 'react-router-dom'

const ListEmployeeComponent = () => {

    const [employees, setEmployees] = useState([])

    const [showDeletePopup, setShowDeletePopup] = useState(false);
    const [employeeToDelete, setEmployeeToDelete] = useState(null);

    const navigator = useNavigate();

    useEffect(() => {
        getAllEmployees();
    }, [])

    function getAllEmployees() {
        listEmployees().then((response) => {
            setEmployees(response.data);
        }).catch(error => {
            console.error(error);
        })
    }
    function addNewEmployee(){
        navigator('/add-employee')
    }

    function updateEmployee(id) {
        navigator(`/edit-employee/${id}`)
    }

    // function removeEmployee(id){
    //     console.log(id);

    //     deleteEmployee(id).then((response) =>{
    //         getAllEmployees();
    //     }).catch(error => {
    //         console.error(error);
    //     })
    // }

    // Show popup and store which employee to delete
    function confirmDeleteEmployee(id) {
        setEmployeeToDelete(id);
        setShowDeletePopup(true);
    }

    function handleDeleteConfirmed() {
    deleteEmployee(employeeToDelete).then((response) => {
        getAllEmployees();
        setShowDeletePopup(false);
        setEmployeeToDelete(null);
    }).catch(error => {
        console.error(error);
        setShowDeletePopup(false);
        setEmployeeToDelete(null);
    });
}

function handleDeleteCancelled() {
    setShowDeletePopup(false);
    setEmployeeToDelete(null);
}

  return (
    <div className='container'>

        <h2 className='text-center'>List of Employees</h2>
        <button className='btn btn-primary mb-2' onClick={addNewEmployee}>Add Employee</button>
        <table className='table table-striped table-bordered'>
            <thead>
                <tr>
                    <th>Employee Id</th>
                    <th>Employee First Name</th>
                    <th>Employee Last Name</th>
                    <th>Employee Email Id</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {
                    employees.map(employee =>
                        <tr key={employee.id}>
                            <td>{employee.id}</td>
                            <td>{employee.firstName}</td>
                            <td>{employee.lastName}</td>
                            <td>{employee.email}</td>
                            <td>
                                <button className='btn btn-info' onClick={() => updateEmployee(employee.id)}>Update</button>
                                <button className='btn btn-danger' onClick={() => confirmDeleteEmployee(employee.id)}
                                        style={{ marginLeft: '10px' }}
                                >Delete</button>
                            </td>
                        </tr>)
                }
            </tbody>
        </table>
        {showDeletePopup && (
                <div style={{
                    position: 'fixed',
                    top: 0, left: 0, width: '100vw', height: '100vh',
                    background: 'rgba(0,0,0,0.5)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 999
                }}>
                    <div style={{
                        background: 'white',
                        padding: '2rem',
                        borderRadius: '8px',
                        textAlign: 'center',
                        minWidth: '300px'
                    }}>
                        <h4>Are you sure you want to delete this employee?</h4>
                        <div style={{ marginTop: '1rem' }}>
                            <button className="btn btn-danger" onClick={handleDeleteConfirmed}>Delete</button>
                            <button className="btn btn-secondary" onClick={handleDeleteCancelled} style={{ marginLeft: '10px' }}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
  )
}

export default ListEmployeeComponent