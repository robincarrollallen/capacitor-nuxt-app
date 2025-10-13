// IndexedDB core functionality
export { IndexedDBManager, createIndexedDB, defaultIndexedDB } from './indexedDB'
export type { StorageItem, IndexedDBConfig } from './indexedDB'

// Composable functions
export { useIndexedDB } from './useIndexedDB'
export { useIndexedDBCleanup } from './useIndexedDBCleanup'

// Example component
export { default as IndexedDBExample } from './IndexedDBExample.vue'
