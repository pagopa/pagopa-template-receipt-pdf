# 🧾 pagopa-template-receipt-pdf

This repo contains the pdf receipt templates used by pagoPA

- [🧾 pagopa-template-receipt-pdf](#-pagopa-template-receipt-pdf)
  - [Dependencies](#dependencies)
  - [How to apply changes](#how-to-apply-changes)
  - [How to install and run pdf generator](#how-to-install-and-run-pdf-generator)
  - [Compatibility](#compatibility)
  - [Related mail templates](#related-mail-templates)

## Dependencies

- Node JS (👀 `.node-version` file), _optional_ see [nvm](https://github.com/nvm-sh/nvm)
- [yarn](https://yarnpkg.com/)
- [Handlebars CLI](https://github.com/keithamus/hbs-cli) to render handlebars templates
- [Puppeteer](https://www.npmjs.com/package/puppeteer) to [generates a PDF of the page with the print CSS media type](https://pptr.dev/api/puppeteer.page.pdf)

## How to apply changes

To edit them, you can choose among these following options:

- [Online editor](https://mjml.io/try-it-live)
- [Local installation](https://mjml.io/download)
- [Visual Studio Code plugin](https://marketplace.visualstudio.com/items?itemName=mjmlio.vscode-mjml)

## How to install and run pdf generator

Under `receipt/success/pdf` folder, run on your terminal:

```
yarn install
```

To generate the `PDF` file, just run:

```sh
yarn generate
[…]
Wrote /pagopa-template-receipt-pdf/receipt/success/pdf/template.html from /pagopa-template-receipt-pdf/receipt/success/pdf/template.hbs
✨  Done in 5.62s.
```

A PDF with the `pagopa-receipt-<UUID>.pdf` filename has been generated in the same folder.

## Compatibility

Templates are compatible with the following clients:

- Apple Mail 13+ (dark mode included)
- Gmail Web app
- OL Office 365 (dark mode included, partially supported on Windows)
- Outlook 2013, 2016, 2019, 2021 (dark mode included, partially supported on Windows)
- Windows 10 Mail (dark mode partially supported)
- Windows 11 Mail
- Gmail App (Android 6+, dark mode partially supported)
- Gmail App (iOS 13.1+, dark mode partially supported)
- iPad (iOS 13.1+)
- iPhone (iOS 13.1+)
- AOL Mail
- Outlook.com Mail (dark mode partially supported)
- Yahoo! Mail

## Related mail templates

- [IO App](https://github.com/pagopa/io-app-email-templates)
- [Area Riservata (former SelfCare)](https://github.com/pagopa/selfcare-email-templates)
- [Piattaforma Notifiche](https://github.com/pagopa/pn-email-templates)
- [Ecommerce Notifications Service](https://github.com/pagopa/pagopa-notifications-service) ([pagoPA doc](https://pagopa.atlassian.net/wiki/spaces/I/pages/529793813/pagoPA+Notifications+Service+Design+Review))


# Github Actions
Le Action generano automaticamente Pull Request nei repository di destinazione ogni volta che vengono rilevate modifiche nei file monitorati.

## Action `update_pdf_engine.yml`
Questa GitHub Action automatizza la sincronizzazione di file specifici relativi alla generazione di ricevute PDF tra questo repository e il repository `pagopa/pagopa-pdf-engine`.


L'Action è progettata per mantenere aggiornati i file di helper e i partials dei template PDF utilizzati per la generazione delle ricevute. Crea 2 Pull Request (PR) separate nel repository di destinazione.

## Action `update_pdf_engine_template.yml`
Questa GitHub Action automatizza la sincronizzazione di file relativi alla generazione delle ricevute PDF tra questo repository e i repository:

`pagopa/pagopa-receipt-pdf-generator`

`pagopa/pagopa-receipt-pdf-helpdesk`

L’obiettivo è mantenere allineati i template, gli assets e i file di configurazione necessari per la generazione delle ricevute PDF.

## Action `update_psp_info_file.yml`
Questa Action aggiorna automaticamente il file di configurazione PSP (psp_config_file.json) nel repository `pagopa/pagopa-receipt-generator`.

Si attiva quando viene modificato:

`py-scripts/psp/output/psp_config_file.json`

## Action `update_receipt_notifier_markdown.yml`
Questa Action aggiorna automaticamente i template IO Message utilizzati dal `pagopa-receipt-notifier`, quando vengono modificati:

`io-message/templates/debtor.json`

`io-message/templates/payer.json`
