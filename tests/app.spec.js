const Application = require('spectron').Application
const {assert} = require('chai')
const electronPath = require('electron')
const path = require('path')

describe('Application launch', function () {
  this.timeout(10000)

  beforeEach(function () {
    this.app = new Application({
      path: electronPath,
      args: [path.join(__dirname, '..')]
    })
    return this.app.start()
  })

  afterEach(function () {
    if (this.app && this.app.isRunning()) {
      return this.app.stop()
    }
  })

  it('Correctly convert celsius to fahrenheit', function() {

    return this.app.client.$("#celcius")
        .then(fi => fi.setValue("1"))
        .then(() => this.app.client.$("#fahrenheit"))
        .then(ci => ci.getValue())
        .then(value => {
          assert.equal(value, "33.80")
        })
  })

  it('Correctly convert fahrenheit to celsius', function() {

    return this.app.client.$("#fahrenheit")
        .then(fi => fi.setValue("1"))
        .then(() => this.app.client.$("#celcius"))
        .then(ci => ci.getValue())
        .then(value => {
          assert.equal(value, "-17.22")
        })
  })

  it('Shows an application title.', function() {

    return this.app.client.$('#app-title')
        .then(el => el.getText())
        .then(text => {
          assert.equal(text, "Temperature Converter");
        })
  })

  it('shows an initial window', function () {
    return this.app.client.getWindowCount().then(function (count) {
      assert.equal(count, 1)
    })
  })


})
