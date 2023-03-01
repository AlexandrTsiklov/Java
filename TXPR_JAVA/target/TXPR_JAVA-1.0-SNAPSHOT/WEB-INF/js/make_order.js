
//Получить фотку и рейтинг юзера для списка откликнувшихся
function get_target_user_media_MO(target_user, comment)
{
    $.ajax({
        type: 'GET',
        url: 'get_target_user_media_MO',
        data: {target_user:target_user},
        success: function(photo_and_rating_dict)
        {
            let photo_url = photo_and_rating_dict['photo']
            let rating = photo_and_rating_dict['rating']

            $('#viewOrderProfileDiv').empty()
            $('#viewOrderProfileDiv').css({'height': '5rem', 'padding': '0.5rem', 'display': 'flex', 'background': '#343a40'})

            $('#viewOrderProfileDiv').append(`
                <div>
                    <img src="${photo_url}" style="height: 4rem; width:4rem">
                </div>
                <div style="min-width: 11rem;">
                    <div style="text-align: center; font-size: 1.3rem; min-width: 5rem; line-height:4rem">${target_user} <span style="color:#00a8bf; padding: 0;">${rating.toFixed(2)}</span>
                    </div>
                </div>
                <div style="line-height:4rem">
                    <span style="color:#ababab">Комментарий: ${comment}</span>
                </div>`)
        }
   })
}


// Отрабатывает при нажатии кнопки "Откликнуться ( на заказ )"

send_otklik_na_zakaz = function(){
    let order_id_from_hidden_field = $("#order_id").text()
    let sopr_message = $('#commentForOtklikInput').val()

    $.ajax({
            type: "GET",
            url: "send_otklik_na_zakaz",
            contentType: "application/json; charset=utf-8",
            data: {get_order: order_id_from_hidden_field, sopr_message: sopr_message},

            success: function()
            {
                alert('Отклик успешно отправлен!')
                window.location.href = "make_order";
            },
        });
}

// Отрабатывает при нажатии кнопки "Откликнуться ( на доставку )"

send_otklik_na_dostavky = function(){
    let order_id_from_hidden_field = $("#order_id").text()
    let sopr_message = $('#commentForOtklikInput').val()

    $.ajax({
            type: "GET",
            url: "send_otklik_na_delivery",
            contentType: "application/json; charset=utf-8",
            data: {get_order: order_id_from_hidden_field, sopr_message: sopr_message},

            success: function()
            {
                alert('Отклик успешно отправлен!')
                window.location.href = "make_order";
            },
        });
}


// Отрабатывает при нажатии на строку таблицы, выводит инфо
function get_this_order_info(tr_clicked)
{
    if(tr_clicked[0].className === "rowFoundedOffer")
    {
        target_user = tr_clicked[0].children[0].textContent

        $( "#foundedOffersTable").empty()
        $( "#foundedOffersTable").append(`
            <div id="viewOrderProfileDiv" style="text-align: center; margin: 0rem; background: #1c0047; color: white; height: 4rem; width: 100%">
            </div>

            <hr class="myHr">

            <div id="commentForOtklikDiv">
                <input id="commentForOtklikInput" type="text" placeholder="Сопроводительное письмо">
            </div>

            <!-- =============Тащим id заявки=============== -->
            <div id="order_id" style="display: none">${tr_clicked.children()[7].textContent}</div>
            <!-- =========================================== -->


            <div id="viewOrdertwoButtons" style="text-align: right; padding: 0.5rem; margin: 0rem; position: relative; height: 2.8rem; background: #1c0047">
                <button type="button" id="buttonConfirm" style="width: 7rem; background: #004982" class="btn btn-primary btn-sm" onclick="send_otklik_na_zakaz()">Откликнуться</button>
                <button type="button" style="left: 0" id="goBack" class="btn btn-secondary btn-sm" style="position: absolute; bottom: 0.5rem; left: 0.5rem;" onclick="fill_out_deliver_order('search')">Назад</button>
            </div>`)

            let comment = tr_clicked.children()[6].textContent
            get_target_user_media_MO(target_user, comment)

    } else if(tr_clicked[0].className === "rowFoundedDelivery")
    {
        target_user = tr_clicked[0].children[0].textContent

        $( "#foundedOffersTable").empty()
        $( "#foundedOffersTable").append(
            `<div id="viewOrderProfileDiv" style="text-align: center; margin: 0rem; background: #1c0047; color: white; height: 4rem; width:100%">
            </div>

            <hr class="myHr">

            <div id="commentForOtklikDiv">
                <input id="commentForOtklikInput" type="text" placeholder="Сопроводительное письмо">
            </div>

            <!-- =============Тащим id заявки=============== -->
            <div id="order_id" style="display: none">${tr_clicked.children()[5].textContent}</div>
            <!-- =========================================== -->

            <div id="viewOrdertwoButtons" style="text-align: right; padding: 0.5rem; margin: 0rem; position: relative; height: 2.8rem; background: #1c0047">
                <button type="button" id="buttonConfirm" style="width: 7rem; background: #004982" class="btn btn-primary btn-sm" onclick="send_otklik_na_dostavky()">Откликнуться</button>
                <button type="button" style="left: 0" id="goBack" class="btn btn-secondary btn-sm" style="position: absolute; bottom: 0.5rem; left: 0.5rem;" onclick="fill_out_get_order('search')">Назад</button>
            </div>`)

        let comment = tr_clicked.children()[4].textContent
        get_target_user_media_MO(target_user, comment)
    }
}



//----------Заполнение заявки на заказ, поиск, публикация------------

fill_out_get_order = function(what_action) {

    // Независимо от нажатой кнопки, достаём все данные из формы и пакуем в объект
    let get_order = {
        from_f: document.getElementById("orderFromPlace").value,
        to_f: document.getElementById("orderToPlace").value,
        time_f: document.getElementById("orderTime").value,
        goods_f: document.getElementById("orderGoods").value,
        price_f: document.getElementById("orderPrice").value,
        comment_f: document.getElementById("commentOrderInput").value,
        get_or_deliver: 'get'
    }

    // Произошло нажатие кнопки "опубликовать"
    if(what_action === 'publish')
    {
        $.ajax({
            //headers: {"X-CSRFToken": $('input[name="csrfmiddlewaretoken"]').val()},

            type: "GET",
            url: "save_get_order",
            contentType: "application/json; charset=utf-8",
            data: {get_order: get_order},

            success: function()
            {
                alert('Заказ успешно опубликован!')
                window.location.href = "make_order";
            },
        });
    }
    // Произошло нажатие кнопки "найти" (доставщика)
    else if(what_action === 'search')
    {
        $.ajax({
            type: "GET",
            url: "find_deliverer",
            data: {search_params: get_order},
            contentType: "application/json; charset=utf-8",
            dataType: 'json',

            success: function(dict_founded_delivery_offers)
            {
                $( "#foundedOffersTable").empty()
                $( "#foundedOffersTable").append(
                `<thead>
                    <tr>
                        <th scope="col">Доставщик</th>
                        <th scope="col">Откуда</th>
                        <th scope="col">Куда</th>
                        <th scope="col">Время</th>
                    </tr>
                </thead>
                <tbody id="foundedOffersTbody">
                </tbody>`)

                if(Object.keys(dict_founded_delivery_offers).length > 0)
                {
                    for (let key in dict_founded_delivery_offers)
                    {
                        $( "#foundedOffersTable").append(
                        `<tr class='rowFoundedDelivery' data-toggle="tooltip" data-placement="right" title="Нажмите для просмотра подробной информации" delay="0">
                            <td>${dict_founded_delivery_offers[key][0]}</td>
                            <td>${dict_founded_delivery_offers[key][1]}</td>
                            <td>${dict_founded_delivery_offers[key][2]}</td>
                            <td>${dict_founded_delivery_offers[key][3]}</td>
                            <td class="emptyComment" style="display: none">${dict_founded_delivery_offers[key][5]}</td>
                            <td class="emptyOrderId" style="display: none">${dict_founded_delivery_offers[key][4]}</td>
                        </tr>
                        `)
                    }
                }
                else
                {
                $( "#foundedOffersTable").append(
                    `<tr>
                        <td colspan="4">К сожалению ничего не найдено...</td>
                    </tr>`)
                }
            },
        });
    }
}

//----------Заполнение заявки на доставку, поиск, публикация------------

fill_out_deliver_order = function(what_action) {

    let delivery_offer = {
        from_f: document.getElementById("deliveryFromPlace").value,
        to_f: document.getElementById("deliveryToPlace").value,
        time_f: document.getElementById("deliveryTime").value,
        comment_f: document.getElementById("commentDeliveryInput").value,
        get_or_deliver: 'deliver'
    }

    if(what_action === 'publish')
    {
        $.ajax({
            //headers: {"X-CSRFToken": $('input[name="csrfmiddlewaretoken"]').val()},

            type: "GET",
            url: "save_delivery_order",
            contentType: "application/json; charset=utf-8",
            data: {delivery_order: delivery_offer},

            success: function()
            {
                alert('Заказ успешно опубликован!')
                window.location.href = "make_order";
            },
        });
    }
    // Произошло нажатие кнопки "найти" (заказчика)
    else if(what_action === 'search')
    {
        $.ajax({
            type: "GET",
            url: "find_customer",
            data: {search_params: delivery_offer},
            contentType: "application/json; charset=utf-8",
            dataType: 'json',

            success: function(dict_founded_customer_orders)
            {
                $( "#foundedOffersTable").empty()
                $( "#foundedOffersTable").append(
                `<thead>
                        <th scope="col">Заказчик</th>
                        <th scope="col">Откуда</th>
                        <th scope="col">Куда</th>
                        <th scope="col">Время</th>
                        <th scope="col">Товар</th>
                        <th scope="col">Цена</th>
                    </tr>
                </thead>
                <tbody id="foundedOffersTbody">
                </tbody>`)

                if(Object.keys(dict_founded_customer_orders).length > 0)
                {


                    for (let key in dict_founded_customer_orders)
                    {
                        $( "#foundedOffersTable").append(
                        `<tr class="rowFoundedOffer" data-toggle="tooltip" data-placement="right" title="Нажмите для просмотра подробной информации">
                            <td>${dict_founded_customer_orders[key][0]}</td>
                            <td>${dict_founded_customer_orders[key][1]}</td>
                            <td>${dict_founded_customer_orders[key][2]}</td>
                            <td>${dict_founded_customer_orders[key][3]}</td>
                            <td>${dict_founded_customer_orders[key][4]}</td>
                            <td>${dict_founded_customer_orders[key][5]}</td>
                            <td class="emptyComment" style="display: none">${dict_founded_customer_orders[key][7]}</td>
                            <td class="emptyOrderId" style="display: none">${dict_founded_customer_orders[key][6]}</td>
                        </tr>`)
                    }
                }
                else
                {
                $( "#foundedOffersTable").append(
                    `<tr>
                        <td colspan="6">К сожалению ничего не найдено...</td>
                    </tr>`)
                }
            }
        });
    }
}



// Глобальный обработчик событий

document.addEventListener('click', function(e){
    if(e.target.localName === "td")
    {
        let tr_clicked = $(e.target.parentNode)
        console.log(tr_clicked)
        get_this_order_info(tr_clicked)
    }
})