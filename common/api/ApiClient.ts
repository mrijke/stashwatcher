const responseJSON = (res: Response) => res.json();

export const requests = {
  get: (url: string) => fetch(url).then(responseJSON).catch(error => console.log(error))
}

export type CoinType = "btc" | "ltc" | "doge";

export interface IFetchAddressPayload {
  type: CoinType;
  address: string;
}

export interface IAddressInfo {
  address: string;
  total_received: number;
  total_sent: number;
  balance: number;
  unconfirmed_balance: number;
  final_balance: number;
  n_tx: number;
  unconfirmed_n_tx: number;
  final_n_tx: number;
}

export const API = {
  balance: ({type, address}: IFetchAddressPayload): Promise<IAddressInfo> => requests.get(`https://api.blockcypher.com/v1/${type}/main/addrs/${address}/balance`)
}