<?php
session_start();

if (empty($_SESSION['is_admin'])) {
    header('Location: login.php');
    exit;
}

require_once __DIR__ . '/functies.php';

$orders = [];
$ordersFile = __DIR__ . '/data/bestellingen.csv';

if (file_exists($ordersFile)) {
    $handle = fopen($ordersFile, 'r');
    if ($handle !== false) {
        $header = fgetcsv($handle);
        while (($row = fgetcsv($handle)) !== false) {
            if (count($row) < 5) {
                continue;
            }
            $orders[] = [
                'id' => $row[0],
                'product_id' => $row[1],
                'aantal' => $row[2],
                'klantnaam' => $row[3],
                'datum' => $row[4],
            ];
        }
        fclose($handle);
    }
}

$allProducts = leesProducten();
?>
<!DOCTYPE html>
<html lang="nl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin</title>
    <style>
        body { font-family: Arial, sans-serif; background: #f1f5f9; margin: 0; }
        .container { max-width: 960px; margin: 2rem auto; padding: 1rem; }
        .kaart { background: white; border-radius: 14px; padding: 1.5rem; box-shadow: 0 8px 24px rgba(15,23,42,0.08); }
        .links { margin-bottom: 1.5rem; }
        .links a { color: #1d4ed8; text-decoration: none; margin-right: 1.2rem; }
        table { width: 100%; border-collapse: collapse; margin-top: 1rem; }
        th, td { padding: 0.9rem; border: 1px solid #e5e7eb; text-align: left; }
        th { background: #f8fafc; }
        .empty { font-style: italic; color: #6b7280; }
        .section { margin-top: 2rem; }
    </style>
</head>
<body>
    <div class="container">
        <div class="kaart">
            <div class="links">
                <a href="index.php">Home</a>
                <a href="producten.php">Producten</a>
                <a href="logout.php">Uitloggen</a>
            </div>
            <h1>Admin dashboard</h1>
            <p>Je bent ingelogd als admin. Hier kun je bestellingen en producten bekijken.</p>

            <div class="section">
                <h2>Bestellingen</h2>
                <?php if (empty($orders)): ?>
                    <p class="empty">Er zijn nog geen bestellingen.</p>
                <?php else: ?>
                    <table>
                        <thead>
                            <tr>
                                <th>Order ID</th>
                                <th>Product</th>
                                <th>Aantal</th>
                                <th>Klantnaam</th>
                                <th>Datum</th>
                            </tr>
                        </thead>
                        <tbody>
                            <?php foreach ($orders as $order): ?>
                                <?php $product = vindProductById($order['product_id']); ?>
                                <tr>
                                    <td><?= htmlspecialchars($order['id']) ?></td>
                                    <td><?= htmlspecialchars($product['naam'] ?? 'Onbekend') ?></td>
                                    <td><?= htmlspecialchars($order['aantal']) ?></td>
                                    <td><?= htmlspecialchars($order['klantnaam']) ?></td>
                                    <td><?= htmlspecialchars($order['datum']) ?></td>
                                </tr>
                            <?php endforeach; ?>
                        </tbody>
                    </table>
                <?php endif; ?>
            </div>

            <div class="section">
                <h2>Producten</h2>
                <?php if (empty($allProducts)): ?>
                    <p class="empty">Er zijn nog geen producten geladen.</p>
                <?php else: ?>
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Naam</th>
                                <th>Prijs</th>
                                <th>Afbeelding</th>
                            </tr>
                        </thead>
                        <tbody>
                            <?php foreach ($allProducts as $product): ?>
                                <tr>
                                    <td><?= htmlspecialchars($product['id']) ?></td>
                                    <td><?= htmlspecialchars($product['naam']) ?></td>
                                    <td><?= formatPrijs($product['prijs']) ?></td>
                                    <td><?= htmlspecialchars($product['afbeelding']) ?></td>
                                </tr>
                            <?php endforeach; ?>
                        </tbody>
                    </table>
                <?php endif; ?>
            </div>
        </div>
    </div>
</body>
</html>
