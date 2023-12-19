import json
import re

def parse_document(file_path):
    with open(file_path, 'r', encoding='utf-8') as file:
        content = file.readlines()

    data = {}
    current_major_section = None
    current_minor_section = None
    minor_section_brief_description = []
    minor_section_detailed_description = []
    in_discussion = False

    for line in content:
        line = line.strip()
        if not line:
            continue

        major_section_match = re.match(r"\s*(\d+\.\d+)\s+(.+)", line)
        minor_section_match = re.match(r"\s*(\d+\.\d+\.\w+)\s+(.*)", line)

        if major_section_match:
            if current_major_section and current_minor_section:
                data[current_major_section]['sections'][current_minor_section] = {
                    'brief_description': ' '.join(minor_section_brief_description).strip(),
                    'detailed_description': '\n'.join(minor_section_detailed_description).strip()
                }
            minor_section_brief_description = []
            minor_section_detailed_description = []
            current_major_section = major_section_match.group(1)
            data[current_major_section] = {'title': major_section_match.group(2), 'sections': {}}
            current_minor_section = None
            in_discussion = False
        elif minor_section_match:
            if current_minor_section:
                data[current_major_section]['sections'][current_minor_section] = {
                    'brief_description': ' '.join(minor_section_brief_description).strip(),
                    'detailed_description': '\n'.join(minor_section_detailed_description).strip()
                }
            minor_section_brief_description = [minor_section_match.group(2)] if minor_section_match.group(2) else []
            minor_section_detailed_description = []
            current_minor_section = minor_section_match.group(1)
            in_discussion = False
        elif line == "DISCUSSION":
            in_discussion = True
        elif in_discussion:
            minor_section_detailed_description.append(line)
        else:
            minor_section_brief_description.append(line)

    if current_minor_section:
        data[current_major_section]['sections'][current_minor_section] = {
            'brief_description': ' '.join(minor_section_brief_description).strip(),
            'detailed_description': '\n'.join(minor_section_detailed_description).strip()
        }

    return data

# Example usage:


with open('parsed_text.json', 'w', encoding='utf-8') as f:
    data = parse_document('extracted-text.txt')
    json.dump(data, f)

