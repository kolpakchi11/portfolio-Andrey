<?php
?>
<!DOCTYPE html>
<html lang="nl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Webshop Home</title>
    <style>
        body {
            margin: 0;
            font-family: Arial, sans-serif;
            background: #f4f4f4;
            color: #111;
        }
        .container {
            max-width: 900px;
            margin: 0 auto;
            padding: 2rem;
        }
        .card {
            background: white;
            border-radius: 12px;
            box-shadow: 0 14px 40px rgba(0,0,0,0.08);
            padding: 2rem;
        }
        h1 {
            margin-bottom: 1rem;
        }
        .links {
            display: grid;
            gap: 1rem;
            margin-top: 1.5rem;
        }
        .links a {
            text-decoration: none;
            background: #1155cc;
            color: white;
            padding: 0.9rem 1.2rem;
            border-radius: 8px;
            display: inline-block;
            width: fit-content;
        }
    </style>
</head>
<body>
    <main class="container">
        <div class="card">
            <h1>Webshop Auto Thema</h1>
            <p>Welkom bij de webshop met een thema rond premium auto-accessoires en modelauto's.</p>
            <div class="links">
                <a href="producten.php">Bekijk producten</a>
                <a href="winkelmand.php">Ga naar winkelmand</a>
                <a href="bestellen.php">Bestellen</a>
                <a href="login.php">Admin login</a>
            </div>
        </div>
    </main>
</body>
</html>
