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

function displayCards(statusCode, data) {
    let parent   = '#cards';
    let template = '#cards-template';

    $.each(data, (i, row) => {
        let temp = $(template).html();

        $.each(row, (key, value) => {
            temp = temp.replace("{{" + key + "}}", value);
        });

        $(parent).append(temp);
    });
}

function displayLinks(statusCode, data) {
    let parent   = '#links';
    let template = '#links-template';

    $.each(data, (i, row) => {
        let temp = $(template).html();

        $.each(row, (key, value) => {
            temp = temp.replace("{{" + key + "}}", value);
        });

        $(parent).append(temp);
    });
}

function displayError(statusText, exception) {
    console.error(statusText + ": " + exception);
}

$(() => {
    load('./assets/data/cards.json', displayCards, displayError);
    load('./assets/data/links.json', displayLinks, displayError);
});

// $(document).ajaxStop(function() {
//     $( "a" ).on( "click", function(e) {
//         console.log(this.attr('href'));
//     });
// });
