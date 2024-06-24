import Toastify from 'toastify-js'


export default function showToast(text, className = 'success-toast') {
  Toastify({
    duration: 3000,
    close: true,
    gravity: "top",
    position: "right", 
    text,
    className: `toastify-custom ${className}`
  }).showToast();
}