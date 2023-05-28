function preventDefaults(e) {
    e.preventDefault();
    e.stopPropagation();
}

function highlight(e) {
    this.classList.add('highlight');
}

function unhighlight(e) {
    this.classList.remove('highlight');
}

['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    document.querySelectorAll('.upload-area').forEach(uploadArea => {
        uploadArea.addEventListener(eventName, preventDefaults, false);
        switch(eventName) {
            case 'dragenter':
            case 'dragover':
                uploadArea.addEventListener(eventName, highlight, false);
                break;
            case 'dragleave':
            case 'drop':
                uploadArea.addEventListener(eventName, unhighlight, false);
                break;
        }
    });
});

document.querySelectorAll('.upload-area').forEach(uploadArea => {
    uploadArea.addEventListener('drop', e => {
        let dt = e.dataTransfer;
        let files = dt.files;

        let inputElement = uploadArea.querySelector('input[type="file"]');
        inputElement.files = files;
    });
});

document.getElementById('upload-form').addEventListener('submit', () => {
    document.querySelector('.progress').style.display = 'block';
});

// function to display the chosen image
function loadFile(event, outputId) {
    var image = document.getElementById(outputId);
    image.src = URL.createObjectURL(event.target.files[0]);
}
