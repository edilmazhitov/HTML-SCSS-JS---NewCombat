class Combat {
  selectors = {
    balance: '[data-js-balance]',
    plus: '[data-js-plus]',
    update: '[data-js-add-new]',
    updateCount: '[data-js-add-count]',
    rebirthCount: '[data-js-rebirth-count]',
    rebirthBtn: '[data-js-rebirth-btn]',
  }

  constructor() {
    this.balanceStorage = Number(localStorage.getItem('balance')) || 0
    this.addPlus = Number(localStorage.getItem('addPlus')) || 1
    this.rebirth = Number(localStorage.getItem('rebirth')) || 0
    this.balance = document.querySelector(this.selectors.balance)
    this.plusBtn = document.querySelector(this.selectors.plus)
    this.updateBtn = document.querySelector(this.selectors.update)
    this.updateCountText = document.querySelector(this.selectors.updateCount)

    this.rebirthCount = document.querySelector(this.selectors.rebirthCount)
    this.rebirthBtn = document.querySelector(this.selectors.rebirthBtn)

    this.rebirthCount.textContent = this.rebirth
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
      if (this.balanceStorage >= 20) {
        this.addPlus += 1 + (this.rebirth > 1 ? this.rebirth * 0.25 : 0)
        this.balanceStorage -= 20
        this.updateCountText.textContent = this.addPlus
        localStorage.setItem('addPlus', this.addPlus)
        localStorage.setItem('balance', this.balanceStorage)
        this.render()
      }
    })
  }

  rebirthFunction() {
    this.rebirthBtn.addEventListener('click', () => {
      if (this.addPlus >= 10 && this.balanceStorage >= 100) {
        this.addPlus = 1
        this.balanceStorage = 0
        this.addPlus = 0
        this.rebirth++

        localStorage.setItem('balance', this.balanceStorage)
        localStorage.setItem('addPlus', this.addPlus)
        localStorage.setItem('rebirth', this.rebirth)
        this.render()
      }

      alert('Недостаточно средств для ребиртка')
    })
  }

  render() {
    this.balance.textContent = this.balanceStorage
    this.updateCountText.textContent = this.addPlus
  }
}

new Combat()
