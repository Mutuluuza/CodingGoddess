window.onload= function(){
    const buttons = document.querySelectorAll('button');
      
    for(let i = 0; i < buttons.length; i++) {
      addHandler(buttons[i]);
    }
    
    function addHandler(button) {
      button.addEventListener('click', function(e) {
        let message = e.target.getAttribute('data-message');
        alert(message);
      })
    }  
}