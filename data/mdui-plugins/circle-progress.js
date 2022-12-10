// circle-progress 圆形进度条
// by Cdm2883

var $ = mdui.$;
$.fn.extend({
    /* 初始化 */
    circle_progress: function (data) {
        let el = this;
        this.data('percent', data.percent || 0);
        this.data('color', data.color || 'theme');
        this.html(
            `<canvas></canvas>`
        );
        this.data('canvas', this.find('canvas').get(0));
        // $(this.data('canvas')).css('image-rendering', 'pixelated');
        this.circle_progress_draw();
    },
    circle_progress_draw: function (percent) {
        percent = percent || this.data('percent');
        let data = this.data(),                // 获取储存数据
            canvas = data.canvas;              // 获取canvas元素
        $(canvas).height($(canvas.parentNode).width());
        $(canvas).width($(canvas.parentNode).width());
        canvas.width = $(canvas).width();
        canvas.height = $(canvas).height();
        let context = canvas.getContext('2d'), // 获取画图环境，指明为2d
            center = canvas.width / 2,        // Canvas中心点
            rad = Math.PI * 2 / 100;           // 将360度分成100份，那么每一份就是rad度
        
        // 设置描边样式
        context.strokeStyle = data.color == 'theme' ? ($('body').hasClass('mdui-theme-layout-dark') ? 'rgba(0,0,0,.6)' : 'rgba(255,255,255,.6)') : data.color;
        context.lineWidth = canvas.width / 10; // 设置线宽
        context.beginPath();                   // 路径开始
        /* 绘制圆弧
        context.arc(x坐标,  y坐标,   半径,   起始角度,      终止角度，                     顺时针/逆时针) */
        context.arc(center, center, center, -Math.PI / 2, -Math.PI / 2 + percent * rad, false);
        context.stroke();                      // 绘制
        context.closePath();                   // 路径结束
    },
    percent: function (val) {
        if (val){
            this.data('percent', val > 100 ? 100 : val < 0 ? 0 : val);
            this.circle_progress_draw();
        }
        return this.data('percent');
    }
});