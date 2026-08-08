
// Find the required buttons by their data attributes.
const btnminus = document.querySelector('[data-action="minus"]');

const btnplus = document.querySelector('[data-action="plus"]');

const counter = document.querySelector('[data-counter]');

// Decrease the value while keeping the minimum quantity at one.

btnminus.addEventListener(
    'click', function() { 
    
        if ( parseInt(counter.innerText) > 1 ) {
        counter.innerText = --counter.innerText;
    }
    });

    // Increase the counter value.

btnplus.addEventListener('click', function() { 
       
        counter.innerText = ++counter.innerText;

    });
