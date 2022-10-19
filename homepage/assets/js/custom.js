class JSONDataFile {
    constructor(options) {
        this.gateway  = options.gateway  || '';
        this.file     = options.file     || '';
        this.parent   = options.parent   || '';
        this.template = options.template || '';
        this.data     = [];
        this.load();
    }

    display() {
        $.each(this.data, (i, row) => {
            let template = $(this.template).html();

            $.each(row, (key, value) => {
                template = template.replace("{{" + key + "}}", value);
            });

            $(this.parent).append(template);
        });
    }

    add(alt, img, url) {
        this.data.push({
            "alt": alt,
            "img": img,
            "url": url
        });

        this.save();
    }

    load() {
        $.ajax({
            url: this.gateway,
            data: {
                file: this.file
            },
            dataType: "JSON",
            method: "GET",
            success: (data) => {
                this.data = data;
                this.display();
            }
        });
    }

    save() {
        $.ajax({
            url: this.gateway,
            data: {
                file: this.file,
                data: this.data

            },
            dataType: "JSON",
            method: "POST",
            success: (data) => {
                alert("Saved Data");
            }
        });
    }
}

$(function() {
    let cards = new JSONDataFile({
        gateway:  '/assets/data/gateway.php',
        file:     '/json/cards.json',
        parent:   '#cards',
        template: '#cards-template'
    });
});
