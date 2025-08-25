class Combat {
  selectors = {
    balance: '[data-js-balance]',
    plus: '[data-js-plus]',
    update: '[data-js-add-new]',
    updateCountPrice: '[data-js-add-new-price]',
    updateCount: '[data-js-add-count]',
    rebirthCount: '[data-js-rebirth-count]',
    rebirthBtn: '[data-js-rebirth-btn]',
    rebirthPrice: '[data-js-rebirth-price]',
    rebirthClick: '[data-js-click]'
  }

  constructor() {
    this.balanceStorage = Number(localStorage.getItem('balance')) || 0
    this.addPlus = Number(localStorage.getItem('addPlus')) || 1
    this.addPlusPrice = Number(localStorage.getItem('addPlusPrice')) || 20
    this.rebirth = Number(localStorage.getItem('rebirth')) || 0
    this.rebirthPrice = Number(localStorage.getItem('rebirthPrice')) || 500
    this.rebirthAddPlusMust = Number(localStorage.getItem("rebirthAddPlusMust")) || 10

    this.balance = document.querySelector(this.selectors.balance)
    this.plusBtn = document.querySelector(this.selectors.plus)
    this.updateBtn = document.querySelector(this.selectors.update)
    this.updateCountText = document.querySelector(this.selectors.updateCount)
    this.updateCountPriceText = document.querySelector(this.selectors.updateCountPrice)
    this.rebirthPriceTitle = document.querySelector(this.selectors.rebirthPrice)
    this.rebirthCount = document.querySelector(this.selectors.rebirthCount)
    this.rebirthBtn = document.querySelector(this.selectors.rebirthBtn)
    this.rebirthClickEl = document.querySelector(this.selectors.rebirthClick)

    this.plusFunction()
    this.addCountFunction()
    this.rebirthFunction()
    this.render()
  }

  plusFunction() {
    this.plusBtn.addEventListener('click', () => {
      this.balanceStorage += this.addPlus
      if (this.balance) {
        this.balance.textContent = this.balanceStorage
      }
      localStorage.setItem('balance', this.balanceStorage)
    })
    this.render()
  }

  addCountFunction() {
    this.updateBtn.addEventListener('click', () => {
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
        this.updateCountText.textContent = this.addPlus
        this.render()
      }
    })
  }

  rebirthFunction() {
    this.rebirthBtn.addEventListener('click', () => {
      if (this.addPlus >= this.rebirthAddPlusMust && this.balanceStorage >= this.rebirthPrice) {
        this.addPlus = 1
        this.balanceStorage = 0
        this.rebirth++
        this.rebirthPrice = this.rebirth >= 1 ? Math.round(this.rebirthPrice + this.rebirthPrice * 3) : this.rebirthPrice * 2
        this.rebirthAddPlusMust = Math.round(this.rebirthAddPlusMust * 1.5)
        this.addPlusPrice = 20;

        localStorage.setItem('balance', this.balanceStorage)
        localStorage.setItem('addPlus', this.addPlus)
        localStorage.setItem("rebirthPrice", this.rebirthPrice)
        localStorage.setItem("rebirthAddPlusMust", this.rebirthAddPlusMust)
        localStorage.setItem('rebirth', this.rebirth)
        localStorage.setItem("addPlusPrice", this.addPlusPrice)
        this.render()
        return
      }

      alert('Недостаточно средств для ребиртка')
    })
  }

  render() {
    this.balance.textContent = this.balanceStorage
    this.updateCountText.textContent = this.addPlus
    this.rebirthPriceTitle.textContent = this.rebirthPrice
    this.rebirthCount.textContent = this.rebirth
    this.rebirthClickEl.textContent = this.rebirthAddPlusMust
    this.updateCountPriceText.textContent = this.addPlusPrice
  }
}

new Combat()
