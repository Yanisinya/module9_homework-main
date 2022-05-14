/***
Вам дана заготовка и результат, который вы должны получить. Ваша задача — написать код, 
который будет преобразовывать XML в JS-объект и выводить его в консоль.
Нужно получить js-объект:
{
    list: [
    { name: 'Ivan Ivanov', age: 35, prof: 'teacher', lang: 'en' },
    { name: 'Петр Петров', age: 58, prof: 'driver', lang: 'ru' },
  ]
}
*/

const parser = new DOMParser();

// XML заготовка
const xmlString = `<list>
  <student>
    <name lang="en">
      <first>Ivan</first>
      <second>Ivanov</second>
    </name>
    <age>35</age>
    <prof>teacher</prof>
  </student>
  <student>
    <name lang="ru">
      <first>Петр</first>
      <second>Петров</second>
    </name>
    <age>58</age>
    <prof>driver</prof>
  </student>
</list>`;

const xmlDOM = parser.parseFromString(xmlString, "text/xml");

const listNode = xmlDOM.querySelector("list");
const students = listNode.querySelectorAll("student");

let arrStudent = [];
students.forEach(student => {
  const nameNode = student.querySelector("name");
  const firstNode = nameNode.querySelector("first");
  const secondNode = nameNode.querySelector("second");
  const ageNode = student.querySelector("age");
  const profNode = student.querySelector("prof");
  const langAttr = nameNode.getAttribute("lang");

  arrStudent.push ({
    name: firstNode.textContent + " " + secondNode.textContent,
    age: ageNode.textContent,
    prof: profNode.textContent,
    lang: langAttr
  })
});

const jsObject = {
  list: arrStudent
};

console.log(jsObject);