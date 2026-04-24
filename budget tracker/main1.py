import flet as ft
import json
import os
from datetime import datetime


def main(page: ft.Page):
    page.title = "Budget Tracker"
    page.window_width = 340
    page.window_height = 560
    page.window_resizable = False
    page.theme = ft.Theme()
    page.dark_theme = ft.Theme()
    page.theme_mode = ft.ThemeMode.LIGHT
    page.padding = 16
    page.bgcolor = "#F0F2F8"

    data_file = "operations.json"

    # Загрузка операций
    if os.path.exists(data_file):
        with open(data_file, "r") as f:
            operations = json.load(f)
    else:
        operations = []

    # Сохранение операций
    def save_operations():
        with open(data_file, "w") as f:
            json.dump(operations, f)

    # ---------- ОБНОВЛЕНИЕ ----------
    def refresh():
        total = sum(op["amount"] for op in operations)
        income = sum(op["amount"] for op in operations if op["amount"] > 0)
        expense = sum(op["amount"] for op in operations if op["amount"] < 0)

        balance_text.value = f"${total:,.2f}"
        balance_text.color = "#2ECC71" if total >= 0 else "#E74C3C"
        income_text.value = f"▲ ${income:,.2f}"
        expense_text.value = f"▼ ${abs(expense):,.2f}"

        ops_list.controls.clear()

        for i, op in enumerate(reversed(operations[-15:])):
            color = "#2ECC71" if op["amount"] >= 0 else "#E74C3C"
            sign = "+" if op["amount"] >= 0 else ""

            def delete_op(index=len(operations) - 1 - i):
                def inner(e):
                    operations.pop(index)
                    save_operations()
                    refresh()
                return inner

            ops_list.controls.append(
                ft.Container(
                    content=ft.Column([
                        ft.Row([
                            ft.Text(op["description"], expand=1, size=13,
                                    overflow=ft.TextOverflow.ELLIPSIS),
                            ft.Text(f"{sign}${op['amount']:,.2f}",
                                    color=color,
                                    size=13,
                                    weight=ft.FontWeight.W_600),
                            ft.IconButton(icon=ft.Icons.DELETE, on_click=delete_op(), icon_size=16),
                        ]),
                        ft.Text(op.get("date", ""), size=10, color="#888"),
                    ]),
                    bgcolor="#FFFFFF",
                    border_radius=10,
                    padding=ft.Padding.symmetric(horizontal=12, vertical=8),
                    margin=ft.Margin.only(bottom=5),
                )
            )

        page.update()

    # ---------- ДОБАВЛЕНИЕ ----------
    def add_dialog(e):
        desc = ft.TextField(label="Description", autofocus=True)
        amount = ft.TextField(label="Amount (minus = expense)",
                              keyboard_type=ft.KeyboardType.NUMBER)
        error = ft.Text("", color="#E74C3C", size=12)

        def save(e):
            if not desc.value or not desc.value.strip():
                error.value = "Enter a description"
                page.update()
                return

            if not amount.value or not amount.value.strip():
                error.value = "Enter an amount"
                page.update()
                return

            try:
                val = float(amount.value.replace(",", "."))
            except:
                error.value = "Enter a valid number"
                page.update()
                return

            operations.append({
                "description": desc.value.strip(),
                "amount": val,
                "date": datetime.now().strftime("%Y-%m-%d %H:%M:%S")
            })

            save_operations()
            page.pop_dialog()
            refresh()

        def cancel(e):
            page.pop_dialog()

        dialog = ft.AlertDialog(
            title=ft.Text("New Operation"),
            content=ft.Column(
                [desc, amount, error],
                tight=True,
                spacing=8,
                width=260
            ),
            actions=[
                ft.TextButton("Cancel", on_click=cancel),
                ft.TextButton("Save", on_click=save),
            ],
        )

        page.dialog = dialog
        page.show_dialog(dialog)

    # ---------- СТАТИСТИКА ----------
    def show_stats(e):
        total = sum(op["amount"] for op in operations)
        income = sum(op["amount"] for op in operations if op["amount"] > 0)
        expense = sum(op["amount"] for op in operations if op["amount"] < 0)

        def close(e):
            page.pop_dialog()

        dialog = ft.AlertDialog(
            title=ft.Text("Statistics"),
            content=ft.Column([
                ft.Text(f"Income:    +${income:,.2f}", color="#2ECC71"),
                ft.Text(f"Expenses:  -${abs(expense):,.2f}", color="#E74C3C"),
                ft.Divider(),
                ft.Text(f"Net: ${total:,.2f}  ({len(operations)} ops)",
                        weight=ft.FontWeight.BOLD),
            ], tight=True, spacing=8, width=260),
            actions=[ft.TextButton("Close", on_click=close)],
        )

        page.dialog = dialog
        page.show_dialog(dialog)

    # ---------- ТЕМА ----------
    def toggle_theme(e):
        page.theme_mode = (
            ft.ThemeMode.DARK
            if page.theme_mode == ft.ThemeMode.LIGHT
            else ft.ThemeMode.LIGHT
        )

        page.bgcolor = "#1A1D2E" if page.theme_mode == ft.ThemeMode.DARK else "#F0F2F8"
        page.update()

    # ---------- UI ----------
    balance_text = ft.Text("$0.00", size=32, weight=ft.FontWeight.W_700)
    income_text = ft.Text("▲ $0.00", size=12, color="#2ECC71")
    expense_text = ft.Text("▼ $0.00", size=12, color="#E74C3C")

    ops_list = ft.ListView(expand=True, spacing=0)

    add_button = ft.FloatingActionButton(
        icon=ft.Icons.ADD,
        bgcolor="#6C63FF",
        on_click=add_dialog,
    )

    page.floating_action_button = add_button
    page.floating_action_button_location = ft.FloatingActionButtonLocation.END_FLOAT
    page.update()

    page.add(
        ft.Column([
            ft.Row([
                ft.Text("Budget Tracker", size=18, weight=ft.FontWeight.W_700),
                ft.Row([
                    ft.IconButton(icon=ft.Icons.DARK_MODE, on_click=toggle_theme),
                    ft.IconButton(icon=ft.Icons.BAR_CHART, on_click=show_stats),
                ])
            ], alignment=ft.MainAxisAlignment.SPACE_BETWEEN),

            ft.Container(
                content=ft.Column([
                    ft.Text("Total Balance", size=11, color="#888"),
                    balance_text,
                    ft.Row([income_text, expense_text], spacing=16),
                ],
                    horizontal_alignment=ft.CrossAxisAlignment.CENTER,
                    spacing=4
                ),
                bgcolor="#FFFFFF",
                border_radius=16,
                padding=ft.Padding.symmetric(horizontal=20, vertical=16),
            ),

            ft.Text("Recent Operations", size=13, weight=ft.FontWeight.W_600),
            ops_list
        ], expand=True, spacing=12)
    )

    refresh()


if __name__ == "__main__":
    ft.run(main)