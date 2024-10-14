let emailArray = [];

function addEmail() {
    const emailInput = document.getElementById('emailInput');
    const emailList = document.getElementById('emailList');
    const email = emailInput.value.trim();

    if (email && !emailArray.includes(email)) {
        emailArray.push(email);
        
        const li = document.createElement('li');
        li.className = 'list-group-item d-flex justify-content-between align-items-center';
        li.textContent = email;

        const removeBtn = document.createElement('button');
        removeBtn.className = 'btn btn-danger btn-sm';
        removeBtn.textContent = 'Remove';
        removeBtn.onclick = function() {
            li.remove();
            emailArray = emailArray.filter(e => e !== email);
            updateEmailOutput();
        };

        li.appendChild(removeBtn);
        emailList.appendChild(li);
        
        emailInput.value = '';
        updateEmailOutput();
    }
}

function updateEmailOutput() {
    const emailOutput = document.getElementById('emails');
    emailOutput.value = emailArray.join(',');
}
