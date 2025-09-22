class Shop {
  selectors = {
    balance: '[data-js-balance]',
    updateCountPrice: '[data-js-update-count-price]',
    updateCountButton: '[data-js-update-count-button]',
    addCountText: '[data-js-add-count-text]',
  }

  constructor() {
    this.updateCountPriceTextElement = document.querySelector(
      this.selectors.updateCountPrice,
    )
    this.updateCountButtonElement = document.querySelector(
      this.selectors.updateCountButton,
    )
    this.addCountTextElement = document.querySelector(
      this.selectors.addCountText,
    )
    this.balanceElement = document.querySelector(this.selectors.balance)

    this.balanceStorage = Number(localStorage.getItem('balance')) || 0
    this.addPlus = Number(localStorage.getItem('addPlus')) || 1
    this.addPlusPrice = Number(localStorage.getItem('addPlusPrice')) || 20
    this.rebirth = Number(localStorage.getItem('rebirth')) || 0

    this.addCount()
    this.#render()
  }

  addCountFunction = () => {
    this.balanceStorage =
      Number(localStorage.getItem('balance')) || this.balanceStorage

    if (this.balanceStorage >= this.addPlusPrice) {
      this.addPlus += 1 + Math.floor(this.rebirth * 0.5)
      this.balanceStorage -= this.addPlusPrice

      if (this.addPlus <= 10) {
        this.addPlusPrice += 20 * 2
      } else if (this.addPlus <= 20) {
        this.addPlusPrice += 20 * 3
      } else {
        this.addPlusPrice += 20 * 4
      }

      localStorage.setItem('addPlusPrice', this.addPlusPrice)
      localStorage.setItem('addPlus', this.addPlus)
      localStorage.setItem('balance', this.balanceStorage)

      this.#render()
    } else {
      console.log('Недостаточно средств для апгрейда')
    }
  }

  addCount() {
    this.updateCountButtonElement.addEventListener(
      'click',
      this.addCountFunction,
    )
  }

  #render() {
    this.addCountTextElement.textContent = this.addPlus
    this.updateCountPriceTextElement.textContent = this.addPlusPrice
    this.balanceElement.textContent = this.balanceStorage
  }
}

export default Shop
