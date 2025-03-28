import { create } from "zustand";


export let useStore = create((set, get) => ({
        
    value: 'RGB', // Initial state
    currentValue: () => set(state => ({ value: state.value})), 
    setValue: (newValue) => set({ value: newValue}),

    showLabels: false, 
    setShowLabels: (show) => set({ showLabels: show }),

    showTrace: false, 
    setShowTrace: (show) => set({ showTrace: show }),

    dateChange: '2023-04-21',
    currentDate: () => set(state => ({ date: state.dateChange })),
    setDateChange: (date) => set({ dateChange: date }),

    tabChange: 'leaves',
    currentTab: () => set(state => ({ tab: state.tabChange })),
    setTabChange: (tab) => set({ tabChange: tab }),




}))
