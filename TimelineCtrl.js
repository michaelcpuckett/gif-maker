function TimelineController (elem, template) {
    this.elem = elem;
    this.template = template;
    this.data = {};
    this.data.frames = [];

    Object.observe(this.data, function (changes) {
        this.render();
    }.bind(this));

    Object.observe(this.data.frames, function (changes) {
        this.render();
    }.bind(this));

    this.data.clearAllButtonElemId = 'clear_button_' + Date.now();

    this.elem.addEventListener('click', function (e) {
        if (e.target.getAttribute('id') === this.data.clearAllButtonElemId) {
            this.data.frames = [];
        }
    }.bind(this));

    this.render();
}
TimelineController.prototype = new Controller();
TimelineController.prototype.addFrame = function (frame) {
    if (Array.isArray(frame)) {
        frame.forEach(function (f) {
            this.addFrame(f);
        }.bind(this));
    } else {
        this.data.frames.push(frame);
    }
};
TimelineController.prototype.getFrames = function () {
    return this.data.frames;
}
