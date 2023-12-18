const fs = require("fs");
const Handlebars = require("handlebars");
// i18n
const i18next = require("i18next");
const HandlebarsI18n = require("handlebars-i18n");
// Import helpers
const eq = require("../helpers/eq.js");
const not = require("../helpers/not.js");
const splitAndSpace = require("../helpers/splitAndSpace.js");
const lowercase = require("../helpers/lowercase.js");

// Register the helpers
Handlebars.registerHelper("eq", eq);
Handlebars.registerHelper("not", not);
Handlebars.registerHelper("splitAndSpace", splitAndSpace);
Handlebars.registerHelper("lowercase", lowercase);

// Translation keys
i18next.init({
  resources: {
    it: {
      translation: {
        disclaimer: {
          compliance:
            "Questa ricevuta attesta il pagamento eseguito. Rivolgiti all’Ente Creditore se hai bisogno della quietanza liberatoria.",
          unknownFees:
            "Il totale non include i costi di commissione: puoi trovarli nel documento che hai ricevuto da {{PSPShortName}}.",
        },
        field: {
          authCode: "Codice autorizzativo",
          cardHolder: "Intestato a",
          debtor: "Debitore",
          email: "Indirizzo e-mail",
          fee: "Commissione (applicata da {{PSPShortName}})",
          iuv: "IUV",
          noticeAmount: "Importo",
          noticeCode: "Codice avviso",
          psp: "Gestore della transazione (PSP)",
          pspCode: "Codice PSP",
          paidBy: "Eseguito da",
          partialAmount: "Importo parziale",
          payee: "Ente Creditore",
          payeeTaxCode: "Codice Fiscale Ente",
          paymentMethod: "Metodo di pagamento",
          paymentReason: "Oggetto del pagamento",
          paymentReasonShortened: "Oggetto",
          rrn: "ID transazione (RRN)",
          timestamp: "Data e ora",
          toBePaid: "Totale",
          transactionCode: "Codice transazione",
        },
        footer: {
          handledByPagopa: "Ricevuta trasmessa da PagoPA S.p.A.",
          paymentManagedByPsp: "Pagamento gestito da {{PSPLegalName}}",
          needHelp: "Serve aiuto?",
          browse: "Visita",
          paymentId: "ID ricevuta",
        },
        title: {
          paymentReceipt: "Ricevuta di pagamento",
          onBehalfOf: "Per conto di",
        },
        value: {
          bankAccount: "Conto corrente",
          card: "Carta {{NomeCircuito}}",
          codiceTransazione: "{{codice transazione}}",
          debtor: "{{Nome}} {{Cognome}} ({{CF}})",
          paidBy: "{{Nome}} {{Cognome}} ({{CF}})",
          timestamp: "{{Timestamp}}",
        },
      },
    },
    en: {
      translation: {
        disclaimer: {
          compliance:
            "This receipt certifies that payment has been made. Contact the Creditor's Office if you need the release receipt.",
          unknownFees:
            "The total does not include fees: you can find them in the document you received from {{PSPShortName}}.",
        },
        title: {
          paymentReceipt: "Payment receipt",
          onBehalfOf: "On behalf of",
        },
        field: {
          authCode: "Authorization code",
          cardHolder: "Holder",
          debtor: "Debtor",
          email: "Indirizzo e-mail",
          fee: "Fee (applied by {{PSPShortName}})",
          iuv: "IUV",
          noticeAmount: "Amount",
          noticeCode: "Notice code",
          psp: "Transaction handler",
          pspCode: "Codice PSP",
          paidBy: "Paid by",
          partialAmount: "Partial amount",
          payee: "Payee",
          payeeTaxCode: "Codice Fiscale Ente",
          paymentMethod: "Payment method",
          paymentReason: "Oggetto del pagamento",
          paymentReasonShortened: "Oggetto",
          rrn: "Transaction ID",
          timestamp: "Date and time",
          toBePaid: "Total",
          transactionCode: "Codice transazione",
        },
        footer: {
          handledByPagopa: "Receipt sent by PagoPA S.p.A.",
          paymentManagedByPsp: "Payment managed by {{PSPLegalName}}",
          needHelp: "Need help?",
          browse: "Visit",
          paymentId: "Receipt ID",
        },
      },
    },
  },
  lng: "en",
  compatibilityJSON: "v2",
});

HandlebarsI18n.init();

const templateFile = fs.readFileSync("template.hbs", "utf8");
const template = Handlebars.compile(templateFile);

// Load the data for the template
const data = require("../json/authenticated-pdf.json");

// Generate the HTML
const html = template(data);

// Save the HTML to a file
fs.writeFileSync("template.html", html);
