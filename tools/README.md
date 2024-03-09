# CMMC-Handler Tools

The python venv here is separated from the backend really just so that you don't have install the tools from here there, but internally, there's no real issue with mixing them if you just want the one.

## Usage

do `python main.py -h` in the venv to see the help menu

It's essentially used to get the information from the [CMMC level 2 assessment guide](https://dodcio.defense.gov/Portals/0/Documents/CMMC/AG_Level2_MasterV2.0_FINAL_202112016_508.pdf) into json for use in the main applications and then optionally load that into a database
