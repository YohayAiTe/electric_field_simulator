class Arrow {
    /** @param {Vector} */
    #vec

    /**
     *
     * @param {Vector} pos
     * @param {Vector} field
     * @param {number} positiveRatio
     * @param {number} length
     */
    constructor(pos, field, positiveRatio, length) {
        this.pos = pos
        this.field = field
        this.positiveRatio = positiveRatio

        this.#vec = Vector.fromPolar(length, field.angle)
    }

    /**
     * @returns {Vector}
     */
    get tip() {
        return this.pos.add(this.#vec)
    }

    /**
     *
     * @param {CanvasRenderingContext2D} ctx
     * @param {number} fieldMax
     */
    render(ctx, fieldMax) {
        if (this.positiveRatio < 0.5) {
            ctx.fillStyle = `hsla(0, ${100 - 200 * this.positiveRatio}%, 50%, ${this.field.length / fieldMax})`
        } else {
            ctx.fillStyle = `hsla(240, ${200 * this.positiveRatio - 100}%, 50%, ${this.field.length / fieldMax})`
        }

        const perp = new Vector(-this.#vec.y, this.#vec.x)

        /** @type {Vector[]} */
        const points = [
            perp.scale(1 / 8), perp.scale(-1 / 8),
            perp.scale(-1 / 8).add(this.#vec.scale(2 / 3)), perp.scale(-1 / 3).add(this.#vec.scale(2 / 3)),
            this.#vec.copy(), perp.scale(1 / 3).add(this.#vec.scale(2 / 3)),
            perp.scale(1 / 8).add(this.#vec.scale(2 / 3)),
        ]

        let p = points[points.length - 1].add(this.pos)
        ctx.beginPath()
        ctx.moveTo(p.x, p.y)
        for (const point of points) {
            p = point.add(this.pos)
            ctx.lineTo(p.x, p.y)
        }
        ctx.fill()
    }
}