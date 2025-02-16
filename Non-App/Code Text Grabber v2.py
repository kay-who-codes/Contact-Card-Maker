import os
import json
import pyperclip

def collect_files_and_copy():
    # Get the script's current directory
    current_dir = os.path.dirname(os.path.abspath(__file__))

    # Initialise file contents
    html_content = ''
    css_content = ''
    js_content = ''
    json_extracts = ''

    # Loop through files in the current directory
    for filename in os.listdir(current_dir):
        file_path = os.path.join(current_dir, filename)

        # Skip the script itself
        if filename == os.path.basename(__file__):
            continue

        # Read the content of .html, .css, .js, and .json files
        if filename.endswith('.html'):
            with open(file_path, 'r', encoding='utf-8') as file:
                html_content = file.read()
        elif filename.endswith('.css'):
            with open(file_path, 'r', encoding='utf-8') as file:
                css_content = file.read()
        elif filename.endswith('.js'):
            with open(file_path, 'r', encoding='utf-8') as file:
                js_content = file.read()
        elif filename.endswith('.json'):
            with open(file_path, 'r', encoding='utf-8') as file:
                try:
                    json_data = json.load(file)
                    if isinstance(json_data, list) and json_data:
                        first_object = json_data[0]
                        last_object = json_data[-1]
                        json_extracts += (f"\n\nFor your reference, here's an extract of the .json data found in \"{filename}\":\n"
                                         f"[\n{first_object},\n{last_object}\n]")
                except json.JSONDecodeError:
                    print(f"Warning: Could not parse JSON file: {filename}")

    # Prepare the formatted text
    formatted_text = (f".HTML: {html_content}\n\n.CSS: {css_content}\n\n.JS: {js_content}" 
                      f"{json_extracts}")

    # Copy the formatted text to the clipboard
    pyperclip.copy(formatted_text)
    print("Formatted text has been copied to the clipboard.")

# Run the function
collect_files_and_copy()
