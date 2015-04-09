module eagle {
    export class Graphics extends egret.Graphics {

        /**
         * ������
         *
         * @param x Բ��λ��x
         * @param y Բ��λ��y
         * @param r �뾶
         * @param startFrom ��ʼλ�� (������)
         * @param angle ��ת�Ƕ� (������)
         * @param closeLine ���ƻ������˵ĵ�Բ�ĵ�����
         */
        arc(x:number, y:number, r:number, startFrom:number = 0, angle:number = Math.PI * 2, closeLine = false):void {
            this.moveTo(x, y);
            var PI025 = Math.PI * 0.25;
            var n:number = Math.ceil(Math.abs(angle) / PI025);
            var angleA:number = angle / n;
            if (closeLine) {
                this.lineTo(x + r * Math.cos(startFrom), y + r * Math.sin(startFrom));
            }
            else {
                this.moveTo(x + r * Math.cos(startFrom), y + r * Math.sin(startFrom));
            }
            for (var i = 1; i <= n; i++) {
                startFrom += angleA;
                var angleMid = startFrom - angleA / 2;
                var bx = x + r / Math.cos(angleA / 2) * Math.cos(angleMid);
                var by = y + r / Math.cos(angleA / 2) * Math.sin(angleMid);
                var cx = x + r * Math.cos(startFrom);
                var cy = y + r * Math.sin(startFrom);
                this.curveTo(bx, by, cx, cy);
            }
            if (angle != 360 && closeLine) {
                this.lineTo(x, y);
            }
        }
    }
}
