class RebirthSystem {
  selectors = {
    rebirthCountHeaderText: '[data-js-rebirth-count-header]',
    balance: '[data-js-balance]',
    addPlusText: '[data-js-add-count-text]',
    rebirthCountText: '[data-js-rebirth-count]',
    countUpdatePrice: '[data-js-update-count-price]',
    rebirthPriceText: '[data-js-rebirth-price]',
    rebirthButton: '[data-js-rebirth-button]',
    rebirthMustClick: '[data-js-click]',
  }

  constructor() {
    this.rebirthCountHeaderTextElement = document.querySelector(
      this.selectors.rebirthCountHeaderText,
    )
    this.balanceElement = document.querySelector(this.selectors.balance)
    this.addPlusTextElement = document.querySelector(this.selectors.addPlusText)
    this.rebirthCountTextElement = document.querySelector(
      this.selectors.rebirthCountText,
    )
    this.countUpdatePriceElement = document.querySelector(
      this.selectors.countUpdatePrice,
    )
    this.rebirthPriceTextElement = document.querySelector(
      this.selectors.rebirthPriceText,
    )
    this.rebirthMustClickElement = document.querySelector(
      this.selectors.rebirthMustClick,
    )
    this.rebirthButtonElement = document.querySelector(
      this.selectors.rebirthButton,
    )

    this.balance = Number(localStorage.getItem('balance')) || 0
    this.addPlus = Number(localStorage.getItem('addPlus')) || 1
    this.addPlusPrice = Number(localStorage.getItem('addPlusPrice')) || 20
    this.rebirth = Number(localStorage.getItem('rebirth')) || 0
    this.rebirthPrice = Number(localStorage.getItem('rebirthPrice')) || 500
    this.rebirthAddPlusMust =
      Number(localStorage.getItem('rebirthAddPlusMust')) || 10

    this.#render()
    this.rebirthButton()
  }

  rebirthFunction = () => {
    if (
      this.addPlus >= this.rebirthAddPlusMust &&
      this.balance >= this.rebirthPrice
    ) {
      this.addPlus = 1
      this.balance = 0
      this.rebirth++
      this.rebirthPrice =
        this.rebirth >= 1
          ? Math.round(this.rebirthPrice + this.rebirthPrice * 3)
          : this.rebirthPrice * 2
      this.rebirthAddPlusMust = Math.round(this.rebirthAddPlusMust * 1.5)
      this.addPlusPrice = 20

      localStorage.setItem('balance', this.balance)
      localStorage.setItem('addPlus', this.addPlus)
      localStorage.setItem('rebirthPrice', this.rebirthPrice)
      localStorage.setItem('rebirthAddPlusMust', this.rebirthAddPlusMust)
      localStorage.setItem('rebirth', this.rebirth)
      localStorage.setItem('addPlusPrice', this.addPlusPrice)
      this.#allRender()
      return
    }
  }

  rebirthButton() {
    this.rebirthButtonElement.addEventListener('click', this.rebirthFunction)
  }

  #render() {
    this.rebirthCountHeaderTextElement.textContent = this.rebirth
    this.rebirthPriceTextElement.textContent = this.rebirthPrice
    this.rebirthCountTextElement.textContent = this.rebirth
    this.rebirthMustClickElement.textContent = this.rebirthAddPlusMust
  }

  #allRender() {
    this.rebirthCountHeaderTextElement.textContent = this.rebirth
    this.balanceElement.textContent = this.balance
    this.addPlusTextElement.textContent = this.addPlus
    this.rebirthCountTextElement.textContent = this.rebirth
    this.countUpdatePriceElement.textContent = this.addPlusPrice
    this.rebirthPriceTextElement.textContent = this.rebirthPrice
    this.rebirthMustClickElement.textContent = this.rebirthAddPlusMust
  }
}

export default RebirthSystem
