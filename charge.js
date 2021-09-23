class Charge {
    static K = 89875517923

    /**
     *
     * @param {number} charge
     * @param {Vector} pos
     * @param {number} radius
     */
    constructor(charge, pos, radius) {
        this.charge = charge
        this.pos = pos
        this.radius = radius
    }

    /**
     *
     * @param {Vector} pos
     * @returns {Vector}
     */
    fieldAt(pos) {
        const strength = Charge.K * this.charge / pos.sub(this.pos).length2
        const r = pos.sub(this.pos)
        return r.scale(strength / r.length)
    }

    /**
     *
     * @param {CanvasRenderingContext2D} ctx
     */
    render(ctx) {
        ctx.lineWidth = 7
        if (this.charge < 0) {
            ctx.fillStyle = "#fbb"
            ctx.strokeStyle = "#f00"
        } else if (this.charge > 0) {
            ctx.fillStyle = "#bbf"
            ctx.strokeStyle = "#00f"
        } else {
            ctx.fillStyle = "#bbb"
            ctx.strokeStyle = "#555"
        }

        ctx.beginPath()
        ctx.arc(this.pos.x, this.pos.y, this.radius, 0, 2 * Math.PI)
        ctx.fill()
        ctx.beginPath()
        ctx.arc(this.pos.x, this.pos.y, this.radius, 0, 2 * Math.PI)
        ctx.stroke()

        const crossCenter = this.pos.add(new Vector(0, -1).scale(this.radius / 2))
        const crossRadius = this.radius / 4
        ctx.beginPath()
        if (this.charge !== 0) {
            ctx.moveTo(crossCenter.x - crossRadius, crossCenter.y)
            ctx.lineTo(crossCenter.x + crossRadius, crossCenter.y)
        }
        if (this.charge > 0) {
            ctx.moveTo(crossCenter.x, crossCenter.y - crossRadius)
            ctx.lineTo(crossCenter.x, crossCenter.y + crossRadius)
        }
        ctx.stroke()

        ctx.fillStyle = ctx.strokeStyle
        ctx.textBaseline = "top"
        ctx.textAlign = "center"
        ctx.font = `${18 * this.radius / 43.55}px Arial`
        ctx.fillText(metricPrefix(Math.abs(this.charge)) + "C", this.pos.x, this.pos.y)
    }
}