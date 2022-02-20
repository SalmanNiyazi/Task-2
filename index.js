const express = require('express')
const app = express()
const port  = 3000

app.use(express.urlencoded({ extended: false}));
app.use(express.json());

let students = [
    {
        id: 1,
        name: "Mike",
        rollNo: 101,
        major: "Physics"
    },
    {
        
        id: 2,
        name: "Alex",
        rollNo: 102,
        major: "Computer Science"
    },
    {
        id: 3,
        name: "Binny",
        rollNo: 103,
        major: "Mathematics"
    }
];

app.get('/totalStrength',(req,res) => {
    res.send({
        length: students.length
    })
})

app.get('/studentInfo/:id',(req,res) => {
    let currStudent = students.filter(function(student){
        if(student.id == req.params.id){
           return true;
        }
     });
     if(currStudent.length == 1){
        res.json(currStudent[0])
     } else {
        res.status(404);//Set status to 404 as student was not found
        res.json({message: "Not Found"});
     }
})

app.get('/allStudent',(req,res) => {
    res.send(students)
})

app.post('/studentData',(req,res) => {
    let newId = students[students.length-1].id + 1;
    students.push({
        id: newId,
        name: req.body.name,
        rollNo: req.body.rollNo,
        major: req.body.major
    })
    res.json({message: "New student added.", location: "/students/" + newId})
})

app.put('/studentData/:id',(req,res) => {
    let updateIndex = students.map(function(student){
        return student.id;
     }).indexOf(parseInt(req.params.id));
     if(updateIndex === -1){
        //Student not found, create new
        students.push({
           id: req.params.id,
           name: req.body.name,
           rollNo: req.body.rollNo,
           major: req.body.major
        });
        res.json({message: "New student created.", location: "/students/" + req.params.id});
     } else {
        //Update existing student
        if(req.body.major){
            students[updateIndex].major = req.body.major
        }
        if(req.body.name){
            students[updateIndex].name = req.body.name
        }
        if(req.body.rollNo){
            students[updateIndex].rollNo = req.body.rollNo
        }

        res.json({message: "Student id " + req.params.id + " updated.", 
           location: "/students/" + req.params.id});
     }
    
})

app.delete('/studentData',(req,res) => {
    let removeIndex = students.map(function(student){
        return student.id;
     }).indexOf(req.params.id); //Gets us the index of student with given id.
     
     if(removeIndex === -1){
        res.json({message: "Not found"});
     } else {
        students.splice(removeIndex, 1);
        res.send({message: "Student id " + req.params.id + " removed."});
     }
})

app.listen(port,() => {
    console.log(`App is running on port ${port}`)
})
