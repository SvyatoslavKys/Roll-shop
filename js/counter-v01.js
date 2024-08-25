
// определяем по атрибуту тега нужную кнопку
const btnminus = document.querySelector('[data-action="minus"]');

const btnplus = document.querySelector('[data-action="plus"]');

const counter = document.querySelector('[data-counter]');

// по кнопке минус отнимаем одно значение и в функциии (if ( parseInt(counter.innerText) > 1 )) определяем строку как число и проодим сравнение

btnminus.addEventListener(
    'click', function() { 
    
        if ( parseInt(counter.innerText) > 1 ) {
        counter.innerText = --counter.innerText;
    }
    });

    // по кнопке плюс добавляем значение в тег  с значением   counter

btnplus.addEventListener('click', function() { 
       
        counter.innerText = ++counter.innerText;

    });