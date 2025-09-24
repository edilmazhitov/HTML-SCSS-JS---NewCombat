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

    this.token = localStorage.getItem('token')
    this.plusSystems()
    this.#render()
  }

  plusFunction = async () => {
    try {
      const amount = Number(localStorage.getItem('addPlus')) || 1

      const res = await fetch('http://localhost:5000/user/clickers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.token}`,
        },
        body: JSON.stringify({ amount }),
      })

      if (!res.ok) {
        const err = await res.json()
        console.error('Ошибка сервера:', err.message)
        return
      }

      const data = await res.json()

      localStorage.setItem('balance', data.balance)
      this.#render()
    } catch (err) {
      console.error('Ошибка запроса:', err)
    }
  }

  plusSystems() {
    this.clickerButtonElement.addEventListener('click', this.plusFunction)
  }

  #render() {
    const currentBalance = Number(localStorage.getItem('balance')) || 0
    this.balanceElement.textContent = currentBalance
  }
}

export default ClickButton
