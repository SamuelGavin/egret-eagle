module eagle {
    export class Bitmap extends egret.Bitmap {

        private _irregularMask:egret.DisplayObject;

        private _bitmap:egret.Bitmap;

        private _container:egret.DisplayObjectContainer;

        private _useIrregularMask:boolean = false;

        private _renderTexture:egret.RenderTexture;

        /**
         * ��Ⱦ����
         * @member {egret.Texture} egret.Bitmap#texture
         */
        public get texture():egret.Texture {
            return this["_texture"];
        }

        public set texture(value:egret.Texture) {
            if (this._bitmap && this._bitmap.texture == value) {
                return;
            }
            if (this._useIrregularMask) {
                this._bitmap.texture = value;
                this.updateMask();
            } else {
                this["_texture"] = value;
            }
        }

        /**
         * ���²���������, ��irregularMask���Ƹı��ʱ�����ֶ�����
         */
        public updateMask() {
            // ���������֣�ʹ�� RenderTexture + BlendMode ʵ�֣�������÷�ʽ��δ�����һ����
            // ʵ��ԭ�� ����һ�� Container�������������һ��ͼƬ��Ȼ�������һ���ɰ棬�����ɰ�Ļ��ģʽ����Ϊ������Ȼ����� Container ͨ�� RenderTexture ����Ϊһ������
            //Ϊ��֤���������ȷ������clipRect�������涨����RenderTexture��Сֻ��mask�����С
            this._renderTexture.drawToTexture(this._container, new egret.Rectangle(
                this._irregularMask.x,
                this._irregularMask.y,
                this._irregularMask.width,
                this._irregularMask.height));
            this._setSizeDirty();
            egret.Logger.info("updateMask");
        }

        /**
         * ����������
         * @param value
         */
        public set irregularMask(value:egret.DisplayObject) {
            if (!this._useIrregularMask) {
                this._useIrregularMask = true;
                this._container = new egret.DisplayObjectContainer();
                this._bitmap = new egret.Bitmap();
                this._bitmap.texture = this.texture;
                this._container.addChild(this._bitmap);
                value.blendMode = egret.BlendMode.ERASE_REVERSE;
                this._container.addChild(value);
                this._renderTexture = new egret.RenderTexture();
                this["_texture"] = this._renderTexture;
            } else {
                this._container.removeChild(this._irregularMask);
                this._container.addChild(value);
            }
            this._irregularMask = value;
            this.updateMask();
        }

        public get irregularMask() {
            return this._irregularMask;
        }

    }
}

