import PyPDF2
import re

footer_pattern = re.compile(r'SP\s+800-\s+171,\s+REVISION\s+2\s+PROTECTING\s+CONTROLLED\s+UNCLASSIFIED\s+INFORMATION\s+\_{90,}\s+CHAPTER\s+THREE\s+PAGE\s[0-9]{1,4}\s+This\s+publication\s+is\s+available\s+free\s+of\s+charge\s+from:\s+https:\/\/doi\.org\/10\.6028\/NIST\.SP\.800\s+-\s*171r2  ')

# Open the PDF file
with open('NIST.SP.800-171r2.pdf', 'rb') as file:
    # Create a PDF reader object
    pdf_reader = PyPDF2.PdfReader(file)

    with open('extracted-text.txt', 'w', encoding='utf-8') as text_file:
        for page in pdf_reader.pages:
            # Extract text from the page
            text = page.extract_text()

            text = footer_pattern.sub('', text)

            text_file.write(text)
