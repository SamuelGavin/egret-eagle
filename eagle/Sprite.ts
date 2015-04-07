module eagle {
    export class Sprite extends egret.Sprite {

        /**
         * ��ȡ Sprite �е� Graphics ����
         * ָ�����ڴ� sprite �� Graphics �����ڴ� sprite �п�ִ��ʸ����ͼ���
         * @member {egret.Graphics} egret.Sprite#graphics
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
