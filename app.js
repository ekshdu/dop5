(function(){
var $=function(s){return document.querySelector(s)};
var tg=$("#menu-toggle");if(tg)tg.addEventListener("click",function(){$("#nav").classList.toggle("open")});
document.querySelectorAll(".filters button").forEach(function(b){b.addEventListener("click",function(){
 var f=b.dataset.filter;document.querySelectorAll(".item").forEach(function(i){i.hidden=!(f==="all"||i.dataset.cat===f)})})});
var cf=$("#contact-form");
if(cf)cf.addEventListener("submit",function(e){e.preventDefault();var st=$("#form-status"),err=null;
 if(!$("#name").value.trim())err="Введите имя";
 else if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test($("#email").value.trim()))err="Введите корректный email";
 else if($("#message").value.trim().length<10)err="Сообщение должно содержать не менее 10 символов";
 if(err){st.textContent=err;st.className="error";return}
 st.textContent="Спасибо! Сообщение отправлено.";st.className="success";cf.reset()});
var ord=$("#order");
if(ord){var disc=false;
 var rows=[].slice.call(ord.querySelectorAll(".row")),st=$("#order-status");
 var total=function(){var s=0;rows.forEach(function(r){s+=r.dataset.price*parseInt(r.querySelector(".qty").textContent,10)});
  return disc?Math.round(s*0.9):s};
 var upd=function(){$("#total").textContent=total()};
 rows.forEach(function(r){var q=r.querySelector(".qty");
  r.querySelector(".plus").addEventListener("click",function(){q.textContent=parseInt(q.textContent,10)+1;upd()});
  r.querySelector(".minus").addEventListener("click",function(){var n=parseInt(q.textContent,10);if(n>0)q.textContent=n-1;upd()})});
 $("#apply-promo").addEventListener("click",function(){
  if($("#promo").value.trim().toUpperCase()==="COFFEE10"){disc=true;st.textContent="Промокод применён: скидка 10%";st.className="success"}
  else{disc=false;st.textContent="Неверный промокод";st.className="error"}upd()});
 $("#clear").addEventListener("click",function(){rows.forEach(function(r){r.querySelector(".qty").textContent=0});disc=false;$("#promo").value="";st.textContent="";upd()});
 $("#checkout").addEventListener("click",function(){var t=total();
  if(t===0){st.textContent="Добавьте хотя бы одну позицию";st.className="error"}
  else{st.textContent="Заказ оформлен! Сумма: "+t+" ₽";st.className="success"}})}
})();
