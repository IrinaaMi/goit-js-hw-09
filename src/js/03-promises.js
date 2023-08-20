import Notiflix from 'notiflix';
const form = document.querySelector('.form');

function createPromise(position, delay) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const shouldResolve = Math.random() > 0.3;
            if (shouldResolve) {
                resolve({ position, delay });
            } else {
                reject({ position, delay });
            }
        }, delay);
    });
}
document.querySelector('.form').addEventListener('submit', function(evt) {
    evt.preventDefault();
    const firstDelay = parseInt(evt.target.elements.delay.value);
    const step = parseInt(evt.target.elements.step.value);
    const amount = parseInt(evt.target.elements.amount.value);

    for (let i = 0; i <= amount; i += 1) {
        const delay = firstDelay + (i - 1) * step;
        createPromise(i, delay)
            .then(({ position, delay }) => {
                Notiflix.Notify.success(
                    `✅ Fulfilled promise ${position} in ${delay}ms`
                );
            })
            .catch(({ position, delay }) => {
                Notiflix.Notify.failure(
                    `❌ Rejected promise ${position} in ${delay}ms`
                );
            });
    }
});