import controller from './client'

// controller
const begin = id => {
  const notify = controller.join(id)

  let size = 25

  const update = (data = {}) => {
    notify(data)

    ctx.fillStyle = 'black'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    if (!data.down)
      return

    ctx.fillStyle = 'white'
    ctx.beginPath()
    ctx.arc((start.x || canvas.width / 2), (start.y || canvas.height / 2), size, 2 * Math.PI, false)
    ctx.fill()
    ctx.beginPath()
    ctx.fillStyle = 'gray'
    ctx.arc(data.x * size + (start.x || canvas.width / 2), data.y * size + (start.y || canvas.height / 2), 10, 2 * Math.PI, false)
    ctx.fill()
  }

  document.body.innerHTML = ''

  const canvas = document.createElement('canvas')
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight

  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    update()

    window.scrollTo(0,1)
  })

  document.body.appendChild(canvas)

  const ctx = canvas.getContext('2d')

  update()

  let start = {}
  let isDown = false

  const handler = down => e => {
    e.preventDefault()

    let t = e.touches[0] || { pageX: 0, pageY: 0 }

    if (e.touches.length == 1 && e.type == 'touchstart') {
      start = {
        x: t.pageX,
        y: t.pageY,
      }
    }

    const out = {
      x: t.pageX - start.x,
      y: t.pageY - start.y,
      down
    }

    const len = Math.sqrt(out.x * out.x + out.y * out.y)

    let hh = size

    update({
      x: (len > hh ? out.x / len * hh : out.x) / hh,
      y: (len > hh ? out.y / len * hh : out.y) / hh,
      down: !!e.touches.length,
      amt: e.touches.length
    })
  }

  canvas.addEventListener('touchstart', handler(true))
  canvas.addEventListener('touchmove', handler(true))
  canvas.addEventListener('touchend', handler(false))

  ctx.fillStyle = 'black'
  ctx.fillRect(0, 0, canvas.width, canvas.height)
}

let form = document.querySelector('#connectForm')

form.onsubmit = e => {
  e.preventDefault()

  begin(form.id.value)
}

window.begin = begin


// Reciver
controller.listen(id => {
  console.log(id);

  return data => console.log('data ->', data)
})

window.join = controller.join
