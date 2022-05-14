/***
Напишите код приложения, интерфейс которого представляет собой input и кнопку. В input можно ввести любое число. 
При клике на кнопку происходит следующее:
* Если число не попадает в диапазон от 1 до 10 — выводить ниже текст «число вне диапазона от 1 до 10».
* Если число попадает в диапазон от 1 до 10 — сделать запрос c помощью XHR по URL 
  https://picsum.photos/v2/list?limit=10, где get-параметр limit — это введённое число.
После получения данных вывести ниже картинки на экран.
*/
const strUrl = 'https://picsum.photos/v2/list?limit=10'

const resultNode = document.querySelector(".result");
const btnRequest = document.querySelector(".btnRequest");
const inputNumber = document.querySelector(".inpNumber__input");
const errorMessage = document.querySelector(".inpNumber__error-message");

// Функция- обертка для XMLHttpRequest
function useRequest(url, callback) {
  let xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);

  xhr.onload = function() {
    if (xhr.status != 200) {
      console.log ('Статус ответа: ', xhr.status);
    } else {
      const result = JSON.parse(xhr.response);
      if (callback) {
        callback(result);
      }
    }
  };

  xhr.onerror = function() {
    console.log ('Ошибка! Статус ответа: ', xhr.status);
  };

  xhr.send();
}

// Добавляем результат запроса в DOM
function showResult(jsObject) {
  let images = '';

  jsObject.forEach(object => {
    const image = `
      <div class="result-image">
        <img src="${object.download_url}" class="result-image__img">
        <p class="result-image__signature">Автор: ${object.author}</p>
      </div>
    `;
    images = images + image;
  });

  resultNode.innerHTML = images;
}

btnRequest.addEventListener('click', () => {
  if (inputNumber.value < 1 || inputNumber.value > 10) {
    errorMessage.innerHTML = "число вне диапазона от 1 до 10</p>";
    resultNode.innerHTML = "";
    inputNumber.focus();
  } else {
    errorMessage.innerHTML = "";
    const urlRequest = strUrl.replace("limit=10", "limit=" +inputNumber.value);
    useRequest (urlRequest, showResult);
  }
})
