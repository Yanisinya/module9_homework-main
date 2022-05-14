/***
Вам дана заготовка и результат, который вы должны получить. Ваша задача — написать код, который будет 
преобразовывать JSON в JS-объект и выводить его в консоль.
Нужно получить js-объект:
{
  list: [
    { name: 'Petr', age: 20, prof: 'mechanic' },
    { name: 'Vova', age: 60, prof: 'pilot' },
  ]
}
*/

// JSON заготовка
const jsonString = `{
  "list": [{
    "name": "Petr",
    "age": "20",
    "prof": "mechanic"
   }, {
    "name": "Vova",
    "age": "60",
    "prof": "pilot"
   }]}`;

const jsObject = JSON.parse(jsonString);

console.log(jsObject);
