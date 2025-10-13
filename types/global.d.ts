declare global {
  type Recordable<T = any> = Record<string, T>
	type ActivityVariables = Record<string, string | number>
	type ActivityRulesMap = Record<string, {
	  [Key: string]: string
	}>
}

export {}
