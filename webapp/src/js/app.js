$(document).ready(function () {
    (function() {
        $('.chat-box').hide();
        var getRooms = function() {
            return $.get('http://localhost:3000/rooms', function(data){
                if(!data.status) {
                    return;
                }

                var qtd = data.rooms.length;

                $('.channels').append(templateRoomTitle(qtd));

                data.rooms.forEach((room, index) => {
                    $('.channels').append(templateRoomItem(room));
                });

            }).fail(function (err) {
                $('.channels').append(templateRoomTitle(0));
            });
        }

        var getUsers = function() {
            return $.get('http://localhost:3000/users', function(data) {
                if (!data.status) {
                    return;
                }

                data.users.forEach((user, index) => {
                    $('.messages').append(templateUser(user));
                });


            }).fail(function (err) {
                console.log(err);
            });
        }

        getRooms();
        getUsers();
    })()

    var socket = io('//localhost:3000');
    var currentRoom;
    var currentUser;


    function templateMessage(option) {
        var div = $(document.createElement('div')).addClass('col-xs-12 message');
        var div2 = $(document.createElement('div')).addClass('avatar col-xs-6 col-md-1');
        var h2 = $(document.createElement('h2'));
        var p = $(document.createElement('p')).addClass('text col-xs-6 col-md-11');

        if (option) {
            h2[0].innerHTML = option.who;
            p[0].innerHTML = option.message;
        }

        div2.append(h2);
        div.append(div2);
        div.append(p);

        return div;
    }

    function templateRoomTitle(qtd) {
        var li = $(document.createElement('li')).addClass('list-group-item title');
        var h4 = $(document.createElement('h4'));
        h4[0].innerHTML = `Channels(${qtd})`;

        li.append(h4);
        return li;
    }

    function templateRoomItem(room) {
        var li = $(document.createElement('li')).addClass('list-group-item channel');
        var i = $(document.createElement('i')).addClass('fa fa-comment-o');
        li.attr('data-channel', room._id);
        li.attr('data-name', room.name);
        i[0].innerHTML = room.name;
        li.append(i);

        return li;
    }

    function templateUser(user) {
        var li = $(document.createElement('li')).addClass('list-group-item user');
        li.attr('data-name', user.name);
        li.attr('data-user', user._id);
        li.html(user.name);

        return li;
    }

    $('.messages').on('click', '.user', function (e) {
        var userName = $(this).attr('data-name');
        var user = $(this).attr('data-user');

        socket.emit('join user', {
            user: user,
            userName: userName
        });

        $('.conversation').html('');

        return false;

    });


    $('.channels').on('click', '.channel', function(e) {
       var roomId = $(this).attr('data-channel');
       var roomName = $(this).attr('data-name');

       socket.emit('join room', {
           room: roomId,
           roomName: roomName
       });

       $('.username').html('');

       return false;
    });


    $('#message').on('keypress', function (e) {

        if (e.which === 13 || e.keyCode === 13) {
            var message = $(this).val();

            if (!message) {
                return;
            }
            // send information, can be a message or a json object
            if (!currentRoom) {
                socket.emit('message user', {
                   message,
                   user: currentUser
                });
            } else {
                socket.emit('message room', {
                    message,
                    room: currentRoom
                });
            }

            $('.conversation').append(templateMessage({who: 'L', message: message}));

            $('#message').val('');

            return false;
        }
    });

    $('#leave').on('click', function (e) {
        var roomId = $(this).attr('data-box');

        socket.emit('leave room', {
            room: roomId
        });

        return false;
    });

    // receives information
    socket.on('messaged', function (data) {
        if (!data.message){
            return;
        }

        $('.conversation').append(templateMessage({who: 'L', message: data.message}));
    });
    
    socket.on('joined room', function (data) {
        currentRoom = data.room;
        $('#leave').attr('data-box', data.room);
        $('.username').html(`@${data.roomName}`);
        $('.chat-box').show();
    });

    socket.on('joined user', function (data) {
        currentUser = data.user;
        $('#leave').attr('data-box', data.user);
        $('.username').html(`@${data.userName}`);
        $('.chat-box').show();

    })

    socket.on('leaved room', function (data) {
        currentRoom = undefined;
        currentUser = undefined;
        $('.chat-box').hide();
    });
});


