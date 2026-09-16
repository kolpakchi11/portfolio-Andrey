import random
from colorama import init, Fore, Back, Style

init(autoreset=True)

def grijs(tekst):
    """Witte tekst op grijze achtergrond — letter niet in woord"""
    return Back.WHITE + Fore.BLACK + f" {tekst} " + Style.RESET_ALL