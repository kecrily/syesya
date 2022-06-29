export const useStore = defineStore('wallet', {
  state: () => ({
    address: '',
    isConnect: false,
    hasProfile: false,
    isMainnet: false,
  }),
  persist: {
    enabled: true,
  },
})
