import fetch from 'node-fetch'
import delay from 'delay'

const base = 'https://algonfts.art'

const fetchjson = async (url) => {
  let res = await (await fetch(url)).text()
  let obj
  try {
    obj = JSON.parse(res)
  } catch (e) {
    throw new Error('generate request failed')
  }
  return obj
}

export async function generateImage(addr) {
  const url = `${base}/ngen2/${addr}?count=1`
  let res = await fetchjson(`${base}/ngen2/${addr}?count=1`)
  let tries = 0
  while (tries < 100) {
    let res2 = await fetchjson(`${base}/messages/${addr}`)
    if (res2 && res2.length>0) return res2
    tries++
    await delay(330)
  }
  return {error: 'Could not generate'}
}
