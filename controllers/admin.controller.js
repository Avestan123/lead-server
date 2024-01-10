const Employee= require('../models/employee')


const addEmployee = async (req, res) =>{
    const { employeeName, email, employeeId ,employeePassword,  employeeRole} = req.body;
    
  
    try {
        const isEmployee = await Employee.findOne({ employeeId });
        if(isEmployee){
            return  res.status(500). json({status: 500, message : "EmployeeId already present"})
        }
        const newEmployee = new Employee({ employeeName, email, employeeId ,employeePassword,  employeeRole });
        await newEmployee.save();
        res.status(200).json({ status: 200, message: 'Empoyee added successfully' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 500, error: 'Internal Server Error creating Employee' }); 
    }
}

const getAllEmployees = async (req, res) => {
    const userId = req.user._id;
    let allEmployees;
    try {
        if(req.user.employeeRole==="Admin"){
            allEmployees = await Employee.find();
          }else{
            allEmployees = await Employee.find({ createBy:userId });
          }
        res.status(200).json({ status: 200,  employees : allEmployees });

    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 500, error: 'Internal Server Error fetching Employee' }); 
    }
}


const updateEmpoyeeDetails = async (req, res) => {
  const empId = req.params.empId; // Assuming you're passing the customer ID in the URL
  const updatedDetails = req?.body?.data;

  try {
    const updatedEmployee = await Employee.findByIdAndUpdate(
      empId,
      updatedDetails,
      { new: true } // This option returns the modified document instead of the original
    );

    if (!updatedEmployee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.status(200).json({
      status: 200,
      message: "Employee details updated",
      employee: updatedEmployee,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error - employee update" });
  }
};
  
  const deleteEmployee = async (req, res) => {
    const empId = req.body;
   try {
     const deleteEmpoyee = await  Employee.deleteOne({ _id: empId.empId });
     if(deleteEmpoyee){
      res.status(200).json({ message: 'Employee Deleted'});
     }
   } catch (error) {
    console.error(error);
      res.status(500).json({ error: "Internal Server Error- employee deletion" });
   }
  
  }

module.exports = { addEmployee , getAllEmployees, updateEmpoyeeDetails, deleteEmployee}