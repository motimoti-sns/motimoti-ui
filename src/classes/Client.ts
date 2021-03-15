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
 * LoginParams type.
 */
export type LoginParams = {
  email: string
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
   * on jwt changed callback function.
   */
  private onJwtChangedFn?: (jwt: string) => void

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

  /**
   * login to the user and returns the jwt token.
   *
   * @param params login params.
   */
  async login(params: LoginParams): Promise<string> {
    const jwt = await this.http
      .post<string>('/api/login', params)
      .then(({ data }) => {
        this.onJwtChangedFn && this.onJwtChangedFn(data)

        return data
      })

    return jwt
  }

  /**
   * set on jwt changed callback function.
   *
   * @param callback on jwt changed callback function.
   */
  onJwtChanged(callback: Client['onJwtChangedFn']): void {
    this.onJwtChangedFn = callback
  }
}
