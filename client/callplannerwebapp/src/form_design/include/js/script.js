/* ---------------------------------------------------------------
script.js - 스크립트, 2015 Wonchang Shin 
---------------------------------------------------------------- */
(function($) { 
    $(document).ready(init);
    function init() {
	hideLabel();
	addRequiredStar();
	setConfiguration('input:not(:checkbox)');
    };
	
    function hideLabel() {
	$('label', '#reg').not('[for=accept_terms]').addClass('blind');
    };
	
    function addRequiredStar() {
	var target = $('[required]', '#reg');
	    $('<span/>', {
		text: '*',
		css: {'color': '#ff4248', 'font': 'bold 12px Verdana',
			'vertical-align': 'middle', 'margin-left': '5px' }
	}).insertAfter(target);
    };
	
    var session = null;
    var connection;
    var selfView = document.getElementById('selfView');
    var remoteView = document.getElementById('remoteView');
    var localStream, remoteStream;

    function createOutboundCall() {
	var configuration = {
	    'ws_servers': ['wss://192.168.0.20:7443'],
	    'uri': 'sip:01089995723@192.168.0.20:5060',
	    'password': '1234',
	    'register': false,
	    'display_name': 'Wonchang Shin' 
	};

	var pcConfig = {
	    'iceServers': [
	    {'urls': 'stuns:stun.l.google.com:19302'}
	    ] 
	};

	var ua = new JsSIP.UA(configuration);
	ua.start();
	console.log('ua.start: ', ua);

	var options = $.extend({
	    login: null,
	    passwd: null,
	    socketUrl: 'ws://192.168.0.20:8081', 
	    tag: null,
	    localTag: null,
	    videoParams: {},
	    audioParams: {},
	    loginParams: {},
	    iceServers: false,
	    ringSleep: 6000
	}, options);


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
	};
	var opts = {
	    'eventHandlers': eventHandlers,
	    'mediaConstraints': {'audio': true, 'video': false},
/*
	    'pcConfig': {
		'iceServers': [
		{'urls': 'stuns:stun.l.google.com:19302'}
		] 
	    },
*/
	    'rtcConstraints': {
		'optional': [
		    {'DtlsSrtpKeyAgreement': true}
		]
	    }, 
	    'sessionTimersExpires': '180'
	};

	ua.on('connected', function(data) {
	    console.log('WebRTC Socket event: connected ', data);
	    ua.call('sip:7600@192.168.0.20:5060', opts);
	});
	ua.on('newRTCSession', function(data) {
	    console.log('newRTCSession: ', data);
	    session = data.session;
	    connection = data.session.connection;
	    console.log('RTCPeerConnection: ', connection);

	    selfView = document.getElementById('selfView');
	    console.log('selfView: ', selfView);
	    remoteView = document.getElementById('remoteView');
	    console.log('remoteView: ', remoteView);

	    //setCallEventHandlers(data);
	    session.on('connecting', function(e) {
		console.log('connecting: ', e);
	    });
	    session.on('accepted', function(e) {
		console.log('call accepted: ', e);
		// Fired when the call is accepted(2XX received/sent)
		// Attach the streams to the views if it exists
		if(connection.getLocalStreams().length > 0) {
		    localStream = connection.getLocalStreams()[0];
		    console.log('localStream: ', localStream);
		    if(selfView != null) 
			selfView = JsSIP.rtcninja.attachMediaStream(selfView, localStream);
		    console.log('selfView: ', selfView);
		}
	    });
	    session.on('addstream', function(e) {
		console.log('addstream: ', e);
		// Fired when a remote stream is added
		remoteStream = e.stream;
		console.log('remoteStream: ', e.stream);
		if(remoteView != null) 
		    remoteView = JsSIP.rtcninja.attachMediaStream(remoteView, remoteStream);
		console.log('remoteView: ', remoteView);
	    });
	    session.on('newDTMF', function(data) {
		console.log('newDTMF: ', data);
		if(data.dtmf.tone == '0') {
		    console.log("DTMF value is ", data.dtmf.tone);
/*
		    // TODO: need to find a way to get 'eventChannel' for conference
		    rpcClient.call('verto.subscribe', {
			eventChannel: 'conference-liveArray.callplan@192.168.0.20',
			subParams: {} 
		    });
*/
		    // TODO
		    //gotoPage();
		};
	    });
	});
    };

    

    function setConfiguration(target) {
	var $button = $('#reg_new'),
	    input_ready = true,
	    input_name, input_sipuri, input_pass, input_wsserver;

	console.log('button: ', $button);
	$button.bind('click', function(e) {
	    $(target).each(function() {
		var $this = $(this);
		if($this.attr('required') && $this.val() == '') {
		    console.log('input required: ', $this.attr('name'));	
		    input_ready = false;
		    return;
		};
	    });

	    if(input_ready) {
		e.preventDefault();
		console.log('input_ready: ', input_ready)

		createOutboundCall();
		setCbForSendPin();
		setCbForEndOutboundCall();
	    /*
	       $button.connect( {
	       });
	     */
	    };
	});	
    };

    function setCbForSendPin() {
	var $checkbox = $('#accept_terms');

	var tones = '54520';
	var opts = {
	    'duration': 160,
	    'interToneGap': 1200
	};
	$checkbox.bind('focus', function(e) {
	    console.log('checkbox focus: ', e)
	});
	$checkbox.bind('blur', function(e) {
	    console.log('checkbox focus: ', e)
	});
	$checkbox.bind('click', function(e) {
	    session.sendDTMF(tones, opts);
	    console.log('checkbox click, sendDTMF: ', tones)
	});
    };

    function setCbForEndOutboundCall() {
	var $end_button = $('#reg_del');

	$end_button.bind('focus', function(e) {

	});
	$end_button.bind('blur', function(e) {
	});
	$end_button.bind('click', function(e) {
	    session.terminate();
	    console.log('End Buttion clicked, terminate session: ', e)
	    e.preventDefault();
	});
    };

    function gotoPage() {
	location.href = "../confroom/index.html";
    };

})(jQuery);
