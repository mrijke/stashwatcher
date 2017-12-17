const responseJSON = (res: Response) => res.json();

export const requests = {
  get: (url: string) =>
    fetch(url)
      .then(responseJSON)
      .catch(error => console.log(error)),
};

export type CoinType = "btc" | "ltc" | "doge" | "eth";

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
  balance: ({ type, address }: IFetchAddressPayload): Promise<IAddressInfo> =>
    requests.get(
      `https://api.blockcypher.com/v1/${type}/main/addrs/${address}/balance`
    ),
  valuta: (type: CoinType): Promise<number> => {
    let objectName: string;
    let url = "https://api.kraken.com/0/public/Ticker?pair=";
    switch (type) {
      case "btc":
        url += "XBTEUR";
        objectName = "XXBTZEUR";
        break;
      case "ltc":
        url += "LTCEUR";
        objectName = "XLTCZEUR";
        break;
      case "eth":
        url += "ETHEUR";
        objectName = "XETHZEUR";
        break;
      default:
        throw new Error(`Undefined CoinType: ${type}`);
    }
    return requests.get(url).then(res => {
      return res.result[objectName].c[0];
    });
  },
};
