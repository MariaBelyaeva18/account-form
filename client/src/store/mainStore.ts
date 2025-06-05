import {defineStore} from 'pinia'
import {v4} from "uuid";

interface Errors {
  type: boolean,
  login: boolean,
  password: boolean,
}
interface Account {
  id: string | null,
  labels: { text: string | null }[],
  type: string | null,
  login: string | null,
  password: string | null,
  errors: Errors,
}
interface AccountState {
  data: Account[]
}

export const useMainStore = defineStore('main', {
  state: (): AccountState => ({
    data: JSON.parse(localStorage.getItem('accountsData') || '[]'),
  }),

  actions: {
    // Сохранение данных в localStorage
    saveToLocalStorage() {
      localStorage.setItem('accountsData', JSON.stringify(this.data));
    },

    addAccount() {
      this.data.push({
        id: v4(),
        labels: [],
        type: null,
        login: null,
        password: null,
        errors: {
          type: false,
          login: false,
          password: false,
        }
      })
    },

    // Удаление учетной записи
    removeAccount(id: string) {
      this.data = this.data.filter((account) => account.id !== id);
      this.saveToLocalStorage();
    },

    // Обновление учетной записи
    updateAccount(id: string, updatedData: Partial<Account>) {
      const accountIndex = this.data.findIndex(account => account.id === id)
      if (accountIndex !== -1) {
        const updatedAccount = {
          ...this.data[accountIndex],
          ...updatedData
        }
        this.data[accountIndex] = updatedAccount

        const errors = this.validateAccount(updatedAccount)

        console.log(errors)
        // Сохраняем только если валидация пройдена
        if (!Object.values(errors).some(error => error)) {
          this.data[accountIndex] = {
            ...updatedAccount,
            errors: errors
          };
          this.saveToLocalStorage();
          return true;
        }

        this.data[accountIndex].errors = errors
      }
      return false;
    },

    // Валидация учетной записи
    validateAccount(account: Account): Errors {
      return {
        type: !account.type?.trim(),
        login: !account.login?.trim(),
        password: account.type !== 'LDAP' && !account.password?.trim()
      }
    },

    // Преобразование строки меток в массив объектов
    parseLabels(labelsString: string): { text: string }[] {
      return labelsString.split(';')
        .map(label => label.trim())
        .filter(label => label !== '')
        .map(label => ({ text: label }))
    }
  },
})
