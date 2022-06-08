class APIClient {
  url: string = `${
    import.meta.env.DEV ? import.meta.env.VITE_LOCAL_BACKEND_URL : ''
  }`

  get(path: string) {
    return fetch(`${this.url}${path}`)
  }
}

export default new APIClient()
