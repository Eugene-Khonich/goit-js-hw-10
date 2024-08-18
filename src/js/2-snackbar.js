import iziToast from 'izitoast';

const form = document.querySelector('.form');

form.addEventListener('submit', onSubmitBtn);

function onSubmitBtn(e) {
  e.preventDefault();
  const delay = Number(e.target.elements.delay.value.trim());
  const result = e.target.elements.state.value === 'fulfilled' ? true : false;
  const promise = promiseGenerate(delay, result);
  promise
    .then(value => {
      iziToast.success({
        title: `✅ Fulfilled promise in ${value}ms`,
        position: 'topRight',
      });
    })
    .catch(err => {
      iziToast.error({
        title: `❌ Rejected promise in ${err}ms`,
        position: 'topRight',
      });
    });
  e.target.reset();
}

function promiseGenerate(delay, result) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (result) {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });
}
