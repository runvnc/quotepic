import fetch from 'node-fetch'
import delay from 'delay'
import checkDiskSpace from 'check-disk-space'

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

const KB = 1024
const MB = 1024 * KB
const GB = 1024 * MB

export async function generateImage(addr, author) {
  let space = await checkDiskSpace('/')
  console.log({space})
  if (space < 50*GB) throw new Error('Low disk space, cannot generate.')

  let url = `${base}/ngen2/${addr}?count=1`
  if (author) {
    const authorjson = JSON.stringify({author})
    let params = {count:1, forceVariants: authorjson}
    let query = new URLSearchParams(params).toString()
    url = `${base}/ngencustom/${addr}?${query}`
  }
  console.log('calling fetch 1')
  let res = await fetchjson(url)
  console.log('result')
  let tries = 0
  while (tries < 100) {
    let res2 = await fetchjson(`${base}/messages/${addr}`)
    console.log('.')
    if (res2 && res2.length>0) {
      console.log({res2})
      let parsed = JSON.parse(res2[0].substr(6))
      return parsed
    }
    tries++
    await delay(100)
  }
  return {error: 'Could not generate'}
}

