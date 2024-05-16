function get_cookies() {
    let output = [];

    document.cookie
        .split(";")
        .map((s) => s.trim().split("="))
        .map((s) => output[s[0]] = s[1]);

    return output;
}

function get_cookie(key) {
    return document.cookie
        .split("; ")
        .find((row) => row.startsWith(`${key}=`))
        ?.split("=")[1];
}

function set_cookie(key, value) {
    document.cookie = `${key}=${value}`;
}

function load(url, onSuccess, onError) {
    $.ajax({
        url: url,
        dataType: "JSON",
        method: "GET",
        success: (data, statusCode, jqXHR) => {
            if (typeof(onSuccess) === 'function') {
                onSuccess(statusCode, data);
            }
        },
        error: function(jqXHR, statusText, exception) {
            if (typeof(onError) === 'function') {
                onError(statusText, exception);
            }
        }
    });
}

function displayLinks(statusCode, data) {
    const sortedData = $.each(data, (i, row) => {
        data[i]['clicks'] = Number(get_cookie(`link${row.id}`) ?? 0);
    }).sort((a, b) => b.clicks - a.clicks);

    $.each(sortedData, (i, row) => {
        let temp = $((i < 8 ? '#cards-template' : '#links-template')).html();

        $.each(row, (key, value) => {
            temp = temp.replace("{{" + key + "}}", value);
        });

        $((i < 8 ? '#cards' : '#links')).append(temp);
    });
}

function displayError(statusText, exception) {
    console.error(statusText + ": " + exception);
}

$(() => {
    load('./assets/data/links.json', displayLinks, displayError);
});

$(document).ajaxStop(function() {
    $("a").on("mouseup touchend", function(e) {
        let id = this.id;
        let cookie = Number(get_cookie(`link${id}`) ?? 0);
        set_cookie(`link${id}`, ++cookie);
        console.log(get_cookies());
    });
});

$("#deleteAll").on('click', function() {
    const cookies = document.cookie.split(";");

    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i];
        const eqPos = cookie.indexOf("=");
        const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }

    console.log("-- Cookies deleted! --")
});