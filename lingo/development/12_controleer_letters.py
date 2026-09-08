def controleer_letters(raadwoord, woord):
    """
    Vergelijkt raadwoord met het echte woord.
    Stap 1: zoek groene letters (exacte match)
    Stap 2: zoek gele letters (letter bestaat maar verkeerde plek)
    """
    resultaat    = ["grijs"] * len(woord)
    woord_letters = list(woord)

    # Stap 1 — groen
    for i in range(len(woord)):
        if raadwoord[i] == woord[i]:
            resultaat[i]    = "groen"
            woord_letters[i] = None   # al gebruikt

    # Stap 2 — geel
    for i in range(len(woord)):
        if resultaat[i] == "groen":
            continue
        if raadwoord[i] in woord_letters:
            resultaat[i] = "geel"
            woord_letters[woord_letters.index(raadwoord[i])] = None

    return resultaat
