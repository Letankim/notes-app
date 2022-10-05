function toast({
    title = '',
    message = '',
    type = '',
    duration = 3000
}) {
    const main = document.getElementById('toast');
    
    if(main) {
        const toast = document.createElement('div');
        const delay = (duration / 1000).toFixed(2);
        toast.style.animation =`slideToastMessage 0.2s ease, fadeOut linear 1s ${delay}s forwards`;
        const IDtoastDuration = setTimeout(function () {
            main.removeChild(toast);
        }, duration + 1000);
    
        toast.onclick = function(e) {
            if(e.target.closest('.toast__close')) {
               main.removeChild(toast);
               clearTimeout(IDtoastDuration);
            };
        };
        const icons = {
            success: 'fas fa-check-circle',
            error: 'fas fa-exclamation-circle'
        };
        toast.classList.add('toast');
        toast.classList.add('toast', `toast__${type}`);
        toast.innerHTML = `
            <div class="toast__icon">
            <i class="${icons[type]}"></i>
            </div>
            <div class="toast__body">
                <h3 class="toast__body--title">${title}</h3>
                <p class="toast__body--conttent">
                ${message}
                </p>
            </div>
            <div class="toast__close">
            <i class="fas fa-times"></i>
            </div>
        `
        main.appendChild(toast);
    };
};
// show message when success or error
function showSuccess() {
    toast({
        title: 'Successfully',
        message: 'The note has been created in your list notes below.',
        type: 'success', 
        duration: 1000
    });
};
function showError() {
    toast({
        title: 'Error',
        message: 'Title and notes details can not be empty. Please double check your notes!!',
        type: 'error', 
        duration: 3000
    });
};
