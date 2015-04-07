module eagle {
    export class Shape extends egret.Shape {

        /**
         * ��ȡ Shape �е� Graphics ����
         * @member {egret.Graphics} egret.Shape#graphics
         */
        public get graphics():Graphics {
            if (!this["_graphics"]) {
                this["_graphics"] = new Graphics();
                this.needDraw = true;
            }
            return this["_graphics"];
        }

    }
}

