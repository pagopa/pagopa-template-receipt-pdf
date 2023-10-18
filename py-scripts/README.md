# 🧾 pagoPA - Generate PSP configuration module
the `psp/generate_psp_config.py` script, enable and automatizes the generation
of a json configuration file that contains all the information about the PSP
that the `PDF-Generator` module uses at runtime to fulfill the pdf template.

## Dependencies
- Python 3.x environment
- File `/input/contracts_crm_anagrafica.csv` - generated exporting the sheet 
`Anagrafica aggiornata al mm.dd.yyyy` from [CRM File](https://docs.google.com/spreadsheets/d/1_MM5Oe8GPK8AgiYwPDh3388zN58fw-5Fec_3JuskP68/edit#gid=2077185319`)
- File `/input/contracts_crm_contracts.csv` - generated exporting the sheet
  `contracts` from [CRM File](https://docs.google.com/spreadsheets/d/1_MM5Oe8GPK8AgiYwPDh3388zN58fw-5Fec_3JuskP68/edit#gid=2077185319`)
- File `/input/psp_short_name.csv` - generated from site https://www.tuttitalia.it/banche/classifica/
## Usage
````
python3 psp/generate_psp_config.py --psp-registry-table /input/contracts_crm_anagrafica.csv --psp-contracts-table /input/contracts_crm_contracts.csv --psp-short-name /input/psp_short_name.csv --psp-cdn-logo assets.cdn.io.italia.it/logos/abi --psp-config-file /output/psp_config_file.json
````