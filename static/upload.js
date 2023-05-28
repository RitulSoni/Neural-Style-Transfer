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

document.getElementById('upload-form').addEventListener('submit', function(e) {
    e.preventDefault();
    var formData = new FormData(this);
    fetch('/', {
        method: 'POST',
        body: formData,
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('nst-output').src = data.image_path;
        document.getElementById('nst-output').style.display = 'block';
    })
    .catch(error => console.error('Error:', error));
});

// function to display the chosen image
function loadFile(event, outputId) {
    var image = document.getElementById(outputId);
    image.src = URL.createObjectURL(event.target.files[0]);
    // Check if both files have been selected
    if (document.getElementById('style').files.length > 0 &&
        document.getElementById('content').files.length > 0) {
        // If yes, enable the "Start Transfer" button
        document.getElementById('start-transfer-btn').disabled = false;
    }
    
}
