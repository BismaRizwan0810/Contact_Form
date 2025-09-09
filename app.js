const form = document.getElementById('contact-form');
const submitBtn = document.getElementById('submit-btn');
const successEl = document.getElementById('sucessnote'); 


successEl.style.display = "none";


function setError(fieldEl, message){
  const wrap = fieldEl.closest('[data-field]');
  if(!wrap) return;
  const err = wrap.querySelector('.error');
  wrap.classList.add('invalid');
  if(err) err.textContent = message || 'This field is required';
}


function clearError(fieldEl){
  const wrap = fieldEl.closest('[data-field]');
  if(!wrap) return;
  const err = wrap.querySelector('.error');
  wrap.classList.remove('invalid');
  if(err) err.textContent = '';
}


function isValidEmail(v){
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);
}


function validateField(el){
  const id = el.id;
  const v = el.value.trim();

  if(id === 'name'){
    if(v.length < 2) return setError(el, 'Please enter your full name');
  }
  if(id === 'email'){
    if(!isValidEmail(v)) return setError(el, 'Enter a valid email (e.g. you@example.com)');
  }
  if(id === 'subject'){  
    if(v.length < 3) return setError(el, 'Subject must be at least 3 characters');
  }
  if(id === 'message'){
    if(v.length < 10) return setError(el, 'Message must be at least 10 characters');
  }
  clearError(el);
}


['input','blur'].forEach(evt=>{
  form.addEventListener(evt, (e)=>{
    const t = e.target;
    if(t.matches('input, textarea')) validateField(t);
  }, true);
});


form.addEventListener('submit', (e)=>{
  e.preventDefault();

  successEl.style.display = "none";

  const fields = [...form.querySelectorAll('input, textarea')];
  fields.forEach(validateField);


  if(form.querySelector('.invalid')) return;

  
  submitBtn.disabled = true;
  submitBtn.textContent = 'Sending…';

  setTimeout(()=>{
    submitBtn.disabled = false;
    submitBtn.textContent = 'SEND MESSAGE';
    form.reset();
    successEl.style.display = "block"; 
   
    setTimeout(()=>{
      successEl.style.display = "none";
    }, 4000);

    console.log('Form sent successfully ');
  }, 700);
});

  