let first_request_all_my_orders = true;
let first_request_all_my_otkliks = true;
let first_request_wait_to_get = true;
let first_request_making_order = true;
let we_have_unread_messages = false;
first_changecolor = true;
let count_new_otkliks = 0;
first_changecolors_for_left_otzivi = true;
let arr_who_will_change_color = []
let arr_with_published_id = []
let arr_with_id_already_clicked = []
let all_my_otkliks;
let x_for_color;
let y_for_color;


//Достать из БД все отзывы о пользователе
function get_otzivi(person)
{
    $.ajax({
        type: 'GET',
        url: 'get_otzivi',
        data: {person:person},

        success: function(dict_with_otzivi)
        {
            console.log(dict_with_otzivi)

            if(Object.keys(dict_with_otzivi).length > 0)
            {
                $('#viewOrderProfileDiv').append(`
                    <div class="otziviListDiv" id="otziviListDivID"></div>`)

                for(let key in dict_with_otzivi)
                {
                     $('#otziviListDivID').append(`
                     <div class="oneOtziv">
                        <span style='color: #00cf15'>${dict_with_otzivi[key][0]}: </span>
                        ${dict_with_otzivi[key][1]}
                     </div><hr style="margin: 0;">`)
                }
            }
            else
            {
                alert('У этого пользователя пока нет отзывов!')
            }
        }
    })
}


//Опубликовать отзыв
function publish_otziv(about_who)
{
    text_otziva = $('#otzivInputTextID').val()
    left_rating = $('#selectRating').val()

    if(text_otziva.trim() == '')
    {
        alert('Текстовое поле должно быть заполнено!')
    }
    else
    {
        $.ajax({
           type: 'GET',
           url: 'publish_otziv',
           data: {text_otziva:text_otziva, left_rating: left_rating, about_who:about_who},
           success: function(answer)
           {
               if(answer === "success")
                   alert('Отзыв успешно опубликован!')
               else
                   alert('Вы уже оставили отзыв об этом пользователе!')

               $("#forOtzivMainDivID").remove()
               $("#blackFonDiv").remove()
           }
        })
    }
}


//Оставить отзыв
function left_otziv(about_who)
{
    $('body').append(`<div id="blackFonDiv"></div>`)
    $('body').append(`
        <div class='forOtzivMainDiv' id="forOtzivMainDivID">
            <h3 style="text-align: center; color: #d4d4d4; margin-top: 2rem;">Отзыв</h3>

            <div id="forOtzivDiv">
                <input type="text" class="otzivInput" id="otzivInputTextID" placeholder="Оставьте ваше мнение о пользователе">
                <select id="selectRating">
                    <option class="mySelected1" selected>5</option>
                    <option  class="mySelected1" style="background: #135761;">4</option>
                    <option  class="mySelected1" style="background: #949013;">3</option>
                    <option  class="mySelected1" style="background: #8a5817;">2</option>
                    <option  class="mySelected1" style="background: #a62f26;">1</option>
                </select>
            </div>
            <button type="button" class="btn btn-primary btn-lg" style="margin-top: 3rem;" onclick="publish_otziv(${about_who})">Опубликовать</button>
        </div>`)
}


//Получить фотку и рейтинг юзера
function get_target_user_media(target_user, where_add_chat)
{
    $.ajax({
        type: 'GET',
        url: 'get_target_user_media',
        data: {target_user:target_user},
        success: function(photo_and_rating_dict)
        {
            let username = photo_and_rating_dict['username']

            $(`#${where_add_chat}`).append(`
            <div id="photoAndInfoDiv">
                <div id="photoHereDiv">
                    <img src="${photo_and_rating_dict['photo']}" style="width: 5; height: 5rem;">
                </div>
                <div id="infoHereDiv">
                    <div class='twoDivsInfo' id='nameAndRatingDiv'>
                        ${username} <span class="digitColor">${parseFloat(photo_and_rating_dict['rating']).toFixed(2)}</span>
                    </div>
                    <hr style="margin: 0 1rem 0 1rem; border: 0.1px solid white; opacity:0.2">
                    <div class='twoDivsInfo' id='otziviDiv' onclick='get_otzivi("${username}")'>
                        Посмотреть отзывы
                    </div>
                </div>
            </div>`)
        }
    })
}

// Отправить сообщение
function send_message(what_chat, chat_with)
{
    let message = $('#current_message').val()
    if(message.trim() == '')
    {
        alert('Нельзя отправить пустое сообщение!')
    }
    else
    {
        $.ajax({
            type: "GET",
            url: "send_message",
            contentType: "application/json; charset=utf-8",
            data: {chat_with: chat_with, message: message},

            success: function()
            {
                $('#current_message').val('')

                $(`#${what_chat}`).append(
                `<div class='myMessage'>
                    <div class="message_he">
                        ${message}
                    </div>
                </div>`)
            }
        })
    }

}


//Пуллинг чата
function chat_real_time(what_chat, chat_with)
{
    setInterval(
        function()
        {
            $.ajax({
                type: "GET",
                url: "chat_real_time",
                contentType: "application/json; charset=utf-8",
                data: {chat_with: chat_with},

                success: function(dict_of_messages)
                {
                    console.log(dict_of_messages)

                    if(Object.keys(dict_of_messages).length > 0)
                    {
                        for(let key in dict_of_messages)
                        {
                            $(`#${what_chat}`).append(
                            `<div class='myMessage' style="background:#2b3036; text-align:left">
                                <div class="message_he">
                                    ${dict_of_messages[key][3]}
                                </div>
                            </div>`)
                        }
                    }
                }
            })
        }, 3000);
}

// Написать сообщение
function write_message(what_chat, chat_with)
{
    $("#currentMessageDiv").append(
        `<textarea class="message_he" id='current_message' placeholder="Новое сообщение..." style="border: none"></textarea>
        <button type="button" class="btn btn-dark" style="position: absolute; right: 1rem; top: 0.2rem; width: 11.2rem; height: 2.6rem; border-radius: 0.7rem 0.7rem 0.7rem 0.7rem" onclick="send_message('${what_chat}', ${chat_with})">Отправить</button>
        `)

    chat_real_time(what_chat, chat_with)
}


// Достать чат из БД
function show_chat(what_chat, chat_with)
{
    let all_chat;

    $.ajax({
        type: "GET",
        url: "show_chat",
        contentType: "application/json; charset=utf-8",
        data: {chat_with: chat_with},

        success: function(all_chat)
        {
            all_chat = all_chat;

            if(Object.keys(all_chat).length > 0)
            {
                for(let key in all_chat)
                {
                    // Если сообщение не моё
                    if(all_chat[key][2] === all_chat[key][4])
                    {
                        $(`#${what_chat}`).append(
                        `<div class='myMessage' style="background:#2b3036; text-align:left">
                            <div class="message_he">
                                ${all_chat[key][3]}
                            </div>
                        </div>`)
                    }
                    else
                    {
                        $(`#${what_chat}`).append(
                        `<div class='myMessage'>
                            <div class="message_he">
                                ${all_chat[key][3]}
                            </div>
                        </div>`)
                    }
                }
            }
            write_message(what_chat, chat_with)
        }
    })

}


// Подтвердить или отклонить отклик
function action_with_otklik(action, order_id, who_replied_id, get_or_deliver){
    $.ajax({
        type: "GET",
        url: "action_with_otklik",
        contentType: "application/json; charset=utf-8",
        data: {order_id: order_id, action: action, who_replied_id: who_replied_id, get_or_deliver: get_or_deliver},

        success: function(result)
        {
            if(result === 'was_confirmed')
            {
                alert('Отклик успешно подтверждён!')
            }
            else if(result === 'was_deleted')
            {
               alert('Отклик успешно отклонён!')
            }
            window.location.href = "home";
        }
    })
}

// Отменить отклик
function cancel_otklik(order_id)
{
    $.ajax({
        type: "GET",
        url: "cancel_otklik",
        contentType: "application/json; charset=utf-8",
        data: {order_id: order_id},

        success: function()
        {
            alert('Отклик успешно отменён!')
            window.location.href = "home";
        }
    })
}


// Прочитать отклик
function was_seen_true(order_id, who_replied_id, get_or_deliver)
{

    arr_who_will_change_color = arr_who_will_change_color.filter((n) => {return n != `who_responsed_${who_replied_id}`});

    if(!arr_with_id_already_clicked.includes(who_replied_id))
    {
        arr_with_id_already_clicked.push(who_replied_id)
        $.ajax({
            type: "GET",
            url: "was_seen_true",
            contentType: "application/json; charset=utf-8",
            data: {order_id: order_id, who_replied_id: who_replied_id},

            success: function()
            {
                // alert('Отклик был просмотрен')
                let real_otklik_count = parseInt($('span#commonNotificationIcon')[0].textContent.trim()) - 1
                if(real_otklik_count < 1)
                    $('span#commonNotificationIcon').remove()
                else
                {
                    $('span#commonNotificationIcon').empty()
                    $('span#commonNotificationIcon').append(`${real_otklik_count}`)
                }
            }
        })
    }


    $(".offers_info").css({'overflow': 'hidden'})

    $( "#nav-tabContent").empty()
    $( "#nav-tabContent").append(
        `<div id="ordersIMakingChatANDProfile" style="display: flex">
            <div id="viewOrderProfileDiv">
            </div>
            <div id='all_chat' style='width: 75%; position: relative; border-left: 1px solid #4a4a4a; padding-left:0'>
                <div id="ordersIMakingChat" style='height: 17rem; overflow: auto'></div>
                <div class="write_message" id='currentMessageDiv'></div>
            </div>
        </div>
        <hr style="margin: 0; border: 1px solid white; opacity: 0.1">

        <div id="viewOrdertwoButtons">
            <button type="button" id="buttonDecline" class="btn btn-secondary btn-sm" onclick="action_with_otklik('decline', ${order_id}, ${who_replied_id}, '${get_or_deliver}')">Отклонить</button>
            <button type="button" id="buttonConfirm" class="btn btn-secondary btn-sm" onclick="action_with_otklik('confirm', ${order_id}, ${who_replied_id}, '${get_or_deliver}')">Подтвердить</button>
            <button type="button" class="btn btn-secondary btn-sm" id="goBack" onclick="get_list_people_who_responsed(${order_id}, '${get_or_deliver}')">Назад</button>
        </div>`)

        let what_chat = "ordersIMakingChat"
        get_target_user_media(who_replied_id, "viewOrderProfileDiv")
        show_chat(what_chat, who_replied_id)
}

// Подтвердить получение
function confirm_getting(order_id)
{
    $.ajax({
        type: "GET",
        url: "confirm_getting",
        contentType: "application/json; charset=utf-8",
        data: {order_id: order_id},

        success: function()
        {
            alert('Получение заказа успешно подтверждено!')
            window.location.href = "home";
        }
    })
}

// Когда кликаешь на уведомление - эта функция выводит список откликнувшихся
function get_list_people_who_responsed(order_id, get_or_deliver)
{
    $(".offers_info").css({'overflow': 'auto'})
    if(we_have_unread_messages)
    {
        if(first_changecolor)
        {
            first_changecolor = false
            changecolors()
        }
    }

    $.ajax({
        type: "GET",
        url: "get_people_who_responsed_this_order",
        contentType: "application/json; charset=utf-8",
        data: {order_id: order_id},

        success: function(dict_people_who_responsed_this_order)
        {
            if(Object.keys(dict_people_who_responsed_this_order).length > 0)
            {
                $('#nav-tabContent').empty()
                $('#nav-tabContent').append(`<div style='text-align: center; padding: 0.5rem; color: #ededed; background:#343a40; font-size:1rem'>
                    Список откликнувшихся пользователей
                </div><hr style="margin:0">`)

                let number = 1

                for(let key in dict_people_who_responsed_this_order)
                {
                    let dpwr = dict_people_who_responsed_this_order[key]

                    if(dpwr[2]===false && !arr_with_id_already_clicked.includes(dpwr[0]))
                    {
                        arr_who_will_change_color.push(`who_responsed_${dpwr[0]}`);
                    }

                    $('#nav-tabContent').append(`
                    <div class='who_responsed' id="who_responsed_${dpwr[0]}" onclick="was_seen_true(${order_id}, ${dpwr[0]}, '${get_or_deliver}')">
                        <div class="forImgDiv">
                            <img class="who_responsed_photo" src="${dpwr[3]}">
                        </div>
                        <div class="usernameAndRating">
                            <div id="usernameInListID" class="usernameDivInList">${dpwr[1]} <span class='digitColor'>${dpwr[4].toFixed(2)}</span></div>
                        </div>
                        <div class="soprMessageDiv">
                            <span style="color: #757575">Сопроводительное письмо:</span> ${dpwr[5]}
                        </div>
                    </div><hr style='margin:0'>`)

                    number += 1
                }
                $('#nav-tabContent').append(`
                    <div id="goBackListResponsedDiv">
                        <button type="button" style='height: 2.2rem; width:7rem; margin-left:0.2rem' class="btn btn-secondary btn-sm" onclick="get_all_my_orders()">Назад</button>
                    </div>`)
            } else alert("Откликов нет!")
        }
    })
}

// Удалить мою заявку
function delete_order_i_left(order_id)
{
    $.ajax({
        type: "GET",
        url: "delete_order_i_left",
        contentType: "application/json; charset=utf-8",
        data: {order_id: order_id},

        success: function()
        {
            alert('Заявка успешно удалена!')
            window.location.href = "home";
        }
    })
}



//--------------------Достаём "Мои отклики" из БД----------------------

function get_all_my_otkliks()
{
    $(".offers_info").css({'overflow': 'auto'})

    $.ajax({
        type: "GET",
        url: "get_all_my_otkliks",
        contentType: "application/json; charset=utf-8",

        success: function(dict_with_all_responsed_orders)
        {
            first_request_all_my_otkliks = false;
            all_my_otkliks = dict_with_all_responsed_orders

            $('#nav-tabContent').empty()
            $('#nav-tabContent').append(`
                <div class="tab-pane fade active show" id="nav-contact" aria-labelledby="without_responce">
                    <table class="table table-dark table-hover" id="myOtklikiTable">
                    </table>
                </div>`)

            $( "#myOtklikiTable").empty()

                 $( "#myOtklikiTable").append(`
                     <thead>
                          <tr>
                            <th scope="col">Тип</th>
                            <th scope="col">Юзер</th>
                            <th scope="col">Откуда</th>
                            <th scope="col">Куда</th>
                            <th scope="col">Время</th>
                            <th scope="col">Товар</th>
                            <th scope="col">Цена</th>
                          </tr>
                     </thead>
                     <tbody id="myOtklikiTbody"></tbody>`)

            if(Object.keys(dict_with_all_responsed_orders).length > 0)
            {
                for (let key in dict_with_all_responsed_orders)
                {
                    if(dict_with_all_responsed_orders[key][8] === 'get')
                    {
                        dict_with_all_responsed_orders[key][8] = 'Ищу доставщика'
                    }
                    else
                    {
                        dict_with_all_responsed_orders[key][8] = 'Ищу заказчика'
                    }

                    let whose_order = dict_with_all_responsed_orders[key][9]

                    $( "#myOtklikiTbody").append(
                    `<tr class="myOtklikiRow" value="whose_order_${whose_order}">
                        <td>${dict_with_all_responsed_orders[key][8]}</td>
                        <td>${dict_with_all_responsed_orders[key][1]}</td>
                        <td>${dict_with_all_responsed_orders[key][2]}</td>
                        <td>${dict_with_all_responsed_orders[key][3]}</td>
                        <td>${dict_with_all_responsed_orders[key][4]}</td>
                        <td>${dict_with_all_responsed_orders[key][5]}</td>
                        <td>${dict_with_all_responsed_orders[key][6]}</td>
                        <td class="emptyComment" style="display: none">${dict_with_all_responsed_orders[key][7]}</td>
                        <td class="emptyOrderId" style="display: none">${dict_with_all_responsed_orders[key][0]}</td>
                    </tr>
                    `)
                }
            } else {
                $('#myOtklikiTbody').append(
                `<tr>
                    <td colspan='7'>Откликов пока нет</td>
                </tr>`)
            }

        }
    })
}

//-------------------Достаём "Опубликованное" из БД--------------------

function get_all_my_orders()
{
    $.ajax({
        type: "GET",
        url: "get_all_my_orders",
        contentType: "application/json; charset=utf-8",

        success: function(dict_to_send)
        {
            let dict_with_all_my_offers = dict_to_send['dict_with_all_my_offers']
            let dict_order_id_otklik_count = dict_to_send['dict_order_id_otklik_count']
            let dict_with_all_my_otkliks = dict_to_send['dict_with_all_my_otkliks']
            count_new_otkliks = dict_to_send['count_new_otkliks']

            if(!first_request_all_my_orders)
            {
                $('#nav-tabContent').empty()
                $('#nav-tabContent').append(`
                    <div class="tab-pane fade active show" id="nav-contact" aria-labelledby="without_responce">
                        <table class="table table-dark table-hover" id="publishedTable">
                            <thead>
                                <tr>
                                    <th scope="col">Тип</th>
                                    <th scope="col">Откуда</th>
                                    <th scope="col">Куда</th>
                                    <th scope="col">Время</th>
                                    <th scope="col">Товар</th>
                                    <th scope="col">Цена</th>
                                </tr>
                            </thead>
                            <tbody id="published_table">
                            </tbody>
                        </table>
                    </div>`)
            }
            first_request_all_my_orders = false

            if(count_new_otkliks > 0)
            {
                we_have_unread_messages = true
                $("#without_responce").append(
                    `<span id="commonNotificationIcon" class="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style="font-size: 0.9rem; right: 0.6rem; min-width:1.5rem; min-height:1.3rem">
                        ${count_new_otkliks}
                    </span>`)
            }

            if(Object.keys(dict_with_all_my_offers).length > 0)
            {
                let color_tablerow;
                let get_or_deliver;

                // Заполняем таблицу всеми моими оставленными заказами
                for (let key in dict_with_all_my_offers)
                {
                    if(dict_with_all_my_offers[key][7] === 'get')
                    {
                        dict_with_all_my_offers[key][7] = 'Ищу доставщика'
                        color_tablerow = '#ebfcff'
                        get_or_deliver = 'get'
                    }
                    else
                    {
                        dict_with_all_my_offers[key][7] = 'Ищу заказчика'
                        color_tablerow = '#ebffec'
                        get_or_deliver = 'deliver'
                    }

                    let order_id = dict_with_all_my_offers[key][5]

                    $( "#published_table").append(
                    `<tr class="publishedRow">
                        <td id="myPublished_${order_id}" value="${get_or_deliver}">${dict_with_all_my_offers[key][7]}</td>
                        <td>${dict_with_all_my_offers[key][0]}</td>
                        <td>${dict_with_all_my_offers[key][1]}</td>
                        <td>${dict_with_all_my_offers[key][2]}</td>
                        <td>${dict_with_all_my_offers[key][3]}</td>
                        <td>${dict_with_all_my_offers[key][4]}</td>
                        <td class="emptyComment" style="display: none">${dict_with_all_my_offers[key][6]}</td>
                        <td class="emptyOrderId" style="display: none">${order_id}</td>
                    </tr>`)

                    // После добавления строки, добавляем id заказа в список
                    arr_with_published_id.push(order_id)
                }

                // Получаем список всех id заказов из бд, получивших отклик
                let order_id_otklik_arr = Object.keys(dict_order_id_otklik_count)

                // Для каждого id заказа на странице проверяем есть ли он в списке откликов
                for(order_id of arr_with_published_id)
                {
                    let order_id_toString = order_id.toString()

                    // Первая ячейка строки таблицы
                    let order_obj = $(`#myPublished_${order_id_toString}`)
                    let text_get_or_deliver = order_obj.attr('value')
                    let notifications_count = dict_order_id_otklik_count[order_id]

                    let first_col_subscr = "Ищу заказчика"
                    if(text_get_or_deliver === "get")
                        first_col_subscr = "Ищу доставщика"

                    // Добавляем кнопку просмотра откликов
                    order_obj.empty()
                    order_obj.css({'padding': '0', 'vertical-align': 'middle'})
                    order_obj.append(
                    `<button type="button" id="order_${order_id_toString}" class="btn btn-primary position-relative mbutton2" style='background: #1c0047; width: 100%; height: 100%' onclick="get_list_people_who_responsed(${order_id}, '${text_get_or_deliver}')">
                        ${first_col_subscr}
                    </button>`)

                    // Добавляем иконку новых уведомлений если они есть
                    if(order_id_otklik_arr.includes(order_id_toString))
                    {
                        $(`#order_${order_id_toString}`).append(
                        `<span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style="right: 0.2rem; top:0.3rem; font-size: 0.9rem; min-width:1.5rem; min-height:1.3rem">
                            ${notifications_count}
                        </span>`)
                    }
                }
            }
            else
            {
                $('#published_table').append(`
                    <tr><td colspan='6'>Заказов пока нет</td></tr>
                `)
            }
        },
    });
}

//-------------------Достаём "Жду получения" из БД--------------------

function wait_to_get()
{
    $.ajax({
        type: "GET",
        url: "wait_to_get",
        contentType: "application/json; charset=utf-8",

        success: function(wait_to_get_obj_dict)
        {
            first_request_wait_to_get = false
            $(".offers_info").css({'overflow': 'auto'})

            $('#nav-tabContent').empty()
            $('#nav-tabContent').append(`
                <div class="tab-pane fade active show" id="nav-contact" aria-labelledby="without_responce">
                    <table class="table table-dark table-hover" id="waitToGetTable">
                    </table>
                </div>`)

            $('#waitToGetTable').empty()
            $('#waitToGetTable').append(`
                <thead>
                      <tr>
                        <th scope="col">Доставщик</th>
                        <th scope="col">Откуда</th>
                        <th scope="col">Куда</th>
                        <th scope="col">Время</th>
                        <th scope="col">Товар</th>
                        <th scope="col">Цена</th>
                      </tr>
                </thead>
                <tbody id="waitToGetTbody">
                      <tr><td colspan="6">Пока ничего не заказал</td></tr>
                </tbody>`)

            if(Object.keys(wait_to_get_obj_dict).length > 0)
            {
                $('#waitToGetTbody').empty()
                for (let key in wait_to_get_obj_dict)
                {
                    let order_id = wait_to_get_obj_dict[key][0]
                    let who_make_id = wait_to_get_obj_dict[key][10]

                    $( "#waitToGetTbody").append(
                    `<tr class="waitToGetTrow" value="make_${who_make_id}">
                        <td>${wait_to_get_obj_dict[key][8]}</td>
                        <td>${wait_to_get_obj_dict[key][1]}</td>
                        <td>${wait_to_get_obj_dict[key][2]}</td>
                        <td>${wait_to_get_obj_dict[key][3]}</td>
                        <td>${wait_to_get_obj_dict[key][4]}</td>
                        <td>${wait_to_get_obj_dict[key][5]}</td>
                        <td class="emptyComment" style="display: none">${wait_to_get_obj_dict[key][6]}</td>
                        <td class="emptyOrderId" style="display: none">${order_id}</td>
                    </tr>`)
                }
            }
        }
   })
}

//-------------------Достаём "Выполняю" из БД--------------------

function making_order()
{
    $.ajax({
        type: "GET",
        url: "making_order",
        contentType: "application/json; charset=utf-8",

        success: function(dict_with_orders_i_making)
        {
            first_request_wait_to_get = false

            $(".offers_info").css({'overflow': 'auto'})

            $('#nav-tabContent').empty()
            $('#nav-tabContent').append(`
                <div class="tab-pane fade active show" id="nav-contact" aria-labelledby="without_responce">
                    <table class="table table-dark table-hover" id="ordersIMakingTable">
                    </table>
                </div>`)

            $('#ordersIMakingTable').empty()
            $('#ordersIMakingTable').append(
                `<thead>
                    <tr>
                        <th scope="col">Заказчик</th>
                        <th scope="col">Откуда</th>
                        <th scope="col">Куда</th>
                        <th scope="col">Время</th>
                        <th scope="col">Товар</th>
                        <th scope="col">Цена</th>
                    </tr>
                </thead>
                <tbody id="ordersIMakingTbody">
                    <tr><td colspan="6">Пока ничего не выполняю</td></tr>
                </tbody>`)

            if(Object.keys(dict_with_orders_i_making).length > 0)
            {
                $('#ordersIMakingTbody').empty()
                for (let key in dict_with_orders_i_making)
                {
                    let order_id = dict_with_orders_i_making[key][0]
                    let who_wait_id = dict_with_orders_i_making[key][9]

                    $( "#ordersIMakingTbody").append(
                    `<tr class="ordersIMakingTrow" value="wait_${who_wait_id}">
                        <td>${dict_with_orders_i_making[key][10]}</td>
                        <td>${dict_with_orders_i_making[key][1]}</td>
                        <td>${dict_with_orders_i_making[key][2]}</td>
                        <td>${dict_with_orders_i_making[key][4]}</td>
                        <td>${dict_with_orders_i_making[key][3]}</td>
                        <td>${dict_with_orders_i_making[key][5]}</td>
                        <td class="emptyComment" style="display: none">${dict_with_orders_i_making[key][6]}</td>
                        <td class="emptyOrderId" style="display: none">${dict_with_orders_i_making[key][0]}</td>
                    </tr>`)
                }
            }
        }
   })
}

// -----Отрабатывает при нажатии на строку таблицы, выводит инфо-----

get_order_info = function(tr_clicked)
{
    if(tr_clicked[0].className === "myOtklikiRow")
    {
        $(".offers_info").css({'overflow': 'hidden'})

        let order_id = tr_clicked.children()[8].textContent
        let whose_order =  tr_clicked.attr('value').slice(12,)

        $(".offers_info").css({'overflow': 'hidden'})

        $( "#myOtklikiTable").empty()
        $( "#myOtklikiTable").append(
            `<div id="ordersIMakingChatANDProfile" style="display: flex">
                <div id="viewOrderProfileDiv">
                </div>
                <div id='all_chat' style='width: 75%; position: relative'>
                    <div id="ordersIMakingChat" style='height: 17rem; overflow: auto'></div>
                    <div class="write_message" id='currentMessageDiv'></div>
                </div>
            </div>
            <hr style="margin: 0">

            <div id="viewOrdertwoButtons">
                <button type="button" id="confirmGetting" class="btn btn-primary btn-sm" onclick='cancel_otklik(${order_id})'>Отменить отклик</button>
                <button type="button" id="goBack" class="btn btn-secondary btn-sm" onclick="get_all_my_otkliks()">Назад</button>
            </div>`)

        let what_chat = "ordersIMakingChat"
        get_target_user_media(whose_order, 'viewOrderProfileDiv')
        show_chat(what_chat, whose_order)
    }
    else if(tr_clicked[0].className === "publishedRow")
    {
        let order_id = parseInt(tr_clicked.children()[0].id.slice(12,))

        $( "#publishedTable").empty()
        $( "#publishedTable").append(`
            <div id="viewOrderCommentDiv" style="padding: 1.5rem 0.5rem">Комментарий: ${tr_clicked.children()[6].textContent}</div>

            <div id="viewOrdertwoButtons">
                <button type="button" id="buttonConfirm" style="width:9rem; padding-right:0" class="btn btn-primary btn-sm" onclick="delete_order_i_left(${order_id})">Удалить заявку</button>
                <button type="button" id="goBack" class="btn btn-secondary btn-sm" onclick="get_all_my_orders()">Назад</button>
            </div><hr style='margin:0'>`)
    }
    else if(tr_clicked[0].className === "waitToGetTrow")
    {

        $(".offers_info").css({'overflow': 'hidden'})
        let order_id = parseInt(tr_clicked.children()[7].textContent)
        let what_chat = "ordersIMakingChat"
        let chat_with = parseInt(tr_clicked.attr('value').slice(5,))

        $( "#waitToGetTable").empty()
        $( "#waitToGetTable").append(
        `<div id="ordersIMakingChatANDProfile" style="display: flex">
            <div id="viewOrderProfileDiv">
            </div>
            <div id='all_chat' style='width: 75%; position: relative'>
                <div id="ordersIMakingChat" style='height: 17rem; overflow: auto'></div>
                <div class="write_message" id='currentMessageDiv'></div>
            </div>
        </div>
        <hr style="margin: 0">

        <div id="viewOrdertwoButtons">
            <button type="button" id='leftOtzivButton'  class="btn btn-primary btn-sm" onclick="left_otziv(${chat_with})">Оставить отзыв</button>
            <button type="button" id='confirmGetting' class="btn btn-primary btn-sm" onclick='confirm_getting(${order_id})'>Подтвердить получение</button>
            <button type="button" id="goBack" class="btn btn-secondary btn-sm" onclick="wait_to_get()">Назад</button>
        </div>`)

        get_target_user_media(chat_with, 'viewOrderProfileDiv')
        show_chat(what_chat, chat_with)
    }
    else if(tr_clicked[0].className === "ordersIMakingTrow")
    {
        $(".offers_info").css({'overflow': 'hidden'})
        let what_chat = "ordersIMakingChat"
        let chat_with = parseInt(tr_clicked.attr('value').slice(5,))

        $( "#ordersIMakingTable").empty()
        $( "#ordersIMakingTable").append(
        `<div id="ordersIMakingChatANDProfile" style="display: flex">
            <div id="viewOrderProfileDiv">
            </div>
            <div id='all_chat' style='width: 75%; position: relative'>
                <div id="ordersIMakingChat" style='height: 17rem; overflow: auto'></div>
                <div class="write_message" id='currentMessageDiv'></div>
            </div>
        </div>
        <hr style="margin: 0">

        <div id="viewOrdertwoButtons">
                        <button type="button" id='leftOtzivButton'  class="btn btn-primary btn-sm" onclick="left_otziv(${chat_with})">Оставить отзыв</button>
            <button type="button" class="btn btn-secondary btn-sm" id="goBack" onclick="making_order()">Назад</button>
        </div>`)

        get_target_user_media(chat_with, 'viewOrderProfileDiv')
        show_chat(what_chat, chat_with)
    }

}


// ----------------------------История------------------------------

function get_back_home(toWhere)
{
    $('#goBackHistory').remove()
    $('#nav-tab').empty()

    if(toWhere === "from_home")
    {
        $('#nav-tab').append(`
            <a class="nav-item nav-link tab_prop myLink" id="making" data-toggle="tab" href="#nav-home" style="border-radius: 1.2rem 1.2rem 0 0 !important;" onclick="making_order()">Выполняю</a>
            <a class="nav-item nav-link tab_prop myLink" id="waiting" data-toggle="tab" href="#nav-profile" style="border-radius: 1.2rem 1.2rem 0 0 !important;" onclick="wait_to_get()">Жду получения</a>
            <a class="nav-item nav-link active tab_prop myLink" id="without_responce" data-toggle="tab" href="#nav-contact" style="border-radius: 1.2rem 1.2rem 0 0 !important; position:relative !important;" onclick="get_all_my_orders()">Опубликованное</a>
            <a class="nav-item nav-link tab_prop myLink" id="myOtkliki" data-toggle="tab" href="#nav-something" style="border-radius: 1.2rem 1.2rem 0 0 !important;" onclick="get_all_my_otkliks()">Мои отклики</a>
            `)
        get_all_my_orders()
    }
    else
    {
        $('#nav-tab').append(`
            <a class="nav-item nav-link active tab_prop" id="choose_make" style="width: 50% !important; border-radius: 1rem 1rem 0 0 !important;" data-toggle="tab" href="#nav-home">Заказать</a>
            <a class="nav-item nav-link tab_prop" id="choose_deliver" style="width: 50% !important; border-radius: 1rem 1rem 0 0 !important;" data-toggle="tab" href="#nav-profile">Доставить</a>
        `)
        window.location.href = 'make_order'
    }
}

function show_history(from_what_page)
{
     $.ajax({
        type: "GET",
        url: "show_history",
        contentType: "application/json; charset=utf-8",

        success: function(dict_history)
        {
            if(Object.keys(dict_history).length > 0)
            {
                $('.chat').remove()
                $('.offers_info').empty()
                $('.offers_info').css({'width':'100%', 'position': 'relative'})
                $('.chat_head').empty()
                $('.chat_head').css('background', '#1a1a1a')

                $('.offers_info').append(`
                    <div class="nav nav-tabs" id="nav-tab" role="tablist">
                        <div style="text-align: center; width: 100%">
                            <h5 style="color: #c7c7c7">История</h5>
                        </div>
                    </div>
                    <div class="tab-content" id="nav-tabContent" style="position: relative; margin-top: 0">
                        <div class="tab-pane fade active show" id="nav-contact" aria-labelledby="without_responce">
                            <table class="table table-dark table-hover" id="myOtklikiTable">
                                <thead>
                                </thead>
                                <tbody>
                                </tbody>
                            </table>
                        </div>
                    </div>`)

                $('thead').append(`
                    <tr>
                        <th scope="col">Заказчик</th>
                        <th scope="col">Исполнитель</th>
                        <th scope="col">Откуда</th>
                        <th scope="col">Куда</th>
                        <th scope="col">Время</th>
                        <th scope="col">Товар</th>
                        <th scope="col">Цена</th>
                        <th scope="col">Завершено</th>
                    </tr>
                `)

                for (let key in dict_history)
                {
                    if(dict_history[key][7] === 'deliver')
                    {
                        $('tbody').append(`
                        <tr>
                            <td>${dict_history[key][9]}</td>
                            <td>${dict_history[key][8]}</td>
                            <td>${dict_history[key][1]}</td>
                            <td>${dict_history[key][2]}</td>
                            <td>${dict_history[key][3]}</td>
                            <td>${dict_history[key][4]}</td>
                            <td>${dict_history[key][5]}</td>
                            <td>${dict_history[key][3]}</td>
                        </tr>`)
                    }
                    else
                    {
                        $('tbody').append(`
                        <tr>
                            <td>${dict_history[key][9]}</td>
                            <td>${dict_history[key][8]}</td>
                            <td>${dict_history[key][1]}</td>
                            <td>${dict_history[key][2]}</td>
                            <td>${dict_history[key][3]}</td>
                            <td>${dict_history[key][4]}</td>
                            <td>${dict_history[key][5]}</td>
                            <td>${dict_history[key][3]}</td>
                        </tr>`)
                    }
                }
                $('.offers_info').append(`
                <div id="viewOrdertwoButtons" style="position: sticky; bottom: 0.5rem">
                    <button type="button" id="goBackHistory" class="btn btn-secondary btn-sm" onclick="get_back_home('${from_what_page}')">Назад</button>
                </div>`)
            }
            else
            {
                alert('У вас нет завершённых заказов!')
            }
        }
     })
}

// ----------------Вызов функций для получения данных с БД------------------

if(first_request_all_my_orders)
{
    get_all_my_orders()
}


// -----------------------Дополнительные функции----------------------------

function chenge_ava()
{
    $('#newAvaChoose').css('display', 'block')
}


function changecolors() {
    x_for_color = 1;
    setInterval(change, 1000);
}

function change() {
    if (x_for_color === 1) {
        color = "white";
        x_for_color = 2;
    } else {
        color = "#474747";
        x_for_color = 1;
    }

    for(let idshnik of arr_who_will_change_color)
    {
        $(`#${idshnik}`).css({'color': color})
    }
}

if(first_changecolors_for_left_otzivi)
{
    first_changecolors_for_left_otzivi = false
    changecolors_for_left_otzivi()
}

function changecolors_for_left_otzivi()
{
    y_for_color = 1;
    setInterval(change2, 1500);
}

function change2() {
    if (y_for_color === 1) {
        color = "white";
        y_for_color = 2;
    } else {
        color = "#696969";
        y_for_color = 1;
    }

    $("#leftOtzivButton").css({'color': color})
}



// -------------------Глобальный обработчик событий-------------------------

document.addEventListener('click', function(e){

    if(e.target.id !== 'otziviListDivID')
        $('#otziviListDivID').remove()

    if(e.target.localName === "td")
    {
        let tr_clicked = $(e.target.parentNode)
        get_order_info(tr_clicked)
    }

    if(e.target.className === "mySelected1")
    {
        let current_color = e.target.style['background-color']
        $('#selectRating').css('background', current_color)
    }

    if(e.target.id !== 'ava' && e.target.id !=='labelPhoto' && e.target.id !=='id_photo')
    {
        $('#newAvaChoose').css('display', 'none')
    }

    let container = $("#forOtzivMainDivID")
    if ( !container.is(e.target) && container.has(e.target).length === 0 &&  e.target.id !== 'leftOtzivButton')
    {
        $("#forOtzivMainDivID").remove()
        $("#blackFonDiv").remove()
    }
})