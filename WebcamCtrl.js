function WebcamController (elem, template) {
    this.elem = elem;
    this.template = template;
    this.data = {};

    this.data.height = 500; // TODO
    this.data.width = 500; // TODO

    this.data.videoElemId = 'video_' + Date.now();
    this.data.canvasElemId = 'canvas_' + Date.now();
    this.data.buttonElemId = 'button_' + Date.now();

    this.elem.addEventListener('click', function (e) {
        if (e.target.getAttribute('id') === this.data.buttonElemId) {
            this.takeImageSequence();
        }
    }.bind(this));

    Object.observe(this.data, this.render.bind(this));

    this.requestPermission();
}
WebcamController.prototype = new Controller();
WebcamController.prototype.requestPermission = function (callback) {
    navigator.webkitGetUserMedia({ // TODO webkit
            'video': true
        }, function (stream) {
            this._handleStream(stream);
            if (callback) {
                callback(); // TODO
            }
        }.bind(this), function (error) {
            throw new Error(error);
        });
};
WebcamController.prototype._handleStream = function (stream) {
    this.stream = stream;
    this.data.videoStreamUrl = window.webkitURL.createObjectURL(stream); // TODO Webkit
};
WebcamController.prototype._drawImage = function () {
    var canvas = document.getElementById(this.data.canvasElemId).getContext('2d');
    canvas.drawImage(document.getElementById(this.data.videoElemId), 0, 0);
    return this;
};
WebcamController.prototype._getImage = function () {
    return document.getElementById(this.data.canvasElemId).toDataURL();
};
WebcamController.prototype.takeImage = function () {
    this._drawImage();
    this.emit('new', this._getImage());
};
WebcamController.prototype.takeImageSequence = function (qty, interval) {
    var t = this, // TODO bind
        images = [];
    qty = qty || 10;
    interval = interval || 30;
    (function () {
        var counter = 0,
            timer = setInterval(function () {
                t._drawImage();
                images.push(t._getImage());
                counter++;
                if (counter >= qty) {
                    clearTimeout(timer);
                    t.emit('new', images);
                }
            }, interval);
    }());
};
