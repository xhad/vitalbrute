$(document).ready(
    $("form").submit(function(evt) {
        evt.preventDefault();
        var formData = new FormData($(this)[0]);
        $.ajax({
            url: 'file',
            type: 'POST',
            data: formData,
            async: false,
            cache: false,
            contentType: false,
            enctype: 'multipart/form-data',
            processData: false,
            success: function (response) {
                handleResult(response)
            },
            complete: function() {
                return
            }
        })
    })
);



function handleResult(data) {
    var msg = JSON.parse(data)
    if(msg.hasOwnProperty('success') && msg.success === true) {
        $('#results').empty()
        $('#message').empty()
        msg.issues.forEach(e => {
            $('#results').append(findings(e))
        })
    }
}

function findings(data) {
    return `
        <table border="1px">
        <tr><td>Type</td><td>${data.type}</td></tr>
        <tr><td>Title</td><td>${data.title}</td></tr>
        <tr><td>Filename</td><td>${data.filename}</td></tr>
        <tr><td>Address</td><td>${data.address}</td></tr>
        <tr><td>Debug</td><td>${data.debug}</td></tr>
        <tr><td>Funtion</td><td>${data.function}</td></tr>
        <tr><td>Line Number</td><td>${data.lineno}</td></tr>
        <tr><td>Code</td><td>${data.code}</td></tr>
        <tr><td>Description</td><td>${data.description}</td></tr>
        </table>
        <hr />
    `
}

