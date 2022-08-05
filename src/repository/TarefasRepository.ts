/*class TarefasRepository {
	const axios = require('axios');

	async function makeRequest() {

	    const config = {
	        method: 'get',
	        url: 'http://192.168.103.14:3000/'
	    }

	    let res = await axios(config)
 
	    console.log(res.status);
	}
}
*/

import Axios, { AxiosInstance } from 'axios'

export interface IEntity { 
  example: string
}

export interface ISdk {
  getAllAsync: () => Promise<IEntity[]>
}

export default class TarefasRepository implements ISdk {
  protected axiosInstance: AxiosInstance

  constructor () {
    this.axiosInstance = Axios.create({
      baseURL: 'http://192.168.103.14:3000/',
      timeout: undefined // TODO: Consider making this configurable
    })

    this.addAuthInterceptor(this.axiosInstance)
  }

  protected addAuthInterceptor (instance: AxiosInstance): void {
    instance.interceptors.request.use(async (config) => {
      const accessToken = await this.getAccessTokenAsync()
      if(config && config.headers) config.headers.Authorization = accessToken
      return config
    }, async (error) => {
      return await Promise.reject(error)
    })
  }

  protected async getAccessTokenAsync (): Promise<string> {
    return '123' // TODO: Real implementation
  }

  public async getAllAsync (): Promise<IEntity[]> {
    const response = await this.axiosInstance.get('Entity')
    console.log(response.data)
    return response.data
  }
}