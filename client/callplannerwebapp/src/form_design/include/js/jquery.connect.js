/* jquery.connect.js - JsSIP Call Connect jQuery 플러그인
$(대상).connect(설정);	
---------------------------------------------------------------- */
;(function($) {
	$.fn.connect = function(options) {
		options = $.extend({
			name: 'Wonchang Shin', 
			sipuri: 'sip:1001@192.168.100.207:5060',
			pass: '990915',
			wsservers: ['wss://192.168.100.207:7443']
		}, options)
		var configuration = {
			'ws_servers': options.wsservers,
			'uri': options.sipuri,
			'password': options.pass,
			'display_name': options.name
		};
		
		var ua = new JsSIP.UA(configuration);
		
		ua.start();
		console.log('ua.start: ', ua);

		// Make an audio/video call
		var session = null;
		
		// HTML5 <video> elements in which local and remote video will be shown
		var selfView = document.getElementById('my-video');
		var remoteView = document.getElementById('peer-video');
		var pc, 
			constraints = { optional: [] }, 
			peerconnection;
			
		cbSuccess = function(stream) {
			pc.addStream(stream);
			console.log('getUserMedia() success: ', stream);	
		};
		
		cbFailure = function(err) {
			console.log('getUserMedia() failed: ', err);
		};
				
		// Register callbacks to desired call events
		var eventHandlers = {
			'registered': function() {
				console.log('registered: ', e.response);
			},
			'registrationFailed': function() {
				console.log('registration failed: ', e.response, e.cause);
			},
			'progress': function(e) {
				console.log('call is in progress');
			},
			'failed': function(e) {
				console.log('call failed with cause: ', e.cause);
			},
			'ended': function(e) {
				console.log('call ended with cause: ', e.cause);
			},	 
			'confirmed': function(e) {
				var local_stream = session.connection.getLocalStreams()[0];
				console.log('call confirmed');
				
				// Attach local stream to selfView
				selfView = JsSIP.rtcninja.attachMediaStream(selfView, local_stream);
			},
			'addstream': function(e) {
				var stream = e.stream;
				
				console.log('remote stream added');
				
				// Attach local stream to selfView
				remoteView = JsSIP.rtcninja.attachMediaStream(remoteView, stream);
			},
			'peerconnection': function(e) {
				console.log('peerconnection: ', e);
				//JsSIP.rtcninja.getUserMedia({audio:true, video:false}, cbSuccess, cbFailure);
			},
			'newRTCSession': function(e) {
				console.log('newRTCSession: ', e);
				session = e.session;
				pc = e.session.connection;
				console.log('RTCPeerConnection: ', pc);
			}	
		};
		
		var opts = {
			'eventHandlers': eventHandlers,
			'mediaConstraints': {'audio': true, 'video': false},
			'pcConfig': {
				'iceServers': [
					{'urls': 'stuns:stun.l.google.com:19302'}
				] 
			}
		};
		
		ua.on('connected', function(data) {
			console.log('WebRTC Socket event: connected ', data);
						
			ua.call('sip:3000@192.168.100.207:5060', opts);
		});
		ua.on('newRTCSession', function(data) {
			console.log('newRTCSession: ', data);
			session = data.session;
			pc = data.session.connection;
			console.log('RTCPeerConnection: ', pc);

		});

		return this.each(function() {

		});
	};
})(jQuery);


