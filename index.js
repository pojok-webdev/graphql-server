var express = require('express'),
    { buildSchema } = require('graphql'),
    graphqlHttp = require('express-graphql'),
    schema = buildSchema(`
        type Query {
            getEmployee(id: Int): Employee,
            getEmployees : [Employee],
            getDivision(id: Int): Division,
            getDivisions: [Division]
        },
        type Employee {
            id: Int,
            username:String,
            level: Int,
            division: Division
        },
        type Division {
            id: Int,
            name: String,
            description: String,
            employee: [Employee]
        },
        input DivisionInput{
            id: Int,
            name: String,
            description: String
        },
        input EmployeeInput{
            id: Int,
            username:String,
            level: Int,
            division: DivisionInput            
        },
        type Mutation {
            saveEmployee(input:EmployeeInput): Employee,
            updateEmployee(input:EmployeeInput): Employee,
            saveDivision(input: DivisionInput): Division
        }
    `),
    employeeData = [],
    divisionData = [],
    root = { 
        getEmployee: (arg)=>{
	        console.log("Get Employee Invoked",arg.id);
            return employeeData.filter(employee=>{
                if(employee.id==arg.id){
                    console.log("Employee",employee);
                    return employee
                }
            })[0];
        },
        getEmployees: ()=>{
            return employeeData
        },
        saveEmployee :(args)=>{
            console.log("Args",args);
            employeeData.push(args.input)
            return {id:args.input.id}
        },
        updateEmployee:(args)=>{
            const employee = find(employeeData,{id:args.id})
            if(!employee){
                console.log("Employee not found")
            }else{
                employee.username = args.username
                employee.level = args.level
                return employee
            }
        },
        updateEmployee_:(id)=>{
            const employee = getEmployee(id)
            if(!employee){
                console.log("Employee not found")
            }else{
                employee.username = args.username
                employee.level = args.level
                return employee
            }
        },
        saveDivision :(args)=>{
            console.log("Add DIvision",args)
            divisionData.push(args.input)
            return {id:args.input.id}
        },
        getDivision: (arg)=>{

            console.log("Param:",arg);
            return divisionData.filter(division=>{
                return division.id == arg.id
            })[0]
        },
        getDivisions: ()=>{
            return divisionData
        }
    },
    app = express();
    app.use('/graphql',graphqlHttp({
        schema: schema,
        rootValue: root,
        graphiql: true
    }))
    app.listen(4000,()=>console.log('Server graphql'))
