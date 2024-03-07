import sys
import fitz  # PyMuPDF
import re  # Regular expression module


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


def remove_text_by_regex(text, pattern):
    """Remove text that matches the given regex pattern."""
    return re.sub(pattern, "", text)


if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: python script.py <path_to_pdf>")
        sys.exit(1)

    pdf_path = sys.argv[1]
    text = extract_text_from_pdf(pdf_path)

    # Remove the table of contents
    toc_end = r"Requirements in Response to DFARS Cybersecurity Requirements, November 2017."
    pattern = r"^.*?" + re.escape(toc_end)
    text = re.sub(pattern, "", text, flags=re.DOTALL)

    # Remove Appendix
    pattern = r"Appendix A.*"
    text = re.sub(pattern, "", text,
                  flags=re.DOTALL)

    # Remove page break pattern
    pattern = r"\n(?:[A-Za-z0-9–\s.-]+)?\n?CMMC Assessment Guide – Level 2\s.\sVersion 2\.0\n?[0-9\s]+"
    text = re.sub(
        pattern, "\n", text, flags=re.DOTALL)

    # Remove page header pattern
    pattern = r"\s+[A-Z]{1,2}\.L[1-2]-3\.[0-9]{1,2}\.[0-9]{1,2} [\s\S]{1,3} (?:[[A-Z][a-z]*[ &]+)+[A-Z][a-z]*\n*"
    text = re.sub(pattern, "", text)

    # Remove Level indicators
    pattern = r"Level [1-2] [A-Z-a-z ]+"
    text = re.sub(pattern, "", text)

    ## Now we can search for the things we need ##

    oh_yee_great_and_mighty_all_knowing_regex_pattern = r"\s*[A-Z]{2}\.L([1-2])-(3\.[0-9]{1,2}\.[0-9]{1,2}) [\s\S]{1,3} ([A-Z &]{2,})\s*.*ASSESSMENT OBJECTIVES \[NIST SP 800\-171A\]\s*Determine if:\s*(\[[a-z]\] [a-z ().;\n]+)+\s*"

    print(text, file=sys.stdout)
