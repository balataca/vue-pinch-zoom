let touches = []
let previousDistance = -1
let maxZoom = 5

function log (message) {
  let logBox = document.getElementById('log')
  let log = document.createElement('li')
  logBox.append(message, log)
}

function handleGestureStart (event) {
  event.preventDefault()
  touches.push(formatTouch(event))
}

function handleGestureMove (event) {
  event.preventDefault()

  touches.find((touch, index) => {
    if (touch.pointerId === event.pointerId) {
      touches[index] = formatTouch(event)
    }
  })

  pinchZoom(event.target)
}

function pinchZoom (element) {
  if (touches.length === 2) {
    const currentDistance = calculateDistance(touches[0], touches[1])
    const center = getCenter(touches[0], touches[1])
    const scale = currentDistance - previousDistance

    if (scale < maxZoom && previousDistance > 0) {
      element.style.transform = `scale(${scale})`
      element.style['transform-origin'] = `${center.x}px ${center.y}px`
      element.style.background = 'red'
      element.style.transition = 'all .3s'
      log(scale)
    }

    previousDistance = currentDistance
  }
}

function calculateDistance (pointA = {}, pointB = {}) {
  const deltaX = Math.pow(pointA.clientX - pointB.clientX, 2)
  const deltaY = Math.pow(pointA.clientY - pointB.clientY, 2)

  return Math.sqrt(deltaX + deltaY)
}

function handleGestureEnd (event) {
  removeTouch(event)
}

function removeTouch (event) {
  event.target.style.transform = 'scale(1)'
  touches.find((touch, index) => {
    if (touch.pointerId === event.pointerId) touches.splice(index, 1)
  })
}

function getCenter (touch1, touch2) {
  return {
    x: (touch1.clientX + touch2.clientX) / 2,
    y: (touch2.clientY + touch2.clientY) / 2
  }
}

function formatTouch (touch) {
  return {
    pointerId: touch.pointerId,
    clientX: touch.clientX,
    clientY: touch.clientY
  }
}

function bind (el) {
  if (window.PointerEvent) {
    el.onpointerdown = handleGestureStart
    el.onpointermove = handleGestureMove
    el.onpointerup = handleGestureEnd
    el.onpointercancel = handleGestureEnd
  } else {
    el.ontouchstart = handleGestureStart
    el.ontouchmove = handleGestureMove
    el.ontouchend = handleGestureEnd
    el.ontouchcancel = handleGestureEnd
  }
}

export const directive = {
  bind: bind
}

export default directive
