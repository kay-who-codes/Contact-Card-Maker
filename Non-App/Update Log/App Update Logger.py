import os
from datetime import datetime
from tkinter import Tk, Label, Entry, Button, StringVar, messagebox

# Get the directory of the current script
script_dir = os.path.dirname(os.path.abspath(__file__))
file_path = os.path.join(script_dir, "Update Log.txt")

def save_update(update_details):
    update_number = 1
    current_datetime = datetime.now().strftime("%d %b %Y @ %H:%M")
    
    if os.path.exists(file_path):
        with open(file_path, "r") as file:
            content = file.read()
            # Count the number of updates
            update_number = content.count("App Update:") + 1
    
    new_entry = (
        f"App Update: {update_number}\n"
        f"Date of Update: {current_datetime}\n"
        f"Details: {update_details}\n\n"
    )
    
    with open(file_path, "a") as file:
        file.write(new_entry)
    
    messagebox.showinfo("Success", f"Update logged successfully as entry {update_number}.")

def create_gui():
    def on_submit(event=None):
        details = update_details.get()
        if not details.strip():
            messagebox.showwarning("Input Error", "Please provide update details.")
            return
        save_update(details)
        root.destroy()

    # GUI setup
    root = Tk()
    root.title("Update Logger")
    root.geometry("400x200")
    root.configure(bg="white")

    Label(
        root, 
        text="Update details:", 
        bg="white", 
        fg="black", 
        font=("Arial", 12, "bold")
    ).pack(pady=10)

    update_details = StringVar()
    entry = Entry(
        root, 
        textvariable=update_details, 
        font=("Arial", 12), 
        width=40, 
        bg="lightgrey"
    )
    entry.pack(pady=5)
    entry.focus_set()

    Button(
        root, 
        text="Submit", 
        command=on_submit, 
        bg="blue", 
        fg="white", 
        font=("Arial", 12, "bold")
    ).pack(pady=20)

    root.bind('<Return>', on_submit)

    root.mainloop()

# Main Execution
if __name__ == "__main__":
    create_gui()
