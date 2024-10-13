import axios from "axios";

let employeesServiceUrl = "http://localhost:9090/api/employees";

export const getEmployees = async () => {
  const token = sessionStorage.getItem("token");
  console.log(token);

  if (!token) {
    console.error("Token not found in sessionStorage");
  }
  try {
    const fetchEmployee = (
      await axios.get(employeesServiceUrl, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
    ).data;
    return fetchEmployee;
  } catch (error) {
    console.error(
      "Error fetching employees:",
      error.response ? error.response.data : error.message
    );
    throw new Error(
      error.response ? error.response.data.message : error.message
    );
  }
};

export const getEmployeeDetails = async (employeeId) => {
    const token = sessionStorage.getItem('token');
console.log(token);

if (!token) {
    console.error('Token not found in sessionStorage');
}
  try {
    const fetchEmployee = (
      await axios.get(`${employeesServiceUrl}/${employeeId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
    ).data;
    return fetchEmployee;
  } catch (error) {
    console.error(
      `Error fetching employee ${employeeId}:`,
      error.response ? error.response.data : error.message
    );
    throw new Error(
      error.response ? error.response.data.message : error.message
    );
  }
};

// export const getEmployeeDetails = (id)=>{
//     return new Promise((res, rej)=>{
//         const employee = employeesData.find(emp=> emp.employeeId === id)
//         if(employee){
//             res(employee)
//         }else{
//             rej('employee not found')
//         }
//     })
// }

let employeesData = [
  {
    employeeId: 2370,
    employeeName: "Pravinkumar R. D.",
    address: "Suncity, A8/404",
    city: "Pune",
    zipcode: 411051,
    phone: "+91 23892893",
    email: "pravin.r.d@synechron.com",
    skillSets: "Microsoft/JavaScript",
    country: "India",
    joiningDate: new Date(),
    avatar: "images/noimage.png",
  },
  {
    employeeId: 2372,
    employeeName: "Manish Kaushik",
    address: "Mooncity, Z8/404",
    city: "Raipur",
    zipcode: 459899,
    phone: "+91 9039039090",
    email: "manish.kaushik@synechron.com",
    skillSets: "DBA",
    country: "India",
    joiningDate: new Date(),
    avatar: "images/noimage.png",
  },
  {
    employeeId: 2374,
    employeeName: "Alisha C.",
    address: "Mooncity, B8/404",
    city: "Mumbai",
    zipcode: 510512,
    phone: "+91 30003000",
    email: "alisha.c@synechron.com",
    skillSets: "Java",
    country: "India",
    joiningDate: new Date(),
    avatar: "images/noimage.png",
  },
];

// export const getEmployees = ()=>{
//     return new Promise((res, rej)=>{
//         setTimeout(()=>{
//             res(employeesData)
//         },1000)
//     })
// }

// export const getEmployeeDetails = (id)=>{
//     return new Promise((res, rej)=>{
//         const employee = employeesData.find(emp=> emp.employeeId === id)
//         if(employee){
//             res(employee)
//         }else{
//             rej('employee not found')
//         }
//     })
// }
