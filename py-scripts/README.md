# pagoPA - Generate PSP configuration module
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
How to use the script:
```
python3 psp/generate_psp_config.py

options:
  -h, --help            show this help message and exit
  --psp-registry-table PSP_REGISTRY_TABLE
                        Path to the PSP 'registry' csv file. (default: /input/contracts_crm_anagrafica.csv)
  --psp-contracts-table PSP_CONTRACTS_TABLE
                        Path to the PSP 'contracts' csv file. (default: /input/contracts_crm_contracts.csv )
  --psp-short-name PSP_SHORT_NAME
                        Path to the PSP 'short name list file'. (default: /input/psp_short_name.csv )
  --psp-config-file PSP_CONFIG_FILE
                        Path to the PSP configuration file to generate. (default: /output/psp_config_file.json)
  --psp-cdn-logo PSP_CDN_LOGO
                        Path to the 'CDN' to use to retrieve the logo at runtime. (default: assets.cdn.io.italia.it/logos/abi)
```
Just an example:
````
python3 psp/generate_psp_config.py --psp-registry-table /input/contracts_crm_anagrafica.csv --psp-contracts-table /input/contracts_crm_contracts.csv --psp-short-name /input/psp_short_name.csv --psp-cdn-logo assets.cdn.io.italia.it/logos/abi --psp-config-file /output/psp_config_file.json
````