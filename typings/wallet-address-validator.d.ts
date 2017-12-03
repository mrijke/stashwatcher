declare module "wallet-address-validator" {
  type Currency =
    | "bitcoin" | "BTC"
    | "litecoin" | "LTC"
    | "peercoin" | "PPC"
    | "dogecoin" | "DOGE"
    | "beavercoin" | "BVC"
    | "freicoin" | "FRC"
    | "protoshares" | "PTS"
    | "megacoin" | "MEC"
    | "primecoin" | "XPM"
    | "auroracoin" | "AUR"
    | "namecoin" | "NMC"
    | "biocoin" | "BIO"

  type NetworkType = "prod" | "test" | "both";

  interface WAValidator {
    validate: (address: string, currency?: Currency, networkType?: NetworkType) => boolean;
  }

  const WAValidatorStatic: WAValidator;

  export = WAValidatorStatic;
}
