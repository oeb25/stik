import Peer from 'peerjs'

export const listen = (cb) => {
  const peer = new Peer({ key: 'o455vp5n9epnwmi' })

  peer.on('open', id => {
    let onChange = cb(id)
    peer.on('connection', conn => conn.on('data', onChange))
  })
}

export const join = id => {
  const peer = new Peer({ key: 'o455vp5n9epnwmi' })
  const conn = peer.connect(id)

  return data => conn.send(data)
}
export default { listen, join }
