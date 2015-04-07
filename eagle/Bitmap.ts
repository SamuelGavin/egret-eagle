module eagle {
    export class Bitmap extends egret.Bitmap {

        private _irregularMask:egret.DisplayObject;

        private _bitmap:egret.Bitmap;

        private _container:egret.DisplayObjectContainer;

        private _useIrregularMask:boolean = false;

        /**
         * ��Ⱦ����
         * @member {egret.Texture} egret.Bitmap#texture
         */
        public get texture():egret.Texture{
            return this["_texture"];
        }

        public set texture(value:egret.Texture){
            if(value==this["_texture"]){
                return;
            }
            this._setSizeDirty();
            this["_texture"] = value;
            if (this._useIrregularMask) {
                this._bitmap.texture = value;
                this.updateMask();
            }
        }

        /**
         * ���²���������, ��irregularMask���Ƹı��ʱ�����ֶ�����
         */
        public updateMask() {
            // ���������֣�ʹ�� RenderTexture + BlendMode ʵ�֣�������÷�ʽ��δ�����һ����
            // ʵ��ԭ�� ����һ�� Container�������������һ��ͼƬ��Ȼ�������һ���ɰ棬�����ɰ�Ļ��ģʽ����Ϊ������Ȼ����� Container ͨ�� RenderTexture ����Ϊһ������
            var texture = new egret.RenderTexture();
            //Ϊ��֤���������ȷ������clipRect�������涨����RenderTexture��Сֻ��mask�����С
            texture.drawToTexture(this._container, new egret.Rectangle(
                this._irregularMask.x,
                this._irregularMask.y,
                this._irregularMask.width,
                this._irregularMask.height));
            this._setSizeDirty();
            this["_texture"] = texture;
        }

        /**
         * ����������
         * @param value
         */
        public set irregularMask(value:egret.DisplayObject) {
            if (!this._useIrregularMask) {
                this._container = new egret.DisplayObjectContainer();
                this._bitmap = new egret.Bitmap();
                this._bitmap.texture = this.texture;
                this._container.addChild(this._bitmap);
                value.blendMode = egret.BlendMode.ERASE_REVERSE;
                this._container.addChild(value);
            } else {
                this._container.removeChild(this._irregularMask);
                this._container.addChild(value);
            }
            this._irregularMask = value;
            this.updateMask();
        }

    }
}

