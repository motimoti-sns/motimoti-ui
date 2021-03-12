import axios, { AxiosInstance } from 'axios'

/**
 * RegisterParams type.
 */
export type RegisterParams = {
  email: string
  name: string
  password: string
}

/**
 * API Client class.
 */
export class Client {
  /**
   * http client.
   */
  readonly http: AxiosInstance

  /**
   * Client constructor.
   *
   * @param baseURL Base API URL.
   */
  constructor(baseURL: string) {
    this.http = axios.create({
      baseURL,
    })
  }

  /**
   * register a user and returns the jwt token.
   *
   * @param params register params.
   */
  async register(params: RegisterParams): Promise<string> {
    const res = await this.http.post('/api/register', params)

    return res.data
  }
}
