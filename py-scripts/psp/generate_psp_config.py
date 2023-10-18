import argparse
from pathlib import Path
import os
import csv
import sys
import json


def manage_company_name(company_name: str):
    company_name = str(company_name.title())
    company_name = company_name.replace(' -', '')
    company_name = company_name.replace(',', '')

    if company_name.find("Societa' Per Azioni") > 0:
        company_name = company_name[0:company_name.find("Societa' Per Azioni")]
        company_name = company_name + " S.P.A."
    if company_name.find("societa' Per Azioni") > 0:
        company_name = company_name[0:company_name.find("societa' Per Azioni")]
        company_name = company_name + " S.P.A."
    if company_name.find(' Spa') > 0:
        company_name = company_name.replace('Spa', 'S.P.A.')
    if company_name.find(" Societa' Cooperativa Per Azioni") > 0:
        company_name = company_name[0:company_name.find("Societa' Cooperativa Per Azioni")]
        company_name = company_name + "S.C."
    if company_name.find(" Societa'Cooperativa Per Azioni") > 0:
        company_name = company_name[0:company_name.find("Societa'Cooperativa Per Azioni")]
        company_name = company_name + "S.C."
    if company_name.find(" Societa' Cooperativa") > 0:
        company_name = company_name[0:company_name.find("Societa' Cooperativa")]
        company_name = company_name + "S.C."
    if company_name.find(" Soc. Cooperativa") > 0:
        company_name = company_name[0:company_name.find("Soc. Cooperativa")]
        company_name = company_name + "S.C."
    if company_name.endswith(' Soc. Coop.'):
        company_name = company_name[0:company_name.find('Soc. Coop.')]
        company_name = company_name + "S.C."
    if company_name.endswith('Soc.Cooperativa'):
        company_name = company_name[0:company_name.find('Soc.Cooperativa')]
        company_name = company_name + 'S.C'
    if company_name.find("Societa' A Responsabilita' Limitata") > 0:
        company_name = company_name[0:company_name.find("Societa' A Responsabilita' Limitata")]
        company_name = company_name + " S.L."

    if company_name.find('S.P.A.') > 0:
        company_name = company_name[0:company_name.find('S.P.A.') + 6]
    if company_name.find('S.C.P.A.') > 0:
        company_name = company_name[0:company_name.find('S.C.P.A.') + 8]

    company_name = company_name.replace('  ', ' ')
    return company_name


def load_table(filename, separator, key, val):
    # csv.field_size_limit(sys.maxsize)
    print("load_table|loading file [" + filename + "]")
    # open the file in read mode
    filename = open(filename, 'r')
    file = csv.reader(filename, delimiter=separator)
    next(file, None)

    # creating empty dict
    tab = {}

    # iterating over each row and add values to dictionary
    for col in file:
        tab[col[key]] = col[val]

    print("load_table|file loaded")
    return tab


def create_info_file(tax_mapping_table: dict,
                     vat_mapping_table: dict,
                     tax_company_name_mapping_table: dict,
                     vat_company_name_mapping_table: dict,
                     tax_abi_mapping_table: dict,
                     vat_abi_mapping_table: dict,
                     short_name_mapping_table: dict,
                     filename: str, separator: str,
                     output_file: str, cdn_path: str):
    csv.field_size_limit(sys.maxsize)
    print("create_info_file|loading file [{}]".format(filename))
    # open the file in read mode
    filename = open(filename, 'r')
    file = csv.reader(filename, delimiter=separator)
    print("create_info_file|file [{}] loaded".format(filename))
    next(file, None)  # skip header line

    print("create_info_file|creating psp configuration")
    config_tuple = ({})
    id_psp = ''
    fiscal_code = ''
    abi = ''
    for row in file:
        fiscal_code = row[3]

        # get idPsp
        if row[3] in tax_mapping_table:
            id_psp = tax_mapping_table[fiscal_code]
        elif row[3] in vat_mapping_table:
            id_psp = vat_mapping_table[fiscal_code]
        else:
            print("create_info_file|fiscal code {} not found".format(fiscal_code))
            id_psp = ''
            fiscal_code = ''
            continue

        # get companyName
        if fiscal_code in tax_company_name_mapping_table:
            company_name = tax_company_name_mapping_table[fiscal_code]
        elif fiscal_code in vat_company_name_mapping_table:
            company_name = vat_company_name_mapping_table[fiscal_code]
        else:
            print("create_info_file|company name {} not found".format(fiscal_code))
            id_psp = ''
            fiscal_code = ''
            continue

        # get abi
        if fiscal_code in tax_abi_mapping_table:
            abi = tax_abi_mapping_table[fiscal_code]
        elif fiscal_code in vat_abi_mapping_table:
            abi = vat_abi_mapping_table[fiscal_code]
        else:
            print("create_info_file|abi {} not found".format(fiscal_code))
            id_psp = ''
            fiscal_code = ''
            continue

        # address and building number management
        address = row[50]
        building_number = row[51]

        # company name management
        company_name = manage_company_name(company_name)

        # short name managment
        short_name = ''
        if abi in short_name_mapping_table:
            short_name = short_name_mapping_table[abi]
        else:
            print("create_info_file|abi {} not found in short name table".format(abi))
            short_name = company_name

        # PSP configuration creation
        psp_multi = str(id_psp).split(',')
        for psp in psp_multi:
            config_tuple = {**config_tuple, **({
                psp: {
                    # 'logo': '{}/assets/psp-logos/{}.png'.format(cdn_path, psp),
                    'logo': 'https://{}/{}.png'.format(cdn_path, abi),
                    'fiscalCode': fiscal_code,
                    'name': short_name,
                    'companyName': company_name,
                    'address': address.title(),
                    'buildingNumber': building_number,
                    'postalCode': row[5],
                    'city': row[6].title(),
                    'province': row[7]
                }
            })}

    json_string = json.dumps(config_tuple, indent=4)

    print("create_info_file|psp configuration generated".format(filename))

    # write psp config file to filesystem
    print("create_info_file|writing configuration to [{}]".format(filename))
    json_file = open(output_file, "w")
    json_file.write(json_string)
    json_file.close()
    print("create_info_file|configuration written to [{}]".format(filename))


# main
parser = argparse.ArgumentParser(description="How to use the script", formatter_class=argparse.ArgumentDefaultsHelpFormatter)
# parser = argparse.ArgumentParser()
parser.add_argument('--psp-registry-table', type=Path, required=True,
                    help='Path to the PSP \'registry\' csv file.',
                    default='/input/contracts_crm_anagrafica.csv')
parser.add_argument('--psp-contracts-table', type=Path, required=True,
                    help='Path to the PSP \'contracts\' csv file.',
                    default='/input/contracts_crm_contracts.csv ')
parser.add_argument('--psp-short-name', type=Path, required=True,
                    help='Path to the PSP \'short name list file\'.',
                    default='/input/psp_short_name.csv ')
parser.add_argument('--psp-config-file', type=Path, required=True,
                    help='Path to the PSP configuration file to generate.',
                    default='/output/psp_config_file.json')
parser.add_argument('--psp-cdn-logo', type=Path, required=True,
                    help='Path to the \'CDN\' to use to retrieve the logo at runtime.',
                    default='assets.cdn.io.italia.it/logos/abi')
args = parser.parse_args()
dirname = os.path.dirname(__file__)

registry_file = "{}{}".format(dirname, args.psp_registry_table)
contracts_file = "{}{}".format(dirname, args.psp_contracts_table)
output_file = "{}{}".format(dirname, args.psp_config_file)
psp_short_name_file = "{}{}".format(dirname, args.psp_short_name)
cdn_path = args.psp_cdn_logo

# get mapping idPsp/taxcode
tax_mapping_table = load_table(contracts_file, ',', 7, 2)  # key=tax_code, value=idPsp
vat_mapping_table = load_table(contracts_file, ',', 8, 2)  # key=tax_code, value=idPsp
tax_company_name_mapping_table = load_table(contracts_file, ',', 7, 5)  # key=tax_code, value=idPsp
vat_company_name_mapping_table = load_table(contracts_file, ',', 8, 5)  # key=tax_code, value=idPsp
tax_abi_mapping_table = load_table(contracts_file, ',', 8, 6)  # key=tax_code, value=idPsp
vat_abi_mapping_table = load_table(contracts_file, ',', 7, 6)  # key=tax_code, value=idPsp
short_name_mapping_table = load_table(psp_short_name_file, ',', 1, 0)  # key=tax_code, value=idPsp

create_info_file(tax_mapping_table, vat_mapping_table, tax_company_name_mapping_table, vat_company_name_mapping_table,
                 tax_abi_mapping_table, vat_abi_mapping_table, short_name_mapping_table, registry_file, ',',
                 output_file, cdn_path)
