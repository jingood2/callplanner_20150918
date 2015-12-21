/* jquery.confroom.js - Conference Room Action Display 
---------------------------------------------------------------- */
(function($) {
    $(document).ready(init);
    function init() {
        initialize();
        createOutboundCall();
        inviteModalHandler();
        sendInvites();
    };

    var selfView = document.getElementById('selfView');
    var remoteView = document.getElementById('remoteView');
    var sessionId;
    var FS_Version = '1.4.5';

    var cur_call= null;
    var verto;
    var conf;
    var chatting_with = false;
    var pvtData;
    var enableDtmf = true;
    var conference_number = '07074145345';
    var user_number;
    var caller_name = 'Wonchang Shin';

    function messageTextToJQ(body) {
    // Builds a jQuery collection from body text, linkifies http/https links, imageifies http/https links to images, and doesn't allow script injection

        var match, $link, img_url, $body_parts = $(), rx = /(https?:\/\/[^ \n\r]+|\n\r|\n|\r)/;

        while ((match = rx.exec(body)) !== null) {
            if (match.index !== 0) {
                $body_parts = $body_parts.add(document.createTextNode(body.substr(0, match.index)));
            }   

            if (match[0].match(/^(\n|\r|\n\r)$/)) {
                // Make a BR from a newline
                $body_parts = $body_parts.add($('<br />'));
                body = body.substr(match.index + match[0].length);
            } else {
                // Make a link (or image)
                $link = $('<a target="_blank" />').attr('href', match[0]);

                if (match[0].search(/\.(gif|jpe?g|png)/) > -1) {
                    // Make an image
                    img_url = match[0];

                    // Handle dropbox links
                    if (img_url.indexOf('dropbox.com') !== -1) {
                        if (img_url.indexOf('?dl=1') === -1 && img_url.indexOf('?dl=0') === -1) {
                            img_url += '?dl=1';
                        } else if (img_url.indexOf('?dl=0') !== -1) {
                            img_url = img_url.replace(/dl=0$/, 'dl=1');
                        }   
                    }   

                    $link.append($('<img border="0" class="chatimg" />').attr('src', img_url));
                } else {
                    // Make a link
                    $link.text(match[0]);
                }   

                body = body.substr(match.index + match[0].length);
                $body_parts = $body_parts.add($link);
            }   
        }   
        if (body) {
            $body_parts = $body_parts.add(document.createTextNode(body));
        }   

        return $body_parts;
    } // END function messageTextToJQ

    var callbacks = {
        onMessage: function(verto, dialog, msg, data) {
            console.log("data: ", data);
            switch (msg) {
                case $.verto.enum.message.pvtEvent:
                    console.log("pvtEvent: ", data.pvtData);
                    if (data.pvtData) {
                        switch (data.pvtData.action) {
                            case "conference-liveArray-part":
                                break;
                            case "conference-liveArray-join":
                                console.log("conference-liveArray-join, data: ", data);
                                pvtData = data.pvtData;
                                verto.subscribe(data.pvtData.laChannel, {
                                    handler: function(v, e) {
                                        handleMessage(e);
                                    }
                                });
                                chatting_with = data.pvtData.chatID;
                                break;
                        }
                    }
                    break;
                case $.verto.enum.message.info:
                    var body = data.body;
                    var from = data.from_msg_name || data.from;

                    if(body.slice(-1) !== '\n') {
                        body += '\n';
                    }
                    $('#chatwin')
                        .append(from + ': ')
                        .append(body)
                    /*
                    $('#chatwin').append($('<span/>', {
                        class: 'member-desc',
                        text: from + ': ' + messsageTextToJQ(body) + '\n'
                    }));
                    */
                    $('#chatwin').animate({"scrollTop": $('#chatwin')[0].scrollHeight}, "fast");

                    if(data.from_msg_number != cur_call.params.caller_id_number) {
                        alert(body);
                    }
                    break;
                default:
                    break;
            }
        },

        onDialogState: function(d) {
            cur_call = d;

            var ringing = false;
            if (d.state == $.verto.enum.state.ringing) {
                ringing = true;
            } else {
                ringing = false;
            }   

            switch (d.state) {
                case $.verto.enum.state.ringing:
                    console.log("Call From: ", d.cidString());
                    break;
                case $.verto.enum.state.trying:
                    console.log("Calling: ", d.cidString());
                    break;
                case $.verto.enum.state.early:
                case $.verto.enum.state.active:
                    console.log("Talking to: ", d.cidString());
                    break;
                case $.verto.enum.state.hangup:
                    console.log("Call ended with cause: ", d.cause);
                case $.verto.enum.state.destroy:
                    cur_call = null;
                    break;
                case $.verto.enum.state.held:
                    break;
                default:
                    break;
            }
        },
        
        onWSConnect: function(o) {
            console.log("JSON-RPC client connect: ", o);
        },	
        onWSLogin: function(e) {
            console.log("JSON-RPC client login: ", e);
        },
        onWSClose: function(success) {
            console.log("RPC client close: ", success);
        },
        onEvent: function(v, e) {
            console.error('GOT EVENT: ', e);
        },
    };


    function createOutboundCall() {
        if(cur_call) {
            return;
        }

        user_number = (new Date).getTime();
        console.log("user_number: ", user_number);

        cur_call = verto.newCall({
            destination_number: conference_number,
            caller_id_name: caller_name,
            caller_id_number: user_number.toString(),
            useVideo: false,
            useStereo: false,
            useCamera: false,
            useMic: true
        });
    };

    function setupChat() {
        $("#chatwin").html("");

        $("#chatsend").click(function() {
            if (!cur_call && chatting_with) {
                return;
            }   

            cur_call.message({to: chatting_with, 
                body: $("#chatmsg").val(), 
                from_msg_name: cur_call.params.caller_id_name, 
                from_msg_number: cur_call.params.caller_id_number
            });  
            $("#chatmsg").val("");
        }); 

        $("#chatmsg").keyup(function (event) {
            if (event.keyCode == 13 && !event.shiftKey) {
                $( "#chatsend" ).trigger( "click" );   
            }   
        }); 

    }

    function addMemberToRoom(data) {
        var $room = $('#room_view');
        var key = data.hashKey;

        $room.append($('<div/>', {
            id: key,
            class: 'pure-u-1 pure-u-sm-1-2 pure-u-md-1-3 pure-u-lg-1-4 pure-u-xl-1-6 l-box'
        }));

        var id = '#' + key;
        var $room_div = $(id, '#room_view');

        $room_div.append($('<img/>', {
            class: 'pure-img-responsive member-item',
            src: 'img/common/default_user.png',
            alt: 'User Icon'
        }));
        $room_div.append($('<p/>', {
            class: 'member-desc',
            text: 'Caller: ' + data.data[1]
        }));
        $room_div.append($('<p/>', {
            class: 'member-desc',
            text: 'Name: ' + data.data[2]
        }));
        $room_div.append($('<p/>', {
            class: 'member-desc',
            text: 'Member ID: ' + data.data[0] + ', ' + data.data[3]
        }));
        if(FS_Version == '1.6.5') {
            var list = $.parseJSON(data.data[4]);
            $room_div.append($('<p/>', {
                id: data.data[0],
                class: 'member-desc',
                text: list.oldStatus
            }));
        }
        else {
            $room_div.append($('<p/>', {
                id: data.data[0],
                class: 'member-desc',
                text: data.data[4]
            }));
        };
        console.log("member added");
    }

    function modifyMemberInRoom(data) {
        var id = '#' + data.hashKey;
        var $room_div = $(id, '#room_view');
        var $member_id = $('#' + data.data[0], id);
        var m_status;
        if(FS_Version == '1.6.5') {
            m_status = $.parseJSON(data.data[4]).oldStatus;
        }
        else {
            m_status = data.data[4];
        };
        switch(m_status) {
            case 'FLOOR':
                $room_div.find('img').removeClass('active talking mute').addClass('floor');
                $member_id.text(m_status);
                $('#muteall_button').text('Mute All');
                break;
            case 'TALKING':
            case 'TALKING (FLOOR)':
                $room_div.find('img').removeClass('active floor mute').addClass('talking');
                $member_id.text(m_status);
                break;
            case 'MUTE':
                $room_div.find('img').removeClass('active talking floor').addClass('mute');
                $('#muteall_button').text('Unmute All');
                $member_id.text(m_status);
                break;
            case 'ACTIVE':
                $room_div.find('img').removeClass('talking floor mute').addClass('active');
                $('#muteall_button').text('Mute All');
                $member_id.text(m_status);
                break;
            default:
                $member_id.text(m_status);
                break;
        };
    }

    function handleMessage(e) {
        if(e.eventChannel == pvtData.laChannel) {
            sessionId = e.data.hashKey;
            //console.log("sessionId: ", sessionId);
        }
        console.log('Session ID: ' + sessionId + ', verto.event: ', e);

        var $room = $('#room_view');
        var hashKey = e.data.hashKey;
        var room_div;
        var id;
        mid = e.data.data[0];
        switch(e.data.action) {
            case 'add':
                addMemberToRoom(e.data);
                break;
            case 'del': 
                id = '#' + hashKey;
                $(id).remove();
                break;
            case 'modify':
                id = '#' + hashKey;
                if($(id).length < 1) {
                    addMemberToRoom(e.data);
                };
                modifyMemberInRoom(e.data);
                break;
        };
    };


    function initialize() {
        cur_call = null;

        verto = new $.verto({
            login: '0220145453',
            passwd: '1234',
            socketUrl: 'wss://221.146.204.182:8082',
            tag: 'remoteView',
            localTag: 'selfView',
            iceServers: true
        }, callbacks);

        $(document).keypress(function(event) { 
            var key = String.fromCharCode(event.keyCode || event.charCode); 
            var i = parseInt(key); 

            if(enableDtmf) {
                if (key === "#" || key === "*" || key === "0" || (i > 0 && i <= 9)) { 
                    cur_call.dtmf(key); 
                } 
            }
        });

        setupChat();
        setCbForEndOutboundCall();
        setCbForMuteAll();
        setCbForLockCall();
    };

    function setCbForEndOutboundCall() {
        var $end_button = $('#end_button');

        $end_button.bind('focus', function(e) {

        });
        $end_button.bind('blur', function(e) {
        });
        $end_button.bind('click', function(e) {
            verto.hangup();
            cur_call = null;
            console.log('End Buttion clicked, terminate session: ', e)
        });
    };

    function setCbForMuteAll() {
        var $muteall_button = $('#muteall_button');

        $muteall_button.bind('focus', function(e) {

        });
        $muteall_button.bind('blur', function(e) {
        });
        $muteall_button.bind('click', function(e) {
            console.log('Mute Buttion clicked: ', e);
            /* Mute a member by sending a verto command which will be effective on FS version 1.6.5 or above 
            var msg = {
                data: {
                    'application': 'conf-control',
                    'command': 'mute',
                    'id': mid,
                    'value': ''
                }
            };
            verto.broadcast(laChannel, msg);
            */

            var arg = 'conference ' + pvtData.laName;
            switch($muteall_button.text()) {
                case 'Mute All': 
                    arg = arg + ' mute all';
                    break;
                case 'Unmute All':
                    arg = arg + ' unmute all';
                    break;
                default:
                    break;
            };
            vertoSendMethod('fsapi', {
                'name': pvtData.laName,
                'sessid': sessionId,
                'cmd': 'bgapi',
                'arg': arg
            });
        });
    };

    function setCbForLockCall() {
        var $lock_button = $('#lock_button');

        $lock_button.bind('focus', function(e) {

        });
        $lock_button.bind('blur', function(e) {

        });
        $lock_button.bind('click', function(e) {
            console.log('Lock Buttion clicked: ', e);
            var arg = 'conference ' + pvtData.laName;
            var cmd = $lock_button.text().toLowerCase();
            var text;
            if(cmd == 'lock') {
                text = 'Unlock';
            }
            else {
                text = 'Lock';
            };
            vertoSendMethod('fsapi', { 
                'name': pvtData.laName,
                'sessid': sessionId,
                'cmd': 'bgapi',
                'arg': arg + ' ' + cmd
            });
        });
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
            enableDtmf = false;
        });

        $('#invite_modal').on('hidden.bs.modal', function(event) {
            console.log('hidden event fired! ', event);
            enableDtmf = true;
        });
    };

    function vertoSendMethod(method, params) {
        verto.sendMethod(method, params,
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
                        var arg = 'conference ' + pvtData.laName;
                        var cmd = 'bgdial sofia/internal/' + dest_number[i] + '@221.146.204.182 01089995723'
                        vertoSendMethod('fsapi', {
                            'name': pvtData.laName,
                            'sessid': sessionId,
                            'cmd': 'bgapi',
                            'arg': arg + ' ' + cmd
                        });
                    };
                };
            });
        });
    };
})(jQuery);


