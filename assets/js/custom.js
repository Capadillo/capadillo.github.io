// --------------------------------------------------
// Flash Message
// --------------------------------------------------

function flashMessage(message) {
    // var offset = $("#flash")[0].getBoundingClientRect();

    $("#flash").html(message);

    $("#flash").fadeIn(function() {
        setTimeout(function() { $("#flash").fadeOut(); }, 1250);
    });
}

// --------------------------------------------------
// Cookie Management
// --------------------------------------------------

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

// --------------------------------------------------
// AJAX File Loader
// --------------------------------------------------

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

// --------------------------------------------------
// Display Functions
// --------------------------------------------------

function displayLinks(statusCode, data) {
    const sortedData = $.each(data, (i, row) => {
        data[i]['clicks'] = Number(get_cookie(`link${row.id}`) ?? 0);
    }).sort((a, b) => b.clicks - a.clicks || Number(a.id) - Number(b.id));

    $('#order').text(JSON.stringify(sortedData, null, 2));

    $.each(sortedData, (i, row) => {
        let temp = $((i < 8 ? '#cards-template' : '#links-template')).html();

        $.each(row, (key, value) => {
            temp = temp.replace("{{" + key + "}}", value);
        });

        $((i < 8 ? '#cards' : '#links')).append(temp);
    });
}

function displayError(statusText, exception) {
    flashMessage(statusText + ": " + exception);
}

// --------------------------------------------------
// Events
// --------------------------------------------------

$(() => {
    load('./assets/data/links.json', displayLinks, displayError);
});

$(document).ajaxStop(function() {
    $("a").on("click", function(e) {
        let id = this.id;
        let cookie = Number(get_cookie(`link${id}`) ?? 0);
        set_cookie(`link${id}`, ++cookie);
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

    flashMessage('Cookies deleted!');
});