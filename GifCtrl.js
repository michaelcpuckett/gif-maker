function GifController (elem, template) {
    this.elem = elem;
    this.template = template;

    this.data = {};
    this.data.buttonElemId = 'make_gif_button_' + Date.now();

    Object.observe(this.data, function (changes) {
        this.render();
    }.bind(this));

    this.elem.addEventListener('click', function (e) {
        if (e.target.getAttribute('id') === this.data.buttonElemId) {
            this.emit('generate');
        }
    }.bind(this));

    this.render();
}
GifController.prototype = new Controller();
GifController.prototype.generate = function (frames) {
    var gif = new GIF({
        workers: 10,
        quality: 10,
        workerScript: '/bower_components/gif.js/dist/gif.worker.js'
    });

    frames.forEach(function (frame) {
        var img = document.createElement('img');
        img.setAttribute('src', frame);
        gif.addFrame(img, {
            delay: 60
        });
    });

    gif.render();
    gif.on('finished', function (blob) {
        this.data.src = window.webkitURL.createObjectURL(blob);
    }.bind(this));
};
