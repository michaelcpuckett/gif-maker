function Controller () {}
Controller.prototype.on = function (ev, callback) {
    this._on = this._on || {};
    this._on[ev] = this._on[ev] || [];
    this._on[ev].push(callback);
};
Controller.prototype.emit = function (ev, data) {
    this._on = this._on || {};
    this._on[ev] = this._on[ev] || [];
    this._on[ev].forEach(function(callback) {
        callback(data);
    });
};
Controller.prototype.render = function () {
    this.elem.innerHTML = this.renderEngine.render(this.template, this.data);
};
Controller.prototype.renderEngine = Mustache;
