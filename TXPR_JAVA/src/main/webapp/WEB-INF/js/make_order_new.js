let foundOrdersInfo = {} // { "id": int, "comment": "str", "responseCoverLetter": "str"]}


function readDataFromGetForm() {

    return {
        orderFromCity: $("#orderGetFromPlace").val(),
        orderToCity: $("#orderGetToPlace").val(),
        orderTime: document.querySelector("#timeGetInputId").value,
        orderGoods: $("#orderGoods").val(),
        orderPrice: parseInt($("#orderPrice").val()),
        orderComment: $("#commentGetInput").val(),
        orderGetOrDeliver: "get"
    }
}


function readDataFromDeliverForm() {

    return {
        orderFromCity: $("#orderDeliverFromPlace").val(),
        orderToCity: $("#orderDeliverToPlace").val(),
        orderTime: document.querySelector("#timeDeliverInputId").value,
        orderGoods: "---",
        orderPrice: 0,
        orderComment: $("#commentDeliverInput").val(),
        orderGetOrDeliver: "deliver",
    }
}


// нажатие кнопки "Опубликовать"
function publishOrder(getOrDeliver){

    let order;

    if(getOrDeliver === "get"){
        order = readDataFromGetForm()
    } else {
        order = readDataFromDeliverForm()
    }

    $.ajax({
        type: "POST",
        url: "/order/save",
        contentType: "application/json",
        data: JSON.stringify(order),
        dataType: 'json',

        success: function () {
            window.location.href = "/txpr/home";
        },
    });
}


// нажатие кнопки "Найти"
function findOrder(getOrDeliver){

    let order;

    if(getOrDeliver === "get"){
        order = readDataFromGetForm()
    } else {
        order = readDataFromDeliverForm()
    }

    $.ajax({
        type: "GET",
        url: "/order/find",
        data: order,
        contentType: "application/json; charset=utf-8",
        dataType: 'json',

        success: function(foundOrders) {

            let foundOrdersTable =  $( "#foundedOffersTable")
            foundOrdersTable.empty()

            if(foundOrders.length > 0){

                if(getOrDeliver === "get"){

                    foundOrdersTable.append(
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

                    foundOrders.forEach(function (order){
                        foundOrdersTable.append(
                        `<tr class='rowFoundedDelivery' id='rowForOrder_${order["id"]}' data-toggle="tooltip" data-placement="right" title="Нажмите для просмотра подробной информации" delay="0">
                            <td>${order["orderWhoLeftUsername"]}</td>
                            <td>${order["orderFromCity"]}</td>
                            <td>${order["orderToCity"]}</td>
                            <td>${order["orderTime"]}</td>
                        </tr>`)

                        foundOrdersInfo["rowForOrder_" + order["id"]] = {
                            "orderId": order["id"],
                            "orderComment": order["orderComment"],
                        }
                    })
                } else { // if (getOrDeliver === "deliver")
                    foundOrdersTable.append(
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
                    <tbody id="foundedOffersTbody">
                    </tbody>`)

                    foundOrders.forEach(function (order) {
                        foundOrdersTable.append(
                        `<tr class="rowFoundedOffer" id='rowForOrder_${order["id"]}' data-toggle="tooltip" data-placement="right" title="Нажмите для просмотра подробной информации">
                            <td>${order["orderWhoLeftUsername"]}</td>
                            <td>${order["orderFromCity"]}</td>
                            <td>${order["orderToCity"]}</td>
                            <td>${order["orderTime"]}</td>
                            <td>${order["orderGoods"]}</td>
                            <td>${order["orderComment"]}</td>
                        </tr>`)

                        foundOrdersInfo["rowForOrder_" + order["id"]] = {
                            "orderId": order["id"],
                            "orderComment": order["orderComment"],
                        }
                    })
                }
            } else { // if(foundOrders.length == 0)
                foundOrdersTable.append(
                `<tr>
                    <td colspan="4">К сожалению ничего не найдено...</td>
                </tr>`)
            }
        }
    });
}


// нажатие на строку в таблице найденных заказов
function getClickedOrderInfo(clickedTableRow) {

    let foundOrdersTable =  $( "#foundedOffersTable")
    let rowId = clickedTableRow.attr("id")
    let orderId = foundOrdersInfo[rowId]["orderId"]
    let orderComment = foundOrdersInfo[rowId]["orderComment"]

    foundOrdersTable.empty()

    if(clickedTableRow[0].className === "rowFoundedOffer") {

        foundOrdersTable.append(`
        <div id="viewOrderProfileDiv" style="text-align: center; margin: 0; background: #1c0047; color: white; height: 4rem; width: 100%">
        </div>
        <hr class="myHr">
        <div id="commentForOtklikDiv">
            <input id="commentForOtklikInput" type="text" placeholder="Сопроводительное письмо">
        </div>
        <div id="viewOrdertwoButtons" style="text-align: right; padding: 0.5rem; margin: 0rem; position: relative; height: 2.8rem; background: #1c0047">
            <button type="button" id="buttonConfirm" style="width: 7rem; background: #004982" class="btn btn-primary btn-sm" onclick="sendResponseToOrder('${rowId}')">Откликнуться</button>
            <button type="button" style="left: 0" id="goBack" class="btn btn-secondary btn-sm" style="position: absolute; bottom: 0.5rem; left: 0.5rem;" onclick="window.location.href = '/txpr/make-order'">Назад</button>
        </div>`)

    } else if (clickedTableRow[0].className === "rowFoundedDelivery") {

        foundOrdersTable.append(
        `<div id="viewOrderProfileDiv" style="text-align: center; margin: 0; background: #1c0047; color: white; height: 4rem; width:100%">
        </div>
        <hr class="myHr">
        <div id="commentForOtklikDiv">
            <input id="commentForOtklikInput" type="text" placeholder="Сопроводительное письмо">
        </div>
        <div id="viewOrdertwoButtons" style="text-align: right; padding: 0.5rem; margin: 0rem; position: relative; height: 2.8rem; background: #1c0047">
            <button type="button" id="buttonConfirm" style="width: 7rem; background: #004982" class="btn btn-primary btn-sm" onclick="sendResponseToOrder('${rowId}')">Откликнуться</button>
            <button type="button" style="left: 0" id="goBack" class="btn btn-secondary btn-sm" style="position: absolute; bottom: 0.5rem; left: 0.5rem;" onclick="window.location.href = '/txpr/make-order'">Назад</button>
        </div>`)
    }

    getOrderOwnerInfo(orderId, orderComment)
}


function getOrderOwnerInfo(orderId, commentOfOrder)
{
    $.ajax({
        type: 'GET',
        url: '/txpr/user-info/' + orderId,

        success: function(userDTO)
        {
            let viewOrderProfileDiv = $('#viewOrderProfileDiv');

            viewOrderProfileDiv.empty()
            viewOrderProfileDiv.css({'height': '5rem', 'padding': '0.5rem', 'display': 'flex', 'background': '#343a40'})

            viewOrderProfileDiv.append(`
            <div>
                <img src="/some-img" alt="User photo" style="height: 4rem; width:4rem">
            </div>
            <div style="min-width: 11rem;">
                <div style="text-align: center; font-size: 1.3rem; min-width: 5rem; line-height:4rem">${userDTO["username"]} <span style="color:#00a8bf; padding: 0;">${userDTO["rating"].toFixed(2)}</span>
                </div>
            </div>
            <div style="line-height:4rem">
                <span style="color:#ababab">Комментарий: ${commentOfOrder}</span>
            </div>`)
        }
    })
}


function sendResponseToOrder(rowId){
    let orderInfoForResponse = foundOrdersInfo[rowId]
    delete orderInfoForResponse["orderComment"] // уже не нужен
    orderInfoForResponse["responseCoverLetter"] = $('#commentForOtklikInput').val()

    $.ajax({
        type: "POST",
        url: "/response/save",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(orderInfoForResponse),
        dataType: 'json',

        success: function () {
            window.location.href = "/txpr/home";
        },
    });
}


document.addEventListener('click', function(e){

    // Нажатие на строку таблицы
    if(e.target.localName === "td")
    {
        let clickedTableRow = $(e.target.parentNode)
        getClickedOrderInfo(clickedTableRow)
    }
})

