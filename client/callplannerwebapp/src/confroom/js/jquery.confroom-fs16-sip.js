/* jquery.confroom.js - Conference Room Action Display 
---------------------------------------------------------------- */
(function($) {
    $(document).ready(init);
    function init() {
        createOutboundCall();
        setCbForSendPin();
        setCbForMuteCall();
        setCbForEndOutboundCall();
        inviteModalHandler();
        sendChatMessage();
        sendInvites();
    };

    var ua;
    var session = null;
    var connection;
    var selfView = document.getElementById('selfView');
    var remoteView = document.getElementById('remoteView');
    var localStream, remoteStream;
    var rpcSessId;
    var rpcClient;
    var mid;
    var FS_Version = '1.4.5'

    function createOutboundCall() {
        var configuration = {
            uri: 'sip:01089995723@192.168.0.20:5060',
            wsServers: ['wss://192.168.0.20:443'],
            traceSip: true,
            password: '1234',
            register: false,
            displayName: 'Wonchang Shin',
            stunServers: ['stun:stun.l.google.com:19302']
//            hackIpInContact: true,
//            hackViaTcp: true
        };

        var pcConfig = {
            'iceServers': [
            {'url': 'stun:stun.l.google.com:19302'}
            ] 
        };

        ua = new SIP.UA(configuration);
        ua.start();
        console.log('ua.start: ', ua);

        var opts = {
            media: {
                constraints: {
                    audio: true,
                    video: false
                },
                render: {
                    remote: document.getElementById('remoteView'),
                    local: document.getElementById('selfView')
                }
            },
        };

        ua.on('connecting', function(args) {
            console.log('>> UA event - connecting: ', args);
        });
        ua.on('connected', function() {
            console.log('>> UA event - connected');
            session = ua.invite('sip:07074145345@192.168.0.20:5060', opts);
            console.log('>> Outbound call initiated: ', session);

            session.on('progress', function(response) {
                console.log('Call progress: ', response);
            });
            session.on('accepted', function(data) {
                // Fired when the call is accepted(2XX received/sent)
                // Attach the streams to the views if it exists
                console.log('Call accepted: ', data);
            });
            session.on('dtmf', function(request, dtmf) {
                console.log('DTMF: ', dtmf);
                if(dtmf.tone == '0') {
                    console.log("DTMF value is ", dtmf.tone);
                    // TODO: need to find a way to get 'eventChannel' for conference
                    rpcClient.call('verto.subscribe', {
                        eventChannel: [
                        'conference.callplanner@192.168.0.20',
                        'conference-liveArray.callplanner@192.168.0.20',
                        'conference-chat.callplanner@192.168.0.20'
                        ],
                        subParams: {} 
                    });
                };
            });
        });
        ua.on('invite', function (session) {
            console.log('>> UA event - invite: ', session);

            session.on('progress', function(response) {
                console.log('Call progress: ', response);
            });
            session.on('accepted', function(data) {
                // Fired when the call is accepted(2XX received/sent)
                // Attach the streams to the views if it exists
                console.log('Call accepted: ', data);
            });
            session.on('dtmf', function(request, dtmf) {
                console.log('DTMF: ', dtmf);
                if(dtmf == '0') {
                    console.log("DTMF value is ", dtmf);
                    // TODO: need to find a way to get 'eventChannel' for conference
                    rpcClient.call('verto.subscribe', {
                        eventChannel: [
                        'conference.callplanner@192.168.0.20',
                        'conference-liveArray.callplanner@192.168.0.20',
                        'conference-chat.callplanner@192.168.0.20'
                        ],
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
            session.dtmf(tones, opts);
            console.log('SEND PIN click, send DTMF: ', tones)
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

    function setCbForMuteCall() {
        var $mute_button = $('#mute_button');

        var mute_tones = '0';
        var opts = {
            'duration': 160,
            'interToneGap': 1200
        };
        $mute_button.bind('focus', function(e) {

        });
        $mute_button.bind('blur', function(e) {
        });
        $mute_button.bind('click', function(e) {
//            session.dtmf(mute_tones, opts);
            var msg = {
                eventChannel: 'conference.callplanner@192.168.0.20',
                data: {
                    'application': 'conf-control',
                    'command': 'mute',
                    'id': mid,
                    'value': ''
                }
            };

            vertoSendMethod('verto.broadcast', msg);
//            console.log('Mute Buttion clicked, terminate session: ', e)
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
       var rpcSessId = $.cookie('verto_session_uuid') || generateGUID();
       $.cookie('verto_session_uuid', rpcSessId, {
       expires: 1
       });
       */

    // TODO: 'login' method should be called with calling number plus password for conference in FS
    rpcClient.call('login', {'login': '01089995723', 'passwd': '1234'}, 
        function(data) {
            console.log("JSON-RPC login success: ", data);	
            rpcSessId = data.sessid;
            console.log("JSON-RPC session ID: ", rpcSessId);	
            // TODO: need to find a way to get 'eventChannel' for conference
            rpcClient.call('verto.subscribe', {
                eventChannel: [
                'conference.callplanner@192.168.0.20',
                'conference-liveArray.callplanner@192.168.0.20',
                'conference-chat.callplanner@192.168.0.20'
                ],
                subParams: {} 
            });
        },
        function(error) {
            console.log("JSON-RPC login error: ", error);
        }
    );


    var myHashKey;
    function rpcMessageHandler(e) {
        var $room = $('#room_view');
        if(e.method == 'verto.event') {
            console.log("verto.event: ", e.params);
            var hashKey = e.params.data.hashKey;
            var room_div;
            var id;
            if(e.params.data.arrIndex == '0') {
                myHashKey = hashKey;
            };
            mid = e.params.data.data[0];
            switch(e.params.data.action) {
                case 'add':
                    $room.append($('<div/>', {
                        id: hashKey,
                        class: 'pure-u-1 pure-u-sm-1-2 pure-u-md-1-3 pure-u-lg-1-4 pure-u-xl-1-6 l-box'
                    }));
                    id = '#' + hashKey;
                    $room_div = $(id, '#room_view');
                    $room_div.append($('<img/>', {
                        class: 'pure-img-responsive member-item',
                        src: 'img/common/default_user.png',
                        alt: 'User Icon'
                    }));
                    $room_div.append($('<p/>', {
                        class: 'member-desc',
                        text: 'Caller: ' + e.params.data.data[1]
                    }));
                    $room_div.append($('<p/>', {
                        class: 'member-desc',
                        text: 'Name: ' + e.params.data.data[2]
                    }));
                    $room_div.append($('<p/>', {
                        class: 'member-desc',
                        text: 'Member ID: ' + e.params.data.data[0] + ', ' + e.params.data.data[3]
                    }));
                    if(FS_Version == '1.6.5') {
                        var list = $.parseJSON(e.params.data.data[4]);
                        $room_div.append($('<p/>', {
                            id: e.params.data.data[0],
                            class: 'member-desc',
                            text: list.oldStatus
                        }));
                    }
                    else {
                        $room_div.append($('<p/>', {
                            id: e.params.data.data[0],
                            class: 'member-desc',
                            text: e.params.data.data[4]
                        }));
                    };
                    console.log("member added: ", list);
                    break;
                case 'del': 
                    id = '#' + hashKey;
                    $(id).remove();
                    break;
                case 'modify':
                    id = '#' + hashKey;
                    $room_div = $(id, '#room_view');
                    mid = e.params.data.data[0];
                    var $member_id = $('#'+mid, id);
                    var m_status;
                    if(FS_Version == '1.6.5') {
                        m_status = $.parseJSON(e.params.data.data[4]).oldStatus;
                    }
                    else {
                        m_status = e.params.data.data[4];
                    };
                    switch(m_status) {
                        case 'FLOOR':
                            $room_div.find('img').removeClass('active talking mute').addClass('floor');
                            if(hashKey == myHashKey) {
                                $('#mute_button').text('Mute');
                            };
                            $member_id.text(m_status);
                            break;
                        case 'TALKING':
                        case 'TALKING (FLOOR)':
                            $room_div.find('img').removeClass('active floor mute').addClass('talking');
                            $member_id.text(m_status);
                            break;
                        case 'MUTE':
                            $room_div.find('img').removeClass('active talking floor').addClass('mute');
                            console.log("hashKey, myHashKey: ", hashKey, myHashKey);
                            if(hashKey == myHashKey) {
                                $('#mute_button').text('Unmute');
                            };
                            $member_id.text(m_status);
                            break;
                        case 'ACTIVE':
                            $room_div.find('img').removeClass('talking floor mute').addClass('active');
                            if(hashKey == myHashKey) {
                                $('#mute_button').text('Mute');
                            };
                            $member_id.text(m_status);
                            break;
                        default:
                            $member_id.text(m_status);
                            break;
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

    function sendChatMessage() {
        var $record_button = $('#record_button');
        $record_button.bind('focus', function(e) {

        });
        $record_button.bind('blur', function(e) {

        });
        $record_button.bind('click', function(e) {
            /*
            var msg = 'Hello Wonchang!;'

            // Register callbacks to desired call events
            var eventHandlers = {
                'succeeded': function(e) {
                    console.log('call is in progress');
                },
                'failed': function(e) {
                    console.log('call failed with cause: ', e.cause);
                }
            };

            var opts = {
                'eventHandlers': eventHandlers,
            };

            ua.message('sip:01089995723@192.168.0.20', msg, opts);
            */
            var msg = {
                eventChannel: 'conference-chat.callplanner@192.168.0.20',
                data: {
                    'to': 'conf+callplanner@192.168.0.20',
                    'body': 'This is chat test using verto.info method',
                    'from_msg_name': 'shinwc',
                    'from_msg_number': '01089995723'
                }
            };
            vertoSendMethod('verto.info', msg); 

            msg = {
                eventChannel: 'conference-chat.callplanner@192.168.0.20',
                data: {
                    'action': 'send',
                    'message': 'This is chat test using verto.info method',
                    'type': 'message'
                }
            };
            vertoSendMethod('verto.broadcast', msg);
        });
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
                    var dest_number = input_value.split(';');
                    for(var i=0; i<dest_number.length; i++) {
                        /*
                        vertoSendMethod('fsapi', {
                            'name': 'callplan',
                            'sessid': rpcSessId,
                            'cmd': 'bgapi',
                            'arg': 'originate sofia/internal/' + dest_number[i] + ' 01089995723'
                        });
                        */
                        vertoSendMethod('fsapi', {
                            'name': 'callplan',
                            'sessid': rpcSessId,
                            'cmd': 'bgapi',
                            'arg': 'conference callplanner bgdial sofia/internal/' + dest_number[i] + '@192.168.0.20 01089995723 Wonchang Shin'
                        });
                    };
                };
            });
        });
    };
})(jQuery);


