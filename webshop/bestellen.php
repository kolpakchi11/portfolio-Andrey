<?php
session_start();
require_once __DIR__ . '/functies.php';
//  ?? = «als de waarde — is, neem het dan, zo niet, — gebruik een andere»
$cart = $_SESSION['winkelmand'] ?? [];
$producten = [];
$totaal = 0.0;

foreach ($cart as $productId => $aantal) {
    $product = vindProductById($productId);
    if ($product !== null) {
        $product['aantal'] = $aantal;
        $product['subtotaal'] = $product['prijs'] * $aantal;
        $producten[] = $product;
        $totaal += $product['subtotaal'];
    }
}
?>
<!DOCTYPE html>
<html lang="nl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bestellen</title>
    <style>
        body { font-family: Arial, sans-serif; background: #fafafa; margin: 0; }
        .container { max-width: 900px; margin: 2rem auto; padding: 1rem; }
        .kaart { background: white; border-radius: 14px; padding: 1.5rem; box-shadow: 0 8px 24px rgba(15,23,42,0.08); }
        a { color: #1d4ed8; text-decoration: none; }
        form { margin-top: 1.5rem; }
        label { display: block; margin-top: 1rem; font-weight: 600; }
        input { width: 100%; padding: 0.75rem; border: 1px solid #d1d5db; border-radius: 10px; margin-top: 0.5rem; }
        button { margin-top: 1rem; padding: 0.9rem 1.2rem; background: #111827; color: white; border: none; border-radius: 10px; cursor: pointer; }
    </style>
</head>
<body>
    <div class="container">
        <div class="kaart">
            <h1>Bestellen</h1>
            <?php if (empty($producten)): ?>
                <p>Je kunt pas bestellen nadat er producten in je winkelmand zijn geplaatst.</p>
                <p><a href="producten.php">Bekijk producten</a></p>
            <?php else: ?>
                <p>Je bestelling bevat de volgende producten:</p>
                <ul>
                    <?php foreach ($producten as $product): ?>
                        <!-- maak aangepaste invoer veilig voor HTML-uitvoer, voorkom XSS-aanvallen -->
                        <li><?= htmlspecialchars($product['naam']) ?> x <?= $product['aantal'] ?> — <?= formatPrijs($product['subtotaal']) ?></li>
                    <?php endforeach; ?>
                </ul>
                <p><strong>Totaal: <?= formatPrijs($totaal) ?></strong></p>
                <!-- het formulier verzendt gegevens naar het bestand bevestiging.php met POST-methode -->
                <form method="post" action="bevestiging.php">
                    <label for="naam">Naam</label>
                    <input id="naam" name="naam" type="text" required>  //required = veld is verplicht

                    <label for="email">E-mail</label>
                    <input id="email" name="email" type="email" required>

                    <button type="submit">Bestelling plaatsen</button>
                </form>
            <?php endif; ?>
            <!-- dit is de afsluiting van de if-voorwaarde in alternatieve syntaxis. /! -->
        </div>
    </div>
</body>
</html>
