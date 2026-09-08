def toon_resultaat(raadwoord, resultaat):
    """
    Print het woord met gekleurde vakjes — zoals echt Lingo/Wordle!
    Bovenste rij = letters, onderste rij = kleur
    """
    print("\n  ", end="")
    for i, letter in enumerate(raadwoord):
        kleur = resultaat[i]
        if kleur == "groen":
            print(groen(letter.upper()), end=" ")
        elif kleur == "geel":
            print(geel(letter.upper()), end=" ")
        else:
            print(grijs(letter.upper()), end=" ")
    print()