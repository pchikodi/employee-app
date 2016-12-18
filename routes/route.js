var Employee = require('../models/Employee');

module.exports = function(app) {

  app.get('/employees', function(req, res) {
    Employee.find(function(err, employees) {
      if (err)
        res.send(err)
      res.json(employees); 
    });
  });

  app.post('/employees', function(req, res) {
    Employee.create({
      name : req.body.name,
      email : req.body.email,
      department : req.body.department,
      dob : req.body.dob,
      gender : req.body.gender,
      age : req.body.age
    }, function(err, employee) {
      if (err)
        res.send(err);
      Employee.find(function(err, employees) {
        if (err)
          res.send(err)
        res.json(employees);
      });
    });

  });

  app.post('/employees/update', function(req, res) {
    console.log('req.body._id' ,req.body._id);
    Employee.findById(req.body._id, function(err,employee){
      if (err) {
        res.send(err);
      }else{
        console.log('@@@@');
        console.log(employee);
        employee.name = req.body.name;
        employee.email = req.body.email;
        employee.department = req.body.department;
        employee.dob = req.body.dob;
        employee.gender = req.body.gender;
        employee.age = req.body.age;
        employee.save(function(err) {
          if (err) res.send(err);;
            Employee.find(function(err, employees) {
              if (err)
                res.send(err)
              res.json(employees);
            });
          });
      }
    });
  });

  app.delete('/employees/:employee_id', function(req, res) {
    Employee.remove({
      _id : req.params.employee_id
    }, function(err, employee) {
      if (err)
        res.send(err);
      Employee.find(function(err, employees) {
        if (err)
          res.send(err)
        res.json(employees);
      });
    });
  });
  
  app.get('*', function(req, res) {
    res.sendfile('./public/views/index.html');
  });
};