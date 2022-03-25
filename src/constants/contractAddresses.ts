type Address = {
  [index: string]: string
}

interface Addresses{
  [index: string]: Address
}

export const contractAddresses: Addresses = {
  PresaleErc20: {
    56: '0x0AAB22f764BdAB3De18Ee3a5b52A898185b9CD1F',
    97: '0x6A768C2BF98dB2204D53ceddb8d527c8386A9DbF',
  },
  RIP: {
    56: '',
    97: '0x9ACF3fCaee2F0d40F684DEF891B201C706A60B42',
  },
  aRIP: {
    56: '0x484CEe75a3A29C7E1903d2229BB953d22a6e0785',
    97: '0x4665FCD0fADbE594493A211D5e58FE48FD35BB1F',
  },
  aRIPMigration: {
    56: '',
    97: '0x253397F37C0B9C5249D811597140CfF3CE4170D5',
  },
}