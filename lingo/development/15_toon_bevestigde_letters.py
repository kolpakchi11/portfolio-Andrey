def toon_bevestigde_letters(bevestigd):
    """
    Laat zien welke letters al bekend zijn.
    Groene letters zichtbaar, onbekend = grijs vakje
    """
    print("\n  Bekende letters:")
    print("  ", end="")
    for letter in bevestigd:
        if letter:
            print(groen(letter.upper()), end=" ")
        else:
            print(Back.WHITE + Fore.WHITE + "   " + Style.RESET_ALL, end=" ")
    print()