class ClickButton {
  selectors = {
    balance: '[data-js-balance]',
    clickerButton: '[data-js-game-button]',
  }

  constructor() {
    this.balanceElement = document.querySelector(this.selectors.balance)
    this.clickerButtonElement = document.querySelector(
      this.selectors.clickerButton,
    )

    this.plusSystems()
    this.#render()
  }

  plusFunction = () => {
    this.currentBalance = Number(localStorage.getItem('balance')) || 0
    this.addPlus = Number(localStorage.getItem('addPlus')) || 1
    this.currentBalance += this.addPlus

    localStorage.setItem('balance', this.currentBalance)
    this.balanceElement.textContent = this.currentBalance
  }

  plusSystems() {
    this.clickerButtonElement.addEventListener('click', this.plusFunction)
  }

  #render() {
    let currentBalance = Number(localStorage.getItem('balance')) || 0
    this.balanceElement.textContent = currentBalance
  }
}

export default ClickButton
