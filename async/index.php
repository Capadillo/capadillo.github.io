<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Async Testing</title>
    </head>
    <body>
        <main class="container gallery" id="cards">
            <script type="text/template" id="cards-template">
                <a class="card" target="_top" href="{{url}}">
                    <img src="{{img}}" alt="{{alt}}">
                </a>
            </script>
        </main>

        <script src="https://code.jquery.com/jquery-3.6.1.min.js" integrity="sha256-o88AwQnZB+VDvE9tvIXrMQaPlFFSUTR+nldQm1LuPXQ=" crossorigin="anonymous"></script>
        <script src="/async/assets/js/main.js"></script>
    </body>
</html>
