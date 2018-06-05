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
            description: String
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
            saveDivision(input: DivisionInput): Division
        }
    `),
    employeeData = [],
    divisionData = [],
    root = { 
        getEmployee: (id)=>{
            return employeeData.filter(employee=>{
                return employee.id == id
            });
        },
        getEmployees: ()=>{
            return employeeData
        },
        saveEmployee :(args)=>{
            console.log("Args",args);
            employeeData.push(args.input)
            return {id:args.input.id}
        },
        saveDivision :(args)=>{
            console.log("Add DIvision",args)
            divisionData.push(args.input)
            return {id:args.input.id}
        },
        getDivision: (id)=>{
            return divisionData.filter(division=>{
                return division.id == id
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
