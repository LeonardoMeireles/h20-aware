export class Point {
    constructor(index, x, y) {
        this.x = x;
        this.y = y;
        this.fixedY = y;
        this.speed = 0.025;
        this.cur = index;
        this.max = Math.random() * 100 + 30;
    }

    update() {
        this.cur += this.speed;
        this.y = this.fixedY + Math.sin(this.cur) * this.max;
    }
}

export class Wave {
    constructor(index, totalPoints, color) {
        this.index = index;
        this.totalPoints = totalPoints;
        this.color = color;
        this.points = [];
    }

    resize(stageWidth, stageHegiht) {
        this.stageWidth = stageWidth;
        this.stageHegiht = stageHegiht;
        this.centerX = stageWidth / 2;
        this.centerY = stageHegiht / 2;

        this.pointGap = this.stageWidth / (this.totalPoints - 1);

        this.init();
    }

    init() {
        this.points = [];
        for (let i = 0; i < this.totalPoints; i++) {
            const point = new Point(this.index + i, this.pointGap * i, this.centerY);
            this.points[i] = point;
        }
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.fillStyle = this.color;

        let prevX = this.points[0].x;
        let prevY = this.points[0].y;

        ctx.moveTo(prevX, prevY);

        for (let i = 0; i < this.totalPoints; i++) {
            this.points[i].update();

            const cx = (prevX + this.points[i].x) / 2;
            const cy = (prevY + this.points[i].y) / 2;
            ctx.quadraticCurveTo(prevX, prevY, cx, cy);
            prevX = this.points[i].x;
            prevY = this.points[i].y;
        }

        ctx.lineTo(prevX, prevY);
        ctx.lineTo(this.stageWidth, this.stageHegiht);
        ctx.lineTo(this.points[0].x, this.stageHegiht);
        ctx.fill();
        ctx.closePath();
    }
}

export class WaveGroup {
    constructor() {
        this.totalWaves = 3;
        this.totalPoints = 6;

        this.color = ["rgba(0,199,235,0.4)", "rgba(0,146,199,0.4)", "rgba(0,87,185,0.4)"];
        this.waves = [];

        for (let i = 0; i < this.totalWaves; i++) {
            const wave = new Wave(i, this.totalPoints, this.color[i]);
            this.waves[i] = wave;
        }
    }

    resize(stageWidth, stageHegiht) {
        for (let i = 0; i < this.totalWaves; i++) {
            const wave = this.waves[i];
            wave.resize(stageWidth, stageHegiht);
        }
    }

    draw(ctx) {
        for (let i = 0; i < this.totalWaves; i++) {
            const wave = this.waves[i];
            wave.draw(ctx);
        }
    }
}
