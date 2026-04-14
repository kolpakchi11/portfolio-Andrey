<?php
session_start();

if (!empty($_SESSION['is_admin'])) {
    header('Location: admin.php');
    exit;
}

$errors = [];
$username = '';
$successMessage = null;

if (isset($_GET['logged_out'])) {
    $successMessage = 'Je bent succesvol uitgelogd.';
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = trim($_POST['username'] ?? '');
    $password = trim($_POST['password'] ?? '');

    if ($username === 'admin' && $password === 'admin123') {
        $_SESSION['is_admin'] = true;
        header('Location: admin.php');
        exit;
    }

    $errors[] = 'Ongeldige gebruikersnaam of wachtwoord.';
}
?>
<!DOCTYPE html>
<html lang="nl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login</title>
    <style>
        body { background: #e2e8f0; font-family: Arial, sans-serif; margin: 0; }
        .container { max-width: 420px; margin: 4rem auto; padding: 1.5rem; background: white; border-radius: 16px; box-shadow: 0 12px 30px rgba(15,23,42,0.12); }
        .error { background: #fee2e2; color: #991b1b; padding: 0.75rem 1rem; border-radius: 10px; margin-bottom: 1rem; }
        label { display: block; margin: 0.75rem 0 0.25rem; }
        input { width: 100%; padding: 0.75rem; border: 1px solid #d1d5db; border-radius: 10px; }
        button { margin-top: 1rem; width: 100%; padding: 0.9rem; background: #1d4ed8; color: white; border: none; border-radius: 10px; cursor: pointer; }
        a { color: #2563eb; text-decoration: none; }
    </style>
</head>
<body>
    <div class="container">
        <h1>Admin login</h1>
        <?php if ($successMessage !== null): ?>
            <div style="background:#d1fae5; color:#065f46; padding:0.75rem 1rem; border-radius:10px; margin-bottom:1rem;">
                <?= htmlspecialchars($successMessage) ?>
            </div>
        <?php endif; ?>
        <?php if (!empty($errors)): ?>
            <div class="error"><?= htmlspecialchars($errors[0]) ?></div>
        <?php endif; ?>
        <form method="post">
            <label for="username">Gebruikersnaam</label>
            <input id="username" name="username" type="text" value="<?= htmlspecialchars($username) ?>" required>

            <label for="password">Wachtwoord</label>
            <input id="password" name="password" type="password" required>

            <button type="submit">Inloggen</button>
        </form>
        <p style="margin-top: 1rem;"><a href="index.php">Terug naar home</a></p>
    </div>
</body>
</html>
