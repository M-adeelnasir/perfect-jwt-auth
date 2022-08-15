import jwt from 'jsonwebtoken'
const privateKey = `-----BEGIN RSA PRIVATE KEY-----
MIICXgIBAAKBgQC/c8a9iPkSVSJAoF/FqMB9K1T4ktU42Y/F4M4skRDovUCaE8TK
raBMiMAMKiv5aSLi22BW5tmVvIjdKNC5Lg34xyHds9c/Ge/XwSCADQpJbEr+UbiC
mCQF9bznMQ/WyjFNjIZOe3/KbOGRqPCKTvYmk4EH4+RYATzmxfX7nlV2kwIDAQAB
AoGBALE6f/Pc5JUv8jFZRM85VFeK0XH6mx+xZwKLBNEEyV5qM29udXIaIJY40W9x
apvL09ulsR1BPpL6oMf6jJ2gIJVd5VuyqjyL3gSI18b6n58nQ5eyVsScB6UbHH2S
/HGkpvJQ7MRzf4X5cdvZuGp7KhvaMd1HmzHIOMI8Siq4u1yhAkEA4mnR66XyIKsj
YpRJE3NtOI49Zav5KFkJY+zdce/Xi/ejm3BDU/xkkVbTcBWEyxt+rYltyORAwrif
v7QVoinbtwJBANh4aAqI55uhkdtqVwAti9A1aERH2m0Ot1rmOxGJEIoGdUOCR/v3
WUMPXu0rjJjzN/UIXWLrMGVgtBt9Ozo1NAUCQAmR02+UWgGLejlmbxhFXq5vRKUR
ebx81urETi/MpV2jH+Un/5CDMHT8KH+qSSyUguwuzNca3qncR9RAdlGeV00CQQCF
F5KwV3g/QdmR1BHltBswSoXu5Vawksm9A6zxnRokItBaT3G+w1eIWZz9qTbqmy+e
YiQ4u22oBwr1k8ukgC2ZAkEAuyd/tqRhE7VD6lsEzblLSK4XD0iXV5w6A7OcUyzg
2VLpkKTMdqq7S3q8+18Cmhy6QhRfAfe6Dyb1H384OewiNQ==
-----END RSA PRIVATE KEY-----`

const publicKey = `-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC/c8a9iPkSVSJAoF/FqMB9K1T4
ktU42Y/F4M4skRDovUCaE8TKraBMiMAMKiv5aSLi22BW5tmVvIjdKNC5Lg34xyHd
s9c/Ge/XwSCADQpJbEr+UbiCmCQF9bznMQ/WyjFNjIZOe3/KbOGRqPCKTvYmk4EH
4+RYATzmxfX7nlV2kwIDAQAB
-----END PUBLIC KEY-----`

//jwt sign
export function jwtSign(payload: object, expiresIn: number | string) {
  const token = jwt.sign(payload, privateKey, { expiresIn })
  return token
}

//jwt verify
export async function verifyToken(token: string) {
  try {
    const decoded = await jwt.verify(token, privateKey)

    console.log(decoded)

    return { valid: true, expired: false, decoded }
  } catch (err: any) {
    return {
      valid: true,
      //ts-ignore
      expired: err.message === 'jwt expired',
      decoded: null,
    }
  }
}
