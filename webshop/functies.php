<?php

/**
 * Leest alle producten uit het CSV-bestand en geeft een array terug.
 *
 * @return array Een array met associatieve arrays per product.
 */
function leesProducten(): array
{
    $producten = [];
    $pad = __DIR__ . '/data/producten.csv';

    if (!file_exists($pad)) {
        return $producten;
    }

    $bestand = fopen($pad, 'r');
    if ($bestand === false) {
        return $producten;
    }

    fgetcsv($bestand);

    while (($data = fgetcsv($bestand)) !== false) {
        if (count($data) < 4) {
            continue;
        }

        $producten[] = [
            'id'         => $data[0],
            'naam'       => $data[1],
            'prijs'      => (float) $data[2],
            'afbeelding' => $data[3],
        ];
    }

    fclose($bestand);

    return $producten;
}

function vindProductById(string $id): ?array
{
    foreach (leesProducten() as $product) {
        if ($product['id'] === $id) {
            return $product;
        }
    }

    return null;
}

function formatPrijs(float $prijs): string
{
    return '€ ' . number_format($prijs, 2, ',', '.');
}
