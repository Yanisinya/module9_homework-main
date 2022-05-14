/***
Напишите код приложения, интерфейс которого представляет собой 2 input и кнопку submit. В input можно ввести любое число. 
При клике на кнопку происходит следующее:
* Если оба числа не попадают в диапазон от 100 до 300 или введено не число — 
  выводить ниже текст «одно из чисел вне диапазона от 100 до 300»;
* Если числа попадают в диапазон от 100 до 300 — сделать запрос c помощью fetch по 
  URL https://picsum.photos/200/300, где первое число — ширина картинки, второе — высота.
После получения данных вывести ниже картинку на экран.
*/
const strUrl = 'https://picsum.photos/'

const resultNode = document.querySelector(".result");
const btnRequest = document.querySelector(".btnRequest");
const inputSizeAll = document.querySelectorAll(".inputSize__input");
const errorMessageAll = document.querySelectorAll(".inputSize__error-message");

btnRequest.addEventListener('click', () => {
  let flag = true;

  inputSizeAll.forEach((item, index) => {
    if (item.value < 100 || item.value > 300) {
      errorMessageAll[index].innerHTML = "число вне диапазона от 100 до 300</p>";
      flag = false;
      item.focus();
    } else {
      errorMessageAll[index].innerHTML = "";
    }
  });

  if (flag) {
    let urlRequest = `${strUrl}${inputSizeAll[0].value}/${inputSizeAll[1].value}`;

    fetch (urlRequest)
      .then((response) => {
        return response.url;
      })
      .then((data) => {
        resultNode.innerHTML = `<img src="${data}">`;
      })
      .catch(() => { console.log('error')});
  } else {
    resultNode.innerHTML = "";
  };
})
