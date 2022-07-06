export const useStore = defineStore('wallet', {
  state: () => ({
    address: '',
    hasCharacter: false,
    isMainnet: false,
  }),
  persist: {
    enabled: true,
  },
})
