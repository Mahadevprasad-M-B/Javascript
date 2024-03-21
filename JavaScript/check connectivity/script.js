let title = document.querySelector('.title');
let ul = document.querySelector('ul');
let reload = document.querySelector('reload');

window.addEventListener('online',function(){
  onLine();
})
window.addEventListener('offline',function(){
  offLine();
})

reload.onclick = function(){
  window.location.reload();
} 
function onLine(){
  title.innerHTML='Online Now';
  title.style.color='green';
  ul.classList.add('hide');
  reload.classList.add('hide');
}
function offLine(){
  title.innerHTML='Offline Now';
  title.style.color='red';
  ul.classList.add('hide');
  reload.classList.add('hide');
}