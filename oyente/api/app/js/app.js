

$("form").submit(function(evt) {
    $('#results').empty()
            $('#message').empty()

    evt.preventDefault()
    return $.ajax({
    url: 'file',
    type: 'POST',
    data: new FormData($(this)[0]),
    async: true,
    cache: false,
    contentType: false,
    enctype: 'multipart/form-data',
    processData: false,
    start: $('#message').append('<p>Wait for scan to complete...</p>'),
    success: function (response) {
        $('#message').append('<p>Scan complete!</p>')
        handleResult(response)
    },
    timeout: 100000
    })

 })

function clear() {
    $('#message').empty()
    $('#results').empty()
}

function handleResult(data) {
    var msg = JSON.parse(data)
    console.log(data)
    if(msg.hasOwnProperty('success') && msg.success === true) {
        $('#results').empty()
        msg.issues.forEach((e, i) => {
            $('#results').append(findings(e, i))
        })
    }

    return
}

function findings(data, i) {
    return `
        <p>finished</p>
    `
}

{/* <h3>Finding #${i+1}</h3>
<table border="1px">
<tr><td>Type</td><td>${data.type}</td></tr>
<tr><td>Title</td><td>${data.title}</td></tr>
<tr><td>Filename</td><td>${data.filename}</td></tr>
<tr><td>Address</td><td>${data.address}</td></tr>
<tr><td>Debug</td><td>${data.debug}</td></tr>
<tr><td>Function</td><td>${data.function}</td></tr>
<tr><td>Line Number</td><td>${data.lineno}</td></tr>
<tr><td>Code</td><td>${data.code}</td></tr>
<tr><td>Description</td><td>${data.description}</td></tr>
</table> */}