/**
 * Test de creación de comunidad
 */

//Preparacion de datos
var createData = require('./commons/data/create-community-data.js');
var ec = protractor.ExpectedConditions;

//Test
describe('Create community flow should', function() {
    it(' create a community with a credit card payment method, bike for a risk object selection and no invite friends', function() {
        browser.get(browser.params.site + '/cotizar');
        browser.waitForAngular();
        element(by.cssContainingText('option', 'Bicicleta')).click();
        element(by.name('valorEvento')).sendKeys(createData.data.value);
        var button = element(by.css('.btnUnique'));
        browser.wait(ec.elementToBeClickable(button), 5000).then(function(){
            button.click();
        });

        //Ir a pagar
        element(by.css('[ng-click="goToPayNew()"]')).click();

        //Datos de pago
        //element(by.model('user.firstname')).sendKeys(createData.data.payment.user.names);
        //element(by.model('user.lastname')).sendKeys(createData.data.payment.user.lastnames);
        //element(by.cssContainingText('option', createData.data.payment.user.documentType)).click();
        //element(by.model('user.identificationNumber')).sendKeys(createData.data.payment.user.document);
        //element(by.model('user.phone')).sendKeys(createData.data.payment.user.cellphone);
        //element(by.model('user.address')).sendKeys(createData.data.payment.user.address);
        //element(by.model('model')).sendKeys(createData.data.payment.user.city);
        element(by.id('creditCardNumber')).sendKeys(createData.data.payment.card.number);
        element(by.cssContainingText('option', createData.data.payment.card.month)).click();
        element(by.cssContainingText('option', createData.data.payment.card.year)).click();
        element(by.model('payment.card.cvc')).sendKeys(createData.data.payment.card.cvv);
        element(by.cssContainingText('option', createData.data.payment.card.quotes)).click();

        element(by.id('terms')).click();

        var pay = element(by.css('.btn-pay'));
        browser.wait(ec.elementToBeClickable(pay), 5000).then(function(){
            pay.click();
        });

        element(by.model('riskObjectProperties.brand')).sendKeys(createData.data.payment.riskObject.brand);
        element(by.model('riskObjectProperties.reference')).sendKeys(createData.data.payment.riskObject.reference);
        var send = element(by.id('submitRiskObject'));
        browser.wait(ec.elementToBeClickable(send), 5000).then(function(){
            send.click();
        });
        var invite = element(by.css('[ng-click="goToInviteFriends()"]'));
        browser.wait(ec.elementToBeClickable(invite), 5000).then(function(){
            invite.click();
        });
        var goToCommunity = element(by.id('goToCommunity'));
        browser.wait(ec.elementToBeClickable(goToCommunity), 5000).then(function(){
            goToCommunity.click();
        });
        expect(element(by.css('.titleModules')).getText() === 'Información de tu objeto asegurado ');
    });
});