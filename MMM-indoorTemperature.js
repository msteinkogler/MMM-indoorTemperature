/*
Provided under the MIT License.

Copyright (c) 2017 Matthias Steinkogler

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

Module.register("MMM-indoorTemperature", {
  // Default module config.
  defaults: {
  },

  start: function () {
    Log.info("Starting module: " + this.name);

    this.indoorTemperature = '';
    this.indoorHumidity = '';
  },

  getDom: function () {
    var wrapper = document.createElement("div");
    wrapper.className = "bright large light";

    if ((this.indoorTemperature === '') || (this.indoorHumidity === '')) {
      wrapper.innerHTML = "Loading...";
      wrapper.className = "dimmed light small";
      return wrapper;
    }

    var div = document.createElement("div");
    div.innerHTML += "<span class='bold'>" + this.indoorTemperature + "</span>&deg;C&nbsp;";
    div.innerHTML += "<span class='bold'>" + this.indoorHumidity + "</span>%";
    wrapper.appendChild(div);

    return wrapper;
  },

	notificationReceived: function (notification, payload, sender) {
		if (notification === "INDOOR_TEMPERATURE") {
      this.indoorTemperature = payload.toFixed(1);
      this.updateDom();
    }
    if (notification === "INDOOR_HUMIDITY") {
      this.indoorHumidity = payload.toFixed(0);
      this.updateDom();
    }
  },

});
