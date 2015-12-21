/* jquery.confroom.js - Conference Room Action Display 
---------------------------------------------------------------- */
(function($) {
    $(document).ready(init);
    function init() {
        createOutboundCall();
        setCbForSendPin();
        setCbForEndOutboundCall();
        inviteModalHandler();
        sendInvites();
    };

    var session = null;
    var connection;
    var selfView = document.getElementById('selfView');
    var remoteView = document.getElementById('remoteView');
    var localStream, remoteStream;
    var rpcSessid;
    var rpcClient;

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
                    // TODO: need to find a way to get 'eventChannel' for conference
                    rpcClient.call('verto.subscribe', {
                        eventChannel: 'conference-liveArray.callplan@192.168.0.20',
                        subParams: {} 
                    });
                };
            });
        });
    };

    function setCbForSendPin() {
        var $send_pin = $('#send_pin');

        var tones = '54520';
        var opts = {
            'duration': 160,
            'interToneGap': 1200
        };
        $send_pin.bind('focus', function(e) {
            console.log('SEND PIN focus: ', e)
        });
        $send_pin.bind('blur', function(e) {
            console.log('SEND PIN focus: ', e)
        });
        $send_pin.bind('click', function(e) {
            session.sendDTMF(tones, opts);
            console.log('SEND PIN click, sendDTMF: ', tones)
        });
    };

    function setCbForEndOutboundCall() {
        var $end_button = $('#end_button');

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

    rpcClient = new $.JsonRpcClient( { 
        login: options.login,
        passwd: options.passwd,
        socketUrl: options.socketUrl,
        loginParams: options.loginParams,
        sessid: null,
        onmessage: function(e) {
            //console.log("JSON-RPC client message: ", e);
            rpcMessageHandler(e.eventData);
        },	
        onWSConnect: function(o) {
            console.log("JSON-RPC client connect: ", o);
        },	
        onWSLogin: function(success) {
            console.log("JSON-RPC client login: ", success);
        },
        onWSClose: function(success) {
            console.log("RPC client close: ", success);
        }
    });
    /*
       var rpcSessid = $.cookie('verto_session_uuid') || generateGUID();
       $.cookie('verto_session_uuid', rpcSessid, {
       expires: 1
       });
       */

    // TODO: 'login' method should be called with calling number plus password for conference in FS
    rpcClient.call('login', {'login': '01089995723', 'passwd': '1234'}, 
        function(data) {
            console.log("JSON-RPC login success: ", data);	
            rpcSessid = data.sessid;
            console.log("JSON-RPC session ID: ", rpcSessid);	
        },
        function(error) {
            console.log("JSON-RPC login error: ", error);
        }
    );


    var eventList = {};
    var arrIndex = 0;
    var totalMember = 0;
    function rpcMessageHandler(e) {
        var $room_div = $('div', '#room_view');
        var $room_img = $('img', '#room_view');
        var $room_txt = $('p', '#room_view');
        var hashKey;
        if(e.method == 'verto.event') {
            console.log("verto.event: ", e.params);
            switch(e.params.data.action) {
                case 'add':
                    //console.log("<p> text: ", $room_txt);
                    console.log("BEFORE total member, arrIndex: ", totalMember, arrIndex);
                    if(arrIndex > totalMember) {
                        for(i in eventList) {
                            if(eventList[i].hashKey == null) {
                                eventList[i] = e.params.data;
                                $room_div.eq(i).removeClass('fade');
                                $room_div.eq(i).addClass('fade in');
                                //$('#room_view p:eq('+i+')').replaceWith();
                                $room_txt.eq(i).replaceWith('<p>' + eventList[i].data[1] + ', ' + eventList[i].data[2]) + '</p>';
                                console.log("eventList: ", eventList);
                                break;
                            };
                        };
                    }
                    else {
                        eventList[arrIndex] = e.params.data;
                        console.log("eventList: ", eventList);
                        $room_div.eq(arrIndex).removeClass('fade');
                        $room_div.eq(arrIndex).addClass('fade in');
                        //$('#room_view p:eq('+arrIndex+')').replaceWith(arrIndex);
                        $room_txt.eq(arrIndex).replaceWith('<p>' + eventList[arrIndex].data[1] + ', ' + eventList[arrIndex].data[2]) + '</p>';
                        arrIndex = arrIndex + 1;
                    };
                    totalMember = totalMember + 1;
                    console.log("member added: ", e.params.data.data);
                    console.log("AFTER total member, arrIndex: ", totalMember, arrIndex);
                    break;
                case 'del': 
                    totalMember = totalMember - 1;
                    hashKey = e.params.data.hashKey;
                    for(i in eventList) {
                        if(hashKey == eventList[i].hashKey) {
                            console.log("hashKey: ", hashKey);
                            eventList[i].hashKey = null;
                            console.log("member deleted: ", eventList);
                            $room_div.eq(i).removeClass('fade in');
                            $room_div.eq(i).addClass('fade');
                            $room_txt.eq(i).replaceWith('<p> </p>');
                        };
                    };
                    break;
            };
        }
        else {
            console.log("verto method: ", data.method);
        }
    };

    function inviteModalHandler() {
        var $invite_button = $('#invite_button');
        $invite_button.bind('focus', function(e) {

        });
        $invite_button.bind('blur', function(e) {

        });
        $invite_button.bind('click', function(e) {
            var $this = $('#invite_modal');
            //	    $this.removeClass('hide');
            //	    $this.addClass('fade in');
            //var aria_hidden = $this.attr({'aria-hidden': 'false'});
            console.log('Invite Buttion clicked: ', $this)
            //$this.show();
        });
    };

    function vertoSendMethod(method, params) {
        rpcClient.call(method, params,
            function(e) {
                // Success
                console.log("verto send method success: ", method, params);	
            },
            function(e) {
                // Error
                console.log("verto send method failure: ", method, params);	
            }
        );
    };

    function sendInvites() {
        var $send_invites = $('#send_invites');
        $send_invites.bind('focus', function(e) {

        });
        $send_invites.bind('blur', function(e) {

        });
        $send_invites.bind('click', function(e) {
            console.log('Send Invites: ', e)
            var target = $('input', '#invite_modal');
            $(target).each(function() {
                var $this = $(this),
                input_value = $this.val();
                if(input_value != '') {
                    console.log("Modal input value: ", input_value);
                    //vertoSendMethod('verto.info', {dtmf: input_value});
                    /*
                       vertoSendMethod('jsapi', {
                       'command': 'bgapi',
                       'name': 'callplan',
                       'sessid': rpcSessid,
                       'cmd': 'orginate',
                       'arg': 'sofia/internal/' + input_value + ' 7600' 
                       });
                       */
                    vertoSendMethod('fsapi', {
                        'name': 'callplan',
                        'sessid': rpcSessid,
                        'cmd': 'bgapi',
                        'arg': 'originate sofia/internal/' + input_value + ' 7600'
                    });
                };
            });
        });
    };
})(jQuery);


