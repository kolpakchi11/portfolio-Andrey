<?php
session_start();
require_once __DIR__ . '/functies.php';

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

$errors = [];
$success = false;
$orderSummary = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $naam = trim($_POST['naam'] ?? '');
    $email = trim($_POST['email'] ?? '');

    if ($naam === '' || $email === '') {
        $errors[] = 'Vul je naam en e-mailadres in om te bestellen.';
    } elseif (empty($producten)) {
        $errors[] = 'Je winkelmand is leeg. Voeg eerst producten toe.';
    } else {
        $ordersFile = __DIR__ . '/data/bestellingen.csv';
        $writeHeader = !file_exists($ordersFile) || filesize($ordersFile) === 0;

        $handle = fopen($ordersFile, 'a');
        if ($handle !== false) {
            if ($writeHeader) {
                fputcsv($handle, ['id', 'product_id', 'aantal', 'klantnaam', 'datum']);
            }

            $orderId = time();
            $datum = date('Y-m-d H:i:s');
            foreach ($producten as $product) {
                fputcsv($handle, [$orderId, $product['id'], $product['aantal'], $naam, $datum]);
            }
            fclose($handle);

            $success = true;
            $orderSummary = sprintf('Bedankt %s! Je bestelling van %s is geplaatst.', htmlspecialchars($naam), formatPrijs($totaal));
            unset($_SESSION['winkelmand']);
        } else {
            $errors[] = 'Kan het bestellingenbestand niet openen. Probeer het later opnieuw.';
        }
    }
}
?>
<!DOCTYPE html>
<html lang="nl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bevestiging</title>
    <style>
        body { font-family: Arial, sans-serif; background: #f8fafc; margin: 0; }
        .container { max-width: 900px; margin: 2rem auto; padding: 1rem; }
        .kaart { background: white; border-radius: 14px; padding: 1.5rem; box-shadow: 0 8px 24px rgba(15,23,42,0.08); }
        .error { background: #fee2e2; color: #991b1b; padding: 0.75rem 1rem; border-radius: 10px; margin-bottom: 1rem; }
        .success { background: #d1fae5; color: #065f46; padding: 0.75rem 1rem; border-radius: 10px; margin-bottom: 1rem; }
        ul { list-style: none; padding-left: 0; }
        li { margin-bottom: 0.5rem; }
        a { color: #1d4ed8; text-decoration: none; }
    </style>
</head>
<body>
    <div class="container">
        <div class="kaart">
            <?php if ($success): ?>
                <h1>Bedankt voor je bestelling!</h1>
                <div class="success"><?= $orderSummary ?></div>
                <p><a href="producten.php">Terug naar producten</a></p>
            <?php else: ?>
                <h1>Bevestiging</h1>
                <?php if (!empty($errors)): ?>
                    <?php foreach ($errors as $error): ?>
                        <div class="error"><?= htmlspecialchars($error) ?></div>
                    <?php endforeach; ?>
                <?php endif; ?>
                <p>Controleer je bestelling en vul je gegevens in.</p>
                <ul>
                    <?php foreach ($producten as $product): ?>
                        <li><?= htmlspecialchars($product['naam']) ?> x <?= $product['aantal'] ?> — <?= formatPrijs($product['subtotaal']) ?></li>
                    <?php endforeach; ?>
                </ul>
                <p><strong>Totaal: <?= formatPrijs($totaal) ?></strong></p>
                <p><a href="bestellen.php">Terug naar bestellen</a></p>
            <?php endif; ?>
        </div>
    </div>
</body>
</html>
 <!-- trim() wordt gebruikt om eventuele extra spaties aan het begin of einde van de naam en e-mail te verwijderen, zodat er geen onbedoelde lege tekens worden opgeslagen. */ -->