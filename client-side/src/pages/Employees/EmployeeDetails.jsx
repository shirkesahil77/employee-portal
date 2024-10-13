import React,{useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import { getEmployeeDetails } from '../../services/employees-service';
import Spinner from '../../components/Spinner';

const EmployeeDetails = () => {
    const [employee, setEmployee] = useState(null)
    const urlParameters = useParams()
    useEffect(()=>{
        try {
            async function fetchEmployee () {
                setEmployee(await getEmployeeDetails(parseInt(urlParameters.id)))
            } 
            fetchEmployee()
        } catch (error) {
            console.log(error)
        }
        
    },[urlParameters.id])
    console.log(employee,'single employee')
    if (employee !== null) {
        return (
            <div className='justify-center mx-4'>
                <h1 className="text-4xl">Details Of - {employee.employeeName}</h1>
                <table className="w-full table-auto border-separate border-spacing-2 border border-slate-400">
                    <tbody>
                        <tr>
                            <th className="border border-slate-300">Employee Id</th>
                            <td className="border border-slate-300"><span>{employee.employeeId}</span></td>
                        </tr>
                        <tr>
                            <th className="border border-slate-300">Employee Name</th>
                            <td className="border border-slate-300"><span>{employee.employeeName}</span></td>
                        </tr>
                        <tr>
                            <th className="border border-slate-300">Employee's Joining Date</th>
                            <td className="border border-slate-300"><span>{employee.joiningDate.toString()}</span></td>
                        </tr>
                        <tr>
                            <th className="border border-slate-300">Employee's Profile Pic</th>
                            <td className="border border-slate-300">
                                <img src={'../'+employee.avatar} alt={employee.employeeName} title={employee.employeeName} className='w-24 h-24'/>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }else{
        return (
            <Spinner message={'We are fetching the Employee Details List for you!'}/>
        )
    }
    
}

export default EmployeeDetails