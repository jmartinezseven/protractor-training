exports.config = {
    seleniumAddress: 'http://localhost:4444/wd/hub',
    specs: [
        '../tests/*_spec.js'
    ],
    // Params on your test
    params: {
        site : 'http://dev.wesura.com',
        login : {
            user: 'juan.martinez.beltran@gmail.com ',
            password: '159357852456'
        }
    },
    plugins: [{
        package: 'protractor-console',
        logLevels: ['severe']
    }],

    onPrepare: function() {
        var site = browser.params.site;
        browser.get(site);
        element(by.css('.btn-ingresar-nav')).click();
        element(by.id('gm')).click();
        //Sign in with to popup
        browser.getAllWindowHandles().then(function (handles) {
            var popupHandle = handles[1];
            browser.switchTo().window(popupHandle);
            var email = browser.driver.findElement(by.name('Email'));
            var signIn = browser.driver.findElement(by.name('signIn'));
            email.sendKeys(browser.params.login.user || process.env.GOOGLE_USER);
            signIn.click();
            browser.driver.sleep(2000);

            var password = browser.driver.findElement(by.name('Passwd'));
            password.sendKeys(browser.params.login.password || process.env.GOOGLE_PASS);
            var login = browser.driver.findElement(by.id('signIn'));
            login.click();
            //var approveAccess = element(by.id('submit_approve_access'));
            //browser.driver.sleep(5000);
            //browser.wait(ec.elementToBeClickable(approveAccess), 5000).then(function () {
            //    approveAccess.click();
            //});
            browser.driver.sleep(10000);
            browser.driver.switchTo().window(handles[0]);
        });
    },

    jasmineNodeOpts: {
        // If true, print colors to the terminal.
        showColors: true,
        // Default time to wait in ms before a test fails.
        defaultTimeoutInterval: 30000,
        // Function called to print jasmine results.
        print: function() {},
        // If set, only execute specs whose names match the pattern, which is
        // internally compiled to a RegExp.
        //grep: 'pattern',
        // Inverts 'grep' matches
        invertGrep: false
    }
};