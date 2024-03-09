import fitz  # PyMuPDF
import re  # Regular expression module
import json
import sys


def extract_text_from_pdf(pdf_path):
    try:
        # Open the provided PDF file
        doc = fitz.open(pdf_path)
        text = ""

        # Iterate through each page of the PDF
        for page in doc:
            # Extract text from the page
            text += page.get_text()

        # Close the document
        doc.close()

        return text
    except Exception as e:
        return str(e)


def parse_pdf(pdf_path, pure_text):
    text = extract_text_from_pdf(pdf_path)

    # Remove the table of contents
    toc_end = (
        r"Requirements in Response to DFARS Cybersecurity Requirements, November 2017."
    )
    pattern = r"^.*?" + re.escape(toc_end)
    text = re.sub(pattern, "", text, flags=re.DOTALL)

    # Remove Appendix
    pattern = r"Appendix A.*"
    text = re.sub(pattern, "", text, flags=re.DOTALL)

    # Remove page break pattern
    pattern = r"\n?CMMC Assessment Guide – Level 2\s.\sVersion 2\.0\n?[0-9\s]+"
    text = re.sub(pattern, "\n", text, flags=re.DOTALL)

    # Remove page header pattern
    pattern = r"\s+[A-Z]{1,2}\.L[1-2]-3\.[0-9]{1,2}\.[0-9]{1,2} [\s\S]{1,3} (?:[A-Z][a-z]*[ &]+)+[A-Z][a-z]*\n*"
    text = re.sub(pattern, "", text)

    # Remove Level indicators
    pattern = r"Level [1-2] [A-Z-a-z ]+"
    text = re.sub(pattern, "", text)

    ## Now we can search for the things we need ##

    oh_yee_great_and_mighty_all_knowing_regex_pattern = r"\s*[A-Z]{2}\.L([1-2])-(3\.[0-9]{1,2}\.[0-9]{1,2}) [\s\S]{1,3} ([A-Z &-]{2,})\s*(.*?)ASSESSMENT OBJECTIVES \[NIST SP 800\-171A\]\s*Determine if:\s*((?:\[[a-z]\] [\S \n]+?)+)\s*POTENTIAL ASSESSMENT METHODS AND OBJECTS \[NIST SP 800-171A\]\s*Examine\s*(\[SELECT\s{1,3}FROM:.*?\]).\s*Interview\s*(\[SELECT FROM:.*?\]).\s*Test\s*(\[SELECT FROM:.*?\]).\s*DISCUSSION \[NIST SP 800-171 R2\]\s*(.*?)\s*FURTHER DISCUSSION\s*(.*?)KEY REFERENCES\s*((?:.*?\n)+)"

    objectives_pattern = re.compile(
        r"\[([a-z])\]\s*(.*?)(?=\s*\[[a-z]\]|$)", flags=re.DOTALL
    )

    key_references_pattern = re.compile(
        r"(?<=\uf0b7)\s*(.*?)(?=\s*\uf0b7|$)", flags=re.DOTALL
    )

    data = []

    for id, match in enumerate(
        re.finditer(
            oh_yee_great_and_mighty_all_knowing_regex_pattern,
            text,
            flags=re.DOTALL,
        ),
        start=1,
    ):
        # Process objectives
        objectives_text = match.group(5)
        objectives_matches = re.findall(objectives_pattern, objectives_text)
        objectives = {m[0]: m[1].strip() for m in objectives_matches}

        # Process key references
        key_references_text = match.group(11)
        key_references = [
            match.strip()
            for match in re.findall(key_references_pattern, key_references_text)
        ]

        data.append(
            {
                "id": id,
                "level": int(match.group(1)),
                "section": match.group(2),
                "section_name": match.group(3),
                "brief_description": match.group(4),
                "assessment_objectives": objectives,
                "examine": match.group(6),
                "interview": match.group(7),
                "test": match.group(8),
                "discussion": match.group(9),
                "further_discussion": match.group(10),
                "key_references": key_references,
            }
        )

    # Convert the list of dictionaries to a JSON string
    json_data = json.dumps(data, indent=2)

    if pure_text:
        print(text, file=sys.stdout)
    else:
        print(json_data, file=sys.stdout)
