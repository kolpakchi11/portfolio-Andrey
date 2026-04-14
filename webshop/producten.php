<?php
session_start();
require_once __DIR__ . '/functies.php';

$producten = leesProducten();
$melding = null;

if (isset($_GET['toevoegen'])) {
    $productId = $_GET['toevoegen'];
    $product = vindProductById($productId);

    if ($product !== null) {
        if (!isset($_SESSION['winkelmand'])) {
            $_SESSION['winkelmand'] = [];
        }

        if (!isset($_SESSION['winkelmand'][$productId])) {
            $_SESSION['winkelmand'][$productId] = 0;
        }

        $_SESSION['winkelmand'][$productId]++;
        $melding = 'Product toegevoegd: ' . htmlspecialchars($product['naam']);
    } else {
        $melding = 'Product niet gevonden.';
    }
}
?>
<!DOCTYPE html>
<html lang="nl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Producten - Webshop Auto Thema</title>
    <style>
        body {
            margin: 0;
            font-family: Arial, sans-serif;
            background: #f1f3f6;
            color: #1f2937;
        }
        header {
            background: #111827;
            color: white;
            padding: 1.2rem 2rem;
        }
        header h1 {
            margin: 0;
            font-size: 1.8rem;
        }
        .container {
            max-width: 1080px;
            margin: 2rem auto;
            padding: 0 1.5rem;
        }
        .nav-links {
            margin: 1rem 0 2rem;
            display: flex;
            gap: 1rem;
            flex-wrap: wrap;
        }
        .nav-links a {
            color: #111827;
            text-decoration: none;
            background: white;
            border: 1px solid #d1d5db;
            padding: 0.75rem 1rem;
            border-radius: 8px;
        }
        .productenlijst {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
            gap: 1.5rem;
        }
        .product-kaart {
            background: white;
            border: 1px solid #d1d5db;
            border-radius: 16px;
            overflow: hidden;
            display: flex;
            flex-direction: column;
        }
        .product-kaart img,
        .geen-afbeelding {
            width: 100%;
            height: 200px;
            object-fit: cover;
            background: #e5e7eb;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .kaart-inhoud {
            padding: 1rem;
            display: flex;
            flex-direction: column;
            gap: 0.75rem;
            flex: 1;
        }
        .product-naam {
            font-size: 1.1rem;
            font-weight: 700;
            margin: 0;
        }
        .product-prijs {
            font-size: 1.25rem;
            color: #dc2626;
            margin: 0;
        }
        .btn-winkelmand {
            margin-top: auto;
            padding: 0.8rem 1rem;
            background: #111827;
            color: white;
            border: none;
            border-radius: 10px;
            cursor: pointer;
            opacity: 1;
            transition: background 0.2s ease;
        }

        .btn-winkelmand:hover {
            background: #1f2937;
        }
        .leeg-melding {
            padding: 1.5rem;
            background: white;
            border: 1px solid #d1d5db;
            border-radius: 12px;
            text-align: center;
        }
    </style>
</head>
<body>
<header>
    <h1>Auto Webshop - Producten</h1>
</header>
<main class="container">
    <div class="nav-links">
        <a href="index.php">Home</a>
        <a href="winkelmand.php">Winkelmand</a>
        <a href="bestellen.php">Bestellen</a>
    </div>

    <?php if ($melding !== null): ?>
        <div class="melding" style="margin-bottom:1rem; padding:1rem; background:#d1fae5; border:1px solid #34d399; border-radius:12px; color:#065f46;">
            <?= htmlspecialchars($melding) ?>
        </div>
    <?php endif; ?>

    <?php if (empty($producten)): ?>
        <div class="leeg-melding">
            <p>Er zijn nog geen producten beschikbaar.</p>
        </div>
    <?php else: ?>
        <div class="productenlijst">
            <?php foreach ($producten as $product): ?>
                <div class="product-kaart">
                    <?php $afbeeldingsPad = __DIR__ . '/images/' . $product['afbeelding']; ?>
                    <?php if (file_exists($afbeeldingsPad)): ?>
                        <img src="images/<?= htmlspecialchars($product['afbeelding']) ?>" alt="<?= htmlspecialchars($product['naam']) ?>">
                    <?php else: ?>
                        <div class="geen-afbeelding">Geen afbeelding</div>
                    <?php endif; ?>
                    <div class="kaart-inhoud">
                        <p class="product-naam"><?= htmlspecialchars($product['naam']) ?></p>
                        <p class="product-prijs"><?= formatPrijs($product['prijs']) ?></p>
                        <form method="get">
                            <input type="hidden" name="toevoegen" value="<?= htmlspecialchars($product['id']) ?>">
                            <button class="btn-winkelmand" type="submit">Toevoegen aan winkelmand</button>
                        </form>
                    </div>
                </div>
            <?php endforeach; ?>
        </div>
    <?php endif; ?>
</main>
</body>
</html>
