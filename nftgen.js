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

export async function generateImage(addr) {
  let space = await checkDiskSpace()
  console.log({space})
  if (space < 50*GB) throw new Error('Low disk space, cannot generate.')

  const url = `${base}/ngen2/${addr}?count=1`
  let res = await fetchjson(`${base}/ngen2/${addr}?count=1`)
  let tries = 0
  while (tries < 100) {
    let res2 = await fetchjson(`${base}/messages/${addr}`)
    if (res2 && res2.length>0) {
      let parsed = JSON.parse(res2[0].substr(6))
      return parsed
    }
    tries++
    await delay(330)
  }
  return {error: 'Could not generate'}
}

await generateImage('O3PLKXUNEXXLLZXTX6A3GRQK46IV3DDUNJ7VOWXEBCL3CBHPCTNTAQHJ2U')
