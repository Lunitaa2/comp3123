/*
pursope _ review JS concepts
Prototypes vs classes
regular fuctions , anontmous fuctions, arrow fuctions
callback
 functions
 MERN: N stands for NODE.JS
 */

//. var is global vs. let is local

var globalVariable = 100;
let localVariable = 200;
function functionName() {
  let varInfunc = "local";
}
//console.log(varInfunc);// will fail

// Prototype - one time use object from a prototype
const oneTimeUseObj = {
  prop1: "Luna Ortega",
  prop2: "comp3123",
  method1: function (param1) {
    console.log(param1);
  },
};
console.log(oneTimeUseObj);
console.log(oneTimeUseObj.prop1);
console.log(oneTimeUseObj.prop2);
oneTimeUseObj.method1("PIZZA");

// Protoype - using a constructor
function Student(student_name_p, course_p, lunch_p) {
  this.student_name = student_name_p;
  this.course = course_p;
  this.lunch = lunch_p;
  this.method1 = function (param1) {
    return param1;
  };
}

const morning_student = new Student("Luna", "comp3123", "noodles");
console.log(morning_student);
console.log(morning_student.student_name);
console.log(morning_student.course);
morning_student.method1(morning_student.lunch);

/// Classes - always have constructors
class Prof {
  constructor(prof_name_p) {
    this.prof_name = prof_name_p;
  }
  method1(lunch) {
    console.log(lunch);
  }
}

const morning_prof = new Prof("Luna");
console.log(morning_prof.prof_name);
morning_prof.method1("burger");
