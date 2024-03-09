import argparse
import sys

from lib.parsetext import parse_pdf
from lib.jsontodb import jsontodb

if __name__ == "__main__":
    # Initialize the parser
    parser = argparse.ArgumentParser(description="Process a PDF file.")

    subparsers = parser.add_subparsers(
        dest="command", help="Which command to run", required=True
    )

    parse_pdf_parser = subparsers.add_parser(
        "parse_pdf", help="Parses a given pdf and outputs to stdout"
    )
    jsontodb_parser = subparsers.add_parser(
        "jsontodb", help="Takes json via stdin and puts the info into a mysql databse."
    )
    # Positional argument for the PDF path
    parse_pdf_parser.add_argument("pdf_path", help="Path to the PDF file")
    # Optional flag (default False). Include '-p' or '--pure-text' to set this to True.
    parse_pdf_parser.add_argument(
        "-p",
        "--pure-text",
        action="store_true",
        help="Output in pure text instead of JSON",
    )

    # Parse the arguments
    args = parser.parse_args()

    if args.command == "parse_pdf":
        parse_pdf(args.pdf_path, args.pure_text)
    elif args.command == "jsontodb":
        jsontodb()
    else:
        args.help()
