// проверяем клик на всем экране 
window.addEventListener('click', function (event) {
    // обьявление переменной для счетчика
    let counter;
    // проверяем по кнопкам плюс и минус
if  (event.target.dataset.action === 'plus' || event.target.dataset.action === 'minus') {
//    находим див обверткус в которой див с счетчиком
    const counterWrapper = event.target.closest('.counter-wrapper');
// находим див в котором сам счетчик
     counter = counterWrapper.querySelector('[data-counter]');
}
    // проверяем является ли елемент кнопкой плюс
    if (event.target.dataset.action === 'plus'){

         counter.innerText = ++counter.innerText;
    }
    // является ли елемент кнопкой минус
    if (event.target.dataset.action === 'minus'){
       
        if (parseInt(counter.innerText) > 1) {

            counter.innerText = --counter.innerText;
        }
    }
});