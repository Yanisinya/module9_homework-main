/***
Написать код приложения, интерфейс которого состоит из двух input и кнопки. В input можно ввести любое число.
- Заголовок первого input — «номер страницы». - Заголовок второго input — «лимит». - Заголовок кнопки — «запрос».
При клике на кнопку происходит следующее:
* Если число в первом input не попадает в диапазон от 1 до 10 или не является числом — 
  выводить ниже текст «Номер страницы вне диапазона от 1 до 10»;
* Если число во втором input не попадает в диапазон от 1 до 10 или не является числом — 
  выводить ниже текст «Лимит вне диапазона от 1 до 10»;
* Если и первый, и второй input не в диапазонах или не являются числами — 
  выводить ниже текст «Номер страницы и лимит вне диапазона от 1 до 10»;
* Если числа попадают в диапазон от 1 до 10 — сделать запрос по URL https://picsum.photos/v2/list?page=1&limit=10, 
  где GET-параметр page — это число из первого input, а GET-параметр limit — это введённое число второго input. 
После получения данных вывести список картинок на экран.
Если пользователь перезагрузил страницу, то ему должны показываться картинки из последнего успешно выполненного 
запроса (использовать localStorage).
*/
const strUrl = 'https://picsum.photos/v2/list?page=1&limit=10'

const resultNode = document.querySelector(".result");
const btnRequest = document.querySelector(".btnRequest");
const inputListAll = document.querySelectorAll(".inputList__input");
const errorMessage = document.querySelector(".inputList__error-message");

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
  let flag = true;
  let errorMsg = "";

  inputListAll.forEach((item, index) => {
    if (item.value < 1 || item.value > 10) {
      if (index == 0) {
        errorMsg = "Номер страницы вне диапазона от 1 до 10";
      } else {
        if (errorMsg.length) {
          errorMsg = "Номер страницы и лимит вне диапазона от 1 до 10";
        } else {
          errorMsg = "Лимит вне диапазона от 1 до 10";
        }
      }
      flag = false;
      item.focus();
    }
  });
  errorMessage.innerHTML = errorMsg;

  if (flag) {
    let replaceStr = `page=${inputListAll[0].value}&limit=${inputListAll[1].value}`;
    let urlRequest = strUrl.replace("page=1&limit=10", replaceStr);

    fetch (urlRequest)
      .then((response) => {
        const result = response.json();
        return result;
      })
      .then((data) => {
        // сохраняем картинки и значения input в localStorage
        localStorage.setItem('pictures', JSON.stringify(data));
        localStorage.setItem('page', inputListAll[0].value);
        localStorage.setItem('limit', inputListAll[1].value);

        // выводим результат
        showResult(data);
      })
      .catch(() => { console.log('error') });
  } else {
    // очищаем результат
    resultNode.innerHTML = "";
    // очищаем localStorage
    localStorage.removeItem('pictures');
    localStorage.removeItem('page');
    localStorage.removeItem('limit');
  };
});

// проверяем localStorage после загрузки страницы
window.onload = function () {
  let pictures = localStorage.getItem('pictures');
  let jsObject = JSON.parse(pictures);

  if (jsObject && jsObject.length) {
    inputListAll[0].value = localStorage.getItem('page');
    inputListAll[1].value = localStorage.getItem('limit');
    showResult(jsObject);
  }
};