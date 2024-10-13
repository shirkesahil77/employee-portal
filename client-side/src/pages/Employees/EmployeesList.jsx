import React, {useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom';
import { getEmployees } from '../../services/employees-service';
import Spinner from '../../components/Spinner';
const EmployeesList = () => {
    const [employees, setEmployees] = useState([]);
    useEffect(()=>{
        getEmployees()
        .then(data=> setEmployees(data))
        .catch(err=> console.log(err))
    },[])
    console.log(employees)
    let title = "Welcome To Synechron's Employees List!";
    let subTitle = "Core development members of Synechron! India!";
  if (employees.length > 0) {
            return (
                <div className="justify-center mx-4 text-center">
                    <h1 className="text-4xl">{title}</h1>   
                    <hr />
                    <h6 className="text-xl">{subTitle}</h6>
                    <table className="w-full h-52 table-auto border-separate border-spacing-2 border border-slate-400">
                        <thead>
                            <tr>
                                <th className="border border-slate-300">Employee Name</th>
                                <th className="border border-slate-300">City</th>
                                <th className="border border-slate-300">Email</th>
                                <th className="border border-slate-300">Contact #</th>
                                <th className="border border-slate-300">Show Details</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                employees.map((employee) => <tr key={employee.employeeId}>
                                    <td className="border border-slate-300"><span>{employee.employeeName}</span></td>
                                    <td className="border border-slate-300"><span>{employee.city}</span></td>
                                    <td className="border border-slate-300"><span>{employee.email}</span></td>
                                    <td className="border border-slate-300"><span>{employee.phone}</span></td>
                                    <td className="border border-slate-300">
                                        <NavLink className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded" to={'/employees/' + employee.employeeId}>Show Details</NavLink>
                                        {/* <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded" onClick={() => .onEmployeeSelection(employee.employeeId)} data-modal-toggle="popup-modal">Show Details</button> */}
                                    </td>
                                </tr>)
                            }

                        </tbody>
                        
                    </table>
                    {/* {
                        this.state.selectedEmployeeId > 0 ?
                            <EmployeeDetails employeeId={this.state.selectedEmployeeId} /> : ''
                    } */}
                </div>
            )
        } else {
            return (
                // <h4>We are fetching the Employees List for you!</h4>
                <Spinner message={'We are fetching the Employees List for you!'}/>
            )
        }
}

export default EmployeesList