function load(url, parent, template) {
    $.ajax({
        url: url,
        dataType: "JSON",
        method: "GET",
        success: function(data) {
            $.each(data, (i, row) => {
                let temp = $(template).html();

                $.each(row, (key, value) => {
                    temp = temp.replace("{{" + key + "}}", value);
                });

                $(parent).append(temp);
            });
        }
    });
}

$(function() {
    display(
        '/homepage/assets/cards.json',
        '#cards',
        '#cards-template'
    );
});
