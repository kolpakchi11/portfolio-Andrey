import random
from colorama import init, Fore, Back, Style

init(autoreset=True)


def rood_tekst(tekst):
    return Fore.RED + Style.BRIGHT + tekst + Style.RESET_ALL