import {defineStore} from 'pinia'
import {v4} from "uuid";
import type {Account, AccountState, Errors} from "@/store/interfaces/main.interfaces.ts";

export const useMainStore = defineStore('main', {
  state: (): AccountState => ({
    data: JSON.parse(localStorage.getItem('accountsData') || '[]'),
  }),

  actions: {
    // Сохранение данных в localStorage
    saveToLocalStorage(): void {
      localStorage.setItem('accountsData', JSON.stringify(this.data));
    },

    addAccount(): void {
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
    removeAccount(id: string): void {
      this.data = this.data.filter((account) => account.id !== id);
      this.saveToLocalStorage();
    },

    // Обновление учетной записи
    updateAccount(id: string, updatedData: Partial<Account>): void {
      const accountIndex = this.data.findIndex(account => account.id === id)
      if (accountIndex !== -1) {
        const updatedAccount = {
          ...this.data[accountIndex],
          ...updatedData
        }
        this.data[accountIndex] = updatedAccount

        const errors = this.validateAccount(updatedAccount)
        this.data[accountIndex].errors = errors

        // Сохраняем только если валидация пройдена
        if (!Object.values(errors).some(error => error)) {
          this.saveToLocalStorage();
        }
      }
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
