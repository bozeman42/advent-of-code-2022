const canvas = document.getElementById('visualize')
const ctx = canvas.getContext('2d')
const WINDOW_SIZE = 245 * 3

canvas.height = WINDOW_SIZE
canvas.width = WINDOW_SIZE

const SIZE = Math.ceil(WINDOW_SIZE / (245 + 25))

function mapToCanvasSize(value) {
    const posValue = value + 25
    return (posValue / 245) * WINDOW_SIZE
}


window.fetch('/ropedata')
    .then(response => response.json())
    .then(data => {
        
        animate(data)
    })
    .catch(error => {
        console.log('Failed to fetch', error)
    })

let frame = 0

function animate(data) {
    function animation(time) {
        const rope = data[frame]
        console.log(data[frame])
        ctx.fillStyle = 'black'
        ctx.fillRect(0,0, WINDOW_SIZE, WINDOW_SIZE)
        ctx.fillStyle = 'white'
        rope.forEach(segment => {
            const [x, y] = segment
            console.log(mapToCanvasSize(x), mapToCanvasSize(y))
            ctx.fillRect(mapToCanvasSize(x), mapToCanvasSize(y), SIZE, SIZE)
        })
        frame = frame < data.length - 2 ? frame + 1 : 0
        requestAnimationFrame(animation)
    }
    animation()
}
