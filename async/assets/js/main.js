// --------------------------------------------------
// Load Function
// --------------------------------------------------

async function load(data) {
    try {
        const response = await fetch(data.url, data.options);

        if (!response.ok) {
            throw new Error(`HTTP Status Code ${response.status}`);
        }

        const json = await response.json();

        return json;
    } catch(error) {
        console.error(`[Request Error] ${error}`);
    }
}

// --------------------------------------------------
// Load Cards
// --------------------------------------------------

const cards_data = {
    url: "/async/gateway.php",
    options: {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            method: 'GET',
            file: './assets/data/cards.json'
        })
    }
};

const cards = load(cards_data).then((data) => {
    $.each(data, (index, card) => {
        let tpl = $('#cards-template').html();

        $.each(card, (key, value) => {
            tpl = tpl.replace("{{" + key + "}}", value);
        });

        $('#cards').append(tpl);
    });
});
