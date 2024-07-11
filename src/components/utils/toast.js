import Toastify from 'toastify-js'

function showToast(text, className) {
  Toastify({
    duration: 4000,
    close: true,
    gravity: "top",
    position: "right", 
    text,
    className: `toastify-custom ${className}`
  }).showToast();
}

export function showSuccessToast(text) {
  showToast(text, 'success-toast');
}

export function showErrorToast(err) {
  let errCustomMessage = err?.response?.data?.message;
  let errorText = errCustomMessage ? errCustomMessage : err.message

  console.log(errorText);
  showToast(errorText, 'error-toast');
}