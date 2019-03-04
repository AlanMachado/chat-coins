$(document).ready(function () {
    (function() {
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

        getRooms();
    })()

    var socket = io('//localhost:3000');

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
        var li = $(document.createElement('li')).addClass('list-group-item');
        var i = $(document.createElement('i')).addClass('fa fa-comment-o');
        li.attr('data-channel', room._id)
        i[0].innerHTML = room.name;
        li.append(i);

        return li;
    }

    // receives information
    socket.on('message', function (data) {
        $('.conversation').append(templateMessage({who: 'L', message: data}));
    });


    $('#message').keypress(function (e) {

        if (e.which === 13) {
            var val = $(this).val();

            // send information, can be a message or a json object
            socket.emit('message', val);

            return false;
        }
    });

});


