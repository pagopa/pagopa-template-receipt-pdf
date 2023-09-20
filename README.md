# 🧾 pagopa-template-receipt-pdf

This repo contains the pdf receipt templates used by pagoPA

- [🧾 pagopa-template-receipt-pdf](#-pagopa-template-receipt-pdf)
  - [How to apply changes](#how-to-apply-changes)
  - [How to install and run pdf generator](#how-to-install-and-run-pdf-generator)
  - [Compatibility](#compatibility)
  - [Related mail templates](#related-mail-templates)


## Dependecies

- Node JS (👀 `.node-version` file), _optional_ see [nvm](https://github.com/nvm-sh/nvm)
- [yarn](https://yarnpkg.com/)
- [Handlebars CLI](https://github.com/keithamus/hbs-cli) to render handlebars templates
- [Puppeteer](https://www.npmjs.com/package/puppeteer) to [generates a PDF of the page with the print CSS media type](https://pptr.dev/api/puppeteer.page.pdf)

## How to apply changes

To edit them, you can choose among these following options:

- [Online editor](https://mjml.io/try-it-live)
- [Local installation](https://mjml.io/download)
- [Visual Studio Code plugin](https://marketplace.visualstudio.com/items?itemName=mjmlio.vscode-mjml)

> To generate the HTML output you need to install dependecies typing 


## How to install and run pdf generator  

Under `receipt/success/pdf` folder, on terminal typing : 

```
yarn install
```

if all right you'll see something like that 

```sh
success Saved lockfile.
✨  Done in 21.71s.
```

then typing :

```sh
yarn generate
```

if all right you'll see something like that 
```sh
Wrote /pagopa-template-receipt-pdf/receipt/success/pdf/template.html from /pagopa-template-receipt-pdf/receipt/success/pdf/template.hbs
✨  Done in 5.62s.
```

and now, after typing  `ls -lrt` command u'll see a PDF file naming  `pagopa-receipt-<UUID>.pdf`

```
```


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


