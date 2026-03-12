let studentList = [];
if(localStorage.getItem("studentList") !== null){
    studentList = JSON.parse(localStorage.getItem("studentList"));
}

let numberCount = 0;
let addStudentButton = document.getElementById("addStudentButton");

addStudentButton.onclick = () => {
    let addStudentModal = document.getElementById("addStudentModal");
    addStudentModal.style.display = "flex";

    let addBtn = document.getElementById("addBtn");
    let cancelBtn = document.getElementById("cancelBtn");

    let inputName = document.getElementById("inputName");
    let inputClass = document.getElementById("inputClass");
    let inputTotClass = document.getElementById("inputTotClass");
    let inputClassAttended = document.getElementById("inputClassAttended");

    
    addBtn.onclick = () => {
        let newStudent = {
            name: inputName.value,
            section: inputClass.value,
            totClass: parseFloat(inputTotClass.value),
            classAttended: parseFloat(inputClassAttended.value),
            uniqueNumber: numberCount,
        }
        studentList.push(newStudent);
        createStudent(newStudent);

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
    div.appendChild(Name);
    div.appendChild(section);
    div.appendChild(percentage);
    div.appendChild(open);

    let box = document.getElementById("box");
    box.appendChild(div);
    addStudentModal.style.display = "none";
    numberCount++;
}

for(let studentDetails of studentList){
    createStudent(studentDetails);
}