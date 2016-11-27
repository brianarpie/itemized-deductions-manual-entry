/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

var DEFAULT_BASE_URL = "https://itemized.buwuwei.com";
var storage = window.localStorage;
var baseUrl = storage.getItem('baseUrl');

if (storage.getItem('baseUrl') == null) {
  storage.setItem('baseUrl', DEFAULT_BASE_URL);
}

var app = {
    // Application Constructor
    initialize: function() {
      this.bindEvents();
      // document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        this.receivedEvent('deviceready');

        if (navigator.connection.type == Connection.NONE) {
            navigator.notification.alert('An internet connection is required to continue');
        } else {
            console.log('changed window location');
        }

        $('#baseUrlInput').val(storage.getItem('baseUrl'));
        $('#launchApp').click(function(){
            app.showApp();
        });

        cordova.getAppVersion.getVersionNumber().then(function (version) {
            $('.version').text("(v" + version + ")");
        });

        if (cordova.platformId === 'ios') {
            StatusBar.overlaysWebView(false);
            // StatusBar.backgroundColorByName('lightGray');
        }
    },

    showApp: function () {
      var url = $('#baseUrlInput').val();
      storage.setItem('baseUrl', url);
      window.location = url;
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

app.initialize();
