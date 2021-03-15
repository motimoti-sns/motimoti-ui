import axios, { AxiosInstance } from 'axios'
import { Post } from '../types/Post'
import { User } from '../types/User'

/**
 * Jwt required params type.
 */
export type JwtRequired = {
  /**
   * jwt.
   */
  jwt: string
}

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
 * CreatePostParams type.
 */
export type CreatePostParams = {
  user_id: User['id']
  text: string
} & JwtRequired

/**
 * PostWithUser type.
 */
export type PostWithUser = Post & {
  user: User
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
  constructor(baseURL: string = process.env.NEXT_PUBLIC_API_URL) {
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
   * fetch all users.
   *
   * @returns user array.
   */
  async users(): Promise<User[]> {
    const res = await this.http.get<User[]>('/api/users')

    return res.data
  }

  /**
   * create a post.
   *
   * @param params create post params.
   */
  async createPost({ jwt, ...params }: CreatePostParams): Promise<void> {
    return this.http.post('/api/post', params, {
      headers: {
        Authorization: jwt,
      },
    })
  }

  /**
   * returns all posts.
   *
   * @param param0 get posts params.
   */
  async posts({ jwt }: JwtRequired): Promise<Post[]> {
    const res = await this.http.get<Post[]>('/api/posts/0/1000', {
      headers: {
        Authorization: jwt,
      },
    })

    return res.data
  }

  /**
   * returns all posts with user field.
   *
   * @param param0 get posts params.
   */
  async postsWithUser({ jwt }: JwtRequired): Promise<PostWithUser[]> {
    const posts = await this.posts({ jwt })
    const users = await this.users()

    const postsWithUser = posts.map((p) => ({
      ...p,
      user: users.find((u) => u.id === p.user_id),
    }))

    return postsWithUser
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
