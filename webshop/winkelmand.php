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
?>
<!DOCTYPE html>
<html lang="nl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Winkelmand</title>
    <style>
        body { font-family: Arial, sans-serif; background: #f4f4f4; margin: 0; }
        .container { max-width: 900px; margin: 2rem auto; padding: 1rem; }
        .kaart { background: white; border-radius: 14px; padding: 1.5rem; box-shadow: 0 8px 24px rgba(15,23,42,0.08); }
        a { color: #1d4ed8; text-decoration: none; }
    </style>
</head>
<body>
    <div class="container">
        <div class="kaart">
            <h1>Winkelmand</h1>
            <?php if (empty($producten)): ?>
                <p>Je winkelmand is nog leeg. Ga naar <a href="producten.php">Producten</a> om producten te bekijken.</p>
            <?php else: ?>
                <table style="width:100%; border-collapse: collapse;">
                    <thead>
                        <tr>
                            <th style="border-bottom:1px solid #d1d5db; padding:0.75rem; text-align:left;">Product</th>
                            <th style="border-bottom:1px solid #d1d5db; padding:0.75rem; text-align:right;">Aantal</th>
                            <th style="border-bottom:1px solid #d1d5db; padding:0.75rem; text-align:right;">Prijs</th>
                            <th style="border-bottom:1px solid #d1d5db; padding:0.75rem; text-align:right;">Subtotaal</th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php foreach ($producten as $product): ?>
                            <tr>
                                <td style="padding:0.75rem; border-bottom:1px solid #e5e7eb;"><?= htmlspecialchars($product['naam']) ?></td>
                                <td style="padding:0.75rem; border-bottom:1px solid #e5e7eb; text-align:right;"><?= $product['aantal'] ?></td>
                                <td style="padding:0.75rem; border-bottom:1px solid #e5e7eb; text-align:right;"><?= formatPrijs($product['prijs']) ?></td>
                                <td style="padding:0.75rem; border-bottom:1px solid #e5e7eb; text-align:right;"><?= formatPrijs($product['subtotaal']) ?></td>
                            </tr>
                        <?php endforeach; ?>
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colspan="3" style="padding:0.75rem; text-align:right; font-weight:700;">Totaal</td>
                            <td style="padding:0.75rem; text-align:right; font-weight:700;"><?= formatPrijs($totaal) ?></td>
                        </tr>
                    </tfoot>
                </table>
                <p style="margin-top:1rem;"><a href="bestellen.php">Ga door naar bestellen</a></p>
            <?php endif; ?>
        </div>
    </div>
</body>
</html>
