apiURL = 'http://sitename.com/wp-json';
function query_rest_api(inpID) {
    let tryCount = 0;
    $.ajax({
        url: apiURL + '/domain/v1/command/' + inpID,
        success: function (post) {
            console.log(post);
        },
        error: function (xhr, textStatus, errorThrown) {
            if (textStatus == 'timeout') {
                tryCount++;
                let retryLimit = 10;
                if (tryCount <= retryLimit) {
                    //try again
                    $.ajax(this);
                    return;
                } else {
                    console.log(xhr.responseText);
                    retryLimit = 0;
                }
                return;
            }
            if (xhr.status == 500) {
                tryCount++;
                let retryLimit = 10;
                if (tryCount <= retryLimit) {
                    //try again
                    $.ajax(this);
                    return;
                } else {
                    console.log(xhr.responseText);
                    retryLimit = 0;
                }
                return;
            } else {
                console.log('Error: ', xhr.responseText);
            }
        }
    });
}
