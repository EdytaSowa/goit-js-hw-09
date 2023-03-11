import Notiflix from 'notiflix';

const createBtn = document.querySelector('button');
const userDelay = document.querySelector('input[name="delay"]');
const userStep = document.querySelector('input[name="step"]');
const userAmount = document.querySelector('input[name="amount"]');



const createPromise = (position, delay) => {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
  return promise;
};

createBtn.addEventListener('click', event => {
  event.preventDefault();

  const firstDelay = Number(userDelay.value);

  const delayStep = Number(userStep.value);

  const amount = Number(userAmount.value);

  for (let i = 1; i <= amount; i++) {
    const totalTime = firstDelay + delayStep * (i - 1);

    createPromise(i, totalTime)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay} ms`
        );
      })

      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay} ms`
        );
      });
  }
});