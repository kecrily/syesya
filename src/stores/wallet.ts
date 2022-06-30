export const useStore = defineStore('wallet', {
  state: () => ({
    address: '',
    hasProfile: false,
    isMainnet: false,
  }),
  persist: {
    enabled: true,
  },
})
