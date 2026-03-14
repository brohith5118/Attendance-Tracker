let studentList = [];
if(localStorage.getItem("studentList") !== null){
    studentList = JSON.parse(localStorage.getItem("studentList"));
}
let numberCount = 0;

if (studentList.length > 0) {
    numberCount = studentList[studentList.length - 1].uniqueNumber + 1;
}
let addStudentButton = document.getElementById("addStudentButton");

let addStudentModal = document.getElementById("addStudentModal");

let addBtn = document.getElementById("addBtn");
let cancelBtn = document.getElementById("cancelBtn");

let inputName = document.getElementById("inputName");
let inputClass = document.getElementById("inputClass");
let inputTotClass = document.getElementById("inputTotClass");
let inputClassAttended = document.getElementById("inputClassAttended");

addStudentButton.onclick = () => {
    addStudentModal.style.display = "flex";
}
addBtn.onclick = () => {
    let newStudent = {
        name: inputName.value.trim(),
        section: inputClass.value.trim(),
        totClass: parseFloat(inputTotClass.value),
        classAttended: parseFloat(inputClassAttended.value),
        uniqueNumber: numberCount,
    }
    if(newStudent.name === "" || newStudent.section === ""){
        alert("Name and Class cannot be empty");
        return;
    }
    if(isNaN(newStudent.totClass)){
        newStudent.totClass = 0;
    }
    if(isNaN(newStudent.classAttended)){
        newStudent.classAttended = 0;
    }
    if(newStudent.classAttended > newStudent.totClass){
        alert("Classes attended cannot exceed total classes");
        return;
    }
    studentList.push(newStudent);
    createStudent(newStudent);
    
    addStudentModal.style.display = "none";

    localStorage.setItem("studentList",JSON.stringify(studentList));

    inputName.value = "";
    inputClass.value = "";
    inputTotClass.value = "";
    inputClassAttended.value = "";
    
}

cancelBtn.onclick = () => {
    addStudentModal.style.display = "none";
    inputName.value = "";
    inputClass.value = "";
    inputTotClass.value = "";
    inputClassAttended.value = "";
}

function createStudent(studentDetails){
    let div = document.createElement("div");
    div.classList.add("studentRow");
    let Name = document.createElement("p");
    Name.textContent = studentDetails.name;
    let section = document.createElement("p");
    section.textContent = studentDetails.section;
    let  percentage = document.createElement("p");
    percentage.textContent = (studentDetails.classAttended/studentDetails.totClass*100).toFixed(1) + '%';
    let open = document.createElement("a");
    open.classList.add("openButton");
    open.textContent = "open"
    let deleteBtn = document.createElement("button");
    deleteBtn.classList.add("deleteBtn");
    deleteBtn.textContent = "delete";
    div.appendChild(Name);
    div.appendChild(section);
    div.appendChild(percentage);
    div.appendChild(open);
    div.appendChild(deleteBtn);

    let box = document.getElementById("box");
    box.appendChild(div);
    numberCount++;

    deleteBtn.onclick = () => {
        let deleteModal = document.getElementById("deleteModal");
        deleteModal.style.display = "flex";

        let deleteConfirm = document.getElementById("deleteConfirm");
        let deleteCancel = document.getElementById("deleteCancel");

        deleteCancel.onclick = () => {
        deleteModal.style.display = "none";
        }

        deleteConfirm.onclick = () => {
            deleteStudent(studentDetails);
            box.removeChild(div);
            deleteModal.style.display = "none";
        }
    }
}

function deleteStudent(studentDetails){
    let index = studentList.findIndex(function(eachElement){
        if(eachElement.uniqueNumber === studentDetails.uniqueNumber){
            return true;
        }
    });
    studentList.splice(index,1);
    localStorage.setItem("studentList",JSON.stringify(studentList));
}

for(let studentDetails of studentList){
    createStudent(studentDetails);
}